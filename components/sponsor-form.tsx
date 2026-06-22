import Link from "next/link"
import { SPONSOR_EMAIL } from "@/lib/config"

export function SponsorForm() {
  return (
    <section id="sponsor-form" className="py-16 px-4 scroll-mt-20">
      <div className="container max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to sponsor?</h2>
          <p className="text-lg text-muted-foreground text-balance mb-8">
            Tell us a little about your organization and how you&rsquo;d like to proceed: pay now, request an
            invoice, or just talk first. Not sure which level fits? Start here or email us.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/sponsor/start"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-lg"
            >
              Start your sponsorship
            </Link>
            <a
              href={`mailto:${SPONSOR_EMAIL}`}
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              Or email us
            </a>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            We invoice from the Southwest MN Hacks nonprofit. Pay by ACH, check, or card on standard net terms. Instant
            card payment is available for smaller and in-kind sponsorships.
          </p>
        </div>
      </div>
    </section>
  )
}
