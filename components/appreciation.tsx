import Image from "next/image"
import { Heart } from "lucide-react"

// Tiny 1x1 gray JPEG used as blur placeholder while images load
const BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="

const honorees = [
  {
    name: "Prof. Oluleye Babatunde",
    title: "Assistant Professor of Computer Science, SMSU",
    photo: "/images/babatunde.jpg",
    recognition:
      "Came on his weekend off to mentor students throughout the event and served as a judge. His presence and guidance made a real difference for participants working through tough problems.",
  },
  {
    name: "Dr. Dan Kaiser",
    title: "Professor of Computer Science & Department Chair, SMSU",
    photo: "/images/dr-dan.jpg",
    recognition:
      "Served as a judge and met with the organizers every two weeks in the lead-up to the event. His ongoing guidance and support were essential to making this happen.",
  },
  {
    name: "Dave Deines",
    title: "Platinum Sponsor, Schwan's Company",
    photo: "/images/dave-schwans.jpg",
    recognition:
      "Believed in this event before even meeting the organizers in person. Sponsored the hackathon, brought Schwan's food for participants, and stepped in as a last-minute judge when a scheduled judge could not make it.",
  },
]

export function Appreciation() {
  return (
    <section id="thanks" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <Heart className="w-4 h-4" />
          Special Thanks
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Made Possible By</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Some people gave their weekend, their time, and their belief in something that had never been done here before.
          This event would not have happened without them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {honorees.map((person) => (
          <div
            key={person.name}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={person.photo}
                alt={person.name}
                fill
                placeholder="blur"
                blurDataURL={BLUR}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{person.name}</h3>
              <p className="text-sm text-orange-600 font-semibold mb-3">{person.title}</p>
              <p className="text-gray-600 leading-relaxed">{person.recognition}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
