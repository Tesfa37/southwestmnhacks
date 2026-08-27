import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { RegisterCta } from "@/components/register-cta"
import { BODY, HEADING, MUTED, SURFACE, type Tone } from "@/components/home/tone"
import type { EventPhase } from "@/lib/event-phase"
import { EVENT_DATES, REGISTRATION_DEADLINE, VENUE_MAP_URL } from "@/lib/config"

export function EventDetails({ phase, tone }: { phase: EventPhase; tone: Tone }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <Reveal>
      <div className={`rounded-3xl ${SURFACE[tone]} p-10`}>
        <h2 className="text-3xl font-bold mb-8 text-center">Event Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className={`font-semibold ${HEADING[tone]}`}>Dates</div>
            <div className={BODY[tone]}>{EVENT_DATES}</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className={`font-semibold ${HEADING[tone]}`}>Format</div>
            <div className={BODY[tone]}>24-hour overnight</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div className={`font-semibold ${HEADING[tone]}`}>Location</div>
            <a
              href={VENUE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${BODY[tone]} ${
                tone === "dark" ? "hover:text-blue-300" : "hover:text-blue-700"
              } underline underline-offset-2 transition-colors`}
            >
              SMSU, Marshall, MN
            </a>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className={`font-semibold ${HEADING[tone]}`}>Team Size</div>
            <div className={BODY[tone]}>1 to 4 people</div>
          </div>
        </div>
        <div className="text-center mt-8">
          <RegisterCta
            variant="section"
            location="event-details"
            initialPhase={phase}
            onDark={tone === "dark"}
          />
          {phase === "open" && (
            <p className={`text-sm ${MUTED[tone]} mt-3`}>Registration closes {REGISTRATION_DEADLINE}.</p>
          )}
        </div>
      </div>
      </Reveal>
    </section>
  )
}
