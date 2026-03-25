import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Registration Closed",
  description: "SouthwestMN Hacks took place on March 21, 2026. Registration is now closed. View the event recap and project gallery.",
  robots: { index: false, follow: false },
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Header />
      <section className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200">
          <div className="inline-block bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Registration Closed
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-4 text-gray-900">
            SouthwestMN Hacks has concluded.
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            The event took place on March 21, 2026 in Marshall, MN. Thanks to everyone who participated!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#recap"
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all"
            >
              View the Recap
            </Link>
            <a
              href="https://southwestmn-hacks.devpost.com/project-gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all"
            >
              View Projects on Devpost
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
