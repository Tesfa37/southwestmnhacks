import { Reveal } from "@/components/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { buildFaqs } from "@/components/home/home-faq"
import { DISPLAY, MUTED } from "@/components/home-record/tokens"
import type { EventPhase } from "@/lib/event-phase"

// Same FAQ data as the cinematic page (and the FAQPage JSON-LD), rendered on
// the light stage. A couple of answers embed dark-theme link colors, so the
// content wrapper re-colors descendant links for white backgrounds.
export function RecordFaq({ phase }: { phase: EventPhase }) {
  const faqs = buildFaqs(phase)

  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <Reveal>
        <div className="mb-10">
          <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED} mb-3`}>Questions</p>
          <h2 className={`${DISPLAY} text-3xl sm:text-4xl font-black`}>Asked and answered.</h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-xl border border-gray-200 px-6 overflow-hidden"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                className={`${MUTED} pb-5 [&_a]:text-blue-600 [&_a:hover]:text-blue-700`}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  )
}
