import { SPONSOR_EMAIL, SPONSOR_INTAKE_FORM_URL } from "@/lib/config"

// True once a sponsor intake form URL is configured. Used to switch CTAs from
// the mailto fallback to the form, and to decide whether links open externally.
export const hasSponsorIntake = SPONSOR_INTAKE_FORM_URL.length > 0

/**
 * The destination for a sponsor CTA. With an intake form configured, returns
 * the form URL with the tier prefilled (`?tier=Gold`); otherwise a mailto with
 * a prefilled subject. One function so flipping SPONSOR_INTAKE_FORM_URL
 * rewires every sponsor button at once.
 */
export function sponsorInquiryUrl(tier?: { name: string; price?: string }): string {
  if (hasSponsorIntake) {
    const url = new URL(SPONSOR_INTAKE_FORM_URL)
    if (tier) url.searchParams.set("tier", tier.name)
    return url.toString()
  }
  const subject = tier
    ? `Sponsorship inquiry: ${tier.name}${tier.price ? ` (${tier.price})` : ""}`
    : "Sponsorship inquiry"
  return `mailto:${SPONSOR_EMAIL}?subject=${encodeURIComponent(subject)}`
}
