import Link from "next/link"
import Image from "next/image"
import { RegisterCta } from "@/components/register-cta"
import { getEventPhase } from "@/lib/event-phase"
import {
  SUPPORT_EMAIL,
  DEVPOST_FALL_URL,
  DISCORD_INVITE_URL,
  DISCORD_ENABLED,
  PARTNERSHIP_LINE,
} from "@/lib/config"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="text-xl font-bold mb-4">
              <span className="text-orange-400">Southwest</span>{" "}
              <span className="text-blue-400">MN</span> Hacks
            </div>
            <p className="text-gray-400">Building the future, one hackathon at a time.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <RegisterCta variant="footer-link" location="footer" initialPhase={getEventPhase()} />
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
              <Link href="/safety" className="block text-gray-400 hover:text-white transition-colors">
                Safety & Overnight Rules
              </Link>
              <Link href="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/rules" className="block text-gray-400 hover:text-white transition-colors">
                Event Rules
              </Link>
              <Link href="/terms" className="block text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/refunds" className="block text-gray-400 hover:text-white transition-colors">
                Refund Policy
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
            <p className="mb-2">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="text-gray-400 hover:text-white transition-colors break-all"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
            <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
              All Contacts
            </Link>
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
              <Image src="/aulden-logo-dark.svg" alt="Aulden" width={180} height={48} sizes="180px" className="h-12 w-auto" />
            </a>
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto">{PARTNERSHIP_LINE}</p>
          <p className="mt-2">© 2026 Southwest MN Hacks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
