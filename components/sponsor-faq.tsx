import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SPONSOR_DEADLINE } from "@/lib/config"

const faqs = [
  {
    question: "Who attends, and how do sponsors meet them?",
    answer:
      "We bring together college, graduate, and high school students from across the region, along with community members and mentors. Sponsors meet them in person at a networking meal, at a booth, and while mentoring or judging, rather than through a name on a banner.",
  },
  {
    question: "When do we need to decide?",
    answer: `Committing by ${SPONSOR_DEADLINE} guarantees every benefit in your tier: printed t-shirt logo placement and, for Gold and above, a sponsored challenge prompt. We welcome sponsors after that date too. You'll receive all digital and day-of benefits, but print and challenge-prompt deadlines will have passed.`,
  },
  {
    question: "What do sponsor representatives do onsite?",
    answer:
      "Sponsor reps are welcome to set up a booth or table, talk to students about your organization, mentor teams, and serve on the judging panel. You can be as hands-on or hands-off as you like, and we will work with you to create the right experience.",
  },
  {
    question: "Can we sponsor a prize category or challenge?",
    answer:
      "Yes. Gold and Platinum sponsors can offer a challenge prompt or sponsor a named prize category. We will work with you to define a real-world problem or theme and recognize it during the event.",
  },
  {
    question: "What if we can't sponsor financially?",
    answer:
      "In-kind support is incredibly valuable. We accept meals, prizes, t-shirts, snacks and beverages, cloud or software credits, or equipment. Recognition is matched to the value contributed, so contact us to discuss what you can provide.",
  },
  {
    question: "How does payment work?",
    answer:
      "We send an invoice from the Southwest MN Hacks nonprofit, payable by ACH, check, or card on standard net terms. No card is required up front, so it works smoothly with most finance and accounts-payable teams. Smaller and in-kind sponsors who prefer to pay instantly by card can do that too. You'll receive a receipt for your records.",
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
