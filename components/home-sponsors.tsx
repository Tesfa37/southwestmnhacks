import { HOMEPAGE_PARTNERS, type Partner } from "@/lib/sponsors/partners"
import { PartnerLogo } from "@/components/partner-logo"
import { PARTNERSHIP_LINE } from "@/lib/config"

function LogoLink({ partner, heightClass }: { partner: Partner; heightClass: string }) {
  return (
    <PartnerLogo
      partner={partner}
      heightClass={heightClass}
      sizes="280px"
      className="inline-flex hover:opacity-90 transition-opacity"
    />
  )
}

// Homepage sponsors: Aulden keeps its full-width partnership card, the rest
// cluster in equal cards in PARTNERS order (hand-picked, not tier-ranked: don't sort).
//
// No tier labels. Nine partners across seven tiers meant a pill per card, which
// grouped nothing and put sponsor-sales vocabulary in front of students. The
// hierarchy that remains is the hero card plus the array order, both deliberate.
//
// Cards wrap in a centered flex row rather than a grid so a partial last row
// centers itself instead of hanging left whenever the count isn't a clean multiple.
export function HomeSponsors() {
  const hero = HOMEPAGE_PARTNERS.find((p) => p.tier === "partnership")
  const rest = HOMEPAGE_PARTNERS.filter((p) => p.tier !== "partnership")

  return (
    <>
      {hero && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-gray-200 mb-8">
          <div className="flex justify-center">
            <LogoLink partner={hero} heightClass={hero.heightClass} />
          </div>
          <p className="mt-5 text-sm text-gray-600">{PARTNERSHIP_LINE}</p>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
        {rest.map((partner) => (
          // Fixed h-32 with py-8 leaves exactly h-16 of room, matching the logo
          // ceiling in partners.ts, so every card is the same height whatever
          // the logo's aspect ratio.
          <div
            key={partner.name}
            className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] h-32 bg-white rounded-3xl px-6 py-8 shadow-sm border border-gray-200 flex items-center justify-center"
          >
            <LogoLink partner={partner} heightClass={partner.heightClass} />
          </div>
        ))}
      </div>
    </>
  )
}
