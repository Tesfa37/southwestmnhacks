import { TIER_SLUGS } from "@/lib/sponsors/tiers"

/**
 * Destination for a sponsor CTA: the on-site guided intake at /sponsor/start,
 * with the tier preselected via `?tier=`. One function so every sponsor button
 * points at the same flow.
 */
export function sponsorInquiryUrl(slug?: string): string {
  return slug && (TIER_SLUGS as string[]).includes(slug) ? `/sponsor/start?tier=${slug}` : "/sponsor/start"
}
