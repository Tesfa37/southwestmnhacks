"use client"

import { useState, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import { Play, Clock, ExternalLink, GraduationCap, X, Youtube } from "lucide-react"

type Category = "Before the Event" | "Quick References" | "Before Demos"

interface Video {
  title: string
  source: string
  duration?: string
  videoId: string
  description: string
  category: Category
}

const CATEGORIES: Category[] = ["Before the Event", "Quick References", "Before Demos"]

// All videos are real, verified YouTube links. The "What is a Hackathon?" video
// is published by Major League Hacking; its source label stays generic ("YouTube")
// so the MLH name does not render while the MLH gate is off.
const videos: Video[] = [
  // Before the Event
  {
    title: "What is a Hackathon?",
    source: "YouTube",
    duration: "5 min",
    videoId: "qj4DQfYx2Hg",
    description: "Learn what to expect at your first hackathon",
    category: "Before the Event",
  },
  {
    title: "How to Win EVERY Hackathon (from a Top 50 Hacker)",
    source: "Naman Singh",
    videoId: "JWxcEL4mg_Q",
    description: "Strategy and practical tips from an experienced hackathon winner",
    category: "Before the Event",
  },
  {
    title: "How to Get Project Ideas",
    source: "Y Combinator",
    duration: "8 min",
    videoId: "Th8JoIan4dg",
    description: "Brainstorming techniques for finding problems worth solving",
    category: "Before the Event",
  },
  {
    title: "Git in 100 Seconds",
    source: "Fireship",
    duration: "2 min",
    videoId: "hwP7WQkmECE",
    description: "Version control basics, essential for team collaboration",
    category: "Before the Event",
  },
  {
    title: "VS Code in 100 Seconds",
    source: "Fireship",
    duration: "2 min",
    videoId: "KMxo3T_MTvY",
    description: "Set up the most popular code editor",
    category: "Before the Event",
  },
  {
    title: "Git & GitHub for Beginners",
    source: "Fireship",
    duration: "~12 min",
    videoId: "HkdAHXoRtos",
    description: "Use GitHub to share and collaborate on your hackathon project",
    category: "Before the Event",
  },
  // Quick References
  {
    title: "JavaScript in 100 Seconds",
    source: "Fireship",
    duration: "2 min",
    videoId: "DHjqpvDnNGE",
    description: "Quick intro to the language of the web",
    category: "Quick References",
  },
  {
    title: "React in 100 Seconds",
    source: "Fireship",
    duration: "2 min",
    videoId: "Tn6-PIqc4UM",
    description: "Modern UI framework overview",
    category: "Quick References",
  },
  {
    title: "Tailwind in 100 Seconds",
    source: "Fireship",
    duration: "2 min",
    videoId: "mr15Xzb1Ook",
    description: "Utility-first CSS to style your app quickly",
    category: "Quick References",
  },
  {
    title: "Python in 100 Seconds",
    source: "Fireship",
    duration: "2 min",
    videoId: "x7X9w_GIm1s",
    description: "A friendly first language for scripts and backends",
    category: "Quick References",
  },
  {
    title: "Supabase in 100 Seconds",
    source: "Fireship",
    duration: "2 min",
    videoId: "zBZgdTb-dns",
    description: "A free database and auth backend you can wire up in minutes",
    category: "Quick References",
  },
  {
    title: "Deploy to Vercel",
    source: "PedroTech",
    duration: "~5 min",
    videoId: "2HBIzEx6IZA",
    description: "Free hosting to put your project demo online",
    category: "Quick References",
  },
  // Before Demos
  {
    title: "How to Pitch Your Startup",
    source: "Y Combinator",
    duration: "4 min",
    videoId: "17XZGUX_9iM",
    description: "Pitch structure that works for hackathon demos too",
    category: "Before Demos",
  },
]

interface VideoCardProps {
  video: Video
  onPlay: () => void
}

function VideoCard({ video, onPlay }: VideoCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`
  const youtubeUrl = `https://www.youtube.com/watch?v=${video.videoId}`

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <button
        onClick={onPlay}
        className="relative aspect-video bg-gray-100 w-full block cursor-pointer group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500"
        aria-label={`Play video: ${video.title}`}
      >
        {/* Decorative thumbnail; the title is announced via the button label and heading. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- lazy facade thumbnail; intentionally not next/image to avoid remote-host config */}
        <img
          src={thumbnailUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <span className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <span className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-7 h-7 text-white ml-1" fill="white" aria-hidden="true" />
          </span>
        </span>
        {video.duration && (
          <span className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" aria-hidden="true" />
            {video.duration}
          </span>
        )}
      </button>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-1 line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{video.source}</p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2 flex-1">{video.description}</p>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors self-start rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
        >
          <Youtube className="w-3.5 h-3.5" aria-hidden="true" />
          Watch on YouTube
        </a>
      </div>
    </div>
  )
}

export function Workshops() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All")
  const [activeVideo, setActiveVideo] = useState<Video | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  // Accessible dialog behavior: the dialog is portaled to <body> and every other
  // top-level element is made inert while it is open, so focus cannot escape to
  // the page behind it (a plain keydown trap cannot catch Tab once focus is inside
  // the cross-origin YouTube iframe). Also: focus moved in on open, Tab/Shift+Tab
  // cycle within the dialog, Escape to close, body scroll lock, and focus returned
  // to the triggering thumbnail on close.
  useEffect(() => {
    if (!activeVideo) return

    lastFocusedRef.current = document.activeElement as HTMLElement
    closeButtonRef.current?.focus()

    // Make the rest of the page non-tabbable and hidden from assistive tech.
    const inerted: HTMLElement[] = []
    for (const child of Array.from(document.body.children) as HTMLElement[]) {
      if (child !== overlayRef.current && !child.hasAttribute("inert")) {
        child.setAttribute("inert", "")
        inerted.push(child)
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null)
        return
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], iframe, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
      inerted.forEach((el) => el.removeAttribute("inert"))
      lastFocusedRef.current?.focus()
    }
  }, [activeVideo])

  const filters: (Category | "All")[] = ["All", ...CATEGORIES]
  const visibleVideos = activeCategory === "All" ? videos : videos.filter((v) => v.category === activeCategory)

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Workshop Videos</h2>
          <p className="text-lg text-gray-600 mb-6">
            Short, beginner-friendly videos to watch before and during the event.
          </p>
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-2xl px-6 py-3 text-sm text-gray-700">
            <GraduationCap className="w-4 h-4" aria-hidden="true" />
            All tools mentioned are FREE or included in the GitHub Student Developer Pack
          </div>
        </div>

        {/* Category filter */}
        <div role="group" aria-label="Filter videos by category" className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((filter) => {
            const selected = activeCategory === filter
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={selected}
                onClick={() => setActiveCategory(filter)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 ${
                  selected
                    ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
                }`}
              >
                {filter}
              </button>
            )
          })}
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleVideos.map((video) => (
            <VideoCard key={video.videoId} video={video} onPlay={() => setActiveVideo(video)} />
          ))}
        </div>

        {/* GitHub Student Pack Link */}
        <div className="mt-12 text-center">
          <a
            href="https://education.github.com/pack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all"
          >
            🎓 Get free developer tools, domains, and cloud credits
            <ExternalLink className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Accessible video dialog, portaled to <body> so the rest of the page can be
          made inert while it is open. */}
      {activeVideo && createPortal(
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.title}
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2 gap-4">
              <h3 className="text-white font-semibold text-base sm:text-lg line-clamp-1">{activeVideo.title}</h3>
              <button
                ref={closeButtonRef}
                onClick={() => setActiveVideo(null)}
                className="text-white hover:text-gray-300 transition-colors rounded-full p-1 flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Close video"
              >
                <X className="w-7 h-7" aria-hidden="true" />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={activeVideo.title}
              />
            </div>
          </div>
        </div>,
        document.body,
      )}
    </section>
  )
}
