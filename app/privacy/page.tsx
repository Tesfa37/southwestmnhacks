import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Lock } from "lucide-react"

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Southwest MN Hacks" },
  description:
    "How Southwest MN Hacks collects, uses, and protects participant and sponsor information for registration, communication, judging, operations, and payments (processed by Stripe).",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:py-28 bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6">
              <Lock className="size-4" />
              Your Privacy Matters
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">Privacy Policy</h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              We're a student-run hackathon that takes your privacy seriously. Here's the straightforward story of how
              we handle your data.
            </p>
          </div>
        </section>

        {/* TL;DR Section */}
        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 shadow-lg mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">TL;DR</h2>
              <p className="text-white text-lg leading-relaxed">
                We collect the information we need to register participants, communicate with attendees and their parents
                or guardians, support safety and accessibility, manage food and event logistics, run judging, process
                sponsorships, and operate the event. We use trusted services like Google Forms, Devpost, and Stripe, and
                we keep your information only as long as we need it.
              </p>
            </div>

            {/* What Information We Collect */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What Information We Collect</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We collect the information we need to run a safe, well-organized event. Depending on how you take part,
                  that can include:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Participant details</strong> – name, preferred name, email, phone, school or institution,
                      and grade, year, or student status
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Age</strong> – whether you are 18 or older
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Event logistics</strong> – t-shirt size, dietary restrictions, and any accessibility or
                      support needs you share
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Project details</strong> – team status, interests, and hardware or project-related
                      information
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Consent for minors</strong> – parent or guardian consent information for participants under
                      18
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Emergency contact</strong> – so we can reach someone if needed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Health and safety information</strong> – allergy, medication, medical, or special-need
                      information you provide through our consent and safety forms
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Photo and video preference</strong> – your photo and video release choice
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Project submissions</strong> – the projects you submit through Devpost
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Sponsor information</strong> – for sponsoring organizations: organization name, public
                      display name, contact name, email, and phone, website, logo, billing contact, billing address,
                      payment preference, invoice and payment status, and related records
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  We only ask for what we need to run the event well, and some details (such as medical or consent
                  information) are collected only through our consent and safety forms.
                </p>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Use Your Information</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">Here's what we do with the information you share:</p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Register and check you in</strong> – to manage sign-ups and confirm attendance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Communicate with you</strong> – event updates, schedule changes, and reminders, including
                      with parents or guardians for minors
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Support safety and accessibility</strong> – including medical and special-need information
                      you provide
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Manage food and logistics</strong> – ordering food and planning the event
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Run judging and awards</strong> – to recognize projects
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Process sponsorships and payments</strong> – invoicing, receipts, and recognition for
                      sponsors
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Operate and improve the event</strong> – including anonymous statistics
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  We don't sell your personal information or use it for unrelated marketing.
                </p>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Third-Party Services</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use some trusted third-party services to help run the event. Each has its own privacy policy:
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div className="text-gray-700">
                      <strong>Google Forms</strong> – We collect registrations through Google Forms. Check out{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Google's Privacy Policy
                      </a>{" "}
                      to learn how they handle data.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div className="text-gray-700">
                      <strong>Jotform</strong> – We use Jotform for consent and waiver forms. See{" "}
                      <a
                        href="https://www.jotform.com/privacy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Jotform's Privacy Policy
                      </a>{" "}
                      for their data practices.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div className="text-gray-700">
                      <strong>Devpost</strong> – Project submissions and judging happen on Devpost. See{" "}
                      <a
                        href="https://devpost.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Devpost's Privacy Policy
                      </a>{" "}
                      for their data practices.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div className="text-gray-700">
                      <strong>Stripe</strong> – Sponsorship payments are processed by Stripe. We never see or store full
                      card numbers; Stripe handles that securely. See{" "}
                      <a
                        href="https://stripe.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Stripe's Privacy Policy
                      </a>{" "}
                      for their data practices.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div className="text-gray-700">
                      <strong>Email service provider</strong> – We use an email service to send event and sponsor
                      communications.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div className="text-gray-700">
                      <strong>Website hosting (Vercel)</strong> – Our website is hosted on Vercel. See{" "}
                      <a
                        href="https://vercel.com/legal/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Vercel's Privacy Policy
                      </a>{" "}
                      for their data practices.
                    </div>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  We chose these services because they're reliable and respected, and they maintain their own security
                  and privacy programs.
                </p>
              </div>
            </div>

            {/* Sponsors & Payments */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Sponsors &amp; Payments</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  If your organization sponsors the event, we collect the details you provide on the sponsorship form,
                  such as your organization name, contact name, email, optional phone and website, billing details, and
                  your logo. We use this information to process your sponsorship, send invoices and receipts, recognize
                  your support, and coordinate the benefits you choose.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Payments are processed by <strong>Stripe</strong>, our payment processor. Card and bank details are
                  entered directly with Stripe and are handled under{" "}
                  <a
                    href="https://stripe.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Stripe's Privacy Policy
                  </a>
                  . We never see or store full card numbers. We keep a record of your sponsorship (organization, amount,
                  status, and contact details) so we can manage payment, send receipts, and follow up.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Any resume sharing with sponsors is opt-in. Participants who are 18 or older can opt in themselves, and
                  participants under 18 can opt in only with parent or guardian permission. We do not share participant
                  contact information with sponsors.
                </p>
              </div>
            </div>

            {/* Data Retention */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Data Retention</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">We keep your information only as long as we need it:</p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Participant registration data</strong> is generally deleted or anonymized within 90 days
                      after the event, unless we need to retain certain records for safety, legal, accounting,
                      dispute-resolution, sponsorship, reporting, or operational purposes
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Sponsor, payment, and invoice records, consent and waiver records, incident and safety
                      records, and other legally necessary records</strong> may be kept longer to meet legal,
                      accounting, and operational needs
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Project submissions</strong> may remain on Devpost according to their terms of service
                      (it's your work, after all!)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Anonymous statistics</strong> (like "30% of participants were first-time hackers") may be
                      kept longer to help us improve future events
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  We aim to hold only what we need, and to delete or anonymize the rest once it is no longer required.
                </p>
              </div>
            </div>

            {/* How We Protect Your Data */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Protect Your Data</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We keep your information safe with sensible, practical measures:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Encryption in transit</strong> – Our site is served over HTTPS, and payment details go
                      directly to Stripe over an encrypted connection.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Limited access</strong> – Personal data is accessible only to the organizers who need it to
                      run the event.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Reputable providers</strong> – We rely on established services (such as Google, Devpost,
                      and Stripe) that maintain their own security programs.
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  No method of storage or transmission is ever 100% secure, but we work to protect your information and
                  to limit what we collect in the first place.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Rights</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  It's your data, and you're in control. Here's what you can do:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Request to see your data</strong> – Want to know what we have on file? Just ask.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Request deletion</strong> – We'll honor deletion requests unless we need to keep certain
                      information for safety, legal, accounting, dispute-resolution, sponsorship, or operational reasons.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Opt out of communications</strong> – You can opt out of non-essential communications. We
                      may still send event-critical messages to registered participants, parents or guardians, or
                      sponsors.
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Seriously, just reach out. We're students too, and we get it. Your data, your choice.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Questions About Your Privacy?</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about how we handle your data, or if you want to exercise any of your
                  rights, we're here to help:
                </p>
                <div className="flex items-start gap-3 mb-4">
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:privacy@southwestmnhacks.org"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      privacy@southwestmnhacks.org
                    </a>
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We'll get back to you as quickly as we can (usually within a few days). No question is too small!
                </p>
              </div>
            </div>

            {/* Updates to This Policy */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Updates to This Policy</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We might update this privacy policy from time to time as we improve the event or if regulations
                  change. If we make any major changes, we'll let you know via email.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Last updated:</strong> June 23, 2026
                </p>
                <p className="text-gray-700 leading-relaxed">
                  You can always check this page for the most current version of our privacy policy.
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 text-center leading-relaxed">
                This is a student-run event organized by passionate students in southwestern Minnesota. We take your
                privacy seriously, but we also keep things simple and straightforward. If something in this policy
                doesn't make sense, please reach out, we're happy to explain in plain English!
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
