import Image from "next/image"
import { Newspaper, ArrowUpRight, Linkedin, Instagram } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { BAND, BODY_STRONG, HEADING, LINK, MUTED, type Tone } from "@/components/home/tone"
import { BLUR_DATA_URL } from "@/lib/images"
import {
  MARSHALL_ARTICLE_URL,
  SCHWANS_LINKEDIN_URL,
  SCHWANS_INSTAGRAM_URL,
  PARTNERSHIP_LINE,
} from "@/lib/config"

const ICON_CHIP: Record<Tone, string> = {
  dark: "bg-blue-500/15 text-blue-300",
  light: "bg-blue-100 text-blue-700",
}

const CLIPPING_FRAME: Record<Tone, string> = {
  dark: "bg-white shadow-2xl shadow-black/50 ring-1 ring-white/10",
  light: "bg-white shadow-xl shadow-gray-300/60 ring-1 ring-gray-200",
}

// Press + outcome proof: local newspaper coverage, the Schwan's paid-engagement
// story, and the named organizers. Everything here is externally checkable.
//
// Dark renders it as a full-bleed cinematic band over a dimmed event photo.
// Light drops the photo entirely and uses a plain white band: a washed-out
// background photo under gray text reads as muddy, and the site's other pages
// separate sections with white bands and hairline borders, not imagery.
export function PressOutcome({ tone }: { tone: Tone }) {
  const linkClass = `inline-flex items-center gap-1.5 font-semibold ${LINK[tone]} underline underline-offset-2`

  return (
    <section
      aria-label="Press coverage and outcomes"
      className={`relative overflow-hidden ${BAND[tone]}`}
    >
      {tone === "dark" && (
        <>
          <Image
            src="/images/2nd-place.jpg"
            alt=""
            aria-hidden="true"
            fill
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[#0a0a12]/85" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-[#0a0a12] via-transparent to-[#0a0a12]"
          />
        </>
      )}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div
                className={`inline-flex size-12 items-center justify-center rounded-2xl ${ICON_CHIP[tone]}`}
              >
                <Newspaper className="size-6" />
              </div>
              <p className={`text-sm font-semibold uppercase tracking-wider ${MUTED[tone]}`}>
                As featured in the Marshall Independent &middot; March 2026
              </p>
              <h2 className={`text-2xl md:text-3xl font-bold leading-tight ${HEADING[tone]}`}>
                &ldquo;Two SMSU alum host first-ever Hackathon&rdquo;
              </h2>
              <p className={`text-lg leading-relaxed ${BODY_STRONG[tone]}`}>
                The results were real too: after the event, Schwan&apos;s invited the grand-prize team to keep building
                their project as a paid engagement.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <a href={MARSHALL_ARTICLE_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Read the article
                  <ArrowUpRight className="size-4" />
                </a>
                <a href={SCHWANS_LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Linkedin className="size-4" />
                  Schwan&apos;s on LinkedIn
                </a>
                <a href={SCHWANS_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Instagram className="size-4" />
                  Schwan&apos;s on Instagram
                </a>
              </div>
              <p className={`mt-2 text-sm ${MUTED[tone]}`}>
                Organized by Bityana Yishak and Tesfatsion Desta. {PARTNERSHIP_LINE}
              </p>
            </div>
            <a
              href={MARSHALL_ARTICLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the Marshall Independent article about the hackathon"
              className="mx-auto block w-full max-w-sm"
            >
              <div
                className={`-rotate-2 rounded-2xl p-2 ${CLIPPING_FRAME[tone]} transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]`}
              >
                <Image
                  src="/marshall-independent-article.jpg"
                  alt="Front of the Marshall Independent article: Two SMSU alum host first-ever Hackathon"
                  width={1275}
                  height={1106}
                  sizes="(max-width: 768px) 90vw, 384px"
                  className="w-full rounded-xl"
                />
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
