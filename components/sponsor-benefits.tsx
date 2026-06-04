import { Users, Target, Heart } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Student interaction",
    description:
      "Face-to-face conversations with students over meals, at your booth, and through mentoring, rather than a name on a banner.",
  },
  {
    icon: Target,
    title: "Workforce pipeline",
    description:
      "Recruit college and graduate participants today, and build relationships with younger students entering the field.",
  },
  {
    icon: Heart,
    title: "Community and STEM impact",
    description: "Invest in regional technical talent that too often leaves the area, and help keep it here.",
  },
]

export function SponsorBenefits() {
  return (
    <section className="py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Why sponsor</h2>
          <p className="text-lg text-muted-foreground text-balance max-w-3xl mx-auto leading-relaxed">
            College and graduate students are exploring internships and early-career roles now. High school students are
            the regional STEM pipeline, the next wave of local talent in software, cybersecurity, data, and AI. Your
            sponsorship reaches both.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
