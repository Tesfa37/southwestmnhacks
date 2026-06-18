// Server-authoritative sponsorship tiers. This is the SINGLE source of truth for
// amounts — the client never gets to pick a price for a fixed tier. The display
// prices in `components/sponsor-tiers.tsx` must mirror the amounts here.

export type Tier = "bronze" | "silver" | "gold" | "platinum" | "custom" | "in_kind"

export interface TierConfig {
  slug: Tier
  label: string
  tagline: string
  /** Fixed price in cents, or null for tiers where the amount isn't fixed (custom / in-kind). */
  amountCents: number | null
  /** Gold/Platinum: nudge the sponsor toward invoice/ACH in the UI (card still allowed). */
  recommendsInvoice: boolean
  /** A short benefit summary shown on the /sponsor/start tier card. */
  keyBenefits: string[]
}

export const TIERS: Record<Tier, TierConfig> = {
  bronze: {
    slug: "bronze",
    label: "Bronze Supporter",
    tagline: "Community Supporter",
    amountCents: 50000,
    recommendsInvoice: false,
    keyBenefits: ["Logo on the event website", "Recognition during opening remarks"],
  },
  silver: {
    slug: "silver",
    label: "Silver Partner",
    tagline: "Event Presence Sponsor",
    amountCents: 100000,
    recommendsInvoice: false,
    keyBenefits: ["Everything in Bronze", "Logo on the event t-shirt", "A sponsor booth or table"],
  },
  gold: {
    slug: "gold",
    label: "Gold Partner",
    tagline: "Student Engagement Sponsor",
    amountCents: 200000,
    recommendsInvoice: true,
    keyBenefits: [
      "Everything in Silver",
      "Reserved table at the student networking meal",
      "Option to mentor teams or offer a challenge prompt",
    ],
  },
  platinum: {
    slug: "platinum",
    label: "Platinum / Premier Innovation Partner",
    tagline: "Premier Innovation Partner",
    amountCents: 500000,
    recommendsInvoice: true,
    keyBenefits: [
      "Everything in Gold",
      "Named sponsor recognition and a seat on the judging panel",
      "Priority access to the opt-in student interest list",
    ],
  },
  custom: {
    slug: "custom",
    label: "Custom Sponsorship",
    tagline: "Choose your amount",
    amountCents: null,
    recommendsInvoice: true,
    keyBenefits: ["Recognition matched to the level of support"],
  },
  in_kind: {
    slug: "in_kind",
    label: "In-Kind Sponsor",
    tagline: "Provide goods or services",
    amountCents: null,
    recommendsInvoice: false,
    keyBenefits: ["Meals, prizes, t-shirts, snacks, cloud/software credits, or equipment", "Recognition matched to the value contributed"],
  },
}

/** Custom sponsorships below this are not accepted as automatic payments. */
export const CUSTOM_MIN_CENTS = 25000
/** Custom amounts above this route to manual review instead of an automatic charge. */
export const MANUAL_REVIEW_OVER_CENTS = 500000

export const TIER_SLUGS = Object.keys(TIERS) as Tier[]

export function tierFromSlug(slug: string | null | undefined): Tier | null {
  if (!slug) return null
  const key = slug.toLowerCase()
  return (TIER_SLUGS as string[]).includes(key) ? (key as Tier) : null
}

export function tierLabel(tier: Tier): string {
  return TIERS[tier].label
}

/** Format cents as a plain USD string, e.g. 50000 -> "$500". */
export function formatCents(cents: number): string {
  const dollars = cents / 100
  return `$${dollars.toLocaleString("en-US", { minimumFractionDigits: dollars % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`
}

export interface ResolvedAmount {
  amountCents: number | null
  needsManualReview: boolean
  error?: string
}

/**
 * The authoritative amount for a submission. For fixed tiers the client-supplied
 * amount is IGNORED entirely. For custom, validate against the floor and flag the
 * ceiling for manual review. In-kind has no amount.
 */
export function resolveAmountCents(tier: Tier, clientAmountCents?: number | null): ResolvedAmount {
  const config = TIERS[tier]

  if (config.amountCents !== null) {
    // Fixed tier — never trust the client amount.
    return { amountCents: config.amountCents, needsManualReview: false }
  }

  if (tier === "in_kind") {
    return { amountCents: null, needsManualReview: false }
  }

  // Custom tier.
  const amount = typeof clientAmountCents === "number" ? Math.round(clientAmountCents) : null
  if (amount === null || Number.isNaN(amount)) {
    // No amount provided — treat as a discussion / manual-review lead, not a charge.
    return { amountCents: null, needsManualReview: true }
  }
  if (amount < CUSTOM_MIN_CENTS) {
    return { amountCents: amount, needsManualReview: false, error: `Custom sponsorships start at ${formatCents(CUSTOM_MIN_CENTS)}.` }
  }
  if (amount > MANUAL_REVIEW_OVER_CENTS) {
    return { amountCents: amount, needsManualReview: true }
  }
  return { amountCents: amount, needsManualReview: false }
}
