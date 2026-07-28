import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/sponsor/start", "/sponsor/success", "/sponsor/cancel"],
    },
    sitemap: "https://southwestmnhacks.org/sitemap.xml",
  }
}
