// The Stripe Customer is the money source of truth for a sponsor. We create or
// reuse one per email and stash the full intake on its metadata, so the Stripe
// Dashboard (and the webhook) can reconstruct everything without a separate DB.

import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe"
import { EVENT_NAME } from "@/lib/config"
import { META, canTransition, type SponsorStatus } from "./status"
import type { Tier } from "./tiers"
import type { SponsorIntakeInput } from "./schema"

// Stripe metadata values must be strings. Drop undefined/empty so we stay well
// under the 50-key / 500-char-per-value limits.
function meta(entries: Record<string, string | number | boolean | null | undefined>): Record<string, string> {
  const out: Record<string, string> = {}
  for (const [k, v] of Object.entries(entries)) {
    if (v === undefined || v === null || v === "") continue
    out[k] = typeof v === "string" ? v.slice(0, 500) : String(v)
  }
  return out
}

export interface CustomerComputed {
  amountCents: number | null
  status: SponsorStatus
}

export interface UpsertResult {
  customerId: string
  /** Canonical record id — we use the Stripe customer id itself. */
  recordId: string
}

/** Create or reuse a Stripe Customer for this submission and write its metadata. */
export async function upsertSponsorCustomer(data: SponsorIntakeInput, computed: CustomerComputed): Promise<UpsertResult> {
  const stripe = getStripe()

  const customerMeta = meta({
    [META.eventName]: EVENT_NAME,
    [META.status]: computed.status,
    [META.tier]: data.tier,
    [META.amountCents]: computed.amountCents ?? undefined,
    [META.organizationName]: data.organizationName,
    [META.publicSponsorName]: data.publicSponsorName,
    [META.contactName]: data.contactName,
    [META.contactEmail]: data.contactEmail,
    [META.contactPhone]: data.contactPhone,
    [META.paymentPreference]: data.paymentPreference,
    [META.billingEmail]: data.billingEmail,
    [META.purchaseOrderNumber]: data.purchaseOrderNumber,
    [META.needsW9]: data.needsW9,
    [META.wantsBooth]: data.wantsBooth,
    [META.wantsMentorOrJudge]: data.wantsMentorOrJudge,
    [META.interestedInChallengePrize]: data.interestedInChallengePrize,
    [META.logoUrl]: data.logoUrl,
    [META.createdAt]: new Date().toISOString(),
  })

  // Stripe mails the hosted invoice to customer.email and nowhere else, so the
  // billing/AP address has to win whenever the sponsor gives us one.
  const effectiveEmail = data.billingEmail || data.contactEmail

  // The stored email may be either address, so look up the effective one first and
  // fall back to the contact email — a sponsor who adds a billing address on a
  // second submission should update their record, not spawn a duplicate.
  let existing: Stripe.Customer | undefined = (
    await stripe.customers.list({ email: effectiveEmail, limit: 1 })
  ).data[0]
  if (!existing && effectiveEmail !== data.contactEmail) {
    existing = (await stripe.customers.list({ email: data.contactEmail, limit: 1 })).data[0]
  }

  let customer: Stripe.Customer
  if (existing) {
    // Reuse + overwrite: a sponsor who restarts the form updates one record.
    // But never DOWNGRADE a settled record — if they already PAID (or the record
    // is otherwise terminal) and resubmit, keep the existing status rather than
    // resetting it to a fresh checkout/invoice state.
    const currentStatus = existing.metadata?.[META.status] as SponsorStatus | undefined
    if (currentStatus && !canTransition(currentStatus, computed.status)) {
      customerMeta[META.status] = currentStatus
    }
    customer = await stripe.customers.update(existing.id, {
      email: effectiveEmail,
      name: data.organizationName,
      phone: data.contactPhone || undefined,
      metadata: customerMeta,
    })
  } else {
    customer = await stripe.customers.create({
      email: effectiveEmail,
      name: data.organizationName,
      phone: data.contactPhone || undefined,
      metadata: customerMeta,
    })
  }

  return { customerId: customer.id, recordId: customer.id }
}

/** Merge keys into a customer's metadata (Stripe merges; pass "" to clear a key). */
export async function patchCustomerMeta(customerId: string, patch: Record<string, string>): Promise<void> {
  await getStripe().customers.update(customerId, { metadata: patch })
}

/**
 * Write a status (plus optional extra metadata) but never downgrade a settled
 * record — same monotonic guard the webhook uses (`canTransition`). Returns the
 * status actually written, so callers can mirror it to Notion / notifications.
 */
export async function patchCustomerStatusGuarded(
  customerId: string,
  status: SponsorStatus,
  extraMeta: Record<string, string> = {},
): Promise<SponsorStatus> {
  const stripe = getStripe()
  const customer = await stripe.customers.retrieve(customerId)
  const current =
    customer && !("deleted" in customer)
      ? (customer.metadata?.[META.status] as SponsorStatus | undefined)
      : undefined
  const next = canTransition(current, status) ? status : (current as SponsorStatus)
  await stripe.customers.update(customerId, { metadata: { ...extraMeta, [META.status]: next } })
  return next
}

/** Read the current sponsor status off a customer's metadata. */
export function readStatus(customer: Stripe.Customer): SponsorStatus | undefined {
  const value = customer.metadata?.[META.status]
  return (value as SponsorStatus) || undefined
}

/** Shared metadata block attached to Checkout Sessions, PaymentIntents, Invoices. */
export function sharedStripeMetadata(
  customerId: string,
  data: Pick<SponsorIntakeInput, "organizationName" | "contactEmail" | "paymentPreference"> & { tier: Tier },
): Record<string, string> {
  return meta({
    [META.recordId]: customerId,
    [META.eventName]: EVENT_NAME,
    [META.organizationName]: data.organizationName,
    [META.tier]: data.tier,
    [META.contactEmail]: data.contactEmail,
    [META.paymentPreference]: data.paymentPreference,
  })
}
