import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SponsorHero } from "@/components/sponsor-hero"
import { SponsorBenefits } from "@/components/sponsor-benefits"
import { SponsorProof } from "@/components/sponsor-proof"
import { SponsorEvergreenCta } from "@/components/sponsor-evergreen-cta"
import { SponsorFaq } from "@/components/sponsor-faq"

export const metadata: Metadata = {
  alternates: { canonical: "/sponsor" },
  title: { absolute: "Sponsor | Southwest MN Hacks" },
  description:
    "Southwest MN Hacks connects sponsors with student builders in Marshall, MN. See the impact from Fall 2026, and get in touch about supporting a future event.",
}

// Fall 2026's live checkout flow (tiers, day-of timeline, "Start your
// sponsorship") is intentionally not rendered here anymore — that event is
// over. The tier data model and its components still exist for a future
// event; see components/sponsor-tiers.tsx, sponsor-day-timeline.tsx, and
// sponsor-form.tsx. /sponsor/start and POST /api/sponsors/create are both
// gated closed independently of this page.
export default function SponsorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <SponsorHero />
        <SponsorProof />
        <SponsorBenefits />
        <SponsorEvergreenCta />
        <SponsorFaq />
      </main>
      <Footer />
    </div>
  )
}
