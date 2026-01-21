import { MessageCircle, Instagram } from "lucide-react"

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
              <a href="/register" className="block text-gray-400 hover:text-white transition-colors">
                Register
              </a>
              <a href="/#about" className="block text-gray-400 hover:text-white transition-colors">
                About
              </a>
              <a href="/#tracks" className="block text-gray-400 hover:text-white transition-colors">
                Tracks
              </a>
              <a href="/#schedule" className="block text-gray-400 hover:text-white transition-colors">
                Schedule
              </a>
              <a href="/resources" className="block text-gray-400 hover:text-white transition-colors">
                Resources
              </a>
              <a href="/#faq" className="block text-gray-400 hover:text-white transition-colors">
                FAQ
              </a>
              <a href="/sponsor" className="block text-gray-400 hover:text-white transition-colors">
                Sponsor
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="/code-of-conduct" className="block text-gray-400 hover:text-white transition-colors">
                Code of Conduct
              </a>
              <a href="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/rules" className="block text-gray-400 hover:text-white transition-colors">
                Event Rules
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-2">
              <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
                Discord
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a
                href="https://southwestmn-hacks.devpost.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Devpost
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 mb-2">hello@southwestmnhacks.org</p>
            <p className="text-gray-400">Questions? Reach out anytime!</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>
            Hosted by <span className="font-semibold text-white">ETM Solutions</span>
          </p>
          <p className="mt-2">© 2026 SouthwestMN Hacks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
