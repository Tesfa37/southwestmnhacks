import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Bronze",
    price: "$250",
    color: "bg-yellow-100",
    benefits: ["Logo on website", "Social media shoutout", "Thank you in opening remarks"],
  },
  {
    name: "Silver",
    price: "$500",
    color: "bg-gray-100",
    benefits: ["All Bronze benefits", "Logo on t-shirts", "Table at event", "2 sponsor tickets"],
  },
  {
    name: "Gold",
    price: "$1,000",
    color: "bg-yellow-100",
    popular: true,
    benefits: ["All Silver benefits", "Speaking slot (5 min)", "Logo in all materials", "4 sponsor tickets"],
  },
  {
    name: "Platinum",
    price: "$2,500",
    color: "bg-purple-100",
    benefits: [
      "All Gold benefits",
      "Named track sponsor",
      "Prime booth location",
      "Judge panel seat",
      "8 sponsor tickets",
    ],
  },
  {
    name: "In-Kind",
    price: "Value-based",
    color: "bg-teal-100",
    benefits: ["Software licenses", "Cloud credits", "Food/beverage", "Swag & prizes", "Equipment/tech"],
  },
]

export function SponsorTiers() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Sponsorship Tiers</h2>
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
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
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
                <a href="#sponsor-form">
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
