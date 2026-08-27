import { MetadataRoute } from "next"

// Bump when a page's content meaningfully changes. A fixed date is an honest
// signal; `new Date()` at build time told crawlers every page changed daily.
const SITE_UPDATED = new Date("2026-08-27")
const RECAP_UPDATED = new Date("2026-04-15")

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://southwestmnhacks.org"

  return [
    {
      url: baseUrl,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/recap`,
      lastModified: RECAP_UPDATED,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/sponsor`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/code-of-conduct`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/safety`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/rules`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refunds`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: SITE_UPDATED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ]
}
