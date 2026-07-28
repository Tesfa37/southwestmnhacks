import Image from "next/image"
import {
  HOMEPAGE_PARTNERS,
  TIER_ORDER,
  TIER_PILLS,
  type Partner,
} from "@/lib/sponsors/partners"
import { PARTNERSHIP_LINE } from "@/lib/config"
import { SponsorCtaButton } from "@/components/sponsor-cta-button"

export const metadata = {
  title: "Sponsor section previews",
  robots: { index: false, follow: false },
}

function LogoLink({ partner, heightClass }: { partner: Partner; heightClass?: string }) {
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
        className={`${heightClass ?? partner.heightClass} w-auto object-contain`}
      />
    </a>
  )
}

function TierPill({ tier, small }: { tier: Partner["tier"]; small?: boolean }) {
  const pill = TIER_PILLS[tier]
  return (
    <span
      className={`inline-block ${pill.className} ${
        small ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-sm"
      } rounded-full font-semibold`}
    >
      {pill.label}
    </span>
  )
}

function SectionShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Sponsors</h2>
        <p className="text-lg sm:text-xl text-gray-600">
          Thank you to the partners who make this possible.
        </p>
      </div>
      {children}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 sm:p-12 text-center text-white">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">Want to sponsor Fall 2026?</h3>
        <p className="text-lg sm:text-xl mb-8 opacity-95">
          Help us support the next generation of student builders in Southwest Minnesota.
        </p>
        <SponsorCtaButton />
      </div>
    </section>
  )
}

/* Variant A: Aulden keeps its hero partnership card; everyone else in a uniform grid. */
function VariantA() {
  const [hero, ...rest] = HOMEPAGE_PARTNERS
  return (
    <SectionShell>
      <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-gray-200 mb-8">
        <div className="mb-6">
          <TierPill tier={hero.tier} />
        </div>
        <div className="flex justify-center">
          <LogoLink partner={hero} />
        </div>
        <p className="mt-4 text-sm text-gray-600">{PARTNERSHIP_LINE}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 mb-8">
        {rest.map((partner) => (
          <div
            key={partner.name}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200 flex flex-col items-center gap-5"
          >
            <TierPill tier={partner.tier} small />
            <div className="flex h-16 items-center justify-center">
              <LogoLink partner={partner} />
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

/* Variant B: one card, tier-grouped logo rows with small captions. */
function VariantB() {
  const groups = TIER_ORDER.map((tier) => ({
    tier,
    partners: HOMEPAGE_PARTNERS.filter((p) => p.tier === tier),
  })).filter((g) => g.partners.length > 0)

  return (
    <SectionShell>
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-200 mb-8 text-center">
        {groups.map((group, i) => (
          <div key={group.tier} className={i > 0 ? "mt-10 pt-10 border-t border-gray-100" : ""}>
            <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {TIER_PILLS[group.tier].label}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {group.partners.map((partner) => (
                <LogoLink key={partner.name} partner={partner} />
              ))}
            </div>
            {group.tier === "partnership" && (
              <p className="mt-4 text-sm text-gray-600">{PARTNERSHIP_LINE}</p>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  )
}

/* Variant C: every sponsor in an equal compact card grid. */
function VariantC() {
  return (
    <SectionShell>
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6">
        {HOMEPAGE_PARTNERS.map((partner) => (
          <div
            key={partner.name}
            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 flex flex-col items-center gap-4"
          >
            <TierPill tier={partner.tier} small />
            <div className="flex h-14 items-center justify-center">
              <LogoLink partner={partner} heightClass={compactHeight(partner)} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-600 mb-8">{PARTNERSHIP_LINE}</p>
    </SectionShell>
  )
}

function compactHeight(partner: Partner) {
  // Cap logo heights so equal cards stay optically balanced.
  return partner.tier === "partnership" ? "h-12" : partner.heightClass
}

function Band({ label, note }: { label: string; note: string }) {
  return (
    <div className="bg-gray-900 text-white px-4 py-3 font-mono text-sm">
      <span className="font-bold">{label}</span>
      <span className="ml-3 text-gray-400">{note}</span>
    </div>
  )
}

export default function SponsorPreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="bg-gray-900 text-white px-4 py-6 text-center">
        <h1 className="text-xl font-bold">Homepage sponsor section: pick a variant</h1>
        <p className="mt-1 text-sm text-gray-400">
          Each variant shows the full section in context. Schwan&apos;s is prepared in the data
          and appears automatically in the chosen layout once confirmed.
        </p>
      </div>

      <Band label="Variant A" note="Aulden hero card + uniform tier grid (recommended)" />
      <VariantA />

      <Band label="Variant B" note="Single card, tier-grouped logo rows" />
      <VariantB />

      <Band label="Variant C" note="Compact uniform card grid, partnership line as caption" />
      <VariantC />
    </div>
  )
}
