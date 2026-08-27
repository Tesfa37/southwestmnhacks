import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/sponsor/start", "/sponsor/success", "/sponsor/cancel", "/preview"],
    },
    sitemap: "https://southwestmnhacks.org/sitemap.xml",
  }
}
