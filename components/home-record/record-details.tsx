import { Reveal } from "@/components/reveal"
import { CountdownTimer } from "@/components/countdown-timer"
import { RegisterCta } from "@/components/register-cta"
import { CARD_TITLE, DISPLAY, MUTED } from "@/components/home-record/tokens"
import {
  EVENT_DATES,
  REGISTRATION_DEADLINE,
  VENUE,
  VENUE_MAP_URL,
} from "@/lib/config"
import type { EventPhase } from "@/lib/event-phase"

const FORMAT = [
  {
    title: "Build",
    line: "Doors open 8 AM Saturday. Teams of up to 4 build through the night, and awards wrap by 10 AM Sunday.",
  },
  {
    title: "Learn",
    line: "Mentors and workshops run all day. Beginners are the point, not the exception. AI tools are welcome; just understand your own code.",
  },
  {
    title: "Win",
    line: "1st, 2nd, and 3rd place take prizes, and every submitted project gets recognition on Devpost. Amounts announced closer to the event.",
  },
]

const DETAILS: { label: string; value: React.ReactNode }[] = [
  { label: "When", value: `${EVENT_DATES}. A 24-hour overnight hackathon.` },
  {
    label: "Where",
    // The venue name is the link, matching record-hero.tsx. A bare "Map" link
    // says nothing to anyone navigating by link list.
    value: (
      <a
        href={VENUE_MAP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
      >
        {VENUE}
      </a>
    ),
  },
  { label: "Cost", value: "Free. Meals and snacks included." },
  {
    label: "Who",
    value:
      "Students ages 14 and up, high school through university, plus recent graduates within one year.",
  },
]

// The format in three plain columns, then the logistics as labeled rows with
// the countdown and the register CTA. No stamps here: plans aren't artifacts.
export function RecordDetails({ phase }: { phase: EventPhase }) {
  return (
    <section aria-label="Event format and details" className="bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED} mb-3`}>The format</p>
            <h2 className={`${DISPLAY} text-3xl sm:text-4xl font-black`}>What happens in 24 hours.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 mb-14">
            {FORMAT.map((item) => (
              <div key={item.title}>
                <h3 className={`${CARD_TITLE} text-xl font-extrabold mb-2`}>{item.title}</h3>
                <p className={`text-sm ${MUTED} leading-relaxed`}>{item.line}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl bg-[#FAFAF8] ring-1 ring-gray-200 p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <dl className="space-y-4">
                {DETAILS.map((row) => (
                  <div key={row.label} className="grid grid-cols-[5rem_1fr] gap-4">
                    <dt className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED} pt-0.5`}>
                      {row.label}
                    </dt>
                    <dd className="text-sm sm:text-base leading-relaxed">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-col items-center text-center gap-6">
                <CountdownTimer />
                <RegisterCta variant="section" location="record-details" initialPhase={phase} />
                {phase === "open" && (
                  <p className={`text-sm ${MUTED}`}>Registration closes {REGISTRATION_DEADLINE}.</p>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
