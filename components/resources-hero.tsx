import { Rocket } from "lucide-react"

export function ResourcesHero() {
  return (
    <section className="py-20 px-4 md:py-28">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6">
          <Rocket className="size-4" />
          Ready to Build
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">Starter Kits & Workshops</h1>
        <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
          Everything you need to go from idea to working prototype. No experience required.
        </p>
      </div>
    </section>
  )
}
