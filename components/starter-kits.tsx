import { Zap, Code2, Terminal, Palette, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const kits = [
  {
    icon: Zap,
    title: "No-Code Builder",
    description: "No coding? No problem. These platforms let you build functional apps and sites visually.",
    tags: ["Bubble", "Webflow", "Airtable"],
    color: "bg-yellow-100",
    iconColor: "text-yellow-700",
    links: [
      { label: "Bubble", url: "https://bubble.io" },
      { label: "Airtable", url: "https://airtable.com" },
    ],
  },
  {
    icon: Code2,
    title: "Web App Starter",
    description: "Use React + Next.js with Vercel's free templates, and Supabase for a free database and auth.",
    tags: ["React", "Next.js", "Supabase"],
    color: "bg-blue-100",
    iconColor: "text-blue-700",
    links: [
      { label: "Vercel", url: "https://vercel.com/templates/next.js" },
      { label: "Supabase", url: "https://supabase.com" },
    ],
  },
  {
    icon: Terminal,
    title: "Python/API Kit",
    description: "Build backends and APIs with Python. FastAPI has great docs for beginners, and Replit lets you code in the browser.",
    tags: ["Python", "Flask", "APIs"],
    color: "bg-green-100",
    iconColor: "text-green-700",
    links: [
      { label: "FastAPI", url: "https://fastapi.tiangolo.com" },
      { label: "Replit", url: "https://replit.com" },
    ],
  },
  {
    icon: Palette,
    title: "Design Templates",
    description: "Figma templates, icon libraries, and color palettes to speed up your design.",
    tags: ["Figma", "UI Kits", "Icons"],
    color: "bg-pink-100",
    iconColor: "text-pink-700",
    links: [
      { label: "Figma", url: "https://figma.com" },
      { label: "Heroicons", url: "https://heroicons.com" },
    ],
  },
  {
    icon: Sparkles,
    title: "AI Integration",
    description: "Add AI to your project using free APIs. Google AI Studio and OpenRouter give you free access to powerful models.",
    tags: ["OpenAI", "Claude", "Prompts"],
    color: "bg-purple-100",
    iconColor: "text-purple-700",
    links: [
      { label: "AI Studio", url: "https://aistudio.google.com" },
      { label: "OpenRouter", url: "https://openrouter.ai" },
    ],
  },
]

export function StarterKits() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Suggested Tools</h2>
          <p className="text-lg text-gray-600 text-balance">Tools and platforms to help you build your project</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map((kit) => (
            <div
              key={kit.title}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
            >
              <div
                className={`${kit.color} ${kit.iconColor} inline-flex items-center justify-center w-full rounded-xl p-8 mb-4`}
              >
                <kit.icon className="size-12" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3">{kit.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{kit.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {kit.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {kit.links.map((link) => (
                  <Button
                    key={link.label}
                    variant="outline"
                    className="rounded-full flex-1 bg-transparent"
                    asChild
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
