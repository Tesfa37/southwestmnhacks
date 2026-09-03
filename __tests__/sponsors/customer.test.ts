import { describe, it, expect, vi, beforeEach } from "vitest"
import type Stripe from "stripe"
import { sponsorIntakeSchema } from "../../lib/sponsors/schema"
import type { CustomerComputed } from "../../lib/sponsors/customer"

// Hoisted so the vi.mock factory below (which vitest lifts above the imports)
// can close over it without hitting the temporal dead zone.
const { customers } = vi.hoisted(() => ({
  customers: { list: vi.fn(), create: vi.fn(), update: vi.fn() },
}))

vi.mock("@/lib/stripe", () => ({
  getStripe: () => ({ customers }) as unknown as Stripe,
}))

const { upsertSponsorCustomer } = await import("../../lib/sponsors/customer")

const base = {
  tier: "bronze",
  paymentPreference: "REQUEST_INVOICE",
  organizationName: "Acme Bank",
  contactName: "Pat Lee",
  contactEmail: "pat@acme.com",
  billingEmail: "ap@acme.com",
  consentToBeContacted: true,
}

// Parse through the real schema so the fixture matches SponsorIntakeInput exactly
// (defaults applied, blank strings collapsed to undefined).
function intake(overrides: Record<string, unknown> = {}) {
  return sponsorIntakeSchema.parse({ ...base, ...overrides })
}

const computed: CustomerComputed = { amountCents: 50000, status: "INVOICE_REQUESTED" }

beforeEach(() => {
  vi.clearAllMocks()
  customers.list.mockResolvedValue({ data: [] })
  customers.create.mockResolvedValue({ id: "cus_new", metadata: {} })
  customers.update.mockResolvedValue({ id: "cus_existing", metadata: {} })
})

// Stripe emails the hosted invoice to customer.email and nowhere else, so this is
// the field that decides which inbox an invoice actually lands in.
describe("upsertSponsorCustomer (which address Stripe bills)", () => {
  it("uses the billing email when the sponsor gives one", async () => {
    await upsertSponsorCustomer(intake(), computed)

    expect(customers.create).toHaveBeenCalledWith(
      expect.objectContaining({ email: "ap@acme.com" }),
    )
  })

  it("still records the contact email alongside the billing one in metadata", async () => {
    await upsertSponsorCustomer(intake(), computed)

    const [{ metadata }] = customers.create.mock.calls[0]
    expect(metadata.contactEmail).toBe("pat@acme.com")
    expect(metadata.billingEmail).toBe("ap@acme.com")
  })

  it("falls back to the contact email when no billing email is given", async () => {
    await upsertSponsorCustomer(
      intake({ paymentPreference: "TALK_FIRST", billingEmail: undefined }),
      computed,
    )

    expect(customers.create).toHaveBeenCalledWith(
      expect.objectContaining({ email: "pat@acme.com" }),
    )
    // No second lookup when the two addresses are the same.
    expect(customers.list).toHaveBeenCalledTimes(1)
  })

  it("moves an existing customer's email to the billing address", async () => {
    customers.list.mockResolvedValue({ data: [{ id: "cus_1", metadata: {} }] })

    await upsertSponsorCustomer(intake(), computed)

    expect(customers.create).not.toHaveBeenCalled()
    expect(customers.update).toHaveBeenCalledWith(
      "cus_1",
      expect.objectContaining({ email: "ap@acme.com" }),
    )
  })

  it("finds a record stored under the contact email rather than duplicating it", async () => {
    // A sponsor who first submitted without a billing email, then added one — so
    // the record on file is still stored under the contact address.
    customers.list
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({ data: [{ id: "cus_1", email: "pat@acme.com", metadata: {} }] })

    await upsertSponsorCustomer(intake(), computed)

    expect(customers.list).toHaveBeenNthCalledWith(1, { email: "ap@acme.com", limit: 1 })
    expect(customers.list).toHaveBeenNthCalledWith(2, { email: "pat@acme.com", limit: 1 })
    expect(customers.create).not.toHaveBeenCalled()
    // The found record still stores the contact address; the update migrates it
    // onto the billing one, so the next submission's first lookup hits directly.
    expect(customers.update).toHaveBeenCalledWith(
      "cus_1",
      expect.objectContaining({ email: "ap@acme.com" }),
    )
  })
})
