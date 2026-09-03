import type { CashTier } from "./tiers"

/**
 * Non-cash relationship kinds plus the cash tiers a logo can carry.
 * `in_kind` mirrors the funnel tier of the same name in ./tiers.ts.
 *
 * This is DATA, not display. No surface renders a tier label: with nine partners
 * across seven tiers, a pill per card grouped nothing and used sponsor-sales
 * vocabulary on a page read by students. The only behavioural use is picking the
 * hero card (`tier === "partnership"` in components/home-sponsors.tsx).
 */
export type PartnerTier =
  | "partnership"
  | "supported_by"
  | "campus_partner"
  | "in_kind"
  | CashTier

export interface Partner {
  name: string
  /** Omit when we have the logo but no public URL yet: the logo renders unlinked. */
  href?: string
  src: string
  /** Intrinsic asset dimensions, used for next/image width/height. */
  width: number
  height: number
  tier: PartnerTier
  /** Logo height on the homepage sponsor cards. */
  heightClass: string
  /** Logo height on the /sponsor partner wall. */
  wallHeightClass: string
  /** Fall 2026 sponsor (shown on the homepage) vs past-event partner (wall only). */
  current: boolean
}

/**
 * Display order is this array, hand-picked, and deliberately NOT tier-ranked.
 * Both the homepage grid and the /sponsor wall render it as-is: do not add a sort.
 *
 * `width`/`height` must be the asset's true pixel size, otherwise `object-contain`
 * letterboxes the logo inside a wrongly-shaped box and it renders smaller than
 * `heightClass` implies.
 */
export const PARTNERS: Partner[] = [
  {
    // viewBox trimmed to the artwork: the original 4096x1738 box was ~57% empty
    // padding, which next/image reserved, so the mark rendered at ~64% of its
    // height class. Same classes as before now read materially larger.
    name: "Aulden",
    href: "https://getaulden.com",
    src: "/aulden-logo.svg",
    width: 2742,
    height: 1119,
    tier: "partnership",
    heightClass: "h-16 sm:h-20",
    wallHeightClass: "h-14",
    current: true,
  },
  {
    // CJ Schwan's mark, cropped from the square 1x1 export they sent: that file
    // was 70% transparent padding, which next/image would size from. At 3.02:1
    // this sits between MNSP and Visit Marshall, so it carries near-full height.
    name: "Schwan's",
    href: "https://www.schwanscompany.com",
    src: "/schwans-logo.png",
    width: 972,
    height: 322,
    tier: "gold",
    heightClass: "h-14 sm:h-16",
    wallHeightClass: "h-14",
    current: true,
  },
  {
    name: "United Way of Southwest Minnesota",
    href: "https://www.unitedwayswmn.org",
    src: "/united-way-logo.png",
    width: 294,
    height: 101,
    tier: "silver",
    heightClass: "h-14 sm:h-16",
    wallHeightClass: "h-12",
    current: true,
  },
  {
    // Compact mark (1.5:1) rather than a wordmark, so it carries more height.
    name: "Minnesota Soybean Processors",
    href: "https://www.mnsoy.com",
    src: "/mnsp-logo.png",
    width: 1190,
    height: 783,
    tier: "bronze",
    heightClass: "h-14 sm:h-16",
    wallHeightClass: "h-14",
    current: true,
  },
  {
    name: "Visit Marshall",
    href: "https://visitmarshallmn.com",
    src: "/visit-marshall-logo.png",
    width: 943,
    height: 268,
    tier: "supported_by",
    heightClass: "h-14 sm:h-16",
    wallHeightClass: "h-12",
    current: true,
  },
  {
    // Very wide wordmark (6.3:1): smaller height keeps optical parity with the others.
    name: "Kwik Trip",
    href: "https://www.kwiktrip.com",
    src: "/kwik-trip-logo.svg",
    width: 395,
    height: 62,
    tier: "in_kind",
    heightClass: "h-8 sm:h-10",
    wallHeightClass: "h-8",
    current: true,
  },
  {
    name: "Hy-Vee",
    href: "https://www.hy-vee.com",
    src: "/hyvee-logo.svg",
    width: 297,
    height: 102,
    tier: "in_kind",
    heightClass: "h-12 sm:h-14",
    wallHeightClass: "h-10",
    current: true,
  },
  {
    // Square badge (1:1), not a wordmark: h-16 is the ceiling because the homepage
    // card's logo well is a fixed h-16 box.
    name: "Math and Computer Science Club, SMSU",
    href: "https://www.smsu.edu/academics/departments/mathematicscomputerscience/",
    src: "/smsu-math-cs-club-logo.png",
    width: 653,
    height: 653,
    tier: "campus_partner",
    heightClass: "h-14 sm:h-16",
    wallHeightClass: "h-14",
    current: true,
  },
  {
    // RISE Research is part of RISE Global Education. Note riseresearch.org is an
    // unrelated company, do not "correct" this URL to it.
    // Source file is only 318px wide, so h-12 is the practical ceiling before it softens.
    name: "RISE Research",
    href: "https://riseglobaleducation.com",
    src: "/rise-research-logo.png",
    width: 318,
    height: 114,
    tier: "in_kind",
    heightClass: "h-10 sm:h-12",
    wallHeightClass: "h-10",
    current: true,
  },
]

export const HOMEPAGE_PARTNERS = PARTNERS.filter((p) => p.current)
