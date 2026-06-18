import { describe, it, expect } from "vitest"
import { decideAction } from "../../lib/sponsors/routing"
import { resolveAmountCents } from "../../lib/sponsors/tiers"
import type { PaymentPreference } from "../../lib/sponsors/payment-preferences"

describe("resolveAmountCents (server-authoritative amounts)", () => {
  it("ignores any client amount for fixed tiers", () => {
    expect(resolveAmountCents("gold", 1).amountCents).toBe(200000)
    expect(resolveAmountCents("bronze", 999999).amountCents).toBe(50000)
    expect(resolveAmountCents("platinum").amountCents).toBe(500000)
  })

  it("validates the custom minimum", () => {
    expect(resolveAmountCents("custom", 1000).error).toBeTruthy()
    expect(resolveAmountCents("custom", 30000).amountCents).toBe(30000)
    expect(resolveAmountCents("custom", 30000).error).toBeUndefined()
  })

  it("flags an oversized custom amount for manual review", () => {
    expect(resolveAmountCents("custom", 800000).needsManualReview).toBe(true)
  })

  it("treats a custom tier with no amount as manual review", () => {
    expect(resolveAmountCents("custom").needsManualReview).toBe(true)
  })

  it("gives in-kind no amount", () => {
    expect(resolveAmountCents("in_kind").amountCents).toBeNull()
  })
})

describe("decideAction (routing)", () => {
  it("routes pay-now card to Checkout with card", () => {
    const d = decideAction({ tier: "gold", preference: "PAY_NOW_CARD", amountCents: 200000, needsManualReview: false })
    expect(d.action).toBe("checkout")
    expect(d.checkoutMethods).toEqual(["card"])
    expect(d.initialStatus).toBe("CHECKOUT_CREATED")
  })

  it("routes pay-now ACH to Checkout with us_bank_account", () => {
    const d = decideAction({ tier: "silver", preference: "PAY_NOW_ACH", amountCents: 100000, needsManualReview: false })
    expect(d.checkoutMethods).toEqual(["us_bank_account"])
  })

  it("routes invoice requests to the invoice rail", () => {
    const d = decideAction({ tier: "platinum", preference: "REQUEST_INVOICE", amountCents: 500000, needsManualReview: false })
    expect(d.action).toBe("invoice")
    expect(d.initialStatus).toBe("INVOICE_REQUESTED")
  })

  it("routes check / W-9 / in-kind / talk / custom-discussion to record-only", () => {
    const cases: [PaymentPreference, string][] = [
      ["PAY_BY_CHECK", "CHECK_PAYMENT_REQUESTED"],
      ["NEED_W9_VENDOR_SETUP", "W9_VENDOR_SETUP_REQUESTED"],
      ["IN_KIND", "IN_KIND_PENDING"],
      ["TALK_FIRST", "MANUAL_FOLLOW_UP"],
      ["CUSTOM_DISCUSSION", "MANUAL_FOLLOW_UP"],
    ]
    for (const [preference, status] of cases) {
      const d = decideAction({ tier: "bronze", preference, amountCents: 50000, needsManualReview: false })
      expect(d.action).toBe("record-only")
      expect(d.initialStatus).toBe(status)
    }
  })

  it("never auto-charges when manual review is required", () => {
    const d = decideAction({ tier: "custom", preference: "PAY_NOW_CARD", amountCents: 800000, needsManualReview: true })
    expect(d.action).toBe("record-only")
    expect(d.initialStatus).toBe("MANUAL_FOLLOW_UP")
  })

  it("falls back to record-only for a pay-now with no payable amount", () => {
    const d = decideAction({ tier: "in_kind", preference: "PAY_NOW_CARD", amountCents: null, needsManualReview: false })
    expect(d.action).toBe("record-only")
  })
})
