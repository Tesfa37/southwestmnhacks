import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { SPONSOR_EMAIL } from "@/lib/config"
import { tierFromSlug } from "@/lib/sponsors/tiers"
import { sponsorInquiryUrl } from "@/lib/sponsor"

export const metadata: Metadata = {
  title: { absolute: "Payment not completed | Southwest MN Hacks" },
  robots: { index: false },
}

export default async function SponsorCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>
}) {
  const sp = await searchParams
  const tier = tierFromSlug(sp.tier)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1 px-4 py-20">
        <div className="container mx-auto max-w-lg text-center">
          <h1 className="mb-3 text-3xl font-bold">Your payment wasn&rsquo;t completed</h1>
          <p className="mb-8 text-muted-foreground">
            No charge was made. The form only takes a few minutes to fill out again, or ask us to send an invoice
            instead and pay on your schedule.
          </p>
          <div className="flex flex-col items-center gap-3">
            <Button asChild className="w-full rounded-full bg-orange-600 hover:bg-orange-700 sm:w-auto sm:px-8">
              <Link href={sponsorInquiryUrl(tier ?? undefined)}>Return to the sponsor form</Link>
            </Button>
            <Button asChild variant="outline" className="w-full rounded-full sm:w-auto sm:px-8">
              <a href={`mailto:${SPONSOR_EMAIL}?subject=Sponsorship%20invoice%20request`}>Request an invoice instead</a>
            </Button>
            <a
              href={`mailto:${SPONSOR_EMAIL}?subject=Sponsorship%20question`}
              className="text-sm font-semibold text-orange-600 hover:underline"
            >
              Contact us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
