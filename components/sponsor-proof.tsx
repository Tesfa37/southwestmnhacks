import { Sparkles } from "lucide-react"

export function SponsorProof() {
  return (
    <section className="py-16 px-4">
      <div className="container max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start gap-4 rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-50 to-pink-50 p-8 md:p-10">
          <div className="inline-flex items-center justify-center size-12 shrink-0 rounded-2xl bg-white text-orange-600 shadow-sm">
            <Sparkles className="size-6" />
          </div>
          <p className="text-base md:text-lg leading-relaxed text-foreground">
            At our previous event, the winning team was offered a paid engagement to continue developing their project
            after the hackathon. Our goal is to create more of those real connections between students and regional
            organizations.
          </p>
        </div>
      </div>
    </section>
  )
}
