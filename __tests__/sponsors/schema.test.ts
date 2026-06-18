import { describe, it, expect } from "vitest"
import { sponsorIntakeSchema, fieldErrors } from "../../lib/sponsors/schema"

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

  it("requires a billing email for invoice / check", () => {
    const inv = sponsorIntakeSchema.safeParse({ ...base, paymentPreference: "REQUEST_INVOICE" })
    expect(inv.success).toBe(false)
    if (!inv.success) expect(fieldErrors(inv.error).billingEmail).toBeTruthy()

    const ok = sponsorIntakeSchema.safeParse({ ...base, paymentPreference: "REQUEST_INVOICE", billingEmail: "ap@acme.com" })
    expect(ok.success).toBe(true)
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
