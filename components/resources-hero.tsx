import { Rocket } from "lucide-react"

export function ResourcesHero() {
  return (
    <section className="relative overflow-hidden py-20 px-4 md:py-28 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-blue-600 font-medium text-sm mb-6">
          <Rocket className="size-4" aria-hidden="true" />
          Ready to Build
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-balance mb-6 leading-tight">
          <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Tools &amp; Workshops
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 text-balance max-w-2xl mx-auto leading-relaxed">
          Everything you need to go from idea to working prototype. No experience required, just bring your curiosity.
        </p>
      </div>
    </section>
  )
}
