import Link from "next/link"
import { ShieldAlert } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { ConsentShare } from "@/components/consent-share"
import {
  BODY_STRONG,
  CALLOUT,
  CALLOUT_CHIP,
  HEADING,
  INSET,
  LINK,
  MUTED,
  SURFACE,
  type Tone,
} from "@/components/home/tone"
import { CONSENT_FORM_URL, ADULT_WAIVER_PDF, MINOR_CONSENT_PDF, DOCS_UPDATED } from "@/lib/config"

export function Participate({ tone }: { tone: Tone }) {
  const linkClass = `font-semibold ${LINK[tone]} underline underline-offset-2`

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <Reveal>
      <div className={`rounded-3xl ${SURFACE[tone]} p-8 sm:p-10`}>
        <h2 className="text-3xl font-bold mb-4">Who Can Participate</h2>
        <p className={`text-lg ${BODY_STRONG[tone]} leading-relaxed mb-4`}>
          Open to students ages 14 and up, from high school through community college and university, plus recent
          graduates within one year of graduation. Whether this is your first hackathon or your tenth, you belong
          here.
        </p>
        <div className={`mt-6 rounded-2xl ${CALLOUT[tone]} p-6`}>
          <div className="flex items-start gap-4">
            <div
              className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl ${CALLOUT_CHIP[tone]}`}
            >
              <ShieldAlert className="size-5" />
            </div>
            <div>
              <p className={`text-lg ${BODY_STRONG[tone]} leading-relaxed`}>
                <span className="font-bold">Under 18? Getting your consent form done is on you.</span> Send the{" "}
                <a
                  href={CONSENT_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${LINK[tone]} underline font-semibold`}
                >
                  parental consent form
                </a>{" "}
                to a parent or guardian and make sure they complete it before check-in. You can&apos;t check in
                without it.
              </p>
              <ConsentShare onDark={tone === "dark"} />
            </div>
          </div>
        </div>

        {/* Read in advance: policy documents */}
        <div className={`mt-6 rounded-2xl ${INSET[tone]} p-6`}>
          <p className={`font-semibold ${HEADING[tone]}`}>Read these before the event</p>
          <p className={`text-sm ${MUTED[tone]} mb-4`}>{DOCS_UPDATED}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/code-of-conduct" className={linkClass}>
              Code of Conduct &amp; Overnight Safety Rules
            </Link>
            <Link href="/safety" className={linkClass}>
              Safety overview
            </Link>
            <a href={ADULT_WAIVER_PDF} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Adult Waiver (18+)
            </a>
            <a href={MINOR_CONSENT_PDF} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Parent/Guardian Consent (under 18)
            </a>
          </div>
        </div>
      </div>
      </Reveal>
    </section>
  )
}
