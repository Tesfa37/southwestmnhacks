// Stripe Checkout for "pay now" sponsorships. Amounts come from the server-side
// tier table via dynamic price_data — the client never supplies a price.

import { getStripe } from "@/lib/stripe"
import { EVENT_NAME } from "@/lib/config"
import { siteUrl } from "@/lib/env"
import { tierLabel, type Tier } from "./tiers"
import type { CheckoutMethod } from "./routing"

export interface CheckoutInput {
  customerId: string
  tier: Tier
  amountCents: number
  methods: CheckoutMethod[]
  /** Shared metadata applied to BOTH the Session and the PaymentIntent. */
  metadata: Record<string, string>
}

export async function createCheckoutSession(input: CheckoutInput): Promise<{ id: string; url: string | null }> {
  const stripe = getStripe()
  const base = siteUrl()

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: input.customerId,
    client_reference_id: input.customerId,
    payment_method_types: input.methods,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: input.amountCents,
          product_data: {
            name: `${EVENT_NAME} — ${tierLabel(input.tier)} Sponsorship`,
          },
        },
      },
    ],
    metadata: input.metadata,
    // Metadata does NOT propagate from Session to PaymentIntent automatically.
    payment_intent_data: { metadata: input.metadata },
    success_url: `${base}/sponsor/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/sponsor/cancel?tier=${input.tier}`,
  })

  return { id: session.id, url: session.url }
}
