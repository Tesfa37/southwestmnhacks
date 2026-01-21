import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SponsorHero } from "@/components/sponsor-hero"
import { SponsorTiers } from "@/components/sponsor-tiers"
import { SponsorBenefits } from "@/components/sponsor-benefits"
import { SponsorForm } from "@/components/sponsor-form"
import { SponsorFaq } from "@/components/sponsor-faq"

export default function SponsorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <SponsorHero />
        <SponsorTiers />
        <SponsorBenefits />
        <SponsorForm />
        <SponsorFaq />
      </main>
      <Footer />
    </div>
  )
}
