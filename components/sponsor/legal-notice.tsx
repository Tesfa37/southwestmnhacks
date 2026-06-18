import { cn } from "@/lib/utils"
import { TAX_NOTICE, STUDENT_DATA_NOTICE } from "@/lib/sponsors/legal"

// Cautious nonprofit/tax + student-data wording, shown on the intake form and
// confirmation pages.
export function LegalNotice({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-muted/40 p-4 text-xs leading-relaxed text-muted-foreground", className)}>
      <p>{TAX_NOTICE}</p>
      <p className="mt-2">{STUDENT_DATA_NOTICE}</p>
    </div>
  )
}
