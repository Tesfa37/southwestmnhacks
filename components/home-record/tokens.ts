// Type and action tokens for The Record, the live homepage (app/page.tsx).

/**
 * Display face for the h1 and the section h2s only, roughly nine elements.
 * Archivo is loaded in app/layout.tsx, which sets --font-archivo on the body;
 * the fallback stack keeps headings sane if it is ever missing.
 *
 * Deliberately NOT used for card titles or anything below section level: body,
 * card headings, mono eyebrows, and all UI stay on the site's own fonts, so this
 * design could ship without re-typesetting /recap, /sponsor, and /resources.
 */
export const DISPLAY =
  "[font-family:var(--font-archivo),ui-sans-serif,system-ui,sans-serif] tracking-tight"

/** Card headings: Geist, one step down the hierarchy from DISPLAY. */
export const CARD_TITLE = "tracking-tight"

// Page background: neutral paper, deliberately not cream.
export const PAPER = "bg-[#FAFAF8]"

// Ink and muted text for the light stage.
export const INK = "text-[#14181F]"
export const MUTED = "text-[#5B6472]"

/**
 * Card- and section-level actions. The middle tier of three:
 *   filled gradient pill (RegisterCta) > this > inline underlined text link.
 *
 * Deliberately an outline rather than a filled bubble. On an evidence-first page,
 * a solid colour button makes a press citation look like advertising. Use this
 * for the main action of a card; links inside a sentence stay underlined text.
 */
export const ACTION_PILL =
  "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold text-blue-700 ring-1 ring-gray-300 transition-colors hover:bg-blue-50 hover:ring-blue-300 hover:text-blue-800"
