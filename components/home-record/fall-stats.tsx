import { Reveal } from "@/components/reveal"
import { MUTED } from "@/components/home-record/tokens"
import { FALL_STATS } from "@/lib/fall-2026"

const STATS: { value: string; label: string }[] = [
  { value: `${FALL_STATS.hours}`, label: "hours" },
  { value: `${FALL_STATS.teams}`, label: "teams" },
  { value: `${FALL_STATS.projects}`, label: "projects shipped" },
  { value: `${FALL_STATS.judges}`, label: "judges" },
]

/**
 * Fall 2026 at a glance. Deliberately not a registration/Devpost participant
 * count — the confirmed organizer figures (hours, teams, shipped projects,
 * judges) are what represent the event, not a funnel metric.
 */
export function FallStats() {
  return (
    <section aria-label="Fall 2026 at a glance" className="max-w-6xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14">
      <Reveal>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 rounded-xl bg-white ring-1 ring-gray-200 px-6 py-8 sm:px-10">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dd className="text-3xl sm:text-4xl font-black text-[#14181F]">{stat.value}</dd>
              <dt className={`mt-1 font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED}`}>
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
