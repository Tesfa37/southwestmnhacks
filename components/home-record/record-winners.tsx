import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { EvidenceStamp } from "@/components/home-record/evidence-stamp"
import { ACTION_PILL, CARD_TITLE, DISPLAY, MUTED } from "@/components/home-record/tokens"
import { BLUR_DATA_URL } from "@/lib/images"
import { DEVPOST_SPRING_URL } from "@/lib/config"

// Top three from March; data matches components/winners.tsx on /recap.
const WINNERS = [
  {
    stamp: "Grand Prize · March 2026",
    team: "The Balancers",
    project: "IT Budget Strategist",
    members: "Pradunna Pudasaini, Sarthak Adhikari, Luis Miguel Heyaime Bayonet",
    devpost: "https://devpost.com/software/it-budgeting-and-forecasting",
    photo: "/images/1st-place.jpg",
  },
  {
    stamp: "2nd Place · March 2026",
    team: "Horizon",
    project: "Horizon",
    members: "Sebastian Batista Ferrera, Noel Hernandez, Aidan Pereyra, Diego Vicente Bello Polanco",
    devpost: "https://devpost.com/software/horizon-8i3u2h",
    photo: "/images/2nd-place.jpg",
  },
  {
    stamp: "3rd Place · March 2026",
    team: "KnowledgeFlow",
    project: "KnowledgeFlow",
    members: "Biruk Ayalew, Ebunoluwa Shokefun, Kaleab Debela",
    devpost: "https://devpost.com/software/knowledgeflow",
    photo: "/images/3rd-place.jpg",
  },
]

export function RecordWinners() {
  return (
    <section aria-label="Winning teams from March 2026" className="bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED} mb-3`}>Results</p>
            <h2 className={`${DISPLAY} text-3xl sm:text-4xl font-black mb-3`}>What students built last time.</h2>
            <p className={`text-lg ${MUTED}`}>
              Real teams, real names, real code. Every project links to its public Devpost page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WINNERS.map((winner) => (
              <figure key={winner.team} className="flex flex-col rounded-xl bg-[#FAFAF8] ring-1 ring-gray-200 overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={winner.photo}
                    alt={`${winner.team}, ${winner.stamp.split(" · ")[0]} winners at Southwest MN Hacks`}
                    fill
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="flex flex-col flex-1 p-6">
                  <EvidenceStamp>{winner.stamp}</EvidenceStamp>
                  <h3 className={`${CARD_TITLE} text-xl font-extrabold mt-2`}>
                    {winner.team}
                    {winner.project !== winner.team && (
                      <span className={`text-base font-semibold ${MUTED}`}> · {winner.project}</span>
                    )}
                  </h3>
                  <p className={`text-sm ${MUTED} mb-4 flex-1`}>{winner.members}</p>
                  <a
                    href={winner.devpost}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${ACTION_PILL} w-fit`}
                  >
                    Project on Devpost
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className={`mt-6 text-sm ${MUTED}`}>
            All 10 projects are on the{" "}
            <a
              href={`${DEVPOST_SPRING_URL}project-gallery`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              Devpost gallery
            </a>
            , and the full story is in the{" "}
            <Link href="/recap" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-2">
              recap
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  )
}
