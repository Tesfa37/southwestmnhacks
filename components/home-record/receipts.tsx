import { Reveal } from "@/components/reveal"
import { EvidenceStamp } from "@/components/home-record/evidence-stamp"
import { ACTION_PILL, CARD_TITLE, DISPLAY, MUTED } from "@/components/home-record/tokens"
import { DEVPOST_SPRING_URL, SCHWANS_LINKEDIN_URL } from "@/lib/config"

interface Receipt {
  stamp: string
  title: string
  line: string
  href: string
  linkLabel: string
}

// Every claim here is verifiable outside this site. Facts match lib/event-stats.ts.
// The press clipping used to live here too; it has its own band above, because it
// is the only receipt with a physical artifact to show and a card row with one
// image and two blanks reads as unfinished.
const RECEIPTS: Receipt[] = [
  {
    stamp: "Schwan’s Company · After the event",
    title: "A winning team got hired.",
    line: "Schwan’s, our platinum sponsor in March, hired one of the winning teams after the event.",
    href: SCHWANS_LINKEDIN_URL,
    linkLabel: "See Schwan’s post",
  },
  {
    stamp: "Devpost · Public gallery",
    title: "All 10 projects are public.",
    line: "Ten teams competed and every one of them shipped. Browse the code and demos from March.",
    href: `${DEVPOST_SPRING_URL}project-gallery`,
    linkLabel: "Browse the gallery",
  },
]

export function Receipts() {
  return (
    <section id="receipts" aria-label="Proof from the March 2026 event" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <Reveal>
        <div className="mb-10 max-w-2xl">
          <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED} mb-3`}>The record</p>
          <h2 className={`${DISPLAY} text-3xl sm:text-4xl font-black mb-3`}>Don&apos;t take our word for it.</h2>
          <p className={`text-lg ${MUTED}`}>The first event left a paper trail. Here is the rest of it.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {RECEIPTS.map((receipt) => (
            <article
              key={receipt.stamp}
              className="flex flex-col rounded-xl bg-white ring-1 ring-gray-200 p-6"
            >
              <EvidenceStamp>{receipt.stamp}</EvidenceStamp>
              <h3 className={`${CARD_TITLE} text-xl font-extrabold mt-2 mb-2`}>{receipt.title}</h3>
              <p className={`text-sm ${MUTED} leading-relaxed mb-4 flex-1`}>{receipt.line}</p>
              <a href={receipt.href} target="_blank" rel="noopener noreferrer" className={`${ACTION_PILL} w-fit`}>
                {receipt.linkLabel}
              </a>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
