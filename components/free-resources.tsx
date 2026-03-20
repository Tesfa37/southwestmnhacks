"use client"

import { Gift, Database, Globe, Sparkles, Code, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"

const resources = [
  {
    icon: Gift,
    title: "GitHub Student Developer Pack",
    description: "FREE Copilot, domains, cloud credits, and 100+ tools for students",
    url: "https://education.github.com/pack",
    tag: "Must Have",
    color: "bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    icon: Sparkles,
    title: "Google AI Studio",
    description: "FREE Gemini API access - add AI to your project in minutes",
    url: "https://aistudio.google.com",
    tag: "AI",
    color: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    icon: Globe,
    title: "Vercel",
    description: "FREE hosting with instant deploys - perfect for hackathon demos",
    url: "https://vercel.com",
    tag: "Hosting",
    color: "bg-gray-100",
    iconColor: "text-gray-700",
  },
  {
    icon: Database,
    title: "MongoDB Atlas",
    description: "FREE database with 5GB storage - no credit card needed",
    url: "https://www.mongodb.com/atlas",
    tag: "Database",
    color: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    icon: Code,
    title: "Replit",
    description: "FREE browser-based IDE - code, run, and share projects with zero setup",
    url: "https://replit.com",
    tag: "Code Editor",
    color: "bg-orange-100",
    iconColor: "text-orange-700",
  },
  {
    icon: Palette,
    title: "Figma",
    description: "FREE design tool - create mockups before you code",
    url: "https://figma.com",
    tag: "Design",
    color: "bg-pink-100",
    iconColor: "text-pink-700",
  },
]

export function FreeResources() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Free Tools & Credits</h2>
          <p className="text-lg text-gray-600 text-balance">
            Student-exclusive freebies and generous free tiers to power your hackathon project without spending a dime
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.title}
              className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition-shadow"
            >
              <div
                className={`${resource.color} ${resource.iconColor} inline-flex items-center justify-center w-full rounded-xl p-6 mb-3`}
              >
                <resource.icon className="size-10" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">{resource.description}</p>
              <div className="mb-3">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                  {resource.tag}
                </span>
              </div>
              <Button variant="outline" className="rounded-full w-full bg-transparent" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                  Get Free Access
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
