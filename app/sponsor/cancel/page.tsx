import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { SPONSOR_EMAIL } from "@/lib/config"

export const metadata: Metadata = {
  title: { absolute: "Payment not completed | Southwest MN Hacks" },
  robots: { index: false },
}

export default function SponsorCancelPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-20">
        <div className="container mx-auto max-w-lg text-center">
          <h1 className="mb-3 text-3xl font-bold">Your payment wasn&rsquo;t completed</h1>
          <p className="mb-8 text-muted-foreground">
            No charge was made. You can pick up where you left off, ask us to send an invoice instead, or
            reach out with any questions.
          </p>
          <div className="flex flex-col items-center gap-3">
            <Button asChild className="w-full rounded-full bg-orange-600 hover:bg-orange-700 sm:w-auto sm:px-8">
              <Link href="/sponsor/start">Return to the sponsor form</Link>
            </Button>
            <Button asChild variant="outline" className="w-full rounded-full sm:w-auto sm:px-8">
              <a href={`mailto:${SPONSOR_EMAIL}?subject=Sponsorship%20invoice%20request`}>Request an invoice instead</a>
            </Button>
            <Link href={`mailto:${SPONSOR_EMAIL}`} className="text-sm font-semibold text-orange-600 hover:underline">
              Contact us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
