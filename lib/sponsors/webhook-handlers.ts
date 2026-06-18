// Apply a Stripe event to the sponsor's record. Stripe metadata is the source of
// truth; the Notion row is mirrored best-effort. Idempotency without a separate
// event store: every status write is ABSOLUTE and guarded by canTransition(), so
// replays and out-of-order deliveries are no-ops and can't downgrade a settled
// record. Notion is updated (not created) so duplicates can't fan out rows.

import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe"
import { canTransition, META, type SponsorStatus } from "./status"
import { patchCustomerMeta } from "./customer"
import { updateSponsorRowByCustomerId } from "@/lib/notion"
import { resolveCustomerId } from "./locate"

// Events whose target status is fixed. checkout.session.completed is handled
// separately (paid vs. ACH-pending).
const EVENT_STATUS: Record<string, SponsorStatus> = {
  "checkout.session.async_payment_succeeded": "PAID",
  "checkout.session.async_payment_failed": "PAYMENT_FAILED",
  "payment_intent.succeeded": "PAID",
  "payment_intent.payment_failed": "PAYMENT_FAILED",
  "invoice.sent": "INVOICE_SENT",
  "invoice.paid": "INVOICE_PAID",
  "invoice.payment_failed": "PAYMENT_FAILED",
  "invoice.voided": "CANCELLED",
  "charge.refunded": "REFUNDED",
}

export async function handleStripeEvent(event: Stripe.Event): Promise<void> {
  const stripe = getStripe()

  let targetStatus: SponsorStatus | undefined
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    // Card: paid immediately. ACH: session completes but settles later.
    targetStatus = session.payment_status === "paid" ? "PAID" : "PAYMENT_PENDING"
  } else {
    targetStatus = EVENT_STATUS[event.type]
  }
  if (!targetStatus) return // an event type we don't act on

  const customerId = await resolveCustomerId(stripe, event)
  if (!customerId) {
    console.warn(`[webhook] no customer resolved for ${event.type} (${event.id})`)
    return
  }

  // Read current status to keep transitions monotonic.
  const customer = await stripe.customers.retrieve(customerId)
  const current =
    customer && !("deleted" in customer)
      ? ((customer.metadata?.[META.status] as SponsorStatus | undefined) ?? undefined)
      : undefined

  if (!canTransition(current, targetStatus)) {
    console.log(`[webhook] skip ${current ?? "—"} -> ${targetStatus} for ${customerId} (${event.id})`)
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj = event.data.object as any
  const patch: Record<string, string> = {
    [META.status]: targetStatus,
    [META.lastEventId]: event.id,
  }
  let invoiceUrl: string | undefined
  if (event.type.startsWith("invoice.")) {
    if (typeof obj.id === "string") patch[META.invoiceId] = obj.id
    if (typeof obj.hosted_invoice_url === "string") {
      patch[META.invoiceUrl] = obj.hosted_invoice_url
      invoiceUrl = obj.hosted_invoice_url
    }
  }
  if (typeof obj.payment_intent === "string") patch[META.paymentIntentId] = obj.payment_intent
  if (event.type === "checkout.session.completed" && typeof obj.id === "string") {
    patch[META.checkoutSessionId] = obj.id
  }

  await patchCustomerMeta(customerId, patch)
  await updateSponsorRowByCustomerId(customerId, { status: targetStatus, stripeInvoiceUrl: invoiceUrl })
}
