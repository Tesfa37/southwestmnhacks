import { Calendar, Clock, MapPin, Users, Lightbulb, Trophy } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { CountdownTimer } from "@/components/countdown-timer"
import { SponsorCtaButton } from "@/components/sponsor-cta-button"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  EVENT_NAME,
  EVENT_DATES,
  REGISTRATION_DEADLINE,
  REGISTRATION_FORM_URL,
  DISCORD_INVITE_URL,
  CONSENT_FORM_URL,
  PARTNERSHIP_LINE,
} from "@/lib/config"

const BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="

export default function HomePage() {
  const faqs = [
    {
      question: "Do I need coding experience?",
      answer:
        "Not at all! This hackathon is beginner-friendly. We'll have mentors and workshops to help you learn. All you need is enthusiasm and willingness to try something new.",
    },
    {
      question: "How much does it cost?",
      answer:
        "It's completely free! We provide meals, snacks, and the resources you need to build your project.",
    },
    {
      question: "How do I register?",
      answer:
        "Fill out the registration form linked throughout this site. Registration closes September 8, 2026, so sign up early to save your spot.",
    },
    {
      question: "Can I work alone or do I need a team?",
      answer:
        "Both! You can participate solo or form a team of up to 4 people. We'll also have team formation activities at the start if you want to meet collaborators.",
    },
    {
      question: "What if I'm under 18?",
      answer:
        "High school students are welcome. Participants under 18 must have a signed parental consent form on file before check-in. You can find the consent form linked in the registration section.",
    },
    {
      question: "What should I bring?",
      answer:
        "Bring your laptop, charger, and student ID. We'll provide WiFi, power, food, and snacks throughout the event.",
    },
    {
      question: "Who can participate?",
      answer:
        "Open to all students: high school, college, or anyone eager to learn. If you're curious about technology and want to build something, you're welcome.",
    },
  ]

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: EVENT_NAME,
    description:
      "Southwest Minnesota's student hackathon returns for two days of building, learning, and creating at SMSU in Marshall, MN. Free to attend, all skill levels welcome.",
    startDate: "2026-09-12T09:00:00-05:00",
    endDate: "2026-09-13T17:00:00-05:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Southwest Minnesota State University",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1501 State St",
        addressLocality: "Marshall",
        addressRegion: "MN",
        postalCode: "56258",
        addressCountry: "US",
      },
    },
    image: ["https://southwestmnhacks.org/og-image.png"],
    organizer: {
      "@type": "Organization",
      name: "Southwest MN Hacks",
      url: "https://southwestmnhacks.org",
    },
    offers: {
      "@type": "Offer",
      url: REGISTRATION_FORM_URL,
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2026-06-01T00:00:00-05:00",
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
          {EVENT_DATES} • SMSU, Marshall, MN
        </div>

        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-balance px-2">
          <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            {EVENT_NAME}
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed text-pretty px-4">
          Southwest Minnesota&apos;s student hackathon returns for two days of building, learning, and creating at SMSU.
          All skill levels welcome.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-3 px-4">
          <a
            href={REGISTRATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 rounded-full hover:shadow-lg transition-all font-semibold text-lg"
          >
            Register
          </a>
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all font-semibold text-lg inline-flex items-center gap-2"
          >
            Join the Discord
          </a>
        </div>
        <div className="mb-6 px-4">
          <CountdownTimer />
        </div>
        <p className="text-sm text-gray-500 mb-16">Registration closes {REGISTRATION_DEADLINE}.</p>

        {/* 3 Bullet Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Beginner Friendly</h3>
            <p className="text-gray-600">
              Open to all skill levels. Mentors and industry professionals are on hand to help you learn.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Build Together</h3>
            <p className="text-gray-600">
              Team up with 1 to 4 people, share skills, and build something real over the weekend.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Prizes &amp; Mentorship</h3>
            <p className="text-gray-600">
              Compete for prizes, learn from mentors, and present what you build to a panel of judges.
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
            Participants spend the time designing, coding, and presenting a project: an app, website, hardware
            prototype, or creative solution to a real problem. Along the way, you learn new skills, meet mentors, and
            have fun.
          </p>
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
              <div className="font-semibold text-gray-900">Dates</div>
              <div className="text-gray-600">{EVENT_DATES}</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900">Format</div>
              <div className="text-gray-600">Two-day, overnight</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900">Location</div>
              <div className="text-gray-600">SMSU, Marshall, MN</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="font-semibold text-gray-900">Team Size</div>
              <div className="text-gray-600">1 to 4 people</div>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href={REGISTRATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105 transition-all"
            >
              Register Now
            </a>
            <p className="text-sm text-gray-500 mt-3">Registration closes {REGISTRATION_DEADLINE}.</p>
          </div>
        </div>
      </section>

      {/* Who Can Participate / Minors */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-200">
          <h2 className="text-3xl font-bold mb-4">Who Can Participate</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Open to high school and college students of all skill levels. Whether this is your first hackathon or your
            tenth, you belong here.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Participants under 18 must have a signed parental consent form on file before check-in. You can complete the{" "}
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
          <p className="text-lg sm:text-xl text-gray-600">Thank you to the partners who make this possible.</p>
        </div>

        {/* Run in partnership with Aulden */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-gray-200 mb-8">
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            In Partnership With
          </span>
          <div className="flex justify-center">
            <a
              href="https://getaulden.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aulden"
              className="inline-flex hover:opacity-90 transition-opacity"
            >
              <Image
                src="/aulden-logo.png"
                alt="Aulden"
                width={240}
                height={80}
                placeholder="blur"
                blurDataURL={BLUR}
                sizes="200px"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-600">{PARTNERSHIP_LINE}</p>
        </div>

        {/* Sponsor CTA */}
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 sm:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Want to sponsor Fall 2026?</h3>
          <p className="text-lg sm:text-xl mb-8 opacity-95">
            Help us support the next generation of student builders in Southwest Minnesota.
          </p>
          <SponsorCtaButton />
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
