import { SPONSOR_EMAIL } from "@/lib/config"
import { hasSponsorIntake, sponsorInquiryUrl } from "@/lib/sponsor"

export function SponsorForm() {
  return (
    <section id="sponsor-form" className="py-16 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to sponsor?</h2>
          <p className="text-lg text-muted-foreground text-balance mb-8">
            {hasSponsorIntake
              ? "Tell us a little about your organization and we'll take it from there. Not sure which level fits? Start here or email us."
              : "To sponsor, or to talk through which level fits your organization, email us."}
          </p>

          {hasSponsorIntake ? (
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={sponsorInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-lg"
              >
                Start your sponsorship
              </a>
              <a
                href={`mailto:${SPONSOR_EMAIL}`}
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50"
              >
                Or email us
              </a>
            </div>
          ) : (
            <a
              href={`mailto:${SPONSOR_EMAIL}`}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-lg"
            >
              Email {SPONSOR_EMAIL}
            </a>
          )}

          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            We invoice from the Southwest MN Hacks nonprofit — pay by ACH, check, or card on standard net terms. Instant
            card payment is available for smaller and in-kind sponsorships.
          </p>
        </div>
      </div>
    </section>
  )
}
