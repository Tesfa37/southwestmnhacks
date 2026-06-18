import type { ReactNode } from "react"
import { Calendar, Clock, MapPin, Users, Lightbulb, Trophy, ShieldAlert } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { HomeHero } from "@/components/home-hero"
import { ConsentShare } from "@/components/consent-share"
import { Reveal } from "@/components/reveal"
import { SponsorCtaButton } from "@/components/sponsor-cta-button"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  EVENT_NAME,
  EVENT_DATES,
  REGISTRATION_DEADLINE,
  REGISTRATION_FORM_URL,
  VENUE_MAP_URL,
  CONSENT_FORM_URL,
  PARTNERSHIP_LINE,
  DEVPOST_FALL_URL,
  SUPPORT_EMAIL,
  SCHWANS_LINKEDIN_URL,
  SCHWANS_INSTAGRAM_URL,
  ADULT_WAIVER_PDF,
  MINOR_CONSENT_PDF,
  DOCS_UPDATED,
} from "@/lib/config"

export default function HomePage() {
  const faqs: { question: string; answer: ReactNode; text?: string }[] = [
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
      answer: `Fill out the registration form linked throughout this site. Registration closes ${REGISTRATION_DEADLINE}, so sign up early to save your spot.`,
    },
    {
      question: "Can I work alone or do I need a team?",
      answer:
        "Both! You can participate solo or form a team of up to 4 people. We'll also have team formation activities at the start if you want to meet collaborators.",
    },
    {
      question: "Is AI allowed?",
      answer:
        "Yes. AI tools are welcome and encouraged. Use them to learn faster and build more; just be transparent about what you used and make sure you understand your own code.",
    },
    {
      question: "What if I'm under 18?",
      answer: (
        <>
          High school students are welcome, but if you&apos;re under 18, getting the{" "}
          <a
            href={CONSENT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline font-semibold"
          >
            parental consent form
          </a>{" "}
          done is on you. Send it to a parent or guardian and make sure they complete it before check-in. You
          can&apos;t check in without it.
        </>
      ),
      text: "High school students are welcome, but if you're under 18, getting the parental consent form done is on you. Send it to a parent or guardian and make sure they complete it before check-in. You can't check in without it.",
    },
    {
      question: "What should I bring?",
      answer:
        "Bring your laptop, charger, and student ID. Since we run overnight, also pack what you need to rest: a sleeping bag or blanket, a pillow, and a toothbrush. We'll provide WiFi, power, food, and snacks throughout the event.",
    },
    {
      question: "Who can participate?",
      answer:
        "Students ages 14 and up are welcome, including high school, community college, college, and university students. Every skill level belongs here; if you're curious about technology and want to build something, you're in.",
    },
    {
      question: "How do I submit my project?",
      answer: (
        <>
          Submit on the{" "}
          <a
            href={DEVPOST_FALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline font-semibold"
          >
            Fall 2026 Devpost
          </a>{" "}
          before the deadline. We&apos;ll walk you through it during the event, and mentors are around if you get
          stuck.
        </>
      ),
      text: "Submit on the Fall 2026 Devpost before the deadline. We'll walk you through it during the event, and mentors are around if you get stuck.",
    },
  ]

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: EVENT_NAME,
    description:
      "Free 24-hour overnight student hackathon for high school and college students at SMSU in Marshall, MN. Beginner friendly, AI encouraged, and open ended.",
    startDate: "2026-09-12T08:00:00-05:00",
    endDate: "2026-09-13T10:00:00-05:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Southwest Minnesota State University – Upper Conference Center",
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
      email: SUPPORT_EMAIL,
    },
    // TODO: replace the Visit Marshall homepage with the specific Fall 2026 listing
    // URL once available, and add a Marshall Chamber listing here when published.
    sameAs: [DEVPOST_FALL_URL, "https://visitmarshallmn.com", SCHWANS_LINKEDIN_URL, SCHWANS_INSTAGRAM_URL],
    offers: {
      "@type": "Offer",
      url: REGISTRATION_FORM_URL,
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: "2026-06-01T00:00:00-05:00",
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === "string" ? faq.answer : faq.text ?? "",
      },
    })),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Event Schema Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      {/* FAQ Schema Structured Data (crawlable Q&A for Google / AI search) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header Component */}
      <Header />

      {/* Hero Section */}
      <HomeHero />

      {/* 3 Bullet Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
          <Reveal>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Beginner Friendly</h3>
              <p className="text-gray-600">
                Open to all skill levels. Mentors and industry professionals are on hand to help you learn.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Build Together</h3>
              <p className="text-gray-600">
                Team up with 1 to 4 people, share skills, and build something real over the weekend.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 h-full">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Prizes &amp; Mentorship</h3>
              <p className="text-gray-600">
                Compete for prizes, learn from mentors, and present what you build to a panel of judges.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What is a Hackathon */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">What is a Hackathon?</h2>
          <p className="text-lg leading-relaxed opacity-95 mb-4">
            A hackathon is a creative marathon where people come together to build something amazing in a short amount
            of time. Think of it as a hands-on workshop meets friendly competition.
          </p>
          <p className="text-lg leading-relaxed opacity-95">
            Participants spend the time designing, coding, and presenting a project: an app, website, hardware
            prototype, or creative solution to a real problem. Projects are open-ended, and AI tools are welcome and
            encouraged. Along the way, you learn new skills, meet mentors, and have fun.
          </p>
        </div>
        </Reveal>
      </section>

      {/* Event Details */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
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
              <a
                href={VENUE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 underline underline-offset-2 transition-colors"
              >
                SMSU, Marshall, MN
              </a>
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
        </Reveal>
      </section>

      {/* Who Can Participate / Minors */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-200">
          <h2 className="text-3xl font-bold mb-4">Who Can Participate</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Open to high school and college students of all skill levels. Whether this is your first hackathon or your
            tenth, you belong here.
          </p>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start gap-4">
              <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <ShieldAlert className="size-5" />
              </div>
              <div>
                <p className="text-lg text-gray-800 leading-relaxed">
                  <span className="font-bold">Under 18? Getting your consent form done is on you.</span> Send the{" "}
                  <a
                    href={CONSENT_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 underline font-semibold"
                  >
                    parental consent form
                  </a>{" "}
                  to a parent or guardian and make sure they complete it before check-in. You can&apos;t check in
                  without it.
                </p>
                <ConsentShare />
              </div>
            </div>
          </div>

          {/* Read in advance: policy documents */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <p className="font-semibold text-gray-900">Read these before the event</p>
            <p className="text-sm text-gray-500 mb-4">{DOCS_UPDATED}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link
                href="/code-of-conduct"
                className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
              >
                Code of Conduct &amp; Overnight Safety Rules
              </Link>
              <Link
                href="/safety"
                className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
              >
                Safety overview
              </Link>
              <a
                href={ADULT_WAIVER_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
              >
                Adult Waiver (18+)
              </a>
              <a
                href={MINOR_CONSENT_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
              >
                Parent/Guardian Consent (under 18)
              </a>
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
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
        </Reveal>
      </section>

      {/* Sponsors Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
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
                src="/aulden-logo.svg"
                alt="Aulden"
                width={240}
                height={80}
                sizes="200px"
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-600">{PARTNERSHIP_LINE}</p>
        </div>

        {/* Supported by Visit Marshall */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-gray-200 mb-8">
          <span className="inline-block bg-teal-100 text-teal-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            Supported By
          </span>
          <div className="flex justify-center">
            <a
              href="https://visitmarshallmn.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Marshall"
              className="inline-flex hover:opacity-90 transition-opacity"
            >
              <Image
                src="/visit-marshall-logo.png"
                alt="Visit Marshall"
                width={300}
                height={77}
                sizes="280px"
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </a>
          </div>
        </div>

        {/* Sponsor CTA */}
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 sm:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Want to sponsor Fall 2026?</h3>
          <p className="text-lg sm:text-xl mb-8 opacity-95">
            Help us support the next generation of student builders in Southwest Minnesota.
          </p>
          <SponsorCtaButton />
        </div>
        </Reveal>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  )
}
