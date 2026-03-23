import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://southwestmnhacks.org"),
  title: {
    template: "%s | SouthwestMN Hacks",
    default: "SouthwestMN Hacks - March 21, 2026 | Marshall, MN",
  },
  description:
    "Southwest Minnesota's first student hackathon. 30 participants, 10 teams, 12 hours of building in Marshall, MN. See the winners, project gallery, and event recap.",
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
  authors: [{ name: "ETM Solutions" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://southwestmnhacks.org",
    title: "SouthwestMN Hacks - March 21, 2026 | Free Student Hackathon in Marshall, MN",
    description:
      "Join us for a FREE full-day student hackathon in Marshall, MN! Open to all skill levels with prizes, free food, mentorship, and workshops. Turn your ideas into reality. No experience required—just bring your enthusiasm!",
    siteName: "SouthwestMN Hacks",
    // TODO: Convert og-image.svg to PNG (1200x630) for full social platform support
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "SouthwestMN Hacks - March 21, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SouthwestMN Hacks - March 21, 2026 | Free Student Hackathon in Marshall, MN",
    description:
      "Join us for a FREE full-day student hackathon in Marshall, MN! Open to all skill levels with prizes, free food, mentorship, and workshops. Turn your ideas into reality. No experience required—just bring your enthusiasm!",
    images: ["/og-image.svg"],
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
