"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useChallengesRevealed } from "@/components/waitlist-cta"
import { CARD_TITLE, MUTED } from "@/components/home-record/tokens"
import { BONUS_CHALLENGE, BONUS_NOTE, CHALLENGES, type Challenge } from "@/lib/event-hub"

/** Prose body of one prompt, shared by the sponsor prompts and the bonus. */
function ChallengeBody({ challenge }: { challenge: Challenge }) {
  return (
    <div className={`${MUTED} space-y-4 leading-relaxed`}>
      {challenge.body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {challenge.questions && (
        <>
          {challenge.questionsIntro && <p>{challenge.questionsIntro}</p>}
          <ul className="list-disc pl-5 space-y-2">
            {challenge.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </>
      )}

      {challenge.closing && <p>{challenge.closing}</p>}
    </div>
  )
}

/**
 * The four prompts, gated on the 10:00 AM Saturday reveal.
 *
 * Collapsed by default because Challenge 1 alone is several hundred words and
 * would otherwise bury the rest on a phone — but the TITLES are the accordion
 * triggers, so every challenge name is readable without tapping anything.
 * type="multiple" so a team can hold two open while they compare.
 */
export function HubChallenges({ initialRevealed }: { initialRevealed: boolean }) {
  // Shares the boundary timer with the phase, so the prompts appear in an
  // already-open tab the moment the reveal lands.
  const revealed = useChallengesRevealed(initialRevealed)

  if (!revealed) {
    return (
      <div className="rounded-xl bg-white border border-dashed border-gray-300 p-6 sm:p-8 text-center">
        <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED} mb-2`}>
          Not yet revealed
        </p>
        <p className="text-base sm:text-lg font-semibold">
          Challenges are revealed at 10:00 AM Saturday, right after the opening ceremony.
        </p>
        <p className={`mt-2 text-sm ${MUTED}`}>
          They will appear here automatically — no need to refresh.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div>
        <h3 className={`${CARD_TITLE} text-lg font-extrabold mb-1`}>Schwan&apos;s Challenge Prompts</h3>
        <p className={`text-sm ${MUTED} mb-4`}>Pick one to build against.</p>

        <Accordion type="multiple" className="w-full space-y-3">
          {CHALLENGES.map((challenge, index) => (
            <AccordionItem
              key={challenge.id}
              value={challenge.id}
              className="bg-white rounded-xl border border-gray-200 px-6 overflow-hidden"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                <span>
                  <span className={`font-mono text-xs font-semibold tracking-[0.14em] ${MUTED} mr-2`}>
                    0{index + 1}
                  </span>
                  {challenge.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-5">
                <ChallengeBody challenge={challenge} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Optional extra, ringed in stamp orange so it reads as a different kind
          of thing from the sponsor prompts — not a fourth requirement. */}
      <div>
        <h3 className={`${CARD_TITLE} text-lg font-extrabold mb-1`}>Bonus Creative Challenge</h3>
        <p className={`text-sm ${MUTED} mb-4`}>{BONUS_NOTE}</p>

        <Accordion type="multiple" className="w-full">
          <AccordionItem
            value={BONUS_CHALLENGE.id}
            className="bg-orange-50/50 rounded-xl ring-1 ring-orange-200 border-0 px-6 overflow-hidden"
          >
            <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-800">
                  Bonus
                </span>
                {BONUS_CHALLENGE.title}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-5">
              <ChallengeBody challenge={BONUS_CHALLENGE} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
