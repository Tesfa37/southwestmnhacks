import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { EvidenceStamp } from "@/components/home-record/evidence-stamp"
import { CARD_TITLE, DISPLAY, MUTED } from "@/components/home-record/tokens"
import { BLUR_DATA_URL } from "@/lib/images"

// Names and roles match the recap page and components/home/people-proof.tsx.
const PEOPLE = [
  {
    src: "/images/babatunde.jpg",
    alt: "Prof. Oluleye Babatunde mentoring students at the March 2026 hackathon",
    name: "Prof. Oluleye Babatunde",
    role: "Assistant Professor of Computer Science, SMSU",
    line: "Mentored students throughout the event and served as a judge.",
  },
  {
    src: "/images/dr-dan.jpg",
    alt: "Dr. Dan Kaiser at the March 2026 hackathon, where he served as a judge",
    name: "Dr. Dan Kaiser",
    role: "Professor of Computer Science and Department Chair, SMSU",
    line: "Served as a judge and advised the organizers in the months before the event.",
  },
  {
    src: "/images/dave-schwans.jpg",
    alt: "Dave Deines of Schwan's Company speaking to students at the March 2026 hackathon",
    name: "Dave Deines",
    role: "Schwan's Company, Platinum Sponsor",
    line: "Sponsored the event, brought food for participants, and stepped in as a judge.",
  },
]

export function RecordPeople() {
  return (
    <section aria-label="Mentors and judges from March 2026" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <Reveal>
        <div className="mb-10 max-w-2xl">
          <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED} mb-3`}>In the room</p>
          <h2 className={`${DISPLAY} text-3xl sm:text-4xl font-black mb-3`}>Professors, judges, and sponsors showed up.</h2>
          <p className={`text-lg ${MUTED}`}>
            Named, photographed, and coming back for Fall. They&apos;re why students leave with more than a project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PEOPLE.map((person) => (
            <figure key={person.name} className="rounded-xl bg-white ring-1 ring-gray-200 overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src={person.src}
                  alt={person.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-6">
                <EvidenceStamp>Mar 21, 2026 · SMSU</EvidenceStamp>
                <h3 className={`${CARD_TITLE} text-xl font-extrabold mt-2`}>{person.name}</h3>
                <p className={`text-sm ${MUTED} mb-2`}>{person.role}</p>
                <p className={`text-sm ${MUTED} leading-relaxed`}>{person.line}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className={`mt-6 text-sm ${MUTED}`}>
          More about them in the{" "}
          <Link href="/recap" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2">
            March 2026 recap
          </Link>
          .
        </p>
      </Reveal>
    </section>
  )
}
