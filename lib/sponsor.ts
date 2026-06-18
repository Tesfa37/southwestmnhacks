import { TIER_SLUGS } from "@/lib/sponsors/tiers"

// The native sponsor flow is always on: CTAs link to the on-site intake at
// /sponsor/start with the chosen tier preselected. (Kept as a constant so the
// existing call sites that branch on it keep compiling.)
export const hasSponsorIntake = true

// Map a tier card's display name (e.g. "In-Kind") to its tier slug ("in_kind").
function slugForName(name: string): string {
  const slug = name.toLowerCase().replace(/-/g, "_")
  return (TIER_SLUGS as string[]).includes(slug) ? slug : ""
}

/**
 * Destination for a sponsor CTA: the on-site guided intake at /sponsor/start,
 * with the tier preselected via `?tier=`. One function so every sponsor button
 * points at the same flow.
 */
export function sponsorInquiryUrl(tier?: { name: string; price?: string }): string {
  const slug = tier ? slugForName(tier.name) : ""
  return slug ? `/sponsor/start?tier=${slug}` : "/sponsor/start"
}
