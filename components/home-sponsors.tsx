import Image from "next/image"
import { HOMEPAGE_PARTNERS, TIER_PILLS, type Partner } from "@/lib/sponsors/partners"
import { PARTNERSHIP_LINE } from "@/lib/config"

function LogoLink({ partner, heightClass }: { partner: Partner; heightClass: string }) {
  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={partner.name}
      className="inline-flex hover:opacity-90 transition-opacity"
    >
      <Image
        src={partner.src}
        alt={partner.name}
        width={partner.width}
        height={partner.height}
        sizes="280px"
        className={`${heightClass} w-auto object-contain`}
      />
    </a>
  )
}

// Homepage sponsors: Aulden keeps its full-width partnership card, the rest
// cluster in an equal card grid. Both read from lib/sponsors/partners.ts.
export function HomeSponsors() {
  const hero = HOMEPAGE_PARTNERS.find((p) => p.tier === "partnership")
  const rest = HOMEPAGE_PARTNERS.filter((p) => p.tier !== "partnership")

  return (
    <>
      {hero && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-gray-200 mb-8">
          <span
            className={`inline-block ${TIER_PILLS[hero.tier].className} px-4 py-1.5 rounded-full text-sm font-semibold mb-6`}
          >
            {TIER_PILLS[hero.tier].label}
          </span>
          <div className="flex justify-center">
            <LogoLink partner={hero} heightClass={hero.heightClass} />
          </div>
          <p className="mt-4 text-sm text-gray-600">{PARTNERSHIP_LINE}</p>
        </div>
      )}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 mb-8">
        {rest.map((partner) => {
          const pill = TIER_PILLS[partner.tier]
          return (
            <div
              key={partner.name}
              className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 flex flex-col items-center gap-4"
            >
              <span
                className={`inline-block ${pill.className} px-3 py-1 rounded-full text-xs font-semibold`}
              >
                {pill.label}
              </span>
              <div className="flex h-16 items-center justify-center">
                <LogoLink partner={partner} heightClass={partner.heightClass} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
