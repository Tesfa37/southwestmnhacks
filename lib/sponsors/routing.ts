// Decide which rail a submission takes, given the (server-resolved) tier, amount,
// and the sponsor's payment preference. Pure function — easy to unit test.

import type { Tier } from "./tiers"
import type { PaymentPreference } from "./payment-preferences"
import { isPayNow } from "./payment-preferences"
import type { SponsorStatus } from "./status"

export type SponsorAction = "checkout" | "invoice" | "record-only"

export type CheckoutMethod = "card" | "us_bank_account"

export interface RoutingInput {
  tier: Tier
  preference: PaymentPreference
  amountCents: number | null
  needsManualReview: boolean
}

export interface RoutingDecision {
  action: SponsorAction
  initialStatus: SponsorStatus
  /** Payment-method types for a Checkout Session (only meaningful when action === "checkout"). */
  checkoutMethods: CheckoutMethod[]
}

/**
 * Routing rules:
 * - Pay-now with a real payable amount -> Checkout (card or ACH per preference).
 * - Request invoice -> Invoice rail.
 * - Check / W-9 / in-kind / talk-first / custom-discussion -> record-only follow-up.
 * - Anything flagged for manual review (e.g. an oversized custom amount, or a
 *   pay-now with no payable amount) -> record-only follow-up, never an auto charge.
 */
export function decideAction(input: RoutingInput): RoutingDecision {
  const { preference, amountCents, needsManualReview } = input

  const payable = typeof amountCents === "number" && amountCents > 0

  if (isPayNow(preference)) {
    if (needsManualReview || !payable) {
      return { action: "record-only", initialStatus: "MANUAL_FOLLOW_UP", checkoutMethods: [] }
    }
    return {
      action: "checkout",
      initialStatus: "CHECKOUT_CREATED",
      checkoutMethods: preference === "PAY_NOW_ACH" ? ["us_bank_account"] : ["card"],
    }
  }

  switch (preference) {
    case "REQUEST_INVOICE":
      return { action: "invoice", initialStatus: "INVOICE_REQUESTED", checkoutMethods: [] }
    case "PAY_BY_CHECK":
      return { action: "record-only", initialStatus: "CHECK_PAYMENT_REQUESTED", checkoutMethods: [] }
    case "NEED_W9_VENDOR_SETUP":
      return { action: "record-only", initialStatus: "W9_VENDOR_SETUP_REQUESTED", checkoutMethods: [] }
    case "IN_KIND":
      return { action: "record-only", initialStatus: "IN_KIND_PENDING", checkoutMethods: [] }
    case "TALK_FIRST":
    case "CUSTOM_DISCUSSION":
    default:
      return { action: "record-only", initialStatus: "MANUAL_FOLLOW_UP", checkoutMethods: [] }
  }
}
