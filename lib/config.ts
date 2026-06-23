// Single source of truth for the current event mode, links, and publication gates.

// Event identity
export const EVENT_NAME = "Southwest MN Hacks: Fall 2026"
export const EVENT_DATES = "September 12 to 13, 2026"
export const REGISTRATION_DEADLINE = "September 8, 2026"
export const VENUE = "Southwest Minnesota State University, Marshall, MN"

// Google Maps deep link to the venue (Upper Conference Center, SMSU).
export const VENUE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Upper+Conference+Center+Southwest+Minnesota+State+University+Marshall+MN"

// Countdown targets as fixed instants (Central Time, CDT = UTC-5 in September).
// The home page countdown moves through these: closes -> begins -> underway -> ended.
export const REGISTRATION_CLOSE_AT = "2026-09-08T23:59:59-05:00"
export const EVENT_START_AT = "2026-09-12T08:00:00-05:00"
export const EVENT_END_AT = "2026-09-13T10:00:00-05:00"

// Live event assets
export const REGISTRATION_FORM_URL = "https://forms.gle/tR3nteuQ3CgyHAmW6"
export const DEVPOST_FALL_URL = "https://southwest-mn-hacks.devpost.com/"
export const DISCORD_INVITE_URL = "https://discord.gg/3gsH2DTx"
export const CONSENT_FORM_URL = "https://form.jotform.com/261474955259066"

// Finalized participant documents (PDFs live in /public/docs/). The Code of
// Conduct route /code-of-conduct is the canonical CoC link reused everywhere
// (the registration/consent forms link their CoC checkbox to it).
export const CODE_OF_CONDUCT_PDF = "/docs/code-of-conduct.pdf"
export const ADULT_WAIVER_PDF = "/docs/adult-waiver.pdf"
export const MINOR_CONSENT_PDF = "/docs/minor-consent.pdf"
// Freshness stamp shown near the document links so a stale cached copy can't
// masquerade as current. Bump when the documents are revised.
export const DOCS_UPDATED = "Updated June 2026"

// Public Schwan's Company social posts about the first (March 2026) event. Used
// for restrained past-event proof links and the homepage Event schema `sameAs`.
export const SCHWANS_LINKEDIN_URL =
  "https://www.linkedin.com/posts/schwans-company_giving-back-means-showing-up-and-our-is-activity-7449533485758832640-ZW8_/"
export const SCHWANS_INSTAGRAM_URL = "https://www.instagram.com/p/DXFUPQAiWo3/"

// Discord is hidden for now. Flip to true to show the hero button and the
// footer link again. The invite URL above stays wired up either way.
export const DISCORD_ENABLED = false

// Contact
export const SUPPORT_EMAIL = "support@southwestmnhacks.org"
export const SPONSOR_EMAIL = "sponsors@southwestmnhacks.org"
export const PRIVACY_EMAIL = "privacy@southwestmnhacks.org"
export const CONDUCT_EMAIL = "conduct@southwestmnhacks.org"

// Legal entity + mailing address, used on the Terms, Refund, and Contact pages and
// the Stripe invoice remit-to. Fill MAILING_ADDRESS with the real remit-to address;
// while empty, the pages omit the address line rather than showing a placeholder.
export const LEGAL_ENTITY_NAME = "Southwest MN Hacks"
export const GOVERNING_STATE = "Minnesota"
export const MAILING_ADDRESS = "1303 Birch St. Marshall, MN, 56258"

/**
 * Sponsor intake form (Jotform). While empty, the tier and "Ready to sponsor?"
 * buttons fall back to the SPONSOR_EMAIL mailto. When set, those buttons link
 * here with the chosen tier prefilled via `?tier=`. To activate: build the
 * form, set the tier field's Unique Name to "tier", then paste the form URL
 * here. See docs/sponsor-payments.md.
 */
export const SPONSOR_INTAKE_FORM_URL = ""

// Host framing. Used wherever the host/partner is described. No SMSU sponsorship
// implication, no SMSU or Mustangs logo.
export const PARTNERSHIP_LINE =
  "Run by the Southwest MN Hacks nonprofit in partnership with Aulden, hosted at SMSU."
