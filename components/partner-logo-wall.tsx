import Image from "next/image"

const PARTNERS = [
  { src: "/schwans-logo.png", alt: "Schwan's", href: "https://www.schwanscompany.com", h: "h-10" },
  { src: "/aulden-logo.svg", alt: "Aulden", href: "https://getaulden.com", h: "h-14" },
  { src: "/visit-marshall-logo.png", alt: "Visit Marshall", href: "https://visitmarshallmn.com", h: "h-12" },
]

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
            key={partner.alt}
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={partner.alt}
            className="opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={partner.src}
              alt={partner.alt}
              width={160}
              height={48}
              sizes="160px"
              className={`${partner.h} w-auto object-contain`}
            />
          </a>
        ))}
      </div>
    </div>
  )
}
