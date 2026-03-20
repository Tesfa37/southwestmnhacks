import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ClipboardList } from "lucide-react"
import Link from "next/link"

export default function RulesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:py-28 bg-gradient-to-br from-orange-50 via-white to-blue-50">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-600 font-medium text-sm mb-6">
              <ClipboardList className="size-4" />
              Competition Rules
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 leading-tight">Hackathon Rules</h1>
            <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              Everything you need to know to compete fairly and have an amazing time at SouthwestMN Hacks.
            </p>
          </div>
        </section>

        {/* TL;DR Section */}
        <section className="py-16 px-4">
          <div className="container max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-3xl p-8 shadow-lg mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">TL;DR</h2>
              <p className="text-white text-lg leading-relaxed">
                Students only. Teams of 1-4. Build something new in a day. AI tools are fine—just be honest about
                it. Be creative, have fun, and follow the Code of Conduct.
              </p>
            </div>

            {/* Eligibility */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Eligibility</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  SouthwestMN Hacks is open to students and recent graduates. Here's who can compete:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>High school students</strong> – From any grade level
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>College and university students</strong> – Undergraduate or graduate
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Recent graduates</strong> – Within 1 year of graduation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>All skill levels</strong> – Beginners to advanced, everyone's welcome!
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  You must be registered and present at the event to compete. If you're not sure if you're eligible,
                  just ask—we want as many people as possible to participate!
                </p>
              </div>
            </div>

            {/* Team Size */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Team Size</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  You can work solo or form a team. Here's how teams work:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Solo hackers welcome</strong> – Flying solo? That's totally fine. One-person teams are
                      allowed.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Maximum team size: 4 people</strong> – Teams can have 2, 3, or 4 members
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Form teams anytime</strong> – Already have a team? Great! Don't have one? We'll have team
                      formation activities at the start.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>All members must be registered</strong> – Everyone on your team needs to be a registered
                      participant
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* What You Can Build */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What You Can Build</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  The goal is to build something new during the hackathon. Here are the project requirements:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Start fresh</strong> – Your project must be started during the hackathon. No
                      pre-existing projects allowed.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Use existing tools</strong> – Feel free to use any libraries, frameworks, APIs, and
                      existing tools. That's encouraged!
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Planning is OK</strong> – You can brainstorm and plan before the event, but code must be
                      written during the hackathon.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Submit on Devpost</strong> – All projects must be submitted through Devpost by the
                      deadline.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Open source encouraged</strong> – We love open source, but it's not required. Your call!
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  When in doubt, ask yourself: "Am I building something new during this hackathon?" If yes, you're good to
                  go!
                </p>
              </div>
            </div>

            {/* Use of AI Tools */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Use of AI Tools</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  AI tools are a part of modern development, and we embrace that at SouthwestMN Hacks:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>AI tools are allowed</strong> – GitHub Copilot, ChatGPT, Claude, and other AI assistants
                      are all fair game.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Be transparent</strong> – Mention in your project submission if you used AI tools and how
                      they helped you.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Understand your code</strong> – You should be able to explain all the code in your
                      project. Judges may ask questions.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Use AI to learn</strong> – The goal is learning. Use AI to learn faster, not as a
                      replacement for learning.
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Think of AI tools as powerful assistants that can help you build faster and learn new things. Just
                  make sure you understand what you're building!
                </p>
              </div>
            </div>

            {/* Judging Criteria */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Judging Criteria</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Projects will be judged based on four main criteria, each worth 25% of your total score:
                </p>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Creativity & Innovation (25%)</h3>
                    <p className="text-gray-700">
                      Is the idea unique and original? Does it approach a problem in a new way? We love creative
                      thinking!
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Technical Difficulty (25%)</h3>
                    <p className="text-gray-700">
                      What technical skills did you demonstrate? Did you push yourself to learn something new or tackle
                      a challenging problem?
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Impact & Usefulness (25%)</h3>
                    <p className="text-gray-700">
                      Does it solve a real problem? Would people actually want to use it? Does it make someone's life
                      better?
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Presentation (25%)</h3>
                    <p className="text-gray-700">
                      How well did you communicate your idea? Is your demo compelling? Can people understand what you
                      built and why it matters?
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mt-6 pt-6 border-t border-gray-200">
                  <strong>Bonus points:</strong> Polish, design quality, and complete functionality can help you stand
                  out. But don't worry if things aren't perfect—this is a hackathon, not a product launch!
                </p>
              </div>
            </div>

            {/* Prizes */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Prizes</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">Here's how prizes work:</p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Distributed per team</strong> – Prizes are given to teams, not individual members. Teams
                      decide how to split prizes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Must be present to win</strong> – At least one team member must be at the awards ceremony
                      to claim prizes.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Winners announced at 7:30 PM</strong> – Stick around for the closing ceremony!
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">
                      <strong>Everyone presents</strong> – All teams get to present their projects, regardless of
                      prizes. Sharing is part of the fun!
                    </span>
                  </li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Remember: Prizes are cool, but the real reward is what you learn and build. Some of the best projects
                  don't win prizes—they just keep growing after the hackathon!
                </p>
              </div>
            </div>

            {/* Code of Conduct Reference */}
            <div className="mb-16">
              <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Code of Conduct</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All participants must follow our{" "}
                  <Link href="/code-of-conduct" className="text-blue-600 hover:text-blue-700 underline font-semibold">
                    Code of Conduct
                  </Link>
                  . We're committed to providing a safe, inclusive, and welcoming environment for everyone.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Violations may result in disqualification and removal from the event. Please take a moment to read
                  it—it's there to make sure everyone has a great experience.
                </p>
              </div>
            </div>

            {/* Questions Section */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold mb-4 text-center">Questions About the Rules?</h2>
              <p className="text-gray-600 text-center leading-relaxed">
                If something isn't clear or you have questions about the rules, just ask! You can reach out to any
                organizer at the event or email us at{" "}
                <a href="mailto:hello@southwestmnhacks.org" className="text-blue-600 hover:text-blue-700 underline">
                  hello@southwestmnhacks.org
                </a>
                . We're here to help make sure everyone can compete fairly and have an awesome time.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
