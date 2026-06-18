// Sponsor lifecycle status + the Stripe metadata key names. Status lives on the
// Stripe Customer's metadata (Stripe is the money source of truth) and is mirrored
// onto the Notion row (the friendly pipeline tracker).

export type SponsorStatus =
  | "FORM_STARTED"
  | "FORM_SUBMITTED"
  | "CHECKOUT_CREATED"
  | "PAYMENT_PENDING"
  | "PAID"
  | "INVOICE_REQUESTED"
  | "INVOICE_DRAFTED"
  | "INVOICE_SENT"
  | "INVOICE_PAID"
  | "CHECK_PAYMENT_REQUESTED"
  | "W9_VENDOR_SETUP_REQUESTED"
  | "IN_KIND_PENDING"
  | "MANUAL_FOLLOW_UP"
  | "CANCELLED"
  | "PAYMENT_FAILED"
  | "REFUNDED"

export const SPONSOR_STATUSES: SponsorStatus[] = [
  "FORM_STARTED",
  "FORM_SUBMITTED",
  "CHECKOUT_CREATED",
  "PAYMENT_PENDING",
  "PAID",
  "INVOICE_REQUESTED",
  "INVOICE_DRAFTED",
  "INVOICE_SENT",
  "INVOICE_PAID",
  "CHECK_PAYMENT_REQUESTED",
  "W9_VENDOR_SETUP_REQUESTED",
  "IN_KIND_PENDING",
  "MANUAL_FOLLOW_UP",
  "CANCELLED",
  "PAYMENT_FAILED",
  "REFUNDED",
]

// Fully terminal — never transition away (a replayed/late webhook must not resurrect).
const FROZEN = new Set<SponsorStatus>(["REFUNDED", "CANCELLED"])
// Paid — only a refund may change it; a late "pending"/"failed" must not downgrade it.
const PAID_TERMINAL = new Set<SponsorStatus>(["PAID", "INVOICE_PAID"])

/**
 * Whether a status change is allowed. Keeps webhook handling idempotent and
 * monotonic without a separate event store: re-applying the same status is a
 * no-op, and out-of-order events can't downgrade a settled record.
 */
export function canTransition(from: SponsorStatus | undefined, to: SponsorStatus): boolean {
  if (!from) return true
  if (from === to) return true
  if (FROZEN.has(from)) return false
  if (PAID_TERMINAL.has(from)) return to === "REFUNDED"
  return true
}

// Stripe metadata keys. Single source of truth so the writer (create route) and
// the reader (webhook) never drift. Stripe metadata values are strings (<=500
// chars, <=50 keys per object) — keep entries compact and free of secrets.
export const META = {
  recordId: "sponsorRecordId",
  status: "status",
  eventName: "eventName",
  organizationName: "organizationName",
  publicSponsorName: "publicSponsorName",
  tier: "sponsorshipTier",
  amountCents: "amountCents",
  contactName: "contactName",
  contactEmail: "contactEmail",
  contactPhone: "contactPhone",
  paymentPreference: "paymentPreference",
  billingEmail: "billingEmail",
  purchaseOrderNumber: "purchaseOrderNumber",
  needsW9: "needsW9",
  wantsBooth: "wantsBooth",
  wantsMentorOrJudge: "wantsMentorOrJudge",
  interestedInChallengePrize: "interestedInChallengePrize",
  logoUrl: "logoUrl",
  notionPageId: "notionPageId",
  checkoutSessionId: "stripeCheckoutSessionId",
  paymentIntentId: "stripePaymentIntentId",
  invoiceId: "stripeInvoiceId",
  invoiceUrl: "stripeInvoiceUrl",
  lastEventId: "lastStripeEventId",
  createdAt: "createdAt",
} as const

export type MetaKey = (typeof META)[keyof typeof META]
