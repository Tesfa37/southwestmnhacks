// Shared, deliberately cautious legal/tax + student-data wording. Reused on the
// intake form, invoice descriptions, and confirmation pages so the language stays
// consistent and conservative. Do NOT call sponsorships "donations" or "fully tax
// deductible", and do not promise advertising or guaranteed access to students.

export const TAX_NOTICE =
  "Southwest MN Hacks is a nonprofit organization. Sponsorship payments may include recognition or event-related benefits. Please consult your tax advisor regarding deductibility."

export const STUDENT_DATA_NOTICE =
  "Any resume sharing is opt-in. Participants who are 18 or older can opt in themselves, and participants under 18 can opt in only with parent or guardian permission. We do not share participant contact information."

export const AUTHORIZATION_LABEL =
  "I'm authorized to commit my organization to this sponsorship, and I agree to be contacted about it."

// Lighter consent for the talk-first / discussion preferences, where nothing is
// being committed yet.
export const CONTACT_CONSENT_LABEL = "I agree to be contacted about this sponsorship inquiry."

// Appended to invoice memos/footers. The nonprofit's EIN and remit-to address are
// filled in at go-live (see docs/sponsor-payments.md).
export const INVOICE_FOOTER_NOTE =
  "Thank you for sponsoring Southwest MN Hacks. Sponsorship payments may include recognition or event-related benefits; please consult your tax advisor regarding deductibility."
