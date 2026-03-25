import Image from "next/image"
import { Trophy, ExternalLink } from "lucide-react"

// Tiny 1x1 gray JPEG used as blur placeholder while images load
const BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="

const winners = [
  {
    place: 1,
    label: "Grand Prize",
    team: "The Balancers",
    project: "IT Budget Strategist",
    members: ["Pradunna Pudasaini", "Sarthak Adhikari", "Luis Miguel Heyaime Bayonet"],
    devpost: "https://devpost.com/software/it-budgeting-and-forecasting",
    photo: "/images/1st-place.jpg",
  },
  {
    place: 2,
    label: "2nd Place",
    team: "Horizon",
    project: "Horizon",
    members: ["Sebastian Batista Ferrera", "Noel Hernandez", "Aidan Pereyra", "Diego Vicente Bello Polanco"],
    devpost: "https://devpost.com/software/horizon-8i3u2h",
    photo: "/images/2nd-place.jpg",
  },
  {
    place: 3,
    label: "3rd Place",
    team: "KnowledgeFlow",
    project: "KnowledgeFlow",
    members: ["Biruk Ayalew", "Ebunoluwa Shokefun", "Kaleab Debela"],
    devpost: "https://devpost.com/software/knowledgeflow",
    photo: "/images/3rd-place.jpg",
  },
  {
    place: 4,
    label: "4th Place",
    team: "REDT",
    project: "IT Budgeting and Forecasting Software",
    members: ["Abenezer Legesse", "Esrom Tadesse"],
    devpost: "https://devpost.com/software/it-budgeting-and-forecasting-software-6qvnm8",
    photo: "/images/4th-place.jpg",
  },
  {
    place: 5,
    label: "5th Place",
    team: "Triple B",
    project: "SplendIT",
    members: ["Hemi Woertink", "Noah Blodgett", "Seeton Erickson"],
    devpost: "https://devpost.com/software/splendit",
    photo: "/images/5th-place.jpg",
  },
]

export function Winners() {
  const [first, ...rest] = winners

  return (
    <section id="winners" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          <Trophy className="w-4 h-4" />
          Results
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Meet the Winners</h2>
        <p className="text-xl text-gray-600">10 teams competed. Here are the top 5.</p>
      </div>

      {/* 1st place featured card */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-3xl overflow-hidden shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto min-h-[280px]">
            <Image
              src={first.photo}
              alt={`${first.team} - Grand Prize winners at SouthwestMN Hacks`}
              fill
              placeholder="blur"
              blurDataURL={BLUR}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              className="object-cover"
            />
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full text-sm font-bold mb-4 w-fit">
              <Trophy className="w-4 h-4" />
              Grand Prize Winner
            </div>
            <h3 className="text-3xl font-black mb-1">{first.team}</h3>
            <p className="text-xl text-gray-700 font-semibold mb-3">{first.project}</p>
            <p className="text-gray-500 mb-6">{first.members.join(", ")}</p>
            <a
              href={first.devpost}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all w-fit"
            >
              View on Devpost
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 2nd-5th place grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {rest.map((winner) => (
          <div
            key={winner.place}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-[16/9]">
              <Image
                src={winner.photo}
                alt={`${winner.team} - ${winner.label} at SouthwestMN Hacks`}
                fill
                placeholder="blur"
                blurDataURL={BLUR}
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800">
                {winner.label}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{winner.team}</h3>
              <p className="text-gray-700 font-medium mb-2">{winner.project}</p>
              <p className="text-gray-500 text-sm mb-4">{winner.members.join(", ")}</p>
              <a
                href={winner.devpost}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
              >
                View on Devpost
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* View all projects */}
      <div className="text-center">
        <a
          href="https://southwestmn-hacks.devpost.com/project-gallery"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105 transition-all"
        >
          View All 10 Projects on Devpost
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </section>
  )
}
