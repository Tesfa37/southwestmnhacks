import type { Metadata } from "next"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { OrgSchema } from "@/components/org-schema"
import { Building2 } from "lucide-react"
import {
  EIN,
  GOVERNING_STATE,
  LEGAL_ENTITY_NAME,
  MAILING_ADDRESS,
  MARSHALL_ARTICLE_FALL_URL,
  MARSHALL_ARTICLE_SPRING_URL,
  MISSION,
  ORG_ADDRESS,
  ORG_FOUNDED_DISPLAY,
  SUPPORT_EMAIL,
} from "@/lib/config"
import { FALL_STATS } from "@/lib/fall-2026"
import { SPRING_STATS } from "@/lib/spring-2026"

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: { absolute: "About | Southwest MN Hacks" },
  description:
    "Southwest MN Hacks is a Minnesota nonprofit corporation and 501(c)(3) that runs free student hackathons in Marshall, MN. Our mission, programs, history, and organization details.",
}

const LINK = "text-blue-600 hover:text-blue-700 underline"

/**
 * The organization's own page, as opposed to the event pages that make up the
 * rest of the site. It exists because every other route describes a hackathon,
 * which left no single place stating who runs it, what it does year-round, or
 * how to verify it as a nonprofit.
 *
 * The "Organization details" block is load-bearing: legal name, status, EIN and
 * a full street address in one place is what nonprofit verification looks for.
 * Don't scatter those facts or drop one for visual balance.
 */
export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <OrgSchema />
      <main id="main" className="flex-1">
        <section className="py-20 px-4 md:py-28 bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6">
              <Building2 className="size-4" />
              Who we are and what we do
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">
              About Southwest MN Hacks
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              A student-founded nonprofit building a technology community in rural southwest Minnesota.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our mission</h2>
              <p className="text-gray-700 leading-relaxed">{MISSION}</p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Students in southwest Minnesota are hours from the hackathons, tech meetups, and internship pipelines
                that students in the Twin Cities take for granted. Distance shouldn&apos;t decide who gets to build
                things. We run free events here, in Marshall, so that a high school student in a town of two thousand
                can spend a weekend shipping real software beside college students, professors, and working engineers,
                without their family paying for travel or registration.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">What we do</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our programs are free to participants and funded by sponsors and in-kind support.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700 leading-relaxed">
                    <strong>Hackathons.</strong> Free, beginner-friendly, overnight build events for students ages 14
                    and up, from high school through university, plus recent graduates. Meals, workspace, and mentoring
                    are included at no cost.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700 leading-relaxed">
                    <strong>Mentorship.</strong> We recruit computer science faculty and working engineers to mentor
                    teams through the build and to judge final presentations, so students get feedback from people
                    doing the work professionally.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700 leading-relaxed">
                    <strong>Learning resources.</strong> A free, openly available{" "}
                    <Link href="/resources" className={LINK}>
                      library of workshops and starter guides
                    </Link>{" "}
                    for students preparing for their first hackathon, available whether or not they attend an event.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700 leading-relaxed">
                    <strong>Real-world challenges.</strong> We work with regional employers to put genuine business
                    problems in front of students, and every project stays public in our{" "}
                    <Link href="/projects" className={LINK}>
                      project archive
                    </Link>{" "}
                    so students own a portfolio afterward.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our history</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Southwest MN Hacks was incorporated as a {GOVERNING_STATE} nonprofit corporation on{" "}
                {ORG_FOUNDED_DISPLAY}, sixteen days before its first event.
              </p>
              <div className="space-y-6">
                <div className="border-l-2 border-gray-200 pl-5">
                  <p className="font-semibold text-gray-900">March 2026 &middot; First hackathon</p>
                  <p className="text-gray-700 leading-relaxed mt-1">
                    Southwest Minnesota&apos;s first-ever student hackathon ran on March 21, {SPRING_STATS.hours} hours
                    long, with {SPRING_STATS.teams} teams drawn from SMSU, SDSU, Marshall High School, and other
                    schools across the region. Every team took on a challenge sponsored by Schwan&apos;s Company. The{" "}
                    <a href={MARSHALL_ARTICLE_SPRING_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                      Marshall Independent covered it on the front page
                    </a>
                    .
                  </p>
                </div>
                <div className="border-l-2 border-gray-200 pl-5">
                  <p className="font-semibold text-gray-900">After March &middot; A team got hired</p>
                  <p className="text-gray-700 leading-relaxed mt-1">
                    Schwan&apos;s Company invited the grand-prize team to keep developing their project past the
                    prototype stage as a paid engagement.
                  </p>
                </div>
                <div className="border-l-2 border-gray-200 pl-5">
                  <p className="font-semibold text-gray-900">September 2026 &middot; Second hackathon</p>
                  <p className="text-gray-700 leading-relaxed mt-1">
                    Our second event ran September 12 and 13 as a full {FALL_STATS.hours}-hour overnight hackathon.{" "}
                    {FALL_STATS.teams} teams competed, {FALL_STATS.projects} shipped a finished project, and{" "}
                    {FALL_STATS.judges} judges reviewed the submissions. The{" "}
                    <a href={MARSHALL_ARTICLE_FALL_URL} target="_blank" rel="noopener noreferrer" className={LINK}>
                      Marshall Independent covered this event as well
                    </a>
                    .
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mt-6">
                Every event has a full public recap, including winners, judges, sponsors, and each project teams built.{" "}
                <Link href="/events" className={LINK}>
                  Browse all past events
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Who runs it</h2>
              <p className="text-gray-700 leading-relaxed">
                Southwest MN Hacks was founded and is run by <strong>Bityana Yishak</strong> and{" "}
                <strong>Tesfatsion Desta</strong>, Co-Founders. The organization is student-founded and volunteer-run;
                nobody draws a salary from it. Faculty, engineers, and regional employers contribute as mentors,
                judges, and sponsors.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Southwest MN Hacks is an independent organization. Our events are held at Southwest Minnesota State
                University, which provides the venue; SMSU does not organize, sponsor, or endorse them. See our{" "}
                <Link href="/terms" className={LINK}>
                  Terms of Service
                </Link>{" "}
                for the full statement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Organization details</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-semibold text-gray-900">Legal name</dt>
                    <dd className="text-gray-700">{LEGAL_ENTITY_NAME}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-gray-900">Status</dt>
                    <dd className="text-gray-700">
                      {GOVERNING_STATE} nonprofit corporation, tax-exempt under section 501(c)(3) of the Internal
                      Revenue Code
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-gray-900">EIN</dt>
                    <dd className="text-gray-700">{EIN}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-gray-900">Incorporated</dt>
                    <dd className="text-gray-700">{ORG_FOUNDED_DISPLAY}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-gray-900">Mailing address</dt>
                    <dd className="text-gray-700">
                      <address className="not-italic">
                        {LEGAL_ENTITY_NAME}
                        <br />
                        {ORG_ADDRESS.street}
                        <br />
                        {ORG_ADDRESS.city}, {ORG_ADDRESS.region} {ORG_ADDRESS.postalCode}
                        <br />
                        United States
                      </address>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-semibold text-gray-900">Email</dt>
                    <dd className="text-gray-700">
                      <a href={`mailto:${SUPPORT_EMAIL}`} className={LINK}>
                        {SUPPORT_EMAIL}
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                Questions about the organization, or need documentation for a grant or donation?{" "}
                <Link href="/contact" className={LINK}>
                  Get in touch
                </Link>
                . Mail reaches us at {MAILING_ADDRESS}.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
