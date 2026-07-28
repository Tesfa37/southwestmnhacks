// Zod schema for the sponsor intake payload. This is the AUTHORITATIVE validation
// (runs server-side in /api/sponsors/create); the client mirrors it for inline
// errors. Conditional requirements per payment preference are enforced via
// superRefine so shared fields stay optional at the base.

import { z } from "zod"
import { TIER_SLUGS, CUSTOM_MIN_CENTS, formatCents } from "./tiers"
import { PAYMENT_PREFERENCE_VALUES } from "./payment-preferences"

// Optional free-text -> undefined when blank.
const optionalText = z.string().trim().max(1000).optional().or(z.literal("")).transform((v) => (v ? v : undefined))
// Optional URL that also accepts an empty string.
const optionalUrl = z.string().trim().url().or(z.literal("")).optional().transform((v) => (v ? v : undefined))
// Optional email that also accepts an empty string.
const optionalEmail = z.string().trim().email().or(z.literal("")).optional().transform((v) => (v ? v : undefined))

export const sponsorIntakeSchema = z
  .object({
    tier: z.enum(TIER_SLUGS as [string, ...string[]]),
    paymentPreference: z.enum(PAYMENT_PREFERENCE_VALUES),

    organizationName: z.string().trim().min(1, "Organization name is required.").max(200),
    publicSponsorName: optionalText,

    contactName: z.string().trim().min(1, "Contact name is required.").max(200),
    contactEmail: z.string().trim().email("Enter a valid email address.").max(320),
    contactPhone: optionalText,
    organizationWebsite: optionalUrl,
    logoUrl: optionalUrl,

    // Billing (revealed for invoice / check / W-9 preferences).
    billingEmail: optionalEmail,
    billingContactName: optionalText,
    billingAddress: optionalText,
    city: optionalText,
    state: optionalText,
    zip: optionalText,
    country: z.string().trim().max(100).optional().default("US"),
    purchaseOrderNumber: optionalText,
    needsW9: z.boolean().optional().default(false),

    // Engagement interests.
    wantsBooth: z.boolean().optional().default(false),
    wantsMentorOrJudge: z.boolean().optional().default(false),
    interestedInChallengePrize: z.boolean().optional().default(false),

    // Custom amount (dollars from the form -> cents here). Only meaningful for the
    // custom tier; ignored for fixed tiers by resolveAmountCents().
    customAmountCents: z.number().int().positive().optional(),

    // In-kind description.
    inKindDescription: optionalText,

    notes: optionalText,
    sourcePage: optionalText,

    // Consent checkbox — must be checked. (Label differs by payment preference:
    // authorization for committing preferences, contact consent for talk-first.)
    consentToBeContacted: z.literal(true, {
      message: "Please confirm to continue.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.paymentPreference === "REQUEST_INVOICE" || data.paymentPreference === "PAY_BY_CHECK") {
      if (!data.billingEmail) {
        ctx.addIssue({
          code: "custom",
          path: ["billingEmail"],
          message: "A billing email is required so we can send the invoice.",
        })
      }
    }

    if (data.paymentPreference === "IN_KIND" || data.tier === "in_kind") {
      if (!data.inKindDescription) {
        ctx.addIssue({
          code: "custom",
          path: ["inKindDescription"],
          message: "Please describe the goods or services you'd like to contribute.",
        })
      }
    }

    // For a custom tier paid now, an amount at/above the floor is required.
    const isPayNow = data.paymentPreference === "PAY_NOW_CARD" || data.paymentPreference === "PAY_NOW_ACH"
    if (data.tier === "custom" && isPayNow) {
      if (!data.customAmountCents || data.customAmountCents < CUSTOM_MIN_CENTS) {
        ctx.addIssue({
          code: "custom",
          path: ["customAmountCents"],
          message: `Enter an amount of at least ${formatCents(CUSTOM_MIN_CENTS)} to pay now, or choose "Discuss a custom amount".`,
        })
      }
    }
  })

export type SponsorIntakeInput = z.infer<typeof sponsorIntakeSchema>

/** Flatten Zod errors into a { field: message } map for the client. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_form"
    if (!out[key]) out[key] = issue.message
  }
  return out
}
