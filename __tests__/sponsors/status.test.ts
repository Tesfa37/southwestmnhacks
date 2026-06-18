import { describe, it, expect } from "vitest"
import { canTransition } from "../../lib/sponsors/status"

// canTransition is what makes the webhook idempotent + monotonic without a
// separate event store.
describe("canTransition", () => {
  it("allows re-applying the same status (idempotent replay)", () => {
    expect(canTransition("PAID", "PAID")).toBe(true)
    expect(canTransition("INVOICE_PAID", "INVOICE_PAID")).toBe(true)
  })

  it("never downgrades a paid record from a late/out-of-order event", () => {
    expect(canTransition("PAID", "PAYMENT_PENDING")).toBe(false)
    expect(canTransition("PAID", "PAYMENT_FAILED")).toBe(false)
    expect(canTransition("INVOICE_PAID", "INVOICE_SENT")).toBe(false)
  })

  it("allows escalating a paid record to refunded", () => {
    expect(canTransition("PAID", "REFUNDED")).toBe(true)
    expect(canTransition("INVOICE_PAID", "REFUNDED")).toBe(true)
  })

  it("freezes refunded and cancelled records", () => {
    expect(canTransition("REFUNDED", "PAID")).toBe(false)
    expect(canTransition("CANCELLED", "INVOICE_SENT")).toBe(false)
  })

  it("allows normal forward transitions", () => {
    expect(canTransition(undefined, "FORM_SUBMITTED")).toBe(true)
    expect(canTransition("CHECKOUT_CREATED", "PAID")).toBe(true)
    expect(canTransition("PAYMENT_PENDING", "PAID")).toBe(true)
    expect(canTransition("INVOICE_SENT", "INVOICE_PAID")).toBe(true)
  })
})
