import { describe, it, expect } from "vitest"
import { sponsorIntakeSchema, fieldErrors } from "../../lib/sponsors/schema"
import { requiresBillingEmail, type PaymentPreference } from "../../lib/sponsors/payment-preferences"

const base = {
  tier: "bronze",
  paymentPreference: "TALK_FIRST",
  organizationName: "Acme Bank",
  contactName: "Pat Lee",
  contactEmail: "pat@acme.com",
  consentToBeContacted: true,
}

describe("sponsorIntakeSchema", () => {
  it("accepts a valid submission", () => {
    expect(sponsorIntakeSchema.safeParse(base).success).toBe(true)
  })

  it("requires the authorization checkbox", () => {
    const r = sponsorIntakeSchema.safeParse({ ...base, consentToBeContacted: false })
    expect(r.success).toBe(false)
  })

  it("rejects an invalid email", () => {
    expect(sponsorIntakeSchema.safeParse({ ...base, contactEmail: "nope" }).success).toBe(false)
  })

  it("requires a billing email for every accounts-payable preference", () => {
    // W-9 / vendor setup is as AP-bound as invoice and check: the sponsor is paid
    // through their AP team, so we need an address to reach it.
    const apBound: PaymentPreference[] = ["REQUEST_INVOICE", "PAY_BY_CHECK", "NEED_W9_VENDOR_SETUP"]
    for (const paymentPreference of apBound) {
      const missing = sponsorIntakeSchema.safeParse({ ...base, paymentPreference })
      expect(missing.success).toBe(false)
      if (!missing.success) expect(fieldErrors(missing.error).billingEmail).toBeTruthy()

      const ok = sponsorIntakeSchema.safeParse({ ...base, paymentPreference, billingEmail: "ap@acme.com" })
      expect(ok.success).toBe(true)
    }
  })

  it("leaves the billing email optional for everyone else", () => {
    expect(sponsorIntakeSchema.safeParse({ ...base, paymentPreference: "TALK_FIRST" }).success).toBe(true)
    expect(sponsorIntakeSchema.safeParse({ ...base, paymentPreference: "PAY_NOW_CARD" }).success).toBe(true)
  })

  it("requires an in-kind description for in-kind", () => {
    const r = sponsorIntakeSchema.safeParse({ ...base, tier: "in_kind", paymentPreference: "IN_KIND" })
    expect(r.success).toBe(false)
    if (!r.success) expect(fieldErrors(r.error).inKindDescription).toBeTruthy()
  })

  it("requires a custom amount at/above the floor to pay now", () => {
    const low = sponsorIntakeSchema.safeParse({ ...base, tier: "custom", paymentPreference: "PAY_NOW_CARD", customAmountCents: 1000 })
    expect(low.success).toBe(false)

    const ok = sponsorIntakeSchema.safeParse({ ...base, tier: "custom", paymentPreference: "PAY_NOW_CARD", customAmountCents: 30000 })
    expect(ok.success).toBe(true)
  })

  it("normalizes blank optional URLs to undefined", () => {
    const r = sponsorIntakeSchema.safeParse({ ...base, organizationWebsite: "" })
    expect(r.success).toBe(true)
    if (r.success) expect(r.data.organizationWebsite).toBeUndefined()
  })
})

// The schema derives its requirement from this helper, and the form derives both
// the billing section and the required asterisk from the same conditionalFields
// data — so pin the exact set here rather than letting it drift silently.
describe("requiresBillingEmail", () => {
  it("covers the preferences that pay through accounts payable", () => {
    expect(requiresBillingEmail("REQUEST_INVOICE")).toBe(true)
    expect(requiresBillingEmail("PAY_BY_CHECK")).toBe(true)
    expect(requiresBillingEmail("NEED_W9_VENDOR_SETUP")).toBe(true)
  })

  it("excludes every other preference", () => {
    const others: PaymentPreference[] = ["PAY_NOW_CARD", "PAY_NOW_ACH", "TALK_FIRST", "IN_KIND", "CUSTOM_DISCUSSION"]
    for (const p of others) expect(requiresBillingEmail(p)).toBe(false)
  })
})
