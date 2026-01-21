import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield } from "lucide-react"

export default function CodeOfConductPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:py-28 bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-medium text-sm mb-6">
              <Shield className="size-4" />
              Community Guidelines
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">Code of Conduct</h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              SouthwestMN Hacks is dedicated to providing a safe, inclusive, and welcoming experience for everyone.
            </p>
          </div>
        </section>

        {/* TL;DR Section */}
        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 shadow-lg mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">TL;DR</h2>
              <p className="text-white text-lg leading-relaxed">
                Be respectful. Harassment and abuse are never tolerated. If you are in a situation that makes you
                uncomfortable at SouthwestMN Hacks, if the event itself is creating an unsafe or inappropriate
                environment, or if interacting with a SouthwestMN Hacks representative or event organizer makes you
                uncomfortable, please report it using the procedures included in this document.
              </p>
            </div>

            {/* Quick Version */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Quick Version</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  SouthwestMN Hacks is dedicated to providing a harassment-free experience for everyone, regardless of
                  gender, gender identity and expression, age, sexual orientation, disability, physical appearance,
                  body size, race, ethnicity, nationality, religion, previous hackathon attendance or computing
                  experience (or lack of any of the aforementioned).
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not tolerate harassment of event participants in any form. Sexual language and imagery is not
                  appropriate at any event venue, including talks, workshops, parties, social media, and other online
                  media. Event participants violating these rules may be sanctioned or expelled from the event without
                  a refund (if applicable) at the discretion of the event organizers.
                </p>
              </div>
            </div>

            {/* Full Version */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Full Version</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Harassment includes but is not limited to offensive verbal or written comments related to gender,
                  gender identity and expression, age, sexual orientation, disability, physical appearance, body size,
                  race, ethnicity, nationality, or religion, sexual images in public spaces, deliberate intimidation,
                  stalking, following, photography or audio/video recording against reasonable consent, sustained
                  disruption of talks or other events, inappropriate physical contact, and unwelcome sexual attention.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Photography is encouraged, but other participants must be given a reasonable chance to opt out from
                  being photographed. If they object to the taking of their photograph, comply with their request. It
                  is inappropriate to take photographs in contexts where people have a reasonable expectation of
                  privacy (in bathrooms or where participants are sleeping).
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Participants asked to stop any harassing behavior are expected to comply immediately.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  As this is a hackathon, we like to explicitly note that the hacks created at our event are equally
                  subject to the anti-harassment policy.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Sponsors and partners are also subject to the anti-harassment policy. In particular, sponsors should
                  not use sexualized images, activities, or other material. Booth staff (including volunteers) should
                  not use sexualized clothing/uniforms/costumes, or otherwise create a sexualized environment.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you are being harassed, notice that someone else is being harassed, or have any other concerns,
                  please contact a member of the event staff immediately.
                </p>
              </div>
            </div>

            {/* Reporting Procedures */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Reporting Procedures</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you feel uncomfortable or think there may be a potential violation of the code of conduct, please
                  report it immediately using one of the following methods:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:conduct@southwestmnhacks.org"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        conduct@southwestmnhacks.org
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>In person:</strong> Reach out to any event organizer or volunteer wearing an event staff
                      badge
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Anonymous report:</strong> You can make an anonymous report via our online form (coming
                      soon)
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Event staff will be happy to help participants contact campus security or local law enforcement,
                  provide escorts, or otherwise assist those experiencing harassment to feel safe for the duration of
                  the event. We value your attendance.
                </p>
              </div>
            </div>

            {/* Consequences */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Consequences</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  If a participant engages in harassing behavior, the event organizers may take any action they deem
                  appropriate, including warning the offender or expulsion from the event with no refund (if
                  applicable).
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have been subject to harassing behavior in the past, or notice that someone has violated the
                  code of conduct, please contact the event organizers so that they can take appropriate action.
                </p>
              </div>
            </div>

            {/* Attribution */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 text-center">
                This Code of Conduct is based on the{" "}
                <a
                  href="https://mlh.io/code-of-conduct"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  MLH Code of Conduct
                </a>
                . We are committed to providing a safe and welcoming environment for all participants.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
