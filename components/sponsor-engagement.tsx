import { Check, Shield } from "lucide-react"

const interactions = [
  "A reserved table at a structured student networking meal, where students are seated or rotated by interest so you can talk about projects, internships, and local careers.",
  "A sponsor booth or table during the event.",
  "The option to mentor teams or serve on the judging panel.",
  "The option to sponsor a prize category or pose a real-world challenge for students.",
  "Access to an opt-in student interest list (college and graduate participants), shared only where students choose to share it.",
]

export function SponsorEngagement() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">How sponsors interact with students</h2>
        </div>

        <ul className="space-y-4">
          {interactions.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check className="size-5 text-pink-600 shrink-0 mt-0.5" />
              <span className="text-muted-foreground leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-start gap-4 rounded-3xl border border-border bg-card p-6">
          <div className="inline-flex items-center justify-center size-10 shrink-0 rounded-2xl bg-blue-100 text-blue-600">
            <Shield className="size-5" />
          </div>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Student safety.</span> Information sharing and any follow-up
            involving participants under 18 requires explicit parent or guardian permission and follows our event safety
            guidelines.
          </p>
        </div>
      </div>
    </section>
  )
}
