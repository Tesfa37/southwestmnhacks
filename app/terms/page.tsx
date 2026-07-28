import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Scale } from "lucide-react"
import { EVENT_NAME, LEGAL_ENTITY_NAME, GOVERNING_STATE, SUPPORT_EMAIL, SPONSOR_EMAIL } from "@/lib/config"

export const metadata: Metadata = {
  title: { absolute: "Terms of Service | Southwest MN Hacks" },
  description:
    "The terms that govern use of the Southwest MN Hacks website, event participation, and sponsorships.",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        <section className="py-20 px-4 md:py-28 bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6">
              <Scale className="size-4" />
              The fine print, in plain language
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">Terms of Service</h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              These terms cover how you can use our website, take part in the event, and sponsor {EVENT_NAME}.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Agreement to these terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By using this website, registering for the event, or sponsoring it, you agree to these Terms of Service.
                If you do not agree, please do not use the site or our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Who we are</h2>
              <p className="text-gray-700 leading-relaxed">
                {LEGAL_ENTITY_NAME} is a nonprofit organization based in {GOVERNING_STATE} that runs {EVENT_NAME}, a
                student hackathon hosted at Southwest Minnesota State University in Marshall, Minnesota.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Event participation</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Participation is subject to our{" "}
                <Link href="/code-of-conduct" className="text-blue-600 hover:text-blue-700 underline">
                  Code of Conduct
                </Link>
                , our{" "}
                <Link href="/rules" className="text-blue-600 hover:text-blue-700 underline">
                  Event Rules
                </Link>
                , and the required waivers and consent forms. The event is intended for students age 14 and older,
                including recent graduates within one year of graduation. Participants under 18 must have a parent or
                guardian complete the consent and medical authorization before attending.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We may update the schedule, format, venue, or activities, and we may remove anyone whose conduct puts
                others at risk, as described in the Code of Conduct.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Sponsorships and payments</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sponsorship amounts, tiers, and benefits are described on our{" "}
                <Link href="/sponsor" className="text-blue-600 hover:text-blue-700 underline">
                  sponsor page
                </Link>
                . Payments are processed by Stripe. You can pay by card or bank transfer, or request an invoice on
                standard net terms. Benefits that depend on the event (such as booth space, speaking slots, or judging)
                are provided as described, and we will work with you if anything needs to change.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Sponsorship payments are <strong>generally non-refundable once paid</strong>. Unpaid invoices may be
                cancelled or revised before sponsorship benefits begin. See our{" "}
                <Link href="/refunds" className="text-blue-600 hover:text-blue-700 underline">
                  Refund and Cancellation Policy
                </Link>{" "}
                for details. Sponsorship is not a charitable donation in full; payments may include recognition or
                event-related benefits, so please consult your tax advisor regarding deductibility.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Your projects and intellectual property</h2>
              <p className="text-gray-700 leading-relaxed">
                You keep ownership of the projects you build at the event, including your code and ideas, and we do not
                claim ownership of them. By submitting a project or taking part, you grant {LEGAL_ENTITY_NAME} permission
                to use your project name, summary, screenshots, team name, demo materials, and event media for judging,
                event recap, sponsor reporting, and promotion of the event. Participant photos and video are used only as
                permitted by your photo and video release choice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Acceptable use of the site</h2>
              <p className="text-gray-700 leading-relaxed">
                Please use the site lawfully. Do not attempt to disrupt it, access it in unauthorized ways, or submit
                false information through our forms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Disclaimers and limitation of liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The website and the event are provided on an "as is" and "as available" basis, without warranties of any
                kind. We do our best to run a safe, well-organized event, but we cannot guarantee uninterrupted service
                or that the site will be error-free.
              </p>
              <p className="text-gray-700 leading-relaxed">
                To the fullest extent allowed by law, {LEGAL_ENTITY_NAME} and its organizers and volunteers are not
                liable for indirect, incidental, or consequential damages arising from your use of the site, the event,
                or a sponsorship.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Governing law</h2>
              <p className="text-gray-700 leading-relaxed">
                These terms are governed by the laws of the State of {GOVERNING_STATE}, without regard to its conflict of
                law rules.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Changes to these terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these terms from time to time. The version posted here is the current one. Material changes
                will be noted by updating the date below.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                Questions about these terms? Email{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 hover:text-blue-700 underline">
                  {SUPPORT_EMAIL}
                </a>
                . For sponsorship or billing questions, email{" "}
                <a href={`mailto:${SPONSOR_EMAIL}`} className="text-blue-600 hover:text-blue-700 underline">
                  {SPONSOR_EMAIL}
                </a>
                .
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500">Last updated: June 23, 2026</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
