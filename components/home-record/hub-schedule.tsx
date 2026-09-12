import { CARD_TITLE, MUTED } from "@/components/home-record/tokens"
import { SCHEDULE } from "@/lib/event-hub"

/**
 * The two-day timeline, as a definition list rather than a table.
 *
 * Deliberate: this is read mostly on phones, and a two-column <table> with a
 * long activity cell is the usual source of horizontal overflow. A
 * grid-cols-[time_1fr] <dl> wraps the activity text instead, so nothing ever
 * needs a sideways scroller. Same row shape as record-details.tsx.
 */
export function HubSchedule() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
      {SCHEDULE.map((day) => (
        <div key={day.day}>
          <h3 className={`${CARD_TITLE} text-lg font-extrabold mb-1`}>{day.day}</h3>
          <p className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] ${MUTED} mb-4`}>
            {day.date}
          </p>

          <dl className="space-y-3">
            {day.rows.map((row) => (
              <div key={row.time} className="grid grid-cols-[5.5rem_1fr] gap-x-4">
                <dt
                  className={`font-mono text-xs font-semibold uppercase tracking-[0.14em] pt-0.5 ${
                    row.deadline ? "text-orange-700" : MUTED
                  }`}
                >
                  {row.time}
                </dt>
                <dd
                  className={`text-sm sm:text-base leading-relaxed ${
                    row.deadline ? "font-semibold text-orange-800" : ""
                  }`}
                >
                  {row.activity}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}
