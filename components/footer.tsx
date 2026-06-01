import Link from "next/link"
import Image from "next/image"
import {
  SUPPORT_EMAIL,
  REGISTRATION_FORM_URL,
  DEVPOST_FALL_URL,
  DISCORD_INVITE_URL,
  DISCORD_ENABLED,
  PARTNERSHIP_LINE,
} from "@/lib/config"

const BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="

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
              <a
                href={REGISTRATION_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Register
              </a>
              <Link href="/resources" className="block text-gray-400 hover:text-white transition-colors">
                Resources
              </Link>
              <Link href="/#faq" className="block text-gray-400 hover:text-white transition-colors">
                FAQ
              </Link>
              <Link href="/recap" className="block text-gray-400 hover:text-white transition-colors">
                Past Events
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
              {DISCORD_ENABLED && (
                <a
                  href={DISCORD_INVITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Discord
                </a>
              )}
              <a
                href={DEVPOST_FALL_URL}
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
            <p className="text-gray-400 mb-2">{SUPPORT_EMAIL}</p>
            <p className="text-gray-400">Questions? Reach out anytime!</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span>In partnership with</span>
            <a
              href="https://getaulden.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aulden"
              className="inline-flex hover:opacity-90 transition-opacity"
            >
              <Image src="/aulden-logo-dark.png" alt="Aulden" width={120} height={32} placeholder="blur" blurDataURL={BLUR} sizes="120px" className="h-8 w-auto rounded" />
            </a>
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto">{PARTNERSHIP_LINE}</p>
          <p className="mt-2">© 2026 SouthwestMN Hacks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
