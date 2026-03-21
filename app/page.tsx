"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, MapPin, Users, Lightbulb, Sparkles, Brain, BarChart3 } from "lucide-react"
import Link from "next/link"
import { track } from "@vercel/analytics"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CountdownTimer } from "@/components/countdown-timer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HomePage() {
  const [challengeRevealed, setChallengeRevealed] = useState(false)

  useEffect(() => {
    const revealTime = new Date("2026-03-21T08:58:00-05:00")
    const check = () => {
      setChallengeRevealed(new Date() >= revealTime)
    }
    check()
    const interval = setInterval(check, 30000)
    return () => clearInterval(interval)
  }, [])

  const faqs = [
    {
      question: "Do I need coding experience?",
      answer:
        "Not at all! This hackathon is beginner-friendly. We'll have mentors and workshops to help you learn. All you need is enthusiasm and willingness to try something new.",
    },
    {
      question: "How much does it cost?",
      answer: "It's completely free! We'll provide meals, snacks, swag, and all the resources you need to build your project.",
    },
    {
      question: "Can I work alone or do I need a team?",
      answer:
        "Both! You can participate solo or form a team of up to 4 people. We'll also have team formation activities at the start if you want to meet collaborators.",
    },
    {
      question: "What should I bring?",
      answer:
        "Bring your laptop, charger, student ID, and any hardware you want to hack with. We'll provide WiFi, power strips, and snacks throughout the day.",
    },
    {
      question: "Who can participate?",
      answer:
        "This event is open to all students—high school, college, or anyone eager to learn. If you're curious about technology and want to build something, you're welcome here!",
    },
  ]

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "SouthwestMN Hacks - Marshall Edition",
    description:
      "A beginner-friendly full-day hackathon where students and creators come together to turn ideas into real projects. No experience needed—just curiosity and enthusiasm!",
    startDate: "2026-03-21T08:00:00-05:00",
    endDate: "2026-03-21T19:30:00-05:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Upper Conference Center, Southwest Minnesota State University",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1501 State St",
        addressLocality: "Marshall",
        addressRegion: "MN",
        postalCode: "56258",
        addressCountry: "US",
      },
    },
    // TODO: Convert og-image.svg to PNG (1200x630) for full social platform support
    image: ["https://southwestmnhacks.org/og-image.svg"],
    organizer: {
      "@type": "Organization",
      name: "ETM Solutions",
      url: "https://southwestmnhacks.org",
    },
    offers: {
      "@type": "Offer",
      url: "https://southwestmnhacks.org",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2026-01-01T00:00:00-05:00",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Event Schema Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />

      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">
        <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-semibold text-blue-900 mb-6">
          March 21, 2026 • Marshall, MN
        </div>

        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-balance px-2">
          <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            SouthwestMN Hacks
          </span>
          <br />
          <span className="text-gray-900">Marshall Edition</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed text-pretty px-4">
          A beginner-friendly, full-day hackathon where students and creators come together to turn ideas into real
          projects. No experience needed—just curiosity and enthusiasm!
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-16 px-4">
          <Link
            href="/register"
            onClick={() => track('Register Click', { location: 'hero' })}
            className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all font-semibold text-lg inline-block"
          >
            Register Now
          </Link>
          <Link
            href="/sponsor"
            onClick={() => track('Sponsor Click', { location: 'hero' })}
            className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all font-semibold text-lg inline-block"
          >
            Become a Sponsor
          </Link>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* 3 Bullet Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Beginner Friendly</h3>
            <p className="text-gray-600">
              Never coded before? No problem. We'll have mentors and workshops to help you get started.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Build Together</h3>
            <p className="text-gray-600">
              Form teams of 1-4, collaborate with peers, and make new friends in the local tech community.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Win Prizes</h3>
            <p className="text-gray-600">
              Compete for awards and get recognized for your creativity, innovation, and execution.
            </p>
          </div>
        </div>
      </section>

      {/* What is a Hackathon */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">What is a Hackathon?</h2>
          <p className="text-lg leading-relaxed opacity-95 mb-4">
            A hackathon is a creative marathon where people come together to build something amazing in a short amount
            of time. Think of it as a hands-on workshop meets friendly competition.
          </p>
          <p className="text-lg leading-relaxed opacity-95">
            You'll spend the day designing, coding, and presenting a project—whether it's an app, website, hardware
            prototype, or creative solution to a real problem. Along the way, you'll learn new skills, meet mentors, and
            have fun!
          </p>
        </div>
      </section>

      {/* Schwan's Challenge Section */}
      <section id="challenges" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Presented by our Platinum Sponsor
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Schwan's Company Challenge</h2>
          {challengeRevealed ? (
            <p className="text-xl text-gray-600">Choose one of two challenges from our Platinum Sponsor</p>
          ) : (
            <p className="text-xl text-gray-600">Real-world business challenges from Schwan's Company</p>
          )}
        </div>

        {challengeRevealed ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Challenge 1: Knowledge Transfer Agent */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-5">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Knowledge Transfer Agent</h3>
              <p className="text-gray-600 mb-6 flex-1">
                Build an AI-powered agent that helps one person teach another. Your solution should capture knowledge
                from audio, video, screen recordings, or uploaded files. It should organize what it learns and turn
                it into clear training materials like summaries, step-by-step instructions, or quizzes. The agent
                must also help a new learner by guiding them through the captured content and answering their
                questions.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">AI</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Education</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Automation</span>
              </div>
              <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">
                You may use any technology: code, no-code, AI APIs, web apps, mobile apps, or desktop applications.
                Creativity, usability, and working functionality matter more than perfection.
              </p>
            </div>

            {/* Challenge 2: IT Budget Forecasting */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 hover:shadow-xl transition-shadow flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-teal-500 rounded-2xl flex items-center justify-center mb-5">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">IT Hardware & Software Budget Forecasting</h3>
              <p className="text-gray-600 mb-6 flex-1">
                Build a tool that helps IT teams plan and manage hardware and software costs. Users should be able
                to enter expected costs for things like laptops, servers, applications, and subscriptions, then
                forecast totals for up to 5 years. The system should also track actual spending and compare it to
                the original plan. Show planned costs, actual costs, and the difference in a clean format like
                charts, tables, or dashboards.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Data</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Finance</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Dashboard</span>
              </div>
              <p className="text-sm text-gray-500 border-t border-gray-100 pt-4">
                You may use any technology: code, no-code, AI APIs, web apps, mobile apps, or desktop applications.
                Creativity, usability, and working functionality matter more than perfection.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-200 text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Challenges Revealed at Opening Ceremony</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Two real-world business challenges from Schwan's Company will be revealed at the opening ceremony on
              March 21. All teams will choose one challenge to tackle.
            </p>
          </div>
        )}
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
              <div className="text-gray-600">8:00 AM – 7:30 PM</div>
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
          <div className="text-center mt-8">
            <a
              href="https://southwestmn-hacks.devpost.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105 transition-all"
            >
              Submit your project on Devpost →
            </a>
          </div>
        </div>
      </section>

      {/* Schedule Preview */}
      <section id="schedule" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Schedule Preview</h2>
          <p className="text-lg sm:text-xl text-gray-600">A full day of building, learning, and fun!</p>
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

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-2xl border border-gray-200 px-6 overflow-hidden"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-5">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Sponsors Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Sponsors</h2>
          <p className="text-lg sm:text-xl text-gray-600">Thank you to our amazing partners who make this possible!</p>
        </div>

        {/* Platinum Sponsor */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-200 mb-8">
          <div className="text-center">
            <span className="inline-block bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              Platinum Sponsor
            </span>
            <div className="flex justify-center">
              <img
                src="/schwans-logo.png"
                alt="Schwan's"
                className="h-16 sm:h-20 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Hosted By */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl p-8 sm:p-12 text-center text-white mb-8">
          <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Hosted By
          </span>
          <div className="flex justify-center">
            <img
              src="/etm-solutions-logo.jpeg"
              alt="ETM Solutions"
              className="h-16 sm:h-20 object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Sponsor CTA */}
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 sm:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Want to join them?</h3>
          <p className="text-lg sm:text-xl mb-8 opacity-95">
            Help us make this event amazing for our community!
          </p>
          <Link
            href="/sponsor"
            onClick={() => track('Sponsor Click', { location: 'sponsors-section' })}
            className="bg-white text-blue-600 px-8 py-4 rounded-full hover:shadow-xl transition-all font-semibold text-lg inline-block"
          >
            Become a Sponsor
          </Link>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
