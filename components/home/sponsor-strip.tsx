import { HOMEPAGE_PARTNERS } from "@/lib/sponsors/partners"
import { PartnerLogo } from "@/components/partner-logo"
import { MUTED, type Tone } from "@/components/home/tone"

// Static mode only. The marquee is deliberately unframed: rules above and below
// made it read as a bolted-on widget instead of part of the hero, and the edge
// fade mask already does the separating.
const BAND: Record<Tone, string> = {
  dark: "border-y border-white/10 bg-white/5",
  light: "border-y border-gray-200 bg-white",
}

// Full brand colour, deliberately: this strip is sponsor recognition, and the
// grayscale-until-hover treatment on the /sponsor wall hides the logos from
// anyone who never hovers. Only a light opacity nudge on hover.
const LOGO = "shrink-0 transition-opacity duration-300 hover:opacity-80"

/**
 * One marquee tile: the full partner list plus a trailing gap.
 *
 * The trailing `pr-12` matters. Two tiles sit flush against each other with no
 * gap on the parent, so this padding is what supplies the space between the last
 * logo of one tile and the first logo of the next. That makes both tiles exactly
 * the same width, which is the whole reason `translateX(-50%)` lands on an
 * identical frame instead of visibly jumping once per lap.
 */
function MarqueeTile({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div aria-hidden={duplicate || undefined} className="flex shrink-0 items-center gap-x-12 pr-12">
      {HOMEPAGE_PARTNERS.map((partner) => (
        <PartnerLogo
          key={partner.name}
          // The duplicate is decorative: no link, so it stays out of the tab order.
          partner={duplicate ? { ...partner, href: undefined } : partner}
          heightClass={partner.wallHeightClass}
          sizes="200px"
          className={LOGO}
        />
      ))}
    </div>
  )
}

/**
 * A quiet "Backed by" logo band directly under the hero.
 *
 * mode="static"  wraps all current partners in a centred, contained, labelled row.
 * mode="marquee" scrolls them edge to edge across the full viewport, unframed
 *                and unlabelled so it reads as part of the hero, masked so
 *                logos dissolve at both margins rather than cutting off. The
 *                list is rendered twice so the loop seams at -50%.
 *                `animate-logo-marquee` is disabled by the reduced-motion block
 *                in app/globals.css; `overflow-x-auto` is what leaves a usable
 *                scrollable row behind when that happens.
 */
export function SponsorStrip({ tone, mode }: { tone: Tone; mode: "static" | "marquee" }) {
  // Static stays contained and framed: a centred wrapping row is meant to have
  // margins, and it reads as a block rather than a passing ribbon.
  if (mode === "static") {
    return (
      <section aria-label="Our sponsors" className={BAND[tone]}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <p className={`mb-4 text-center text-xs font-semibold uppercase tracking-wider ${MUTED[tone]}`}>
            Backed by
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {HOMEPAGE_PARTNERS.map((partner) => (
              <PartnerLogo
                key={partner.name}
                partner={partner}
                heightClass={partner.wallHeightClass}
                sizes="200px"
                className={LOGO}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Marquee runs full-bleed and unlabelled. Recognisable sponsor logos under a
  // hero don't need a caption, and dropping it leaves "Backed by" belonging to
  // the sponsors section alone. The section's aria-label still announces it.
  return (
    <section aria-label="Our sponsors" className="py-8">
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%] [-webkit-mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%]">
        <div className="flex w-max animate-logo-marquee items-center">
          <MarqueeTile />
          <MarqueeTile duplicate />
        </div>
      </div>
    </section>
  )
}
