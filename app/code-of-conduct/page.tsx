import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, FileText } from "lucide-react"
import { SUPPORT_EMAIL, CODE_OF_CONDUCT_PDF, DOCS_UPDATED } from "@/lib/config"

export const metadata: Metadata = {
  alternates: { canonical: "/code-of-conduct" },
  title: { absolute: "Code of Conduct | Southwest MN Hacks" },
  description:
    "The Southwest MN Hacks: Fall 2026 Code of Conduct and Overnight Safety Rules: respect, harassment-free environment, prohibited items, overnight conduct, reporting, and enforcement.",
}

const SECTIONS = [
  {
    title: "1. Respect and Inclusion",
    body: [
      "I will treat all participants, organizers, mentors, judges, sponsors, SMSU staff, and venue staff with respect. Southwest MN Hacks is a welcoming environment regardless of race, color, religion, national origin, sex, gender identity or expression, sexual orientation, age, disability, marital or family status, veteran status, or any other protected characteristic. Discriminatory language and conduct are not permitted.",
    ],
  },
  {
    title: "2. Harassment-Free Environment",
    body: [
      "Southwest MN Hacks has zero tolerance for harassment. Harassment includes unwelcome verbal, physical, or visual conduct that creates an intimidating, hostile, or offensive environment. Examples include sexual harassment, bullying, intimidation, sustained disruption of sessions, unwanted physical contact, intrusive photography or recording, and stalking.",
      "Harassment-related concerns must be reported to event organizers, SMSU Public Safety, and SMSU's Title IX office. Southwest MN Hacks will respond to reports in accordance with its incident response procedures.",
    ],
  },
  {
    title: "3. Alcohol, Drugs, and Weapons",
    body: [
      "Alcohol, illegal drugs, tobacco, vaping, cannabis, and other controlled substances are prohibited at the event. Possession, use, or attending while impaired is grounds for immediate removal.",
      "Firearms, explosives, and other weapons are prohibited at the venue in accordance with SMSU campus policy. This prohibition includes participants who may otherwise hold a carry permit.",
    ],
  },
  {
    title: "4. Overnight Conduct",
    body: [
      "I will remain in event areas during the overnight period and will not roam unaccompanied through the rest of the building or campus. After the building is secured, re-entry to the venue is only through the monitored entrance designated by the organizers, and only after signing back in.",
      "Quiet hours are observed approximately from midnight to 6:00 AM. During quiet hours, audio must be played through headphones, and conversation should be kept low in and near rest areas. I will follow direction from organizers, SMSU staff, and SMSU Public Safety at all times.",
    ],
  },
  {
    title: "5. Sleeping and Rest Areas",
    body: [
      "Sleeping is permitted only in designated rest areas. Rest area assignments, supervision, and access control will follow the final safety plan approved by Southwest MN Hacks and SMSU Public Safety.",
      "Photography, video recording, and audio recording in or of rest areas are not permitted at any time. I will not enter a rest area that has not been designated for me, and I will respect any access restrictions posted or communicated by organizers.",
    ],
  },
  {
    title: "6. Restricted Areas and Property Care",
    body: [
      "Areas of the SMSU campus that are not part of the event footprint are off-limits unless I am invited or escorted by an organizer or SMSU staff. This includes custodial and mechanical spaces, locked offices, kitchen areas not designated for participant use, and any room marked as restricted.",
      "I will treat the venue, its furnishings, and the property of others with care. I will not damage, deface, or modify property, and I will clean up after myself in food and work areas. Hardware and personal items I bring to the event remain my responsibility.",
    ],
  },
  {
    title: "7. Health, Safety, and Emergencies",
    body: [
      "If I feel unwell, am injured, witness an incident, or see something unsafe, I will notify an organizer immediately. In a life-threatening emergency, I or any participant should call 911 directly and then notify an organizer.",
      "I will cooperate fully with organizers, SMSU staff, and SMSU Public Safety. In the event of a fire alarm or evacuation order, I will exit immediately through the nearest safe route and follow the directions given on-site.",
    ],
  },
  {
    title: "8. Enforcement Authority and Consequences",
    body: [
      "Southwest MN Hacks organizers and SMSU Public Safety have the authority to enforce this Code. Depending on the nature and severity of a violation, consequences may include a warning, restriction of participation, disqualification from prizes and judging, removal from the event without refund, exclusion from future Southwest MN Hacks events, and referral to SMSU Public Safety or local law enforcement.",
      "For a minor participant who is removed from the event, the parent or guardian or an authorized adult listed at registration will be required to pick up the minor promptly, including at any hour during the overnight period.",
    ],
  },
  {
    title: "9. Reporting Concerns",
    body: [
      "Concerns may be reported to any organizer in person or by text or call to the organizer numbers posted at registration. Concerns involving safety or emergencies must be reported directly to SMSU Public Safety using the contact information posted at the venue. Concerns related to sex- or gender-based misconduct may also be reported through SMSU's Title IX office.",
    ],
  },
]

export default function CodeOfConductPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:py-28 bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="container max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-medium text-sm mb-6">
              <Shield className="size-4" />
              Community Guidelines
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">
              Code of Conduct &amp; Overnight Safety Rules
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed mb-6">
              Required for all participants, and countersigned by a parent or guardian for participants under 18. These
              rules apply at the venue, in any rest areas, on the SMSU campus, and at any event-affiliated location.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={CODE_OF_CONDUCT_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-2.5 font-semibold text-white transition-all hover:shadow-lg"
              >
                <FileText className="size-4" />
                Download the PDF
              </a>
              <span className="text-sm text-gray-500">{DOCS_UPDATED}</span>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto">
            {/* Event facts */}
            <p className="text-gray-700 leading-relaxed mb-10">
              Southwest MN Hacks: Fall 2026 is a 24-hour overnight student hackathon hosted by Southwest MN Hacks, a Minnesota
              nonprofit corporation, at Southwest Minnesota State University on September 12 and 13, 2026. The venue is
              the SMSU Upper Conference Center (or an SMSU-designated space), 1501 State Street, Marshall, MN 56258. This
              Code of Conduct sets the behavior expected of every participant during the event, including the overnight
              period.
            </p>

            {/* Attestation */}
            <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 shadow-lg mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">What you agree to</h2>
              <p className="text-white text-lg leading-relaxed">
                &ldquo;I have read and agree to the Southwest MN Hacks: Fall 2026 Code of Conduct and Overnight Safety
                Rules.&rdquo; You confirm this attestation when you register and again when you check in.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10">
              {SECTIONS.map((section) => (
                <div key={section.title}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{section.title}</h2>
                  <div className="prose prose-lg max-w-none">
                    {section.body.map((paragraph, i) => (
                      <p key={i} className="text-gray-700 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* How to report */}
            <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How to report</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    <strong>An organizer</strong> — in person, or by text or call to the organizer numbers posted at
                    registration.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    <strong>SMSU Public Safety</strong> — for any safety or emergency concern, using the contact
                    information posted at the venue. In a life-threatening emergency, call 911 first.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    <strong>SMSU&apos;s Title IX office</strong> — for concerns related to sex- or gender-based
                    misconduct.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    <strong>Email</strong> —{" "}
                    <a
                      href="mailto:conduct@southwestmnhacks.org"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      conduct@southwestmnhacks.org
                    </a>{" "}
                    for non-urgent conduct concerns.
                  </span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Questions before the event? Email{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-600 hover:text-blue-700 underline">
                  {SUPPORT_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
