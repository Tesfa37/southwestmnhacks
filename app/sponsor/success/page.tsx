import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { SPONSOR_EMAIL } from "@/lib/config"
import { LegalNotice } from "@/components/sponsor/legal-notice"
import { getStripe } from "@/lib/stripe"

export const metadata: Metadata = {
  title: { absolute: "Thank you | Southwest MN Hacks" },
  robots: { index: false },
}

// Never trust query params as proof of payment; the webhook is the source of
// truth. We retrieve the session ONLY to show a friendly, accurate status line.
export const dynamic = "force-dynamic"

async function paymentStatusLine(sessionId: string): Promise<string> {
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId)
    if (session.payment_status === "paid") {
      return "Your payment is confirmed. A receipt is on its way to your email."
    }
    // ACH/bank transfers complete the session but settle later (payment_status
    // stays "unpaid" until the transfer clears).
    if (session.payment_status === "unpaid") {
      return "Your bank transfer is processing. This can take a few business days. We'll email you when it settles."
    }
    return "We're finalizing your payment and will email you a receipt shortly."
  } catch {
    return "We're finalizing your payment and will email you a receipt shortly."
  }
}

export default async function SponsorSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; state?: string; pref?: string }>
}) {
  const sp = await searchParams

  let heading = "Thank you. Your sponsorship request was received."
  let body = "Our team will follow up shortly with the next steps."

  if (sp.session_id) {
    heading = "Thank you. Your sponsorship payment was submitted."
    body = await paymentStatusLine(sp.session_id)
  } else if (sp.state === "invoice") {
    heading = "Thank you. Your invoice request was received."
    body =
      "We'll send your sponsorship invoice shortly. You'll be able to pay it securely by card or bank transfer, on standard net terms."
  } else if (sp.pref === "IN_KIND") {
    heading = "Thank you. Your in-kind sponsorship request was received."
    body = "Our team will follow up to coordinate the details of your contribution."
  } else if (sp.pref === "PAY_BY_CHECK") {
    body = "Our team will follow up with remit-to instructions and an invoice for your records."
  } else if (sp.pref === "NEED_W9_VENDOR_SETUP") {
    body = "Our team will follow up with our W-9 and vendor setup details for your accounts-payable team."
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 px-4 py-20">
        <div className="container mx-auto max-w-lg text-center">
          <h1 className="mb-3 text-3xl font-bold text-balance">{heading}</h1>
          <p className="mb-6 text-muted-foreground text-balance">{body}</p>
          <p className="mb-8 text-sm text-muted-foreground">
            Questions? Email{" "}
            <a href={`mailto:${SPONSOR_EMAIL}`} className="font-semibold text-orange-600 hover:underline">
              {SPONSOR_EMAIL}
            </a>
            .
          </p>
          <Button asChild className="rounded-full bg-orange-600 px-8 hover:bg-orange-700">
            <Link href="/">Back to home</Link>
          </Button>
          <LegalNotice className="mt-10 text-left" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
