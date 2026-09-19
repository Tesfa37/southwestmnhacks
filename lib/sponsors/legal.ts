// Shared, deliberately cautious legal/tax + student-data wording. Reused on the
// intake form, invoice descriptions, and confirmation pages so the language stays
// consistent and conservative. Do NOT call sponsorships "donations" or "fully tax
// deductible", and do not promise advertising or guaranteed access to students.

import { EIN, GOVERNING_STATE, LEGAL_ENTITY_NAME, MAILING_ADDRESS } from "@/lib/config"

export const TAX_NOTICE =
  `${LEGAL_ENTITY_NAME} is a ${GOVERNING_STATE} nonprofit corporation and a tax-exempt 501(c)(3) organization (EIN ${EIN}). Sponsorship payments may include recognition or event-related benefits. Please consult your tax advisor regarding deductibility.`

export const STUDENT_DATA_NOTICE =
  "Any resume sharing is opt-in. Participants who are 18 or older can opt in themselves, and participants under 18 can opt in only with parent or guardian permission. We do not share participant contact information."

export const AUTHORIZATION_LABEL =
  "I'm authorized to commit my organization to this sponsorship, and I agree to be contacted about it."

// Lighter consent for the talk-first / discussion preferences, where nothing is
// being committed yet.
export const CONTACT_CONSENT_LABEL = "I agree to be contacted about this sponsorship inquiry."

// Appended to invoice memos/footers, with the EIN and check remit-to that
// docs/sponsor-stripe-runbook.md asks for. Stating 501(c)(3) status is not the
// same as promising deductibility, and the distinction above still holds: a
// sponsorship carrying benefits is not fully deductible, so the advisor line
// stays.
export const INVOICE_FOOTER_NOTE =
  `Thank you for sponsoring ${LEGAL_ENTITY_NAME}. ${LEGAL_ENTITY_NAME} is a ${GOVERNING_STATE} nonprofit corporation and a tax-exempt 501(c)(3) organization, EIN ${EIN}. Checks payable to ${LEGAL_ENTITY_NAME}, ${MAILING_ADDRESS}. Sponsorship payments may include recognition or event-related benefits; please consult your tax advisor regarding deductibility.`
