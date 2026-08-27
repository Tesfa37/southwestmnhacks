import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { HomeSponsors } from "@/components/home-sponsors"
import { SponsorCtaButton } from "@/components/sponsor-cta-button"

export function SponsorsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <Reveal>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Sponsors</h2>
        <p className="text-lg sm:text-xl text-gray-600">Thank you to the partners who make this possible.</p>
        <p className="mt-3 text-gray-600">
          See how March 2026 went:{" "}
          <Link href="/recap" className="font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-700">
            read the recap
          </Link>
          .
        </p>
      </div>

      {/* Sponsor cards, driven by lib/sponsors/partners.ts */}
      <HomeSponsors />

      {/* Sponsor CTA */}
      <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 sm:p-12 text-center text-white">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4">Want to sponsor Fall 2026?</h3>
        <p className="text-lg sm:text-xl mb-8 opacity-95">
          Help us support the next generation of student builders in Southwest Minnesota.
        </p>
        <SponsorCtaButton />
      </div>
      </Reveal>
    </section>
  )
}
