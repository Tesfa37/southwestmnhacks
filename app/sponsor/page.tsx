import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SponsorHero } from "@/components/sponsor-hero"
import { SponsorTiers } from "@/components/sponsor-tiers"
import { SponsorBenefits } from "@/components/sponsor-benefits"
import { SponsorEngagement } from "@/components/sponsor-engagement"
import { SponsorProof } from "@/components/sponsor-proof"
import { SponsorForm } from "@/components/sponsor-form"
import { SponsorFaq } from "@/components/sponsor-faq"

export default function SponsorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <SponsorHero />
        <SponsorBenefits />
        <SponsorEngagement />
        <SponsorProof />
        <SponsorTiers />
        <SponsorForm />
        <SponsorFaq />
      </main>
      <Footer />
    </div>
  )
}
