import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail } from "lucide-react"
import {
  EVENT_NAME,
  LEGAL_ENTITY_NAME,
  SUPPORT_EMAIL,
  SPONSOR_EMAIL,
  PRIVACY_EMAIL,
  CONDUCT_EMAIL,
  MAILING_ADDRESS,
} from "@/lib/config"

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: { absolute: "Contact | Southwest MN Hacks" },
  description: "How to reach the Southwest MN Hacks team for support, sponsorship, privacy, and conduct questions.",
}

const MAILBOXES: { email: string; label: string; note: string }[] = [
  { email: SUPPORT_EMAIL, label: "General & participant support", note: "Questions about the event, registration, or the site." },
  { email: SPONSOR_EMAIL, label: "Sponsorship & billing", note: "Becoming a sponsor, invoices, receipts, and payment questions." },
  { email: PRIVACY_EMAIL, label: "Privacy & data requests", note: "Access, correction, or deletion of your information." },
  { email: CONDUCT_EMAIL, label: "Code of Conduct reports", note: "Safety concerns or conduct issues at the event." },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <section className="py-20 px-4 md:py-28 bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6">
              <Mail className="size-4" />
              We're happy to help
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">Contact us</h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              Reach the team behind {EVENT_NAME}. Pick the inbox that fits and we'll reply within a few days.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {MAILBOXES.map((box) => (
                <div key={box.email} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-1">{box.label}</h2>
                  <a
                    href={`mailto:${box.email}`}
                    className="text-blue-600 hover:text-blue-700 underline break-all"
                  >
                    {box.email}
                  </a>
                  <p className="text-gray-600 leading-relaxed mt-2 text-sm">{box.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-2">By mail</h2>
              {MAILING_ADDRESS ? (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {LEGAL_ENTITY_NAME}
                  {"\n"}
                  {MAILING_ADDRESS}
                </p>
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {LEGAL_ENTITY_NAME}. For a mailing address, email{" "}
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 hover:text-blue-700 underline">
                    {SUPPORT_EMAIL}
                  </a>
                  .
                </p>
              )}
            </div>

            <p className="text-sm text-gray-500 text-center mt-10 leading-relaxed">
              {LEGAL_ENTITY_NAME} is a nonprofit run by students in southwestern Minnesota. We read every message and
              reply as soon as we can.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
