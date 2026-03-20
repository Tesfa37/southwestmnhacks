import { Users, Megaphone, Heart, Target } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Access to Top Talent",
    description: "Connect with motivated students and developers interested in your industry and technology",
  },
  {
    icon: Megaphone,
    title: "Brand Visibility",
    description: "Get your brand in front of 50+ attendees, participants, and the local tech community",
  },
  {
    icon: Heart,
    title: "Community Impact",
    description: "Support tech education and innovation in rural Southwest Minnesota",
  },
  {
    icon: Target,
    title: "Recruiting Pipeline",
    description: "Meet potential interns and hires passionate about building solutions",
  },
]

export function SponsorBenefits() {
  return (
    <section className="py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">What Sponsors Get</h2>
          <p className="text-lg text-muted-foreground text-balance">Beyond the tier benefits, here's what you gain</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-card border border-border rounded-3xl p-8 hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-orange-100 text-orange-600 mb-4">
                <benefit.icon className="size-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
