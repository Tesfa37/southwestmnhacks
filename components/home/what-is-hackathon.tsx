import { Reveal } from "@/components/reveal"
import type { Tone } from "@/components/home/tone"

// The one section that is white-on-color in both tones. Light uses the site's
// standard blue-500/purple-600 panel (see components/event-recap.tsx); dark
// deepens it a stop and adds a ring so it reads as a card on the black stage.
const PANEL: Record<Tone, string> = {
  dark: "bg-gradient-to-br from-blue-600 to-purple-700 ring-1 ring-white/15",
  light: "bg-gradient-to-br from-blue-500 to-purple-600",
}

export function WhatIsHackathon({ tone }: { tone: Tone }) {
  return (
    <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <Reveal>
      <div className={`${PANEL[tone]} rounded-3xl p-12 text-white`}>
        <h2 className="text-4xl font-bold mb-6">What is a Hackathon?</h2>
        <p className="text-lg leading-relaxed opacity-95 mb-4">
          A hackathon is a creative marathon where people come together to build something amazing in a short amount
          of time. Think of it as a hands-on workshop meets friendly competition.
        </p>
        <p className="text-lg leading-relaxed opacity-95">
          Participants spend the time designing, coding, and presenting a project: an app, website, hardware
          prototype, or creative solution to a real problem. Projects are open-ended, and AI tools are welcome and
          encouraged. Along the way, you learn new skills, meet mentors, and have fun.
        </p>
      </div>
      </Reveal>
    </section>
  )
}
