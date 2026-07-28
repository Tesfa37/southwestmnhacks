import Image from "next/image"
import { HOMEPAGE_PARTNERS, TIER_PILLS, type Partner } from "@/lib/sponsors/partners"
import { PARTNERSHIP_LINE } from "@/lib/config"

// Aulden's SVG reads small at the shared card scale, so it gets the full box height.
function logoHeight(partner: Partner) {
  return partner.tier === "partnership" ? "h-16" : partner.heightClass
}

// Homepage sponsor cards: equal compact grid, one card per partner with its tier pill.
export function HomeSponsors() {
  return (
    <>
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6">
        {HOMEPAGE_PARTNERS.map((partner) => {
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
                    className={`${logoHeight(partner)} w-auto object-contain`}
                  />
                </a>
              </div>
            </div>
          )
        })}
      </div>
      <p className="text-center text-sm text-gray-600 mb-8">{PARTNERSHIP_LINE}</p>
    </>
  )
}
