// Stripe webhook — the source of truth for payment status. Verifies the signature
// against the RAW request body, then dispatches to idempotent handlers. Returns
// 2xx only after successful processing (a thrown handler returns 500 so Stripe
// retries). Never logs full event bodies / PII.

import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe"
import { requireEnv } from "@/lib/env"
import { handleStripeEvent } from "@/lib/sponsors/webhook-handlers"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  // App Router does not parse the body, so req.text() is the untouched payload
  // that signature verification requires.
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, signature, requireEnv("STRIPE_WEBHOOK_SECRET"))
  } catch (err) {
    console.error("[webhook] signature verification failed:", err instanceof Error ? err.message : "error")
    return new Response("Invalid signature", { status: 400 })
  }

  try {
    await handleStripeEvent(event)
  } catch (err) {
    console.error(`[webhook] handler error for ${event.type} (${event.id}):`, err instanceof Error ? err.message : err)
    // 500 -> Stripe retries with backoff.
    return new Response("Handler error", { status: 500 })
  }

  return new Response("ok", { status: 200 })
}
