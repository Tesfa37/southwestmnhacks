// Server-authoritative sponsorship tiers. This is the SINGLE source of truth for
// amounts AND benefits: the client never picks a price for a fixed tier, and every
// surface (the /sponsor cards + compare table, the /sponsor/start summary, emails,
// and invoices) renders from the data here so the offer can never drift apart.

import { SPONSOR_DEADLINE_SHORT } from "../config"

export type Tier = "bronze" | "silver" | "gold" | "platinum" | "custom" | "in_kind"

export interface TierConfig {
  slug: Tier
  /** Clean name used everywhere (cards, emails, invoices, Notion). */
  label: string
  tagline: string
  /** Fixed price in cents, or null for tiers where the amount isn't fixed (custom / in-kind). */
  amountCents: number | null
  /** Gold/Platinum: nudge the sponsor toward invoice/ACH in the UI (card still allowed). */
  recommendsInvoice: boolean
  /**
   * This tier's OWN new benefits (not cumulative). Cards/summary prepend
   * "Everything in <lower tier>" automatically; the compare table turns each entry
   * into a row whose lowest-included tier is the one that owns it.
   */
  benefits: string[]
  /** Sponsor representatives included, or null when the tier doesn't offer a count. */
  repCount: number | null
  /**
   * Which "get involved" options this tier actually includes. Drives the form's
   * engagement checkboxes so we never ask a tier about a perk it doesn't get
   * (e.g. Bronze has no booth). Custom/in-kind are negotiable, so all true.
   */
  engagement: EngagementCapabilities
}

export interface EngagementCapabilities {
  booth: boolean
  mentorJudge: boolean
  challenge: boolean
}

export const TIERS: Record<Tier, TierConfig> = {
  bronze: {
    slug: "bronze",
    label: "Bronze",
    tagline: "Community Supporter",
    amountCents: 50000,
    recommendsInvoice: false,
    benefits: ["Logo on the event website", "Recognition during opening remarks"],
    repCount: null,
    engagement: { booth: false, mentorJudge: false, challenge: false },
  },
  silver: {
    slug: "silver",
    label: "Silver",
    tagline: "Event Presence Sponsor",
    amountCents: 100000,
    recommendsInvoice: false,
    benefits: [`Logo on the event t-shirt (commit by ${SPONSOR_DEADLINE_SHORT})`, "Sponsor booth or table"],
    repCount: 2,
    engagement: { booth: true, mentorJudge: false, challenge: false },
  },
  gold: {
    slug: "gold",
    label: "Gold",
    tagline: "Student Engagement Sponsor",
    amountCents: 200000,
    recommendsInvoice: true,
    benefits: [
      "Reserved table at the student networking meal",
      "Short speaking slot",
      "Mentor teams onsite",
      `Sponsor a challenge prompt or prize category (commit by ${SPONSOR_DEADLINE_SHORT})`,
    ],
    repCount: 4,
    engagement: { booth: true, mentorJudge: true, challenge: true },
  },
  platinum: {
    slug: "platinum",
    label: "Platinum",
    tagline: "Premier Innovation Partner",
    amountCents: 500000,
    recommendsInvoice: true,
    benefits: [
      "Named sponsor recognition",
      "Priority booth and table placement",
      "Seat on the judging panel",
      "Priority access to the opt-in student interest list",
    ],
    repCount: 8,
    engagement: { booth: true, mentorJudge: true, challenge: true },
  },
  custom: {
    slug: "custom",
    label: "Custom",
    tagline: "Choose your amount",
    amountCents: null,
    recommendsInvoice: true,
    benefits: ["Recognition matched to your level of support"],
    repCount: null,
    engagement: { booth: true, mentorJudge: true, challenge: true },
  },
  in_kind: {
    slug: "in_kind",
    label: "In-Kind",
    tagline: "Provide goods or services",
    amountCents: null,
    recommendsInvoice: false,
    benefits: [
      "Provide meals, prizes, t-shirts, snacks, cloud or software credits, or equipment",
      "Recognition matched to the value contributed",
    ],
    repCount: null,
    engagement: { booth: true, mentorJudge: true, challenge: true },
  },
}

/** The cash tiers, lowest to highest, used for "Everything in X" chaining and the compare table. */
export const CASH_TIERS = ["bronze", "silver", "gold", "platinum"] as const
export type CashTier = (typeof CASH_TIERS)[number]

/**
 * The "get involved" options, in display order, with the lowest cash tier that
 * includes each. Drives both the form checkboxes (via TIERS[tier].engagement)
 * and the upsell note shown to tiers that don't include an option yet.
 */
export const ENGAGEMENT_OPTIONS = [
  { flag: "booth", label: "a booth or table", checkbox: "We'd like a booth or table", unlockTier: "Silver" },
  {
    flag: "mentorJudge",
    label: "mentoring or judging",
    checkbox: "We're interested in mentoring or judging (subject to event guidelines)",
    unlockTier: "Gold",
  },
  {
    flag: "challenge",
    label: "a challenge prompt or prize category",
    checkbox: "We'd like to offer a challenge prompt or prize category",
    unlockTier: "Gold",
  },
] as const satisfies ReadonlyArray<{
  flag: keyof EngagementCapabilities
  label: string
  checkbox: string
  unlockTier: string
}>

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

/** Display price for a card/summary: the fixed amount, or "Flexible" when there's none. */
export function tierPriceLabel(tier: Tier): string {
  const cents = TIERS[tier].amountCents
  return cents != null ? formatCents(cents) : "Flexible"
}

/**
 * Benefit lines for a tier card or summary: "Everything in <lower>" (cash tiers
 * above bronze), then this tier's own benefits, then the rep count when offered.
 */
export function tierBenefitLines(tier: Tier): string[] {
  const cfg = TIERS[tier]
  const lines: string[] = []
  const idx = (CASH_TIERS as readonly Tier[]).indexOf(tier)
  if (idx > 0) lines.push(`Everything in ${TIERS[CASH_TIERS[idx - 1]].label}`)
  lines.push(...cfg.benefits)
  if (cfg.repCount != null) lines.push(`${cfg.repCount} sponsor representatives`)
  return lines
}

export interface CompareRow {
  label: string
  /** Lowest cash tier that includes this row (check/cross rows). */
  minTier?: CashTier
  /** Per-tier literal values, aligned to CASH_TIERS (e.g. price, rep counts). */
  values?: string[]
}

/** Compare-table rows for the cash tiers, fully derived from the data above. */
export function tierCompareRows(): CompareRow[] {
  const rows: CompareRow[] = [
    { label: "Price", values: CASH_TIERS.map((t) => formatCents(TIERS[t].amountCents as number)) },
  ]
  for (const t of CASH_TIERS) {
    for (const benefit of TIERS[t].benefits) rows.push({ label: benefit, minTier: t })
  }
  rows.push({
    label: "Sponsor representatives",
    // Empty string renders the same "not included" marker as the check/cross rows.
    values: CASH_TIERS.map((t) => (TIERS[t].repCount != null ? String(TIERS[t].repCount) : "")),
  })
  return rows
}

/** Whether `tier` is at or above `minTier` in the cash ladder. */
export function tierIncludes(tier: CashTier, minTier: CashTier): boolean {
  return CASH_TIERS.indexOf(tier) >= CASH_TIERS.indexOf(minTier)
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
    // Fixed tier: never trust the client amount.
    return { amountCents: config.amountCents, needsManualReview: false }
  }

  if (tier === "in_kind") {
    return { amountCents: null, needsManualReview: false }
  }

  // Custom tier.
  const amount = typeof clientAmountCents === "number" ? Math.round(clientAmountCents) : null
  if (amount === null || Number.isNaN(amount)) {
    // No amount provided: treat as a discussion / manual-review lead, not a charge.
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
