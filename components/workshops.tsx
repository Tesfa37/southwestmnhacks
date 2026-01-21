"use client"

import { Play, Clock, ExternalLink, GraduationCap, Wrench, Mic } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Video {
  title: string
  source: string
  duration: string
  videoId: string
  description: string
}

const beforeEventVideos: Video[] = [
  {
    title: "What is a Hackathon?",
    source: "MLH",
    duration: "5 min",
    videoId: "qj4DQfYx2Hg",
    description: "Learn what to expect at your first hackathon",
  },
  {
    title: "How to Get Project Ideas",
    source: "Y Combinator",
    duration: "8 min",
    videoId: "Th8JoIan4dg",
    description: "Brainstorming techniques for finding problems to solve",
  },
  {
    title: "Git in 100 Seconds",
    source: "Fireship",
    duration: "2 min",
    videoId: "hwP7WQkmECE",
    description: "Version control basics - essential for team collaboration",
  },
  {
    title: "VS Code in 100 Seconds",
    source: "Fireship",
    duration: "2 min",
    videoId: "KMxo3T_MTvY",
    description: "Set up the most popular code editor",
  },
  {
    title: "GitHub Student Developer Pack",
    source: "GitHub",
    duration: "3 min",
    videoId: "dSCvPB5KyYk",
    description: "Get FREE tools, domains, cloud credits & more",
  },
]

const duringEventVideos: Video[] = [
  {
    title: "HTML Crash Course",
    source: "Traversy Media",
    duration: "60 min",
    videoId: "UB1O30fR-EE",
    description: "Build the structure of any web page",
  },
  {
    title: "CSS Crash Course",
    source: "Traversy Media",
    duration: "85 min",
    videoId: "yfoY53QXEnI",
    description: "Make your projects look professional",
  },
  {
    title: "JavaScript in 100 Seconds",
    source: "Fireship",
    duration: "2 min",
    videoId: "DHjqpvDnNGE",
    description: "Quick intro to the language of the web",
  },
  {
    title: "JavaScript Crash Course",
    source: "Traversy Media",
    duration: "90 min",
    videoId: "hdI2bqOjy3c",
    description: "Deep dive into JavaScript fundamentals",
  },
  {
    title: "React in 100 Seconds",
    source: "Fireship",
    duration: "2 min",
    videoId: "Tn6-PIqc4UM",
    description: "Modern UI framework overview",
  },
  {
    title: "Google AI Studio Tutorial",
    source: "Google Developers",
    duration: "15 min",
    videoId: "HN9cPQnPPzU",
    description: "Add FREE AI to your project with Gemini API",
  },
  {
    title: "Deploy to Vercel in 5 Minutes",
    source: "Vercel",
    duration: "5 min",
    videoId: "sPHl5G_LfrA",
    description: "Free hosting for your project",
  },
]

const beforeDemosVideos: Video[] = [
  {
    title: "How to Pitch Your Startup",
    source: "Y Combinator",
    duration: "4 min",
    videoId: "17XZGUX_9iM",
    description: "Pitch structure that works for hackathons too",
  },
  {
    title: "Hackathon Demo Tips",
    source: "Devpost",
    duration: "6 min",
    videoId: "CTy9qQGsXRA",
    description: "What judges look for in demos",
  },
]

interface VideoCardProps {
  video: Video
}

function VideoCard({ video }: VideoCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`
  const youtubeUrl = `https://www.youtube.com/watch?v=${video.videoId}`

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video bg-gray-100">
        <img src={thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Play className="w-16 h-16 text-white drop-shadow-lg" />
        </div>
        <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 line-clamp-2">{video.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{video.source}</p>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{video.description}</p>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Watch on YouTube
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

export function Workshops() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Workshop Videos</h2>
          <p className="text-lg text-gray-600 mb-6">
            Watch anytime — we recommend completing the 'Before the Event' videos before March 21!
          </p>
          <div className="inline-block bg-blue-50 border border-blue-200 rounded-2xl px-6 py-3 text-sm text-gray-700">
            <GraduationCap className="w-4 h-4 inline-block mr-2" />
            All tools mentioned are FREE or included in the GitHub Student Developer Pack
          </div>
        </div>

        {/* Video Categories */}
        <Accordion type="multiple" defaultValue={["before", "during", "demos"]} className="space-y-6">
          {/* Before the Event */}
          <AccordionItem value="before" className="bg-green-50 border-2 border-green-200 rounded-3xl overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-3 text-left">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="text-2xl font-bold">Before the Event</h3>
                  <p className="text-sm text-gray-600">Watch these before March 21 to hit the ground running</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {beforeEventVideos.map((video) => (
                  <VideoCard key={video.videoId} video={video} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* During the Event */}
          <AccordionItem value="during" className="bg-blue-50 border-2 border-blue-200 rounded-3xl overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-3 text-left">
                <span className="text-2xl">🔧</span>
                <div>
                  <h3 className="text-2xl font-bold">During the Event</h3>
                  <p className="text-sm text-gray-600">Reference these while building your project</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {duringEventVideos.map((video) => (
                  <VideoCard key={video.videoId} video={video} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Before Demos */}
          <AccordionItem value="demos" className="bg-purple-50 border-2 border-purple-200 rounded-3xl overflow-hidden">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center gap-3 text-left">
                <span className="text-2xl">🎤</span>
                <div>
                  <h3 className="text-2xl font-bold">Before Demos</h3>
                  <p className="text-sm text-gray-600">Prepare your presentation and pitch</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {beforeDemosVideos.map((video) => (
                  <VideoCard key={video.videoId} video={video} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* GitHub Student Pack Link */}
        <div className="mt-12 text-center">
          <a
            href="https://education.github.com/pack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all"
          >
            🎓 Get $200+ in free developer tools → education.github.com/pack
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
