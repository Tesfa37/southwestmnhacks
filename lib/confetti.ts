// Tiny hand-rolled canvas confetti — no dependency, fire-and-forget.
// Respects prefers-reduced-motion by doing nothing.

const COLORS = ["#f97316", "#ec4899", "#3b82f6", "#a855f7", "#fbbf24", "#14b8a6"]

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rotation: number
  vr: number
  shape: "rect" | "circle"
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function createCanvas(): HTMLCanvasElement {
  const canvas = document.createElement("canvas")
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  canvas.style.cssText = "position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;"
  canvas.setAttribute("aria-hidden", "true")
  document.body.appendChild(canvas)
  return canvas
}

function run(particles: Particle[], gravity: number, durationMs: number) {
  const canvas = createCanvas()
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    canvas.remove()
    return
  }
  const start = performance.now()

  function frame(now: number) {
    const elapsed = now - start
    ctx!.clearRect(0, 0, canvas.width, canvas.height)
    const fade = Math.max(0, 1 - elapsed / durationMs)

    for (const p of particles) {
      p.vy += gravity
      p.x += p.vx
      p.y += p.vy
      p.rotation += p.vr
      ctx!.save()
      ctx!.globalAlpha = fade
      ctx!.translate(p.x, p.y)
      ctx!.rotate(p.rotation)
      ctx!.fillStyle = p.color
      if (p.shape === "rect") {
        ctx!.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
      } else {
        ctx!.beginPath()
        ctx!.arc(0, 0, p.size / 2, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.restore()
    }

    if (elapsed < durationMs) {
      requestAnimationFrame(frame)
    } else {
      canvas.remove()
    }
  }

  requestAnimationFrame(frame)
}

// Radial burst from a point (defaults to viewport center).
export function burstConfetti(originX?: number, originY?: number) {
  if (prefersReducedMotion()) return
  const x = originX ?? window.innerWidth / 2
  const y = originY ?? window.innerHeight / 2

  const particles: Particle[] = Array.from({ length: 90 }, () => {
    const angle = Math.random() * Math.PI * 2
    const speed = 4 + Math.random() * 9
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 6 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }
  })

  run(particles, 0.25, 1800)
}

// Full-width rain from the top of the viewport (easter egg).
export function confettiRain() {
  if (prefersReducedMotion()) return

  const particles: Particle[] = Array.from({ length: 160 }, () => ({
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * window.innerHeight * 0.5,
    vx: (Math.random() - 0.5) * 2,
    vy: 2 + Math.random() * 4,
    size: 6 + Math.random() * 7,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    rotation: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.25,
    shape: Math.random() > 0.5 ? "rect" : "circle",
  }))

  run(particles, 0.05, 4200)
}
