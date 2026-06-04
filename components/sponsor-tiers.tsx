import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Bronze",
    tagline: "Community Supporter",
    price: "$500",
    color: "bg-yellow-100",
    benefits: [
      "Logo on the event website",
      "Recognition during opening remarks",
      "Listed as a community supporter",
    ],
  },
  {
    name: "Silver",
    tagline: "Event Presence Sponsor",
    price: "$1,000",
    color: "bg-gray-100",
    benefits: [
      "Everything in Bronze",
      "Logo on the event t-shirt",
      "A sponsor booth or table",
      "2 sponsor representatives",
    ],
  },
  {
    name: "Gold",
    tagline: "Student Engagement Sponsor",
    price: "$2,000",
    color: "bg-yellow-100",
    popular: true,
    benefits: [
      "Everything in Silver",
      "Reserved table at the student networking meal",
      "A short speaking slot",
      "Option to mentor teams",
      "Logo on event materials",
      "Option to offer a challenge prompt or prize category",
      "4 sponsor representatives",
    ],
  },
  {
    name: "Platinum",
    tagline: "Premier Innovation Partner",
    price: "$5,000",
    color: "bg-purple-100",
    benefits: [
      "Everything in Gold",
      "Named sponsor recognition",
      "Priority table and booth placement",
      "A seat on the judging panel",
      "Option to host a sponsor challenge or named prize category",
      "Priority access to the opt-in student interest list",
      "8 sponsor representatives",
    ],
  },
  {
    name: "In-Kind",
    tagline: "Choose what you provide",
    price: "Flexible",
    color: "bg-teal-100",
    benefits: [
      "Meal, prizes, or t-shirts",
      "Snacks and beverages",
      "Cloud or software credits",
      "Equipment",
      "Recognition matched to the value contributed",
    ],
  },
]

export function SponsorTiers() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Sponsorship levels</h2>
          <p className="text-lg text-muted-foreground text-balance">Choose a level that works for your organization</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="relative bg-card border border-border rounded-3xl p-6 flex flex-col hover:shadow-lg transition-shadow"
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange-600 text-white text-sm font-medium rounded-full">
                  Popular
                </div>
              )}
              <div className={`h-20 rounded-2xl ${tier.color} mb-6`} />
              <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
              <p className="text-sm font-medium text-muted-foreground mb-3">{tier.tagline}</p>
              <p className="text-3xl font-bold mb-6">{tier.price}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <Check className="size-5 text-pink-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full rounded-full ${tier.popular ? "bg-orange-600 hover:bg-orange-700" : ""}`}
                variant={tier.popular ? "default" : "outline"}
                asChild
              >
                <a
                  href={`mailto:sponsors@southwestmnhacks.org?subject=${encodeURIComponent(
                    `Sponsorship inquiry: ${tier.name} (${tier.price})`,
                  )}`}
                >
                  Choose {tier.name}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
