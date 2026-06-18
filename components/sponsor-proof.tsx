import Image from "next/image"
import { Sparkles, Newspaper, ArrowUpRight, Linkedin, Instagram } from "lucide-react"
import { PartnerLogoWall } from "@/components/partner-logo-wall"
import { SCHWANS_LINKEDIN_URL, SCHWANS_INSTAGRAM_URL } from "@/lib/config"

const ARTICLE_URL =
  "https://www.marshallindependent.com/news/local-news/2026/03/two-smsu-alum-host-first-ever-hackathon/"

// Trust layer: real event photo + success story, press clipping, partner logos.
export function SponsorProof() {
  return (
    <section className="py-16 px-4">
      <div className="container max-w-5xl mx-auto">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-orange-200/60 to-pink-200/60 rotate-2" />
            <Image
              src="/images/dave-schwans.jpg"
              alt="A sponsor representative from Schwan's speaking to students at the event"
              width={640}
              height={427}
              sizes="(max-width: 768px) 100vw, 480px"
              className="w-full rounded-3xl object-cover shadow-lg"
            />
            <p className="mt-3 text-center text-sm text-muted-foreground">
              A sponsor addressing students at our March 2026 event.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <Sparkles className="size-6" />
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              At our previous event, the winning team was offered a paid engagement to continue developing their project
              after the hackathon. Our goal is to create more of those real connections between students and regional
              organizations.
            </p>
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Schwan&apos;s posted about the first event
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href={SCHWANS_LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 font-semibold text-orange-600 hover:underline underline-offset-4"
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                    <Linkedin className="size-5" />
                  </span>
                  See the LinkedIn post
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={SCHWANS_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 font-semibold text-orange-600 hover:underline underline-offset-4"
                >
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-700">
                    <Instagram className="size-5" />
                  </span>
                  See the Instagram post
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Press clipping */}
        <div className="mt-16 grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="order-2 flex flex-col gap-4 md:order-1">
            <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Newspaper className="size-6" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              As featured in the Marshall Independent &middot; March 2026
            </p>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight">
              &ldquo;Two SMSU alum host first-ever Hackathon&rdquo;
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              The local press covered our first event — the students, the projects, and the organizations that made it
              happen.
            </p>
            <a
              href={ARTICLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-orange-600 hover:underline underline-offset-4"
            >
              Read the article
              <ArrowUpRight className="size-4" />
            </a>
          </div>
          <a
            href={ARTICLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read the Marshall Independent article about the hackathon"
            className="order-1 mx-auto block w-full max-w-sm md:order-2"
          >
            <div className="-rotate-2 rounded-2xl bg-white p-2 shadow-xl ring-1 ring-black/5 transition-transform duration-300 hover:rotate-0 hover:scale-[1.02]">
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

        <div className="mt-16 border-t border-border pt-12">
          <PartnerLogoWall />
        </div>
      </div>
    </section>
  )
}
