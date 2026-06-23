import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Receipt } from "lucide-react"
import { EVENT_NAME, LEGAL_ENTITY_NAME, SPONSOR_EMAIL } from "@/lib/config"

export const metadata: Metadata = {
  title: { absolute: "Refund & Cancellation Policy | Southwest MN Hacks" },
  description:
    "How sponsorship payments, in-kind contributions, and event cancellations are handled for Southwest MN Hacks.",
}

export default function RefundsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 px-4 md:py-28 bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6">
              <Receipt className="size-4" />
              Clear and upfront
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">
              Refund &amp; Cancellation Policy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              How sponsorship payments and event cancellations are handled for {EVENT_NAME}.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 shadow-lg mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Summary</h2>
              <p className="text-white text-lg leading-relaxed">
                Sponsorship payments are generally non-refundable once paid. Unpaid invoices may be cancelled or revised
                before sponsorship benefits begin. If Southwest MN Hacks cancels the event, sponsors will be offered a
                refund or a credit toward a future event. If anything is unclear, just reach out.
              </p>
            </div>

            <div className="space-y-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Sponsorship payments</h2>
                <p className="text-gray-700 leading-relaxed">
                  Because we commit funds to plan the event (food, venue, prizes, and materials) based on confirmed
                  sponsorships, sponsorship payments are <strong>generally non-refundable once paid</strong>. Unpaid
                  invoices may be cancelled or revised before sponsorship benefits begin. If your plans change, contact
                  us as early as possible and we will do our best to help.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">In-kind contributions</h2>
                <p className="text-gray-700 leading-relaxed">
                  In-kind contributions (such as meals, prizes, credits, or equipment) are coordinated case by case. If
                  something changes, contact us as early as possible so we can adjust plans together.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">If we cancel the event</h2>
                <p className="text-gray-700 leading-relaxed">
                  If {LEGAL_ENTITY_NAME} cancels the event, sponsors will be offered a refund or a credit toward a future
                  event. If the event is postponed, your sponsorship carries over to the new date unless you request a
                  refund.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Receipts and records</h2>
                <p className="text-gray-700 leading-relaxed">
                  Card and bank payments receive an automatic receipt from Stripe. Invoiced sponsorships receive a
                  hosted invoice you can pay and download for your records.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Participants</h2>
                <p className="text-gray-700 leading-relaxed">
                  There is no fee to participate in the hackathon. Removal from the event under the{" "}
                  <Link href="/code-of-conduct" className="text-blue-600 hover:text-blue-700 underline">
                    Code of Conduct
                  </Link>{" "}
                  does not involve a refund, since participation is free.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Billing questions</h2>
                <p className="text-gray-700 leading-relaxed">
                  For any refund, cancellation, or billing question, email{" "}
                  <a href={`mailto:${SPONSOR_EMAIL}`} className="text-blue-600 hover:text-blue-700 underline">
                    {SPONSOR_EMAIL}
                  </a>{" "}
                  and we will get back to you within a few days.
                </p>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <p className="text-sm text-gray-500">Last updated: June 23, 2026</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
