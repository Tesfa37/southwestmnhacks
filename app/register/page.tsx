import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ExternalLink } from "lucide-react"
import {
  EVENT_NAME,
  EVENT_DATES,
  REGISTRATION_DEADLINE,
  REGISTRATION_FORM_URL,
  DISCORD_INVITE_URL,
  CONSENT_FORM_URL,
} from "@/lib/config"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Header />
      <section className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200">
          <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-1.5 rounded-full text-sm font-semibold text-blue-900 mb-6">
            {EVENT_DATES} • SMSU, Marshall, MN
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4 text-gray-900">
            Register for {EVENT_NAME}
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Two days of building, learning, and creating at SMSU. Free to attend, all skill levels welcome.
          </p>
          <p className="text-base font-semibold text-gray-800 mb-8">
            Registration closes {REGISTRATION_DEADLINE}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={REGISTRATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all"
            >
              Register on Google Forms
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href={DISCORD_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all"
            >
              Join the Discord
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-8 leading-relaxed">
            Participants under 18 must have a signed parental consent form on file before check-in. Complete the{" "}
            <a
              href={CONSENT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline font-semibold"
            >
              parental consent form
            </a>{" "}
            ahead of the event.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}
