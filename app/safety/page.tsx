import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Shield,
  Ban,
  Moon,
  DoorClosed,
  BedDouble,
  AlertTriangle,
  Megaphone,
  Users,
  Camera,
  FileText,
} from "lucide-react"
import {
  CODE_OF_CONDUCT_PDF,
  ADULT_WAIVER_PDF,
  MINOR_CONSENT_PDF,
  CONSENT_FORM_URL,
  DOCS_UPDATED,
} from "@/lib/config"

export const metadata: Metadata = {
  title: { absolute: "Safety & Overnight Rules | Southwest MN Hacks: Fall 2026" },
  description:
    "What to expect overnight at Southwest MN Hacks: Fall 2026 — prohibited items, quiet hours, overnight access, rest areas, emergencies, reporting, and rules for minors. The full Code of Conduct is the binding version.",
}

const CARDS = [
  {
    icon: Ban,
    accent: "from-red-400 to-pink-400",
    title: "Prohibited items",
    body: "Alcohol, illegal drugs, tobacco, vaping, cannabis, and other controlled substances are prohibited — there is no designated-area exception. Firearms, explosives, and other weapons are prohibited under SMSU campus policy, including for participants who hold a carry permit.",
  },
  {
    icon: Moon,
    accent: "from-blue-400 to-purple-400",
    title: "Quiet hours",
    body: "Quiet hours run approximately midnight to 6:00 AM. Play audio through headphones and keep conversation low in and near rest areas so everyone can rest.",
  },
  {
    icon: DoorClosed,
    accent: "from-orange-400 to-pink-400",
    title: "Overnight access",
    body: "Stay in event areas overnight — don't roam the building or campus alone. Once the building is secured, sign out before you leave and sign back in, and re-enter only through the monitored entrance. Wear your name tag at all times.",
  },
  {
    icon: BedDouble,
    accent: "from-teal-400 to-blue-400",
    title: "Rest areas",
    body: "Sleep only in designated rest areas, and only in one assigned to you. No photography, video, or audio recording in or of rest areas, at any time.",
  },
  {
    icon: AlertTriangle,
    accent: "from-amber-400 to-orange-400",
    title: "If something goes wrong",
    body: "If you feel unwell, are injured, witness an incident, or see something unsafe, notify an organizer immediately. In a life-threatening emergency, call 911 first, then notify an organizer. Follow all evacuation directions on-site.",
  },
  {
    icon: Megaphone,
    accent: "from-pink-400 to-rose-400",
    title: "How to report",
    body: "Report concerns to any organizer in person, or by text or call to the numbers posted at registration. Safety or emergency concerns go directly to SMSU Public Safety; sex- or gender-based misconduct may also be reported to SMSU's Title IX office.",
  },
  {
    icon: Users,
    accent: "from-green-400 to-teal-400",
    title: "Minors & pickup",
    body: "Participants 18+ sign the Adult Waiver. Under 18 requires the Parent/Guardian Consent and medical authorization. If a minor is removed from the event, a parent, guardian, or authorized pickup adult must collect them promptly — at any hour during the overnight period.",
  },
  {
    icon: Camera,
    accent: "from-purple-400 to-indigo-400",
    title: "Photos & media",
    body: "You'll grant or decline a media release during registration. Participants who opt out receive a visual indicator at check-in so organizers and photographers can respect their choice.",
  },
]

export default function SafetyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 px-4 md:py-28 bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="container max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6">
              <Shield className="size-4" />
              Safety & Overnight Rules
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">
              Staying safe overnight
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              We run for 24 hours, including overnight, so a few rules keep everyone safe and rested. Here are the
              highlights. The full{" "}
              <Link href="/code-of-conduct" className="text-blue-600 hover:text-blue-700 underline font-semibold">
                Code of Conduct and Overnight Safety Rules
              </Link>{" "}
              is the binding version.
            </p>
          </div>
        </section>

        {/* Highlights grid */}
        <section className="py-16 px-4">
          <div className="container max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CARDS.map((card) => (
                <div
                  key={card.title}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`inline-flex items-center justify-center size-12 rounded-2xl bg-gradient-to-br ${card.accent} text-white mb-5`}
                  >
                    <card.icon className="size-6" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold mb-3">{card.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents */}
        <section className="py-12 px-4 pb-20">
          <div className="container max-w-3xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">The documents</h2>
              <p className="text-gray-600 mb-6">
                Read these in advance. You&apos;ll complete the official versions through the registration and consent
                forms. <span className="text-gray-500">{DOCS_UPDATED}</span>
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href="/code-of-conduct"
                  className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                >
                  <Shield className="size-4" />
                  Code of Conduct &amp; Overnight Safety Rules (full text)
                </Link>
                <a
                  href={CODE_OF_CONDUCT_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                >
                  <FileText className="size-4" />
                  Code of Conduct (PDF)
                </a>
                <a
                  href={ADULT_WAIVER_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                >
                  <FileText className="size-4" />
                  Adult Waiver — for participants 18+ (PDF)
                </a>
                <a
                  href={MINOR_CONSENT_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                >
                  <FileText className="size-4" />
                  Parent/Guardian Consent — for participants under 18 (PDF)
                </a>
                <a
                  href={CONSENT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                >
                  <Users className="size-4" />
                  Complete the parent/guardian consent form (under 18)
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
