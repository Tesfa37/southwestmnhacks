import Image from "next/image"

// Tiny 1x1 gray JPEG used as blur placeholder while images load
const BLUR = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="

export function EventRecap() {
  return (
    <section id="recap" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <div className="inline-block bg-gradient-to-r from-orange-100 to-pink-100 px-4 py-2 rounded-full text-sm font-semibold text-orange-900 mb-4">
          March 21, 2026 &middot; Marshall, MN
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">It happened.</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Southwest Minnesota&apos;s first-ever student hackathon brought together students from across the region
          for 12 hours of building, learning, and creating.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-200">
          <div className="text-3xl font-black text-orange-600 mb-1">30</div>
          <div className="text-gray-600 text-sm font-medium">Participants</div>
        </div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-200">
          <div className="text-3xl font-black text-blue-600 mb-1">10</div>
          <div className="text-gray-600 text-sm font-medium">Teams Submitted</div>
        </div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-200">
          <div className="text-3xl font-black text-pink-600 mb-1">12</div>
          <div className="text-gray-600 text-sm font-medium">Hours of Building</div>
        </div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-200">
          <div className="text-3xl font-black text-purple-600 mb-1">5</div>
          <div className="text-gray-600 text-sm font-medium">Prizes Awarded</div>
        </div>
      </div>

      {/* Photos */}
      <div className="mb-12">
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="/images/group-photo.jpg"
            alt="All participants gathered at SouthwestMN Hacks, Marshall Edition"
            fill
            priority
            placeholder="blur"
            blurDataURL={BLUR}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 md:p-10 text-white">
        <h3 className="text-2xl font-bold mb-6">Event Highlights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base md:text-lg">
          <div className="flex items-start gap-3">
            <span className="text-yellow-300 font-bold mt-0.5">&#8226;</span>
            <span>Southwest Minnesota&apos;s first-ever student hackathon, hosted in Marshall</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-300 font-bold mt-0.5">&#8226;</span>
            <span>Co-organized by Bityana Yishak and Tesfatsion Desta</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-300 font-bold mt-0.5">&#8226;</span>
            <span>Students from SMSU, SDSU, Marshall High School, and other institutions across Southwest Minnesota</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-300 font-bold mt-0.5">&#8226;</span>
            <span>All 10 teams tackled real-world challenges from Schwan&apos;s Company</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-300 font-bold mt-0.5">&#8226;</span>
            <span>Mentorship from Schwan&apos;s Company professionals and event organizers throughout the day</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-yellow-300 font-bold mt-0.5">&#8226;</span>
            <span>Hosted by ETM Software Solutions at the Upper Conference Center, SMSU</span>
          </div>
        </div>
      </div>
    </section>
  )
}
