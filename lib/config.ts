// Single source of truth for the current event mode, links, and publication gates.

// Event identity
export const EVENT_NAME = "Southwest MN Hacks: Fall 2026"
export const EVENT_DATES = "September 12 to 13, 2026"
export const VENUE = "Southwest Minnesota State University, Marshall, MN"

// Google Maps deep link to the venue (Upper Conference Center, SMSU).
export const VENUE_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Upper+Conference+Center+Southwest+Minnesota+State+University+Marshall+MN"

// Countdown targets as fixed instants (Central Time, CDT = UTC-5 in September).
export const EVENT_START_AT = "2026-09-12T08:00:00-05:00"
export const EVENT_END_AT = "2026-09-13T10:00:00-05:00"

// Event-day instants driving the Event Hub (components/home-record/event-hub.tsx).
// The challenge prompts stay hidden until the reveal so the homepage can't scoop
// the opening ceremony; the submission deadline is two hours before doors close,
// leaving demos and judging in between.
// Ordering invariant, asserted in __tests__/event-hub.test.ts:
//   WAITLIST_CLOSE_AT <= EVENT_START_AT < CHALLENGES_REVEAL_AT
//     < SUBMISSION_DEADLINE_AT < EVENT_END_AT
export const CHALLENGES_REVEAL_AT = "2026-09-12T10:00:00-05:00"
export const SUBMISSION_DEADLINE_AT = "2026-09-13T08:00:00-05:00"
// Display forms of SUBMISSION_DEADLINE_AT. Kept beside the instant so the copy
// and the gate can never drift apart.
export const SUBMISSION_DEADLINE = "8:00 AM Sunday, September 13"
export const SUBMISSION_DEADLINE_SHORT = "8:00 AM Sunday"

// THE WAITLIST IS CLOSED. It ran past the Sept 8 registration deadline and shut
// at the instant below; sign-ups are over. This previously aliased EVENT_START_AT
// (running right up to doors), and carrying its own earlier literal is exactly how
// that arrangement was meant to be ended. Two things come back automatically:
//   - the "closed" phase is reachable again (it is the live phase right now);
//   - the countdown shows "Event begins in", counting to doors on Sept 12.
// Must stay <= EVENT_START_AT; the ordering is asserted in the phase tests.
export const WAITLIST_CLOSE_AT = "2026-09-09T08:20:00-05:00"
export const WAITLIST_DEADLINE = "September 9, 2026"

// Live event assets
// The sign-up form is a WAITLIST, not a confirmed seat: submitting it places a
// student in line and organizers email them only if a spot can be offered. WAITLIST_NOTE is
// the one place that expectation is worded; every CTA renders it verbatim.
export const WAITLIST_FORM_URL = "https://forms.gle/tR3nteuQ3CgyHAmW6"
export const WAITLIST_NOTE =
  "Submitting the form adds you to the waitlist, not a confirmed spot. We'll email you if we're able to offer you a spot."
// Careful: the two Devpost subdomains differ only in hyphenation.
// Fall 2026 lives at southwest-mn-hacks; the March 2026 event at southwestmn-hacks.
export const DEVPOST_FALL_URL = "https://southwest-mn-hacks.devpost.com/"
export const DEVPOST_SPRING_URL = "https://southwestmn-hacks.devpost.com/"
export const DISCORD_INVITE_URL = "https://discord.gg/3gsH2DTx"
export const CONSENT_FORM_URL = "https://form.jotform.com/261474955259066"

// Finalized participant documents (PDFs live in /public/docs/). The Code of
// Conduct route /code-of-conduct is the canonical CoC link reused everywhere
// (the waitlist/consent forms link their CoC checkbox to it).
export const CODE_OF_CONDUCT_PDF = "/docs/code-of-conduct.pdf"
export const ADULT_WAIVER_PDF = "/docs/adult-waiver.pdf"
export const MINOR_CONSENT_PDF = "/docs/minor-consent.pdf"
// Freshness stamp shown near the document links so a stale cached copy can't
// masquerade as current. Bump when the documents are revised.
export const DOCS_UPDATED = "Updated June 2026"

// Marshall Independent coverage of the March 2026 event. Shared by the sponsor
// proof section and the homepage press module.
export const MARSHALL_ARTICLE_URL =
  "https://www.marshallindependent.com/news/local-news/2026/03/two-smsu-alum-host-first-ever-hackathon/"

// Public Schwan's Company social posts about the first (March 2026) event. Used
// for restrained past-event proof links and the homepage Event schema `sameAs`.
export const SCHWANS_LINKEDIN_URL =
  "https://www.linkedin.com/posts/schwans-company_giving-back-means-showing-up-and-our-is-activity-7449533485758832640-ZW8_/"
export const SCHWANS_INSTAGRAM_URL = "https://www.instagram.com/p/DXFUPQAiWo3/"

// Discord is hidden for now. Flip to true to show the hero button and the
// footer link again. The invite URL above stays wired up either way.
export const DISCORD_ENABLED = false

// Sponsor commitment deadline for full benefits (t-shirt logo, challenge prompt).
// Display copy only; nothing auto-gates on this date. Both display formats
// derive from the ISO date so they can never drift apart.
export const SPONSOR_DEADLINE_ISO = "2026-08-28"
const sponsorDeadline = new Date(`${SPONSOR_DEADLINE_ISO}T12:00:00-05:00`)
export const SPONSOR_DEADLINE = sponsorDeadline.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/Chicago",
})
export const SPONSOR_DEADLINE_SHORT = sponsorDeadline.toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "America/Chicago",
})

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

// Host framing. Used wherever the host/partner is described. No SMSU sponsorship
// implication, no SMSU or Mustangs logo.
export const PARTNERSHIP_LINE =
  "Run by the Southwest MN Hacks nonprofit in partnership with Aulden, hosted at SMSU."
