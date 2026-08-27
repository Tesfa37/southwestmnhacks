import { Lightbulb, Users, Trophy } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { BODY, SURFACE, type Tone } from "@/components/home/tone"

const CARDS = [
  {
    Icon: Lightbulb,
    iconClass: "from-orange-400 to-pink-400",
    title: "Beginner Friendly",
    body: "Open to all skill levels. Mentors and industry professionals are on hand to help you learn.",
  },
  {
    Icon: Users,
    iconClass: "from-blue-400 to-purple-400",
    title: "Build Together",
    body: "Team up with 1 to 4 people, share skills, and build something real over the weekend.",
  },
  {
    Icon: Trophy,
    iconClass: "from-green-400 to-teal-400",
    title: "Prizes & Mentorship",
    body: "Compete for prizes, learn from mentors, and present what you build to a panel of judges.",
  },
]

export function HighlightCards({ tone }: { tone: Tone }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
        {CARDS.map(({ Icon, iconClass, title, body }, i) => (
          <Reveal key={title} delay={i * 0.12}>
            <div className={`rounded-3xl ${SURFACE[tone]} p-8 h-full`}>
              <div
                className={`w-12 h-12 bg-gradient-to-br ${iconClass} rounded-2xl flex items-center justify-center mb-4`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className={BODY[tone]}>{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
