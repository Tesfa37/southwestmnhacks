import Image from "next/image"
import { ArrowUpRight, Linkedin, Instagram } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { EvidenceStamp } from "@/components/home-record/evidence-stamp"
import { ACTION_PILL, DISPLAY, MUTED } from "@/components/home-record/tokens"
import { MARSHALL_ARTICLE_URL, SCHWANS_LINKEDIN_URL, SCHWANS_INSTAGRAM_URL } from "@/lib/config"

// The strongest artifact gets its own band rather than a slot in a card row:
// it is the only receipt with a physical object to show, and pairing that scan
// with stage photos in a 3-up grid made the row read as mismatched.
export function RecordPress() {
  return (
    <section
      aria-label="Press coverage"
      className="bg-white border-y border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED} mb-3`}>
                In the press
              </p>
              <h2 className={`${DISPLAY} text-3xl sm:text-4xl font-black mb-4`}>
                The local paper covered it.
              </h2>
              <p className={`text-lg ${MUTED} leading-relaxed mb-4`}>
                &ldquo;Two SMSU alum host first-ever Hackathon.&rdquo; The Marshall Independent reported on the March
                event. Afterwards Schwan&apos;s invited the grand-prize team to keep building their project as a paid
                engagement.
              </p>
              {/* Tighter than a row of text links: pills carry their own padding. */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <a href={MARSHALL_ARTICLE_URL} target="_blank" rel="noopener noreferrer" className={ACTION_PILL}>
                  Read the article
                  <ArrowUpRight className="size-4" />
                </a>
                <a href={SCHWANS_LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={ACTION_PILL}>
                  <Linkedin className="size-4" />
                  Schwan&apos;s on LinkedIn
                </a>
                <a href={SCHWANS_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={ACTION_PILL}>
                  <Instagram className="size-4" />
                  Schwan&apos;s on Instagram
                </a>
              </div>
              <EvidenceStamp>Marshall Independent &middot; March 2026</EvidenceStamp>
            </div>

            <a
              href={MARSHALL_ARTICLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the Marshall Independent article about the hackathon"
              className="mx-auto block w-full max-w-sm"
            >
              <div className="rounded-xl bg-white p-2 ring-1 ring-gray-200 shadow-lg shadow-gray-300/50 transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src="/marshall-independent-article.jpg"
                  alt="Front of the Marshall Independent article: Two SMSU alum host first-ever Hackathon"
                  width={1275}
                  height={1106}
                  sizes="(max-width: 768px) 90vw, 384px"
                  className="w-full rounded-lg"
                />
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
