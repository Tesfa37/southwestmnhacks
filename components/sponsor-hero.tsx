import { Sparkles } from "lucide-react"

export function SponsorHero() {
  return (
    <section className="py-20 px-4 md:py-28">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 text-pink-600 font-medium text-sm mb-6">
          <Sparkles className="size-4" />
          Support Innovation
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">
          Sponsor the next generation of builders
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
          Help us create an unforgettable experience for 50+ students and community members building solutions for
          Southwest Minnesota
        </p>
      </div>
    </section>
  )
}
