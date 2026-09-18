import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RecordJudges } from "@/components/home-record/record-judges"
import { FallStats } from "@/components/home-record/fall-stats"
import { ProjectCard } from "@/components/home-record/project-card"
import { EvidenceStamp } from "@/components/home-record/evidence-stamp"
import { HomeSponsors } from "@/components/home-sponsors"
import { ACTION_PILL } from "@/components/home-record/tokens"
import { BLUR_DATA_URL } from "@/lib/images"
import { VENUE, VENUE_MAP_URL, DEVPOST_FALL_URL } from "@/lib/config"
import { FALL_PROJECTS, getFallWinners } from "@/lib/fall-2026"
import { SCHEDULE, CHALLENGES, BONUS_CHALLENGE } from "@/lib/event-hub"

// Permanent recap; nothing here is date- or phase-driven, so a long ISR window
// is fine — bump only if this page's content changes.
export const revalidate = 86400

const GALLERY_URL = `${DEVPOST_FALL_URL}project-gallery`

// Candid/group photos not already spoken for by a winner card or a judge
// portrait, used for the "moments from the weekend" gallery below.
const GALLERY_PHOTOS: { src: string; alt: string }[] = [
  { src: "/images/fall-2026/Group_photo_2.jpg", alt: "Participants working together at Southwest MN Hacks: Fall 2026" },
  { src: "/images/fall-2026/Group_photo_3.jpg", alt: "Teams building at Southwest MN Hacks: Fall 2026" },
  { src: "/images/fall-2026/IMG_8919.jpg", alt: "A team collaborating overnight at Southwest MN Hacks: Fall 2026" },
  { src: "/images/fall-2026/IMG_8922.jpg", alt: "Students working on their project at Southwest MN Hacks: Fall 2026" },
  { src: "/images/fall-2026/IMG_8926.jpg", alt: "A student presenting at Southwest MN Hacks: Fall 2026" },
  { src: "/images/fall-2026/Group_photo_4.jpg", alt: "Participants at Southwest MN Hacks: Fall 2026" },
  { src: "/images/fall-2026/IMG_8932.jpg", alt: "Teams at work overnight at Southwest MN Hacks: Fall 2026" },
  { src: "/images/fall-2026/Group_photo_5.jpg", alt: "Students at Southwest MN Hacks: Fall 2026" },
  { src: "/images/fall-2026/IMG_8891-1 (dragged).jpg", alt: "A candid moment at Southwest MN Hacks: Fall 2026" },
  { src: "/images/fall-2026/Group_photo_6.jpg", alt: "Participants at Southwest MN Hacks: Fall 2026" },
  { src: "/images/fall-2026/IMG_8936-1 (dragged).jpg", alt: "A candid moment at Southwest MN Hacks: Fall 2026" },
  { src: "/images/fall-2026/Group_photo_7.jpg", alt: "Participants at Southwest MN Hacks: Fall 2026" },
]

export default function FallRecapPage() {
  const winners = getFallWinners()

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF8]">
      <Header />
      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-10">
          <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-[#5B6472] mb-3">
            Past Event ·{" "}
            <a
              href={VENUE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-[#14181F] transition-colors"
            >
              {VENUE}
            </a>
          </p>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] text-balance mb-6 max-w-4xl">
            Southwest MN Hacks: Fall 2026.
          </h1>
          <p className="text-lg sm:text-xl text-[#5B6472] leading-relaxed max-w-2xl mb-8">
            A free 24-hour overnight student hackathon at SMSU in Marshall, MN, September 12&ndash;13, 2026. Thirteen
            teams showed up; twelve shipped a project.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <a href={GALLERY_URL} target="_blank" rel="noopener noreferrer" className={ACTION_PILL}>
              Fall 2026 Devpost gallery
            </a>
            <Link href="/projects" className={ACTION_PILL}>
              Browse all projects
            </Link>
          </div>
        </section>

        <FallStats />

        {/* Hero photo */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <figure className="relative overflow-hidden rounded-xl">
            <div className="relative aspect-[3/2] sm:aspect-[2/1] lg:aspect-[21/9]">
              <Image
                src="/images/fall-2026/Group_photo_1.jpg"
                alt="All participants of Southwest MN Hacks: Fall 2026 gathered at SMSU"
                fill
                priority
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                sizes="(max-width: 1152px) 100vw, 1104px"
                className="object-cover object-[50%_40%]"
              />
            </div>
          </figure>
        </section>

        {/* Winners */}
        <section aria-label="Fall 2026 winners" className="bg-white border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#5B6472] mb-3">
                Results
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">The winners.</h2>
              <p className="text-lg text-[#5B6472]">
                Judged by the panel below. Skillbridge placed 4th and separately won the Creative Award for the
                bonus LED challenge &mdash; two distinct honors, so it appears twice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {winners.map(({ award, project }) => (
                <ProjectCard key={`${award}-${project.id}`} project={project} award={award} />
              ))}
            </div>
          </div>
        </section>

        {/* Judges */}
        <RecordJudges />

        {/* Challenges */}
        <section aria-label="Fall 2026 challenge prompts" className="bg-white border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#5B6472] mb-3">
                The brief
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">What teams were asked to build.</h2>
              <p className="text-lg text-[#5B6472]">
                Every team chose one of three challenge prompts provided by our sponsor, Schwan&apos;s Company.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {CHALLENGES.map((challenge) => (
                <article key={challenge.id} className="rounded-xl bg-[#FAFAF8] ring-1 ring-gray-200 p-6">
                  <h3 className="text-lg font-extrabold tracking-tight mb-3">{challenge.title}</h3>
                  {challenge.body.map((paragraph, i) => (
                    <p key={i} className="text-sm text-[#5B6472] leading-relaxed mb-3 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
            </div>

            <article className="rounded-xl bg-orange-50/60 ring-1 ring-orange-200 p-6 sm:p-8">
              <EvidenceStamp>Bonus challenge · Creative Award</EvidenceStamp>
              <h3 className="text-lg font-extrabold tracking-tight mt-2 mb-3">{BONUS_CHALLENGE.title}</h3>
              {BONUS_CHALLENGE.body.map((paragraph, i) => (
                <p key={i} className="text-sm text-[#5B6472] leading-relaxed mb-3 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </article>
          </div>
        </section>

        {/* Schedule */}
        <section aria-label="Fall 2026 schedule" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-10 max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#5B6472] mb-3">
              The weekend
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">How it went.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SCHEDULE.map((day) => (
              <div key={day.day} className="rounded-xl bg-white ring-1 ring-gray-200 p-6 sm:p-8">
                <h3 className="text-lg font-extrabold tracking-tight mb-4">
                  {day.day}, {day.date}
                </h3>
                <ul className="space-y-3">
                  {day.rows.map((row) => (
                    <li key={row.time} className="flex gap-4 text-sm">
                      <span
                        className={`w-28 shrink-0 font-mono ${row.deadline ? "font-semibold text-orange-700" : "text-[#5B6472]"}`}
                      >
                        {row.time}
                      </span>
                      <span className={row.deadline ? "font-semibold" : ""}>{row.activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Photo gallery */}
        <section aria-label="Photos from Fall 2026" className="bg-white border-y border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#5B6472] mb-3">
                The record
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">Moments from the weekend.</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {GALLERY_PHOTOS.map((photo) => (
                <div key={photo.src} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community story */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#5B6472] mb-3">
              The story
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-6">A community, not just an event.</h2>
            <p className="text-lg text-[#5B6472] leading-relaxed mb-4">
              Fall 2026 was Southwest MN Hacks&apos; second hackathon, growing from the 10 teams of{" "}
              <Link
                href="/events/spring-2026"
                className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
              >
                Spring 2026
              </Link>{" "}
              to 13 teams this time. Prof. Oluleye Babatunde, who mentored and judged the very first event in March,
              returned to the panel for Fall &mdash; the kind of continuity this organization is built around.
            </p>
            <p className="text-lg text-[#5B6472] leading-relaxed">
              See every past event on the{" "}
              <Link href="/events" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2">
                events archive
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Sponsors */}
        <section aria-label="Fall 2026 sponsors and partners" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-gray-200">
          <div className="mb-10 max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#5B6472] mb-3">
              Backed by
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">The partners who made it possible.</h2>
            <p className="text-lg text-[#5B6472]">
              Interested in supporting a future Southwest MN Hacks event?{" "}
              <Link href="/sponsor" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2">
                Get in touch
              </Link>
              .
            </p>
          </div>
          <HomeSponsors />
        </section>

        {/* Full project directory */}
        <section aria-label="All Fall 2026 projects" className="bg-white border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#5B6472] mb-3">
                Fall 2026
              </p>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                All {FALL_PROJECTS.length} projects.
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/projects" className={ACTION_PILL}>
                Browse the full project directory
              </Link>
              <a href={GALLERY_URL} target="_blank" rel="noopener noreferrer" className={ACTION_PILL}>
                Open the Devpost gallery
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
