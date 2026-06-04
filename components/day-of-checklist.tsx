import { CheckCircle2, Backpack, Upload, Presentation } from "lucide-react"
import { DEVPOST_FALL_URL } from "@/lib/config"

const sections = [
  {
    title: "What to Bring",
    icon: Backpack,
    accent: "from-orange-400 to-pink-400",
    check: "text-orange-500",
    items: [
      "Laptop with charger (required)",
      "Student ID or photo ID",
      "Notebook and pen for brainstorming",
      "Headphones for focused work",
      "Reusable water bottle",
      "Sleeping bag or blanket and a pillow (overnight event)",
      "Toothbrush and basic toiletries",
    ],
  },
  {
    title: "How to Submit Your Project",
    icon: Upload,
    accent: "from-blue-400 to-purple-400",
    check: "text-blue-500",
    items: [
      { text: "Submit on Devpost before the deadline", href: DEVPOST_FALL_URL },
      "Include: project name, challenge, team members",
      "Link to your GitHub repo or live demo",
      "Short video demo (optional, not required)",
      "Brief description of what you built",
    ],
  },
  {
    title: "Demo Presentation Tips",
    icon: Presentation,
    accent: "from-green-400 to-teal-400",
    check: "text-green-500",
    items: [
      "Demos are 3 minutes plus 2 min Q&A",
      "Start with the problem you're solving",
      "Show the working prototype (even if rough!)",
      "Share what you learned and next steps",
      "Judges value creativity and effort over polish",
    ],
  },
]

export function DayOfChecklist() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">On The Day</h2>
          <p className="text-lg text-gray-600 text-balance">Everything you need to know for hackathon day</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div key={section.title} className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div
                className={`inline-flex items-center justify-center size-12 rounded-2xl bg-gradient-to-br ${section.accent} text-white mb-5`}
              >
                <section.icon className="size-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.items.map((item) => {
                  const text = typeof item === "string" ? item : item.text
                  return (
                    <li key={text} className="flex items-start gap-3">
                      <CheckCircle2 className={`size-5 ${section.check} shrink-0 mt-0.5`} aria-hidden="true" />
                      <span className="text-gray-600 leading-relaxed text-sm">
                        {typeof item === "string" ? (
                          item
                        ) : (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline underline-offset-2 hover:text-blue-700"
                          >
                            {item.text}
                          </a>
                        )}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
