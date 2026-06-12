import Image from "next/image"
import { cn } from "@/lib/utils"

const PHOTOS = [
  { src: "/images/group-photo.jpg", alt: "All participants gathered for the group photo" },
  { src: "/images/1st-place.jpg", alt: "First place team with their award" },
  { src: "/images/dr-dan.jpg", alt: "Dr. Dan speaking to participants" },
  { src: "/images/2nd-place.jpg", alt: "Second place team with their award" },
  { src: "/images/babatunde.jpg", alt: "Babatunde presenting at the event" },
  { src: "/images/3rd-place.jpg", alt: "Third place team with their award" },
  { src: "/images/dave-schwans.jpg", alt: "Dave from Schwan's addressing students" },
  { src: "/images/4th-place.jpg", alt: "Fourth place team with their award" },
  { src: "/images/5th-place.jpg", alt: "Fifth place team with their award" },
]

function PhotoCard({ src, alt, tilt, hidden }: { src: string; alt: string; tilt: boolean; hidden?: boolean }) {
  return (
    // mr instead of flex gap so one copy's width is exactly 50% of the track,
    // making the -50% marquee loop seamless.
    <div
      aria-hidden={hidden || undefined}
      className={cn(
        "mr-5 shrink-0 rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-black/5 transition-transform duration-300 hover:scale-105 hover:rotate-0",
        tilt ? "rotate-2" : "-rotate-2",
      )}
    >
      <Image
        src={src}
        alt={hidden ? "" : alt}
        width={224}
        height={150}
        sizes="224px"
        className="h-32 w-48 sm:h-36 sm:w-56 rounded-xl object-cover"
      />
    </div>
  )
}

// Infinite CSS marquee of event photos. The track is rendered twice and slides
// -50% per loop; prefers-reduced-motion freezes it via the animate-marquee rule.
export function PhotoMarquee() {
  return (
    <div className="marquee-mask group w-full overflow-hidden py-6">
      <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]">
        {PHOTOS.map((photo, i) => (
          <PhotoCard key={photo.src} {...photo} tilt={i % 2 === 0} />
        ))}
        {PHOTOS.map((photo, i) => (
          <PhotoCard key={`dup-${photo.src}`} {...photo} tilt={i % 2 === 0} hidden />
        ))}
      </div>
    </div>
  )
}
