/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Restrict generated widths so images are never served at 3840px.
    // Next.js picks the smallest srcset entry >= the rendered width.
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2400],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      // /recap moved to /events/spring-2026 as part of the permanent event
      // archive; keep the old URL alive for existing external links.
      {
        source: "/recap",
        destination: "/events/spring-2026",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
