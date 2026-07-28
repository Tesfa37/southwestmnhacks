import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col">
      <Header />
      <main id="main" className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-xl">
          <p className="text-7xl font-black mb-6 bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            404
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">This page wandered off</h1>
          <p className="text-lg text-gray-600 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Here are some good places to go instead.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Back to the homepage
            </Link>
            <Link href="/#faq" className="font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-700">
              FAQ
            </Link>
            <Link href="/recap" className="font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-700">
              March 2026 recap
            </Link>
            <Link href="/contact" className="font-semibold text-blue-600 underline underline-offset-2 hover:text-blue-700">
              Contact us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
