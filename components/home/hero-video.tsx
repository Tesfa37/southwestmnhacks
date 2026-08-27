"use client"

import { useRef, useState, useSyncExternalStore } from "react"
import { Pause, Play } from "lucide-react"

const MEDIA_QUERIES = ["(prefers-reduced-motion: reduce)", "(min-width: 768px)"]

function subscribeEligibility(callback: () => void) {
  const lists = MEDIA_QUERIES.map((q) => window.matchMedia(q))
  lists.forEach((list) => list.addEventListener("change", callback))
  return () => lists.forEach((list) => list.removeEventListener("change", callback))
}

function getEligibility() {
  const reducedMotion = window.matchMedia(MEDIA_QUERIES[0]).matches
  const wideEnough = window.matchMedia(MEDIA_QUERIES[1]).matches
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
  return !reducedMotion && wideEnough && !saveData
}

// Ambient hero video layered between the hero photo and its scrims. The photo
// underneath is the poster and the only thing ever server-rendered, so LCP is
// untouched. The video mounts post-hydration and only when the visitor hasn't
// asked for reduced motion, is on a md+ viewport, and isn't on a data-saver
// connection.
export function HeroVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Server snapshot is false, so SSR/hydration never render the video and LCP
  // stays the hero photo; the client re-evaluates right after hydration.
  const eligible = useSyncExternalStore(subscribeEligibility, getEligibility, () => false)
  const [visible, setVisible] = useState(false)
  const [playing, setPlaying] = useState(true)

  function toggle() {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }

  if (!eligible) return null

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-hidden="true"
        onCanPlay={() => setVisible(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* WCAG 2.2.2: auto-playing motion longer than 5s needs a pause control. */}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        aria-pressed={!playing}
        className="absolute bottom-4 right-4 z-10 rounded-full bg-black/55 backdrop-blur-sm ring-1 ring-white/20 p-3 text-white hover:bg-black/70 transition-colors"
      >
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
    </>
  )
}
