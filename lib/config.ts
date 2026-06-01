// Single source of truth for the current event mode, links, and publication gates.
//
// Two independent approvals are pending. Each is gated behind its own constant,
// default false, so it can be turned on from exactly one place when it lands.

/**
 * Gate 1, MLH Member Event application approval.
 * While false, no MLH name, logo, badge, or claim may render anywhere on the
 * public site. Flipping to true reveals the header badge, the MLH Code of
 * Conduct attribution, the MLH data-sharing line in the privacy policy, and any
 * MLH positioning claim. The "first MLH Member Event outside the Twin Cities
 * metro" claim must still be verified against MLH's current Minnesota event list
 * before it is published, even after this flips on.
 */
export const MLH_APPROVED = false

/**
 * Gate 2, SMSU participant-document package approval.
 * While false, the public Code of Conduct page shows a placeholder and no links
 * to the Adult Waiver, Minor Consent, or Code of Conduct documents render.
 * Flipping to true publishes the own-branded Code of Conduct and the approved
 * participant documents.
 */
export const SMSU_DOCS_APPROVED = false

// Event identity
export const EVENT_NAME = "Southwest MN Hacks: Fall 2026"
export const EVENT_DATES = "September 12 to 13, 2026"
export const REGISTRATION_DEADLINE = "September 8, 2026"
export const VENUE = "Southwest Minnesota State University, Marshall, MN"

// Countdown targets as fixed instants (Central Time, CDT = UTC-5 in September).
// The home page countdown moves through these: closes -> begins -> underway -> ended.
export const REGISTRATION_CLOSE_AT = "2026-09-08T23:59:59-05:00"
export const EVENT_START_AT = "2026-09-12T08:00:00-05:00"
export const EVENT_END_AT = "2026-09-13T19:30:00-05:00"

// Live event assets
export const REGISTRATION_FORM_URL = "https://forms.gle/tR3nteuQ3CgyHAmW6"
export const DEVPOST_FALL_URL = "https://southwest-mn-hacks.devpost.com/"
export const DISCORD_INVITE_URL = "https://discord.gg/3gsH2DTx"
export const CONSENT_FORM_URL = "https://form.jotform.com/261474955259066"

// Discord is hidden for now. Flip to true to show the hero button and the
// footer link again. The invite URL above stays wired up either way.
export const DISCORD_ENABLED = false

// Contact
export const SUPPORT_EMAIL = "support@southwestmnhacks.org"

// Host framing. Used wherever the host/partner is described. No SMSU sponsorship
// implication, no SMSU or Mustangs logo.
export const PARTNERSHIP_LINE =
  "Run by the Southwest MN Hacks nonprofit in partnership with Aulden, hosted at SMSU."
