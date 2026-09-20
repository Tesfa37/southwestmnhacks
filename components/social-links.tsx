import { Facebook, Instagram, Linkedin, type LucideIcon } from "lucide-react"
import { SOCIAL_LINKS } from "@/lib/config"

/**
 * The nonprofit's own profiles, rendered for the footer and /contact.
 *
 * The icon mapping lives here rather than in lib/config.ts on purpose: config is
 * a plain data module imported by server and invoice code (lib/sponsors/legal.ts),
 * and putting React components in it would drag lucide into all of that. Config
 * stays data; this file is the one place that turns it into markup.
 */

type SocialLabel = (typeof SOCIAL_LINKS)[number]["label"]

/**
 * Keyed by the label union, so adding a platform to SOCIAL_LINKS without giving
 * it an icon is a build error rather than a blank square in production.
 */
const ICONS: Record<SocialLabel, LucideIcon> = {
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
}

/**
 * Icons are monochrome and inherit the surface's text colour. Real brand colours
 * (Facebook blue, the Instagram gradient) would fight the site's own orange/blue
 * palette and read as third-party badges rather than our own presence.
 */
const STYLES = {
  icon: {
    light:
      "inline-flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 ring-1 ring-gray-200 transition-colors hover:bg-gray-200 hover:text-gray-900",
    dark:
      "inline-flex size-10 items-center justify-center rounded-full bg-white/5 text-gray-400 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white",
  },
  labeled: {
    light:
      "inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900",
    dark:
      "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white",
  },
} as const

type SocialLinksProps = {
  /** `icon` is a compact row of icon-only chips; `labeled` pairs each icon with its name. */
  variant?: "icon" | "labeled"
  /** Opt in to the dark treatment. Light is the default, as with WaitlistCta and CountdownTimer. */
  onDark?: boolean
  className?: string
}

export function SocialLinks({ variant = "labeled", onDark = false, className }: SocialLinksProps) {
  const linkClass = STYLES[variant][onDark ? "dark" : "light"]

  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className ?? ""}`}>
      {SOCIAL_LINKS.map((social) => {
        const Icon = ICONS[social.label]
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              /* rel="me" marks these as profiles of the same entity that owns this
                 site — the same identity claim the Organization schema's `sameAs`
                 makes, in the form link-based verifiers read. */
              rel="me noopener noreferrer"
              className={linkClass}
              // Icon-only links carry no text, so the accessible name goes here.
              aria-label={variant === "icon" ? `Southwest MN Hacks on ${social.label}` : undefined}
            >
              <Icon className="size-5" aria-hidden="true" />
              {variant === "labeled" && social.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
