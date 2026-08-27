import Image from "next/image"
import type { Partner } from "@/lib/sponsors/partners"

/**
 * One partner logo at a caller-chosen height. Wrapped in a link when the partner
 * has a confirmed public URL, in a plain span when it doesn't, so a logo we hold
 * without a website never renders as a dead link. Shared by the homepage cards,
 * the /sponsor wall, and the hero sponsor strip.
 */
export function PartnerLogo({
  partner,
  heightClass,
  sizes,
  className = "",
}: {
  partner: Partner
  heightClass: string
  sizes: string
  className?: string
}) {
  const logo = (
    <Image
      src={partner.src}
      alt={partner.name}
      width={partner.width}
      height={partner.height}
      sizes={sizes}
      className={`${heightClass} w-auto object-contain`}
    />
  )

  if (!partner.href) {
    return <span className={className}>{logo}</span>
  }

  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={partner.name}
      className={className}
    >
      {logo}
    </a>
  )
}
