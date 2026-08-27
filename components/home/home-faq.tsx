import type { ReactNode } from "react"
import { Reveal } from "@/components/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BODY, FAQ_CHEVRON, FAQ_ITEM, type Tone } from "@/components/home/tone"
import type { EventPhase } from "@/lib/event-phase"
import { CONSENT_FORM_URL, DEVPOST_FALL_URL, REGISTRATION_DEADLINE } from "@/lib/config"

export interface HomeFaq {
  question: string
  answer: ReactNode
  text?: string
}

// Shared by the FAQ accordion and the FAQPage JSON-LD in app/page.tsx.
export function buildFaqs(phase: EventPhase): HomeFaq[] {
  const registerAnswer =
    phase === "open"
      ? `Fill out the registration form linked throughout this site. Registration closes ${REGISTRATION_DEADLINE}, so sign up early to save your spot.`
      : phase === "ended"
        ? "Fall 2026 has wrapped. See what students built on Devpost, and check back for our next event."
        : "Registration for Fall 2026 has closed. Follow the projects on Devpost, and check back for our next event."

  return [
    {
      question: "Do I need coding experience?",
      answer:
        "Not at all! This hackathon is beginner-friendly. We'll have mentors and workshops to help you learn. All you need is enthusiasm and willingness to try something new.",
    },
    {
      question: "How much does it cost?",
      answer:
        "It's completely free! We provide meals, snacks, and the resources you need to build your project.",
    },
    {
      question: "How do I register?",
      answer: registerAnswer,
    },
    {
      question: "Can I work alone or do I need a team?",
      answer:
        "Both! You can participate solo or form a team of up to 4 people. We'll also have team formation activities at the start if you want to meet collaborators.",
    },
    {
      question: "Is AI allowed?",
      answer:
        "Yes. AI tools are welcome and encouraged. Use them to learn faster and build more; just be transparent about what you used and make sure you understand your own code.",
    },
    {
      question: "What if I'm under 18?",
      answer: (
        <>
          High school students are welcome, but if you&apos;re under 18, getting the{" "}
          <a
            href={CONSENT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            parental consent form
          </a>{" "}
          done is on you. Send it to a parent or guardian and make sure they complete it before check-in. You
          can&apos;t check in without it.
        </>
      ),
      text: "High school students are welcome, but if you're under 18, getting the parental consent form done is on you. Send it to a parent or guardian and make sure they complete it before check-in. You can't check in without it.",
    },
    {
      question: "What should I bring?",
      answer:
        "Bring your laptop, charger, and student ID. Since we run overnight, also pack what you need to rest: a sleeping bag or blanket, a pillow, and a toothbrush. We'll provide WiFi, power, food, and snacks throughout the event.",
    },
    {
      question: "Who can participate?",
      answer:
        "Students ages 14 and up are welcome, including high school, community college, college, and university students, plus recent graduates within one year of graduation. Every skill level belongs here; if you're curious about technology and want to build something, you're in.",
    },
    {
      question: "Are there prizes?",
      answer:
        "Yes. 1st, 2nd, and 3rd place teams win prizes, and every submitted project gets recognition on Devpost. Prize amounts will be announced closer to the event.",
    },
    {
      question: "How do I submit my project?",
      answer: (
        <>
          Submit on the{" "}
          <a
            href={DEVPOST_FALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold"
          >
            Fall 2026 Devpost
          </a>{" "}
          before the deadline. We&apos;ll walk you through it during the event, and mentors are around if you get
          stuck.
        </>
      ),
      text: "Submit on the Fall 2026 Devpost before the deadline. We'll walk you through it during the event, and mentors are around if you get stuck.",
    },
  ]
}

// Answer links carry no color of their own, so each surface sets it here.
// components/home-record/record-faq.tsx does the same with its own palette.
const ANSWER_LINKS: Record<Tone, string> = {
  dark: "[&_a]:text-blue-400 [&_a:hover]:text-blue-300",
  light: "[&_a]:text-blue-600 [&_a:hover]:text-blue-700",
}

export function HomeFaqSection({ phase, tone }: { phase: EventPhase; tone: Tone }) {
  const faqs = buildFaqs(phase)

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <Reveal>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={`${FAQ_ITEM[tone]} rounded-2xl px-6 overflow-hidden`}
          >
            <AccordionTrigger
              className={`text-left font-semibold hover:no-underline py-5 ${FAQ_CHEVRON[tone]}`}
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className={`${BODY[tone]} ${ANSWER_LINKS[tone]} pb-5`}>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      </Reveal>
    </section>
  )
}
