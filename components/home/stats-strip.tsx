import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { MARCH_2026_STATS, MARCH_2026_SCHOOLS_LINE } from "@/lib/event-stats"
import { DEVPOST_SPRING_URL } from "@/lib/config"

// NOT CURRENTLY MOUNTED: numbers are intentionally off the homepage for now.
// Remount (and restyle for the dark stage) when fresh stats warrant it.
// Proof band: real numbers from the March 2026 event, each one checkable via
// the recap or Devpost. Deliberately sober styling; the numbers do the talking.
export function StatsStrip() {
  const stats = MARCH_2026_STATS.filter((s) => s.value !== null)

  return (
    <section aria-label="March 2026 results" className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <Reveal>
        <div className="bg-white rounded-3xl px-8 py-10 shadow-sm border border-gray-200">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 text-center mb-8">
            Our first event, March 2026, by the numbers
          </p>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd className="text-5xl font-black tabular-nums text-gray-900">{stat.value}</dd>
                <dt className="mt-2 text-gray-600">{stat.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center text-gray-600">{MARCH_2026_SCHOOLS_LINE}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
            <Link
              href="/recap"
              className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              See the full March 2026 recap
              <ArrowUpRight className="size-4" />
            </Link>
            <a
              href={DEVPOST_SPRING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              All 10 projects on Devpost
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
