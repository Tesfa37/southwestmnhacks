import { cn } from "@/lib/utils"

// Decorative animated gradient blobs. Pure CSS (no JS) — blur is rendered once
// and only transforms animate, so it stays composited on mobile GPUs.
export function AuroraBackground({ intensity = "bold" }: { intensity?: "bold" | "subtle" }) {
  const bold = intensity === "bold"
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className={cn(
          "animate-aurora-1 absolute -top-1/4 -left-[10%] rounded-full bg-gradient-to-br from-orange-300 to-pink-300 blur-3xl",
          bold ? "h-[36rem] w-[36rem] opacity-40" : "h-[28rem] w-[28rem] opacity-25",
        )}
      />
      <div
        className={cn(
          "animate-aurora-2 absolute -top-[10%] -right-[12%] rounded-full bg-gradient-to-bl from-blue-300 to-purple-300 blur-3xl",
          bold ? "h-[32rem] w-[32rem] opacity-40" : "h-[26rem] w-[26rem] opacity-25",
        )}
      />
      <div
        className={cn(
          "animate-aurora-3 absolute -bottom-1/3 left-1/3 rounded-full bg-gradient-to-tr from-pink-300 to-orange-200 blur-3xl",
          bold ? "h-[34rem] w-[34rem] opacity-35" : "h-[24rem] w-[24rem] opacity-20",
        )}
      />
    </div>
  )
}
