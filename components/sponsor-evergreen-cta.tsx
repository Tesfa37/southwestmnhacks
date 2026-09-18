import { SPONSOR_EMAIL } from "@/lib/config"

// Replaces the live "Start your sponsorship" checkout flow on the public
// /sponsor page now that Fall 2026 has ended. No links into /sponsor/start:
// that route (and POST /api/sponsors/create) are gated closed independently,
// but this page also shouldn't invite anyone into a dead-end flow.
export function SponsorEvergreenCta() {
  return (
    <section id="get-in-touch" className="py-16 px-4 scroll-mt-20">
      <div className="container max-w-3xl mx-auto">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            Interested in supporting a future Southwest MN Hacks event?
          </h2>
          <p className="text-lg text-muted-foreground text-balance mb-8">
            Fall 2026 has wrapped, so we&apos;re not taking new sponsorships for it. Reach out and we&apos;ll follow
            up when planning for the next event opens.
          </p>

          <a
            href={`mailto:${SPONSOR_EMAIL}`}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-lg"
          >
            Email {SPONSOR_EMAIL}
          </a>
        </div>
      </div>
    </section>
  )
}
