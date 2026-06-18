import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SponsorHero } from "@/components/sponsor-hero"
import { SponsorBenefits } from "@/components/sponsor-benefits"
import { SponsorDayTimeline } from "@/components/sponsor-day-timeline"
import { SponsorProof } from "@/components/sponsor-proof"
import { SponsorTiers } from "@/components/sponsor-tiers"
import { SponsorForm } from "@/components/sponsor-form"
import { SponsorFaq } from "@/components/sponsor-faq"
import { FloatingSponsorCta } from "@/components/floating-sponsor-cta"

export const metadata: Metadata = {
  title: { absolute: "Sponsor | Southwest MN Hacks: Fall 2026" },
  description:
    "Sponsor Southwest MN Hacks: Fall 2026 and connect with student builders at SMSU in Marshall, MN. More than logo placement — real sponsor-student interaction and a local workforce pipeline.",
}

export default function SponsorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <SponsorHero />
        <SponsorBenefits />
        <SponsorDayTimeline />
        <SponsorProof />
        <SponsorTiers />
        <SponsorForm />
        <SponsorFaq />
      </main>
      <FloatingSponsorCta />
      <Footer />
    </div>
  )
}
