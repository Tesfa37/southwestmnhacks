import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How many people typically attend?",
    answer:
      "We expect 50+ attendees including students from SMSU, community members, and mentors. Our goal is to create an intimate, supportive environment where every participant gets hands-on help and attention.",
  },
  {
    question: "What do sponsor representatives do onsite?",
    answer:
      "Sponsor reps are welcome to set up a table/booth, talk to attendees about your organization, judge projects, and offer mentorship during the event. You can be as hands-on or hands-off as you'd like - we'll work with you to create the right experience.",
  },
  {
    question: "Can we sponsor a specific track?",
    answer:
      "Platinum sponsors can be the named sponsor of a specific track (Community/Main Street, Student Life, or AI & Automation). This includes prominent branding and speaking time during that track's introduction.",
  },
  {
    question: "What if we can't sponsor financially?",
    answer:
      "In-kind sponsorships are incredibly valuable! We accept software licenses, cloud credits, API access, food/beverage donations, swag, prizes, or equipment loans. Contact us to discuss what you can provide.",
  },
]

export function SponsorFaq() {
  return (
    <section className="py-16 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Sponsor FAQ</h2>
          <p className="text-lg text-muted-foreground text-balance">Common questions from our partners</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border">
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
