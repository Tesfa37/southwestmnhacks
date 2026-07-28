import type { CashTier } from "./tiers"

/** Non-cash relationship kinds plus the cash tiers a logo can carry. */
export type PartnerTier = "partnership" | "supported_by" | CashTier

export interface Partner {
  name: string
  href: string
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

/** Pill label + colors per tier, shared by every sponsor-logo surface. */
export const TIER_PILLS: Record<PartnerTier, { label: string; className: string }> = {
  partnership: { label: "In Partnership With", className: "bg-blue-100 text-blue-800" },
  supported_by: { label: "Supported By", className: "bg-teal-100 text-teal-800" },
  platinum: { label: "Premier Innovation Partner", className: "bg-pink-100 text-pink-800" },
  gold: { label: "Student Engagement Sponsor", className: "bg-orange-100 text-orange-800" },
  silver: { label: "Event Presence Sponsor", className: "bg-purple-100 text-purple-800" },
  bronze: { label: "Community Supporter", className: "bg-amber-100 text-amber-800" },
}

/** Display ladder for tier-grouped layouts. */
export const TIER_ORDER: PartnerTier[] = [
  "partnership",
  "supported_by",
  "platinum",
  "gold",
  "silver",
  "bronze",
]

export const PARTNERS: Partner[] = [
  {
    name: "Aulden",
    href: "https://getaulden.com",
    src: "/aulden-logo.svg",
    width: 240,
    height: 80,
    tier: "partnership",
    heightClass: "h-16 sm:h-20",
    wallHeightClass: "h-14",
    current: true,
  },
  {
    name: "Visit Marshall",
    href: "https://visitmarshallmn.com",
    src: "/visit-marshall-logo.png",
    width: 300,
    height: 77,
    tier: "supported_by",
    heightClass: "h-14 sm:h-16",
    wallHeightClass: "h-12",
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
    // Very wide wordmark (6.3:1): smaller height keeps optical parity with the others.
    name: "Kwik Trip",
    href: "https://www.kwiktrip.com",
    src: "/kwik-trip-logo.svg",
    width: 395,
    height: 62,
    tier: "bronze",
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
    tier: "bronze",
    heightClass: "h-12 sm:h-14",
    wallHeightClass: "h-10",
    current: true,
  },
  {
    // Flip `current` to true once Schwan's confirms for Fall 2026.
    name: "Schwan's",
    href: "https://www.schwanscompany.com",
    src: "/schwans-logo.png",
    width: 2778,
    height: 490,
    tier: "platinum",
    heightClass: "h-8 sm:h-10",
    wallHeightClass: "h-10",
    current: false,
  },
]

export const HOMEPAGE_PARTNERS = PARTNERS.filter((p) => p.current)
