import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { tierFromSlug } from "@/lib/sponsors/tiers"
import { SponsorStartForm } from "./sponsor-start-form"

export const metadata: Metadata = {
  title: { absolute: "Start your sponsorship | Southwest MN Hacks: Fall 2026" },
  description: "Confirm your sponsorship of Southwest MN Hacks: Fall 2026.",
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
