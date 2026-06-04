import { Sparkles, Calendar, MapPin } from "lucide-react"
import { EVENT_DATES, VENUE, PARTNERSHIP_LINE } from "@/lib/config"

export function SponsorHero() {
  return (
    <section className="py-20 px-4 md:py-28">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-medium text-sm mb-6">
          <Sparkles className="size-4" />
          Southwest MN Hacks &middot; Fall 2026
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">
          More than logo placement
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
          Southwest MN Hacks connects your organization directly with motivated students from across the region. This is
          more than an advertising buy. Sponsors meet students in person, over a networking meal, at a booth, while
          mentoring teams, and while judging projects.
        </p>
        <div className="mt-10 pt-8 border-t border-border max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm font-medium text-foreground">
            <span className="inline-flex items-center gap-2">
              <Calendar className="size-4 text-orange-600" />
              {EVENT_DATES}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-orange-600" />
              {VENUE}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{PARTNERSHIP_LINE}</p>
        </div>
      </div>
    </section>
  )
}
