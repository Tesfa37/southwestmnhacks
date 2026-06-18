// Server-side environment access. Kept intentionally lightweight: Stripe is
// required (throws if missing), while Notion and Resend degrade gracefully (their
// modules no-op when unconfigured) so the payment flow still works in dev without
// every integration wired up. NEVER import this from a client component.

export function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function optionalEnv(name: string): string | undefined {
  const value = process.env[name]
  return value && value.length > 0 ? value : undefined
}

/** Whether finalized invoices should be sent automatically (default: false -> draft for review). */
export function autoSendInvoices(): boolean {
  return process.env.SPONSOR_AUTO_SEND_INVOICES === "true"
}

/** Net terms for invoices, in days. */
export function invoiceDaysUntilDue(): number {
  const n = Number(process.env.SPONSOR_INVOICE_DAYS_UNTIL_DUE)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 30
}

/** Absolute site origin used to build Stripe success/cancel URLs. No trailing slash. */
export function siteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  return raw.replace(/\/+$/, "")
}
