import { CheckCircle2 } from "lucide-react"

const sections = [
  {
    title: "What to Bring",
    items: [
      "Laptop with charger (required)",
      "Student ID or photo ID",
      "Notebook and pen for brainstorming",
      "Headphones for focused work",
      "Reusable water bottle",
    ],
  },
  {
    title: "How to Submit Your Project",
    items: [
      "Submit on Devpost (southwestmn-hacks.devpost.com) by 5:00 PM",
      "Include: project name, track, team members",
      "Link to your GitHub repo or live demo",
      "Short video demo (optional, not required)",
      "Brief description of what you built",
    ],
  },
  {
    title: "Demo Presentation Tips",
    items: [
      "Demos are 3 minutes + 2 min Q&A",
      "Start with the problem you're solving",
      "Show the working prototype (even if rough!)",
      "Share what you learned and next steps",
      "Judges value creativity and effort over polish",
    ],
  },
]

export function DayOfChecklist() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">On The Day</h2>
          <p className="text-lg text-gray-600 text-balance">Everything you need to know for hackathon day</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <div key={section.title} className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-pink-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 leading-relaxed text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
