import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="text-xl font-bold mb-4">
              <span className="text-orange-400">Southwest</span>
              <span className="text-blue-400">MN</span> Hacks
            </div>
            <p className="text-gray-400">Building the future, one hackathon at a time.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/register" className="block text-gray-400 hover:text-white transition-colors">
                Register
              </Link>
              <Link href="/#about" className="block text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/#tracks" className="block text-gray-400 hover:text-white transition-colors">
                Tracks
              </Link>
              <Link href="/#schedule" className="block text-gray-400 hover:text-white transition-colors">
                Schedule
              </Link>
              <Link href="/resources" className="block text-gray-400 hover:text-white transition-colors">
                Resources
              </Link>
              <Link href="/#faq" className="block text-gray-400 hover:text-white transition-colors">
                FAQ
              </Link>
              <Link href="/sponsor" className="block text-gray-400 hover:text-white transition-colors">
                Sponsor
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <Link href="/code-of-conduct" className="block text-gray-400 hover:text-white transition-colors">
                Code of Conduct
              </Link>
              <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/rules" className="block text-gray-400 hover:text-white transition-colors">
                Event Rules
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <div className="space-y-2">
              <a
                href="https://southwestmn-hacks.devpost.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Devpost
              </a>
              <p className="text-gray-500 text-sm">More social links coming soon!</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 mb-2">hello@southwestmnhacks.org</p>
            <p className="text-gray-400">Questions? Reach out anytime!</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span>Hosted by</span>
            <img src="/etm-solutions-logo.jpeg" alt="ETM Solutions" className="h-8 rounded" />
          </div>
          <p className="mt-2">© 2026 SouthwestMN Hacks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
