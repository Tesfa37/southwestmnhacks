import Link from "next/link"

const GROUPS = [
  {
    heading: "Page designs",
    blurb: "Four complete homepages. Pick one; switching production to it is a one-line change.",
    items: [
      {
        href: "/preview/home/daylight",
        name: "Daylight · currently live at /",
        description:
          "The photo hero kept, everything below it back in the site's own light vocabulary: cream-to-blue ground, white cards, gray text, blue-600 links. Matches /recap, /sponsor, and /resources.",
      },
      {
        href: "/preview/home/classic",
        name: "Classic + proof",
        description:
          "The original hero restored (aurora blobs, shimmer wordmark, rotating word, floating stickers) in front of the new press clipping and named-judges sections. Most familiar, most playful.",
      },
      {
        href: "/preview/home/cinematic",
        name: "Cinematic · dark stage",
        description:
          "The dark version, kept here for comparison. Strongest hero, but it's the one that reads as a different site from every other page.",
      },
      {
        href: "/preview/home/record",
        name: "The Record · daylight editorial",
        description:
          "An independent take: paper ground, Archivo display type, mono labels, and an orange evidence stamp on every real artifact. Light, but a different typographic voice than the rest of the site.",
      },
    ],
  },
  {
    heading: "Sponsor strip under the hero",
    blurb: "Both sit on the Daylight page so only the strip differs.",
    items: [
      {
        href: "/preview/home/strip/static",
        name: "Static · all nine at once",
        description:
          "One quiet row, every sponsor visible the whole time. No motion to suppress for reduced-motion users.",
      },
      {
        href: "/preview/home/strip/marquee",
        name: "Marquee · slowly circulating",
        description:
          "Logos scroll horizontally on a 40s loop. Falls back to the static row when the visitor has reduced motion enabled, so the static version has to work regardless.",
      },
    ],
  },
  {
    heading: "Hero video treatments",
    blurb: "All on the Cinematic page. Video fades in over the photo about a second after load, desktop only.",
    items: [
      {
        href: "/preview/home/video/a",
        name: "A · Animated real photo",
        description:
          "The actual March group photo brought to life: a slow cinematic push-in with subtle crowd motion. Everything on screen really happened.",
      },
      {
        href: "/preview/home/video/b",
        name: "B · Hybrid brand motion",
        description:
          "Abstract brand-gradient light ribbons on a dark stage. No fake people or venue, pure title-sequence energy over the real photo.",
      },
      {
        href: "/preview/home/video/c",
        name: "C · AI b-roll",
        description:
          "Generated cinematic hackathon footage: glowing keyboards, sticky notes, late-night build energy. Most filmic, but the footage itself is not from our event (caption stays honest).",
      },
      {
        href: "/preview/home/video/still",
        name: "Still · no video baseline",
        description: "The cinematic page with the static group photo hero. Zero video bytes, fastest load.",
      },
    ],
  },
]

export default function PreviewIndex() {
  return (
    <main id="main" className="min-h-screen bg-[#0a0a12] text-white px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black mb-2">Homepage previews</h1>
        <p className="text-white/70 mb-10">
          Compare against production at{" "}
          <Link href="/" className="font-semibold text-blue-400 underline underline-offset-2 hover:text-blue-300">
            the live homepage
          </Link>
          , which currently serves Daylight.
        </p>

        {GROUPS.map((group) => (
          <section key={group.heading} className="mb-10">
            <h2 className="text-xl font-bold mb-1">{group.heading}</h2>
            <p className="text-sm text-white/60 mb-4">{group.blurb}</p>
            <div className="flex flex-col gap-4">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-3xl bg-white/5 ring-1 ring-white/10 p-6 transition-colors hover:bg-white/10"
                >
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-white/70">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
