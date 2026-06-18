// Server-only Stripe client. Instantiated lazily so importing this module never
// throws at build time when STRIPE_SECRET_KEY isn't present. The apiVersion is
// pinned to the version the installed SDK (stripe@22) ships, so the wire API and
// the TypeScript types stay in lockstep.

import Stripe from "stripe"
import { requireEnv } from "./env"

let client: Stripe | null = null

export function getStripe(): Stripe {
  if (!client) {
    client = new Stripe(requireEnv("STRIPE_SECRET_KEY"), {
      apiVersion: "2026-05-27.dahlia",
      appInfo: { name: "southwestmn-hacks-sponsor" },
    })
  }
  return client
}
