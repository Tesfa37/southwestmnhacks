import Image from "next/image"
import { PARTNERS } from "@/lib/sponsors/partners"

// Logos of organizations that have backed the event. Grayscale until hover.
export function PartnerLogoWall() {
  return (
    <div className="text-center">
      <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Organizations that have backed Southwest MN Hacks
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        {PARTNERS.map((partner) => (
          <a
            key={partner.name}
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={partner.name}
            className="transition-all duration-300 [@media(hover:hover)]:opacity-70 [@media(hover:hover)]:grayscale [@media(hover:hover)]:hover:opacity-100 [@media(hover:hover)]:hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0"
          >
            <Image
              src={partner.src}
              alt={partner.name}
              width={partner.width}
              height={partner.height}
              sizes="200px"
              className={`${partner.wallHeightClass} w-auto object-contain`}
            />
          </a>
        ))}
      </div>
    </div>
  )
}
