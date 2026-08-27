/**
 * Light/dark class pairs for the homepage sections, so the cinematic (dark) and
 * daylight (light) variants share one set of components instead of forking into
 * twins that drift apart. Same idea as HEADER_CLASSES in components/header.tsx
 * and the token module in components/home-record/tokens.ts.
 *
 * The light column is the site's existing vocabulary: it must keep matching
 * /recap, /sponsor, and /resources. The dark column is the cinematic stage only.
 */
export type Tone = "dark" | "light"

type Pair = Record<Tone, string>

/** Page ground. */
export const STAGE: Pair = {
  dark: "bg-[#0a0a12] text-white",
  light: "bg-gradient-to-br from-orange-50 via-white to-blue-50 text-gray-900",
}

/** Standard content card. */
export const SURFACE: Pair = {
  dark: "bg-white/5 ring-1 ring-white/10",
  light: "bg-white shadow-sm border border-gray-200",
}

/** A band that needs to separate itself from the stage. */
export const BAND: Pair = {
  dark: "",
  light: "bg-white border-y border-gray-200",
}

export const HEADING: Pair = { dark: "text-white", light: "text-gray-900" }
/** Lead paragraphs and anything that should sit just above body weight. */
export const BODY_STRONG: Pair = { dark: "text-white/85", light: "text-gray-700" }
export const BODY: Pair = { dark: "text-white/70", light: "text-gray-600" }
export const MUTED: Pair = { dark: "text-white/50", light: "text-gray-500" }

export const LINK: Pair = {
  dark: "text-blue-400 hover:text-blue-300",
  light: "text-blue-600 hover:text-blue-700",
}

/** Inset panel nested inside a SURFACE card. */
export const INSET: Pair = {
  dark: "border border-white/10 bg-white/5",
  light: "border border-gray-200 bg-gray-50",
}

/** The "under 18, consent form" warning callout and its icon chip. */
export const CALLOUT: Pair = {
  dark: "border border-amber-400/30 bg-amber-400/10",
  light: "border border-amber-200 bg-amber-50",
}
export const CALLOUT_CHIP: Pair = {
  dark: "bg-amber-400/15 text-amber-300",
  light: "bg-amber-100 text-amber-700",
}

/** Accordion item + its chevron. */
export const FAQ_ITEM: Pair = {
  dark: "bg-white/5 border border-white/10",
  light: "bg-white border border-gray-200",
}
export const FAQ_CHEVRON: Pair = {
  dark: "[&>svg]:text-white/60",
  light: "[&>svg]:text-gray-500",
}
