import { RecordHome } from "@/components/home-record/record-home"
// The FAQ copy is shared with the JSON-LD below, so the schema always matches
// what RecordFaq actually renders.
import { buildFaqs } from "@/components/home/home-faq"
import { getEventPhase } from "@/lib/event-phase"
import {
  EVENT_NAME,
  WAITLIST_FORM_URL,
  EVENT_START_AT,
  EVENT_END_AT,
  SUPPORT_EMAIL,
  DEVPOST_FALL_URL,
  SCHWANS_LINKEDIN_URL,
  SCHWANS_INSTAGRAM_URL,
} from "@/lib/config"

// Hourly: the event has ended, so nothing here is time-sensitive on a 5-minute
// window anymore. Restores the pre-event-weekend default.
export const revalidate = 3600

export default function HomePage() {
  const phase = getEventPhase()
  const faqs = buildFaqs(phase)

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: EVENT_NAME,
    description:
      "Free 24-hour overnight student hackathon for students ages 14+ and recent graduates at SMSU in Marshall, MN. Beginner friendly, AI encouraged, and open ended.",
    startDate: EVENT_START_AT,
    endDate: EVENT_END_AT,
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
    sameAs: [DEVPOST_FALL_URL, "https://visitmarshallmn.com", SCHWANS_LINKEDIN_URL, SCHWANS_INSTAGRAM_URL],
    offers: {
      "@type": "Offer",
      // Only points at the waitlist form while it's actually open; once
      // sign-ups are closed or the event has ended, the offer's own URL
      // should not send crawlers or assistants to a dead sign-up funnel.
      url: phase === "open" ? WAITLIST_FORM_URL : DEVPOST_FALL_URL,
      price: "0",
      priceCurrency: "USD",
      // Sign-ups are waitlist-only while open, so LimitedAvailability is the
      // honest signal: a student can join the line, not claim a seat.
      availability:
        phase === "open"
          ? "https://schema.org/LimitedAvailability"
          : "https://schema.org/SoldOut",
      validFrom: "2026-06-01T00:00:00-05:00",
      validThrough: EVENT_END_AT,
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
    <>
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

      <RecordHome phase={phase} />
    </>
  )
}
