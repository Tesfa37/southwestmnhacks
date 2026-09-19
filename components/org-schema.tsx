import {
  EIN,
  LEGAL_ENTITY_NAME,
  MARSHALL_ARTICLE_FALL_URL,
  MARSHALL_ARTICLE_SPRING_URL,
  MISSION,
  ORG_ADDRESS,
  ORG_FOUNDED,
  SUPPORT_EMAIL,
} from "@/lib/config"

/**
 * Stable node id for the nonprofit itself. The homepage Event schema points its
 * `organizer` at this id instead of repeating a name/url stub, so an Event and
 * the Organization resolve to one entity rather than two lookalikes.
 */
export const ORG_SCHEMA_ID = "https://southwestmnhacks.org/#organization"

/**
 * schema.org NGO node. This exists because nonprofit verifiers read structured
 * data, and before it the only address the site published was SMSU's venue
 * address attached to a Place — so a crawler found the university's location and
 * nothing for us. `address` here is ORG_ADDRESS and must never be the venue.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": ORG_SCHEMA_ID,
  name: LEGAL_ENTITY_NAME,
  legalName: LEGAL_ENTITY_NAME,
  description: MISSION,
  url: "https://southwestmnhacks.org",
  logo: "https://southwestmnhacks.org/og-image.png",
  email: SUPPORT_EMAIL,
  foundingDate: ORG_FOUNDED,
  taxID: EIN,
  nonprofitStatus: "Nonprofit501c3",
  address: {
    "@type": "PostalAddress",
    streetAddress: ORG_ADDRESS.street,
    addressLocality: ORG_ADDRESS.city,
    addressRegion: ORG_ADDRESS.region,
    postalCode: ORG_ADDRESS.postalCode,
    addressCountry: ORG_ADDRESS.country,
  },
  // Independent press coverage, the strongest third-party evidence available.
  sameAs: [MARSHALL_ARTICLE_SPRING_URL, MARSHALL_ARTICLE_FALL_URL],
}

/** Renders the node. Included on `/` and `/about`. */
export function OrgSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  )
}
