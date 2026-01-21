import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Lock } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:py-28 bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 font-medium text-sm mb-6">
              <Lock className="size-4" />
              Your Privacy Matters
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">Privacy Policy</h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              We're a student-run hackathon that takes your privacy seriously. Here's the straightforward story of how
              we handle your data.
            </p>
          </div>
        </section>

        {/* TL;DR Section */}
        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 shadow-lg mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">TL;DR</h2>
              <p className="text-white text-lg leading-relaxed">
                We collect minimal info (name, email, school) to run the event smoothly. We use trusted services that
                hackathons everywhere use—Google Forms for registration and Devpost for submissions. Your personal data
                gets deleted within 90 days after the event. That's it!
              </p>
            </div>

            {/* What Information We Collect */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What Information We Collect</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  To make SouthwestMN Hacks awesome, we collect some basic info when you register:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Your name and email</strong> – So we can communicate with you about the event
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>School or institution</strong> – Just for our records and statistics
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Grade level or student status</strong> – Helps us tailor the experience
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Dietary restrictions</strong> – Because we want everyone to enjoy the food!
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Project submissions</strong> – What you build during the hackathon (submitted through
                      Devpost)
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  That's really it. We're not interested in tracking you or collecting unnecessary data. We just need
                  the basics to put on a great event.
                </p>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">How We Use Your Information</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Here's what we do with the info you share (spoiler: nothing shady):
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Send you event updates</strong> – Important announcements, schedule changes, and helpful
                      reminders
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Check you in at the event</strong> – So we know you made it and can give you your swag
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Order the right food</strong> – Using your dietary restrictions to make sure everyone can
                      eat
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Run judging and awards</strong> – To recognize your awesome projects
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Improve future events</strong> – Anonymous feedback helps us make next year even better
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  We won't sell your data, spam you with marketing emails, or do anything else that would make us bad
                  event organizers. Promise.
                </p>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Third-Party Services</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We use some trusted third-party services to help run the event. These are the same tools that
                  hackathons everywhere use:
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div className="text-gray-700">
                      <strong>Google Forms</strong> – We collect registrations through Google Forms. Check out{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Google's Privacy Policy
                      </a>{" "}
                      to learn how they handle data.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div className="text-gray-700">
                      <strong>Devpost</strong> – Project submissions and judging happen on Devpost. See{" "}
                      <a
                        href="https://devpost.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        Devpost's Privacy Policy
                      </a>{" "}
                      for their data practices.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <div className="text-gray-700">
                      <strong>Email service</strong> – We use a standard email service to send you event updates and
                      important information.
                    </div>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  These services have their own privacy policies. We chose them because they're reliable and respected
                  in the hackathon community.
                </p>
              </div>
            </div>

            {/* Data Retention */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Data Retention</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We only keep your data as long as we need it to run the event and handle any follow-up:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Registration data</strong> (name, email, school, etc.) is deleted within{" "}
                      <strong>90 days</strong> after the event ends
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Project submissions</strong> may remain on Devpost according to their terms of service
                      (it's your work, after all!)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Anonymous statistics</strong> (like "30% of participants were first-time hackers") might
                      be kept longer to help us improve future events
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Once we delete your data, it's gone for good. We don't keep backups of personal information beyond
                  what's necessary for event operations.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Rights</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  It's your data, and you're in control. Here's what you can do:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Request to see your data</strong> – Want to know what we have on file? Just ask.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Request deletion</strong> – Changed your mind about attending? We'll delete your info
                      before the auto-deletion period.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Opt out of communications</strong> – Every email we send has an unsubscribe link. No hard
                      feelings.
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Seriously, just reach out. We're students too, and we get it. Your data, your choice.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Questions About Your Privacy?</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about how we handle your data, or if you want to exercise any of your
                  rights, we're here to help:
                </p>
                <div className="flex items-start gap-3 mb-4">
                  <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">
                    <strong>Email:</strong>{" "}
                    <a
                      href="mailto:privacy@southwestmnhacks.org"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      privacy@southwestmnhacks.org
                    </a>
                  </span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  We'll get back to you as quickly as we can (usually within a few days). No question is too small!
                </p>
              </div>
            </div>

            {/* Updates to This Policy */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Updates to This Policy</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  We might update this privacy policy from time to time as we improve the event or if regulations
                  change. If we make any major changes, we'll let you know via email.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Last updated:</strong> January 13, 2026
                </p>
                <p className="text-gray-700 leading-relaxed">
                  You can always check this page for the most current version of our privacy policy.
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-500 text-center leading-relaxed">
                This is a student-run event organized by passionate students in southwestern Minnesota. We take your
                privacy seriously, but we also keep things simple and straightforward. If something in this policy
                doesn't make sense, please reach out—we're happy to explain in plain English!
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
