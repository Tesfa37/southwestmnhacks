import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { tierFromSlug } from "@/lib/sponsors/tiers"
import { getEventPhase } from "@/lib/event-phase"
import { SPONSOR_EMAIL } from "@/lib/config"
import { SponsorStartForm } from "./sponsor-start-form"

export const metadata: Metadata = {
  // Static (not phase-derived) because Next metadata resolves ahead of the
  // component body, but this matches what actually renders today: sponsorship
  // for Fall 2026 is closed, and this route's live form only reactivates for
  // a future event's open sponsorship window.
  title: { absolute: "Sponsorship closed for Fall 2026 | Southwest MN Hacks" },
  description:
    "Sponsorship for Southwest MN Hacks: Fall 2026 has closed. Contact us about supporting a future event.",
  robots: { index: false },
}

export default async function SponsorStartPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>
}) {
  const sp = await searchParams
  // No default tier: arrivals without ?tier= choose inside the form.
  const tier = tierFromSlug(sp.tier) ?? null

  // Fall 2026 sponsorship intake is closed. The form is not deleted (it still
  // backs the data model and can be reopened for a future event), but this
  // route must not render it publicly, and POST /api/sponsors/create enforces
  // the same gate server-side regardless of what renders here.
  if (getEventPhase() === "ended") {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 px-4 py-20">
          <div className="container mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">Sponsorship for Fall 2026 has closed</h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Fall 2026 has already happened, so we&apos;re no longer taking new sponsorships for it. Interested in
              supporting a future Southwest MN Hacks event?
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/sponsor"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-lg"
              >
                Back to Sponsor
              </Link>
              <a
                href={`mailto:${SPONSOR_EMAIL}`}
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50"
              >
                Email us
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-12">
        <div className="container mx-auto max-w-2xl">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">Start your sponsorship</h1>
          <p className="mb-8 text-muted-foreground">
            Tell us about your organization and how you'd like to proceed. Not sure which fits? Choose
            &ldquo;I'd like to talk first&rdquo; and we'll reach out.
          </p>
          <SponsorStartForm initialTier={tier} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
