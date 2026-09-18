import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SPONSOR_EMAIL } from "@/lib/config"

const faqs = [
  {
    question: "Who attends, and how do sponsors meet them?",
    answer:
      "We bring together college, graduate, and high school students from across the region, along with community members and mentors. Sponsors meet them in person at a networking meal, at a booth, and while mentoring or judging, rather than through a name on a banner.",
  },
  {
    question: "Is Southwest MN Hacks currently taking new sponsorships?",
    answer:
      "Not right now. Fall 2026 has already happened, and we don't have a next event on the calendar yet. If you'd like to support whatever comes next, reach out and we'll follow up once planning opens.",
  },
  {
    question: "What do sponsor representatives do onsite?",
    answer:
      "At past events, sponsor reps set up a booth or table, talked to students about their organization, mentored teams, and served on the judging panel — as hands-on or hands-off as they liked. We'd build the same kind of experience with a future sponsor.",
  },
  {
    question: "Can we sponsor a prize category or challenge?",
    answer:
      "Yes, that's an option we offer higher sponsorship levels once a new event is being planned. We'll work with you to define a real-world problem or theme and recognize it during the event.",
  },
  {
    question: "What if we can't sponsor financially?",
    answer:
      "In-kind support is incredibly valuable. We accept meals, prizes, t-shirts, snacks and beverages, cloud or software credits, or equipment. Recognition is matched to the value contributed, so contact us to discuss what you could provide for a future event.",
  },
  {
    question: "How does payment work?",
    answer: `Once a new event is confirmed, we send an invoice from the Southwest MN Hacks nonprofit, payable by ACH, check, or card on standard net terms. Smaller and in-kind sponsors who prefer to pay instantly by card can do that too. Email ${SPONSOR_EMAIL} to start that conversation.`,
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
