import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BLUR_DATA_URL } from "@/lib/images"

export const metadata: Metadata = {
  alternates: { canonical: "/events" },
  title: "Past Events",
  description:
    "Every Southwest MN Hacks event to date: Fall 2026 and Spring 2026 at SMSU in Marshall, MN. See the winners, projects, and people from each one.",
}

interface EventCard {
  slug: string
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
}

// Newest first. Add an entry here (and a matching /events/<slug> page) after
// each future event; this page never needs a live-vs-past conditional because
// every event listed here has already happened.
const EVENTS: EventCard[] = [
  {
    slug: "fall-2026",
    eyebrow: "September 12–13, 2026 · SMSU, Marshall, MN",
    title: "Fall 2026",
    description:
      "24 hours, 13 teams, 12 shipped projects, and 3 judges. The newest and largest Southwest MN Hacks event.",
    image: "/images/fall-2026/Group_photo_1.jpg",
    imageAlt: "Participants of Southwest MN Hacks: Fall 2026 gathered at SMSU",
  },
  {
    slug: "spring-2026",
    eyebrow: "March 21, 2026 · SMSU, Marshall, MN",
    title: "Spring 2026",
    description: "Southwest Minnesota's first-ever student hackathon. 10 teams, one Schwan's-sponsored challenge.",
    image: "/images/group-photo.jpg",
    imageAlt: "All participants gathered at Southwest MN Hacks, March 2026",
  },
]

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF8]">
      <Header />
      <main id="main" className="flex-1">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10">
          <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-[#5B6472] mb-3">
            Southwest MN Hacks
          </p>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-black tracking-tight mb-4 max-w-3xl">Past events.</h1>
          <p className="text-lg text-[#5B6472] max-w-2xl">
            Every hackathon we&apos;ve run, in order. Each one has its own full recap: winners, projects, judges,
            sponsors, and the story of what happened.
          </p>
        </section>

        <section aria-label="Event archive" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {EVENTS.map((event) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="group flex flex-col rounded-xl bg-white ring-1 ring-gray-200 overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={event.image}
                    alt={event.imageAlt}
                    fill
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#5B6472] mb-2">
                    {event.eyebrow}
                  </p>
                  <h2 className="text-2xl font-extrabold tracking-tight mb-2">{event.title}</h2>
                  <p className="text-sm text-[#5B6472] leading-relaxed flex-1">{event.description}</p>
                  <span className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                    See the recap &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
