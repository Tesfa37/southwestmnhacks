import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { HomeSponsors } from "@/components/home-sponsors"
import { SponsorCtaButton } from "@/components/sponsor-cta-button"
import { DISPLAY, MUTED } from "@/components/home-record/tokens"

// Same sponsor data as everywhere else (lib/sponsors/partners.ts via
// HomeSponsors), restyled header and a quiet ink CTA band instead of the
// gradient banner: on this page, loud color belongs to nothing.
export function RecordSponsors() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <Reveal>
        <div className="mb-10 max-w-2xl">
          <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED} mb-3`}>Backed by</p>
          <h2 className={`${DISPLAY} text-3xl sm:text-4xl font-black mb-3`}>The partners who make it possible.</h2>
          <p className={`text-lg ${MUTED}`}>
            These organizations put their names on the first event.{" "}
            <Link
              href="/recap"
              className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              See how March went
            </Link>
            .
          </p>
        </div>

        <HomeSponsors />

        <div className="rounded-xl bg-[#14181F] p-8 sm:p-12 text-center text-white">
          <h3 className={`${DISPLAY} text-2xl sm:text-3xl font-extrabold mb-3`}>Want your name on the next one?</h3>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Help us support the next generation of student builders in Southwest Minnesota.
          </p>
          <SponsorCtaButton />
        </div>
      </Reveal>
    </section>
  )
}
