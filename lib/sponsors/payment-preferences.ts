// How a sponsor wants to pay. This is a routing signal, not a charge; it decides
// which rail the submission takes (Checkout, Invoice, or record-only follow-up).

export type PaymentPreference =
  | "PAY_NOW_CARD"
  | "PAY_NOW_ACH"
  | "REQUEST_INVOICE"
  | "PAY_BY_CHECK"
  | "NEED_W9_VENDOR_SETUP"
  | "TALK_FIRST"
  | "IN_KIND"
  | "CUSTOM_DISCUSSION"

// Extra form sections a preference reveals.
export type ConditionalField = "billing" | "check" | "w9" | "inKind" | "custom"

export interface PreferenceConfig {
  value: PaymentPreference
  label: string
  help: string
  conditionalFields: ConditionalField[]
}

export const PAYMENT_PREFERENCES: Record<PaymentPreference, PreferenceConfig> = {
  PAY_NOW_CARD: {
    value: "PAY_NOW_CARD",
    label: "Pay now by card",
    help: "Checkout securely with a credit or debit card. A receipt is emailed automatically.",
    conditionalFields: [],
  },
  PAY_NOW_ACH: {
    value: "PAY_NOW_ACH",
    label: "Pay now by bank transfer (ACH)",
    help: "Pay directly from a U.S. bank account, with lower fees than card. Settles in a few business days.",
    conditionalFields: [],
  },
  REQUEST_INVOICE: {
    value: "REQUEST_INVOICE",
    label: "Send me an invoice",
    help: "We'll send a hosted invoice payable by card or bank transfer on net terms.",
    conditionalFields: ["billing"],
  },
  PAY_BY_CHECK: {
    value: "PAY_BY_CHECK",
    label: "Pay by check",
    help: "We'll send remit-to instructions and an invoice for your records.",
    conditionalFields: ["billing", "check"],
  },
  NEED_W9_VENDOR_SETUP: {
    value: "NEED_W9_VENDOR_SETUP",
    label: "We need a W-9 / vendor setup first",
    help: "Tell us what your accounts-payable team needs and we'll get you set up as a vendor.",
    conditionalFields: ["billing", "w9"],
  },
  TALK_FIRST: {
    value: "TALK_FIRST",
    label: "I'd like to talk first",
    help: "We'll reach out to answer questions before anything is finalized.",
    conditionalFields: [],
  },
  IN_KIND: {
    value: "IN_KIND",
    label: "In-kind (goods or services)",
    help: "Contribute meals, prizes, credits, or equipment instead of cash.",
    conditionalFields: ["inKind"],
  },
  CUSTOM_DISCUSSION: {
    value: "CUSTOM_DISCUSSION",
    label: "Discuss a custom amount",
    help: "Tell us what you have in mind and we'll follow up.",
    conditionalFields: ["custom"],
  },
}

export const PAYMENT_PREFERENCE_VALUES = Object.keys(PAYMENT_PREFERENCES) as [
  PaymentPreference,
  ...PaymentPreference[],
]

export function isPayNow(p: PaymentPreference): boolean {
  return p === "PAY_NOW_CARD" || p === "PAY_NOW_ACH"
}
