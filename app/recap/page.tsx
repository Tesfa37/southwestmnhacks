import { Calendar, Clock, MapPin, Users, Sparkles, Brain, BarChart3 } from "lucide-react"
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

      {/* Event Details */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200">
          <h2 className="text-3xl font-bold mb-8 text-center">Event Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900">Date</div>
              <div className="text-gray-600">March 21, 2026</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900">Time</div>
              <div className="text-gray-600">8:00 AM to 7:30 PM</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900">Location</div>
              <div className="text-gray-600">Upper Conference Center, SMSU</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900">Team Size</div>
              <div className="text-gray-600">1-4 people</div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Event Schedule</h2>
          <p className="text-lg sm:text-xl text-gray-600">How the day unfolded</p>
        </div>
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200">
          <div className="space-y-8">
            <div className="flex gap-4 sm:gap-6">
              <div className="text-right w-20 sm:w-24 flex-shrink-0">
                <div className="font-bold text-base sm:text-lg">8:00 AM</div>
              </div>
              <div className="flex-1 pb-8 border-l-4 border-orange-400 pl-4 sm:pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-orange-400 rounded-full"></div>
                <h4 className="font-bold text-lg sm:text-xl mb-1">Breakfast & Check-in</h4>
                <p className="text-gray-600">Arrive, grab breakfast, and meet other participants</p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6">
              <div className="text-right w-20 sm:w-24 flex-shrink-0">
                <div className="font-bold text-base sm:text-lg">8:30 AM</div>
              </div>
              <div className="flex-1 pb-8 border-l-4 border-blue-400 pl-4 sm:pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-400 rounded-full"></div>
                <h4 className="font-bold text-lg sm:text-xl mb-1">Opening Ceremony & Sponsor Remarks</h4>
                <p className="text-gray-600">Kickoff with organizers, judges, sponsor remarks, and challenge walkthrough</p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6">
              <div className="text-right w-20 sm:w-24 flex-shrink-0">
                <div className="font-bold text-base sm:text-lg">9:00 AM</div>
              </div>
              <div className="flex-1 pb-8 border-l-4 border-purple-400 pl-4 sm:pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-purple-400 rounded-full"></div>
                <h4 className="font-bold text-lg sm:text-xl mb-1">Hacking Begins</h4>
                <p className="text-gray-600">Start building your project with mentor support available</p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6">
              <div className="text-right w-20 sm:w-24 flex-shrink-0">
                <div className="font-bold text-base sm:text-lg">12:30 PM</div>
              </div>
              <div className="flex-1 pb-8 border-l-4 border-green-400 pl-4 sm:pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-green-400 rounded-full"></div>
                <h4 className="font-bold text-lg sm:text-xl mb-1">Lunch</h4>
                <p className="text-gray-600">Recharge with a provided lunch</p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6">
              <div className="text-right w-20 sm:w-24 flex-shrink-0">
                <div className="font-bold text-base sm:text-lg">5:00 PM</div>
              </div>
              <div className="flex-1 pb-8 border-l-4 border-pink-400 pl-4 sm:pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-pink-400 rounded-full"></div>
                <h4 className="font-bold text-lg sm:text-xl mb-1">Submissions Due on Devpost</h4>
                <p className="text-gray-600">Final project submissions close. No extensions.</p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6">
              <div className="text-right w-20 sm:w-24 flex-shrink-0">
                <div className="font-bold text-base sm:text-lg">5:15 PM</div>
              </div>
              <div className="flex-1 pb-8 border-l-4 border-indigo-400 pl-4 sm:pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-indigo-400 rounded-full"></div>
                <h4 className="font-bold text-lg sm:text-xl mb-1">Demos & Judging</h4>
                <p className="text-gray-600">Each team presents their project to the judges</p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6">
              <div className="text-right w-20 sm:w-24 flex-shrink-0">
                <div className="font-bold text-base sm:text-lg">6:30 PM</div>
              </div>
              <div className="flex-1 pb-8 border-l-4 border-teal-400 pl-4 sm:pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-teal-400 rounded-full"></div>
                <h4 className="font-bold text-lg sm:text-xl mb-1">Dinner</h4>
                <p className="text-gray-600">Dinner served while judges deliberate</p>
              </div>
            </div>
            <div className="flex gap-4 sm:gap-6">
              <div className="text-right w-20 sm:w-24 flex-shrink-0">
                <div className="font-bold text-base sm:text-lg">7:30 PM</div>
              </div>
              <div className="flex-1 border-l-4 border-yellow-400 pl-4 sm:pl-6 relative">
                <div className="absolute -left-2 top-0 w-4 h-4 bg-yellow-400 rounded-full"></div>
                <h4 className="font-bold text-lg sm:text-xl mb-1">Awards Ceremony & Closing</h4>
                <p className="text-gray-600">Winners announced, plaques and medals awarded</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appreciation */}
      <Appreciation />

      <Footer />
    </div>
  )
}
