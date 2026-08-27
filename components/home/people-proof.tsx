import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { BODY, HEADING, LINK, MUTED, SURFACE, type Tone } from "@/components/home/tone"
import { BLUR_DATA_URL } from "@/lib/images"

interface Person {
  src: string
  alt: string
  name: string
  role: string
  line: string
}

const PEOPLE: Person[] = [
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
    // Dated on purpose: Schwan's were Platinum in March, Gold for Fall 2026, and
    // this page shows the Fall tier pill a few sections further down.
    role: "Schwan's Company, March 2026 Platinum Sponsor",
    line: "Sponsored the event, brought food for participants, and stepped in as a judge.",
  },
]

// Named, photographed people who ran the last event: professors, judges, and a
// sponsor rep. Names and roles match the recap page.
export function PeopleProof({ tone }: { tone: Tone }) {
  return (
    <section aria-label="Mentors and judges from March 2026" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <Reveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">The people in the room</h2>
          <p className={`text-lg ${BODY[tone]}`}>
            Real professors, judges, and sponsors showed up in March. They&apos;re why students leave with more than a
            project.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PEOPLE.map((person) => (
            <div key={person.name} className={`rounded-3xl ${SURFACE[tone]} overflow-hidden`}>
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
              <div className="p-6">
                <h3 className={`font-bold ${HEADING[tone]}`}>{person.name}</h3>
                <p className={`text-sm ${MUTED[tone]} mb-2`}>{person.role}</p>
                <p className={`text-sm ${BODY[tone]} leading-relaxed`}>{person.line}</p>
              </div>
            </div>
          ))}
        </div>
        <p className={`mt-6 text-center text-sm ${MUTED[tone]}`}>
          More about them in the{" "}
          <Link href="/recap" className={`font-semibold ${LINK[tone]} underline underline-offset-2`}>
            March 2026 recap
          </Link>
          .
        </p>
      </Reveal>
    </section>
  )
}
