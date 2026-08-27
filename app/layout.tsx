import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Archivo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })
// Display face for the homepage headline only (see components/home-record/tokens.ts).
// Geist remains the body font everywhere.
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" })

export const metadata: Metadata = {
  metadataBase: new URL("https://southwestmnhacks.org"),
  alternates: { canonical: "/" },
  title: {
    template: "%s | Southwest MN Hacks",
    default: "Southwest MN Hacks: Fall 2026 | SMSU, Marshall, MN",
  },
  description:
    "Southwest Minnesota's student hackathon returns September 12 to 13, 2026 at SMSU in Marshall, MN. Free to attend, all skill levels welcome. Register now.",
  keywords: [
    "hackathon",
    "Marshall MN",
    "SMSU",
    "Southwest Minnesota",
    "coding",
    "student hackathon",
    "beginner friendly",
    "programming competition",
    "tech event",
    "Minnesota hackathon",
    "free hackathon",
  ],
  authors: [{ name: "Southwest MN Hacks" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://southwestmnhacks.org",
    title: "Southwest MN Hacks: Fall 2026 | SMSU, Marshall, MN",
    description:
      "Southwest Minnesota's student hackathon returns September 12 to 13, 2026 at SMSU in Marshall, MN. Free to attend, all skill levels welcome. Register now.",
    siteName: "Southwest MN Hacks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Southwest MN Hacks: Fall 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Southwest MN Hacks: Fall 2026 | SMSU, Marshall, MN",
    description:
      "Southwest Minnesota's student hackathon returns September 12 to 13, 2026 at SMSU in Marshall, MN. Free to attend, all skill levels welcome. Register now.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
    ],
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} ${archivo.variable} font-sans antialiased`}>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
