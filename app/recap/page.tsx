import { Sparkles, Brain, BarChart3 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventRecap } from "@/components/event-recap"
import { Winners } from "@/components/winners"
import { Appreciation } from "@/components/appreciation"
import { WinnerContinuationBadge } from "@/components/winner-continuation-badge"

export default function RecapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Header />

      <main id="main" className="flex-1">
      {/* Recap intro */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        <div className="inline-block bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2 rounded-full text-sm font-semibold text-orange-900 mb-6">
          Past Event
        </div>
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight text-balance px-2">
          <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Southwest MN Hacks 2026 Recap
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-pretty px-4">
          A look back at Southwest Minnesota&apos;s first student hackathon, held March 21, 2026 at SMSU in Marshall, MN.
        </p>
      </section>

      {/* Event Recap */}
      <EventRecap />

      {/* Winners */}
      <Winners />

      {/* From Hackathon to Production */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="relative bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C8102E]"
          />
          <div className="p-8 sm:p-10 pl-10 sm:pl-12">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
              After the Hackathon
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-5">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                From Hackathon to Production
              </h2>
              <WinnerContinuationBadge />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              After the awards ceremony, Schwan&apos;s Company invited The Balancers to keep building IT Budget Strategist past the prototype stage. The team accepted and is now developing the tool further as a paid engagement with Schwan&apos;s. A 12-hour hackathon build became real software for a real customer, which is exactly the kind of outcome this event was designed to make possible.
            </p>
          </div>
        </div>
      </section>

      {/* Schwan's Challenge Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Presented by our Platinum Sponsor
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Schwan&apos;s Company Challenge</h2>
          <p className="text-xl text-gray-600">Two real-world challenges that drove all 10 projects</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Challenge 1: Knowledge Transfer Agent */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-5">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Knowledge Transfer Agent</h3>
            <p className="text-gray-600 mb-6 flex-1">
              Build an AI-powered agent that helps one person teach another. Capture knowledge from audio, video,
              screen recordings, or uploaded files. Organize it into clear training materials like summaries,
              step-by-step instructions, or quizzes. Guide a new learner through the captured content and answer
              their questions.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">AI</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Education</span>
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Automation</span>
            </div>
            <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">
              Teams used any technology of their choice. Creativity, usability, and working functionality were
              prioritized over perfection.
            </p>
          </div>

          {/* Challenge 2: IT Budget Forecasting */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-teal-500 rounded-2xl flex items-center justify-center mb-5">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">IT Hardware &amp; Software Budget Forecasting</h3>
            <p className="text-gray-600 mb-6 flex-1">
              Build a tool that helps IT teams plan and manage hardware and software costs. Enter expected costs
              for laptops, servers, applications, and subscriptions, then forecast totals for up to 5 years. Track
              actual spending against the original plan and display planned costs, actuals, and variance in a clean
              format like charts, tables, or dashboards.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Data</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Finance</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Dashboard</span>
            </div>
            <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">
              Teams used any technology of their choice. Creativity, usability, and working functionality were
              prioritized over perfection.
            </p>
          </div>
        </div>
      </section>

      {/* Appreciation */}
      <Appreciation />
      </main>

      <Footer />
    </div>
  )
}
