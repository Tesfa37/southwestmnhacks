// Resolve the sponsor's Stripe Customer id from a webhook event, robust to which
// object the event carries. Order: our metadata recordId (== customer id) ->
// the object's `customer` field -> a checkout session's client_reference_id ->
// (async) the related PaymentIntent's customer.

import type Stripe from "stripe"
import { META } from "./status"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pick(obj: any): string | null {
  const metaId = obj?.metadata?.[META.recordId]
  if (typeof metaId === "string" && metaId.startsWith("cus_")) return metaId

  const customer = obj?.customer
  if (typeof customer === "string" && customer) return customer
  if (customer && typeof customer.id === "string") return customer.id

  const ref = obj?.client_reference_id
  if (typeof ref === "string" && ref.startsWith("cus_")) return ref

  return null
}

export async function resolveCustomerId(stripe: Stripe, event: Stripe.Event): Promise<string | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj = event.data.object as any
  const direct = pick(obj)
  if (direct) return direct

  // e.g. charge.refunded with no customer set — follow the PaymentIntent.
  const pi = obj?.payment_intent
  if (pi) {
    try {
      const id = typeof pi === "string" ? pi : pi.id
      const intent = await stripe.paymentIntents.retrieve(id)
      if (typeof intent.customer === "string") return intent.customer
      if (intent.customer && typeof intent.customer.id === "string") return intent.customer.id
    } catch {
      /* fall through */
    }
  }
  return null
}
