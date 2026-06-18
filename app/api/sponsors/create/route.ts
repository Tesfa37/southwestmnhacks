// Sponsor intake orchestrator. Validates the submission, creates the Stripe
// Customer (money source of truth), routes it to the right rail (Checkout /
// Invoice / record-only follow-up), mirrors it to the Notion tracker, and sends
// notifications. Stripe failures are fatal (we return an error); Notion + email
// are best-effort.

import { NextResponse } from "next/server"
import { sponsorIntakeSchema, fieldErrors } from "@/lib/sponsors/schema"
import { resolveAmountCents, type Tier } from "@/lib/sponsors/tiers"
import { decideAction } from "@/lib/sponsors/routing"
import { upsertSponsorCustomer, sharedStripeMetadata, patchCustomerMeta } from "@/lib/sponsors/customer"
import { createCheckoutSession } from "@/lib/sponsors/checkout"
import { createSponsorInvoice } from "@/lib/sponsors/invoice"
import { createSponsorRow, type SponsorRowInput } from "@/lib/notion"
import { notifyOrganizer, sendSponsorConfirmation, type NotifyPayload } from "@/lib/sponsors/notify"
import { META, type SponsorStatus } from "@/lib/sponsors/status"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  const parsed = sponsorIntakeSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "validation", fields: fieldErrors(parsed.error) }, { status: 400 })
  }
  const data = parsed.data
  const tier = data.tier as Tier

  const resolved = resolveAmountCents(tier, data.customAmountCents)
  if (resolved.error) {
    return NextResponse.json({ error: "validation", fields: { customAmountCents: resolved.error } }, { status: 400 })
  }
  const amountCents = resolved.amountCents

  const decision = decideAction({
    tier,
    preference: data.paymentPreference,
    amountCents,
    needsManualReview: resolved.needsManualReview,
  })

  // 1) Stripe Customer (money source of truth) — fatal on failure.
  let customerId: string
  try {
    const upsert = await upsertSponsorCustomer(data, { amountCents, status: decision.initialStatus })
    customerId = upsert.customerId
  } catch (err) {
    console.error("[sponsors/create] customer upsert failed:", err instanceof Error ? err.message : err)
    return NextResponse.json(
      { error: "stripe", message: "We couldn't save your sponsorship just now. Please try again." },
      { status: 502 },
    )
  }

  const sharedMeta = sharedStripeMetadata(customerId, {
    organizationName: data.organizationName,
    contactEmail: data.contactEmail,
    paymentPreference: data.paymentPreference,
    tier,
  })

  // 2) Branch to the chosen rail — fatal on failure (the sponsor expects an action).
  let checkoutUrl: string | null = null
  let invoiceUrl: string | undefined
  let finalStatus: SponsorStatus = decision.initialStatus

  try {
    if (decision.action === "checkout" && amountCents) {
      const session = await createCheckoutSession({
        customerId,
        tier,
        amountCents,
        methods: decision.checkoutMethods,
        metadata: sharedMeta,
      })
      checkoutUrl = session.url
      finalStatus = "CHECKOUT_CREATED"
      await patchCustomerMeta(customerId, { [META.checkoutSessionId]: session.id, [META.status]: finalStatus })
    } else if (decision.action === "invoice" && amountCents) {
      const invoice = await createSponsorInvoice({ customerId, tier, amountCents, metadata: sharedMeta })
      invoiceUrl = invoice.hostedInvoiceUrl ?? undefined
      finalStatus = invoice.status
      await patchCustomerMeta(customerId, {
        [META.invoiceId]: invoice.invoiceId,
        [META.invoiceUrl]: invoice.hostedInvoiceUrl ?? "",
        [META.status]: finalStatus,
      })
    }
    // record-only: the Customer + status are already in place.
  } catch (err) {
    console.error("[sponsors/create] payment object failed:", err instanceof Error ? err.message : err)
    return NextResponse.json(
      { error: "stripe", message: "We couldn't start the payment. Please try again, or choose to be invoiced." },
      { status: 502 },
    )
  }

  // 3) Notion row (best-effort) + backfill the page id onto the customer.
  const rowInput: SponsorRowInput = {
    organizationName: data.organizationName,
    publicSponsorName: data.publicSponsorName,
    tier,
    amountCents,
    paymentPreference: data.paymentPreference,
    status: finalStatus,
    contactName: data.contactName,
    contactEmail: data.contactEmail,
    contactPhone: data.contactPhone,
    billingEmail: data.billingEmail,
    purchaseOrderNumber: data.purchaseOrderNumber,
    needsW9: data.needsW9,
    wantsBooth: data.wantsBooth,
    wantsMentorOrJudge: data.wantsMentorOrJudge,
    interestedInChallengePrize: data.interestedInChallengePrize,
    notes: data.notes,
    stripeCustomerId: customerId,
    stripeInvoiceUrl: invoiceUrl,
    logoUrl: data.logoUrl,
  }
  const notionPageId = await createSponsorRow(rowInput)
  if (notionPageId) {
    try {
      await patchCustomerMeta(customerId, { [META.notionPageId]: notionPageId })
    } catch {
      /* non-fatal */
    }
  }

  // 4) Notifications (best-effort). Organizer always; sponsor confirmation only
  //    for record-only paths (Stripe emails cover pay-now / invoice).
  const payload: NotifyPayload = {
    organizationName: data.organizationName,
    publicSponsorName: data.publicSponsorName,
    tier,
    amountCents,
    paymentPreference: data.paymentPreference,
    status: finalStatus,
    contactName: data.contactName,
    contactEmail: data.contactEmail,
    contactPhone: data.contactPhone,
    billingEmail: data.billingEmail,
    needsW9: data.needsW9,
    wantsBooth: data.wantsBooth,
    wantsMentorOrJudge: data.wantsMentorOrJudge,
    interestedInChallengePrize: data.interestedInChallengePrize,
    notes: data.notes,
    inKindDescription: data.inKindDescription,
    customerId,
    invoiceUrl,
    notionPageId,
  }
  await notifyOrganizer(payload)
  if (decision.action === "record-only") {
    await sendSponsorConfirmation(payload)
  }

  // 5) Respond. The client redirects to Checkout when a url is returned.
  if (checkoutUrl) {
    return NextResponse.json({ ok: true, next: "checkout", url: checkoutUrl })
  }
  if (decision.action === "invoice") {
    return NextResponse.json({ ok: true, next: "invoice" })
  }
  return NextResponse.json({ ok: true, next: "recorded", preference: data.paymentPreference })
}
