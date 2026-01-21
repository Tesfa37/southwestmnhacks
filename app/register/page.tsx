"use client"

import { Calendar, Clock, Users, Award } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center">
        <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-semibold text-blue-900 mb-6">
          Registration Open
        </div>

        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight">
          <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Join SouthwestMN Hacks
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Sign up for a day of building, learning, and connecting with fellow creators. Whether you're a seasoned coder
          or complete beginner, there's a place for you here!
        </p>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="text-gray-600 text-sm">Completely free to attend, including meals & swag</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">12 Hours</h3>
            <p className="text-gray-600 text-sm">8:00 AM to 8:00 PM on March 21, 2026</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Teams 1-4</h3>
            <p className="text-gray-600 text-sm">Work solo or form teams of up to 4 people</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">All Levels</h3>
            <p className="text-gray-600 text-sm">Beginner-friendly with mentors & workshops</p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Your Registration</h2>
            <p className="text-lg text-gray-600">Fill out the form below to secure your spot!</p>
          </div>

          <div className="rounded-2xl overflow-hidden">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSeKYn3vyULkHJ8mYgrP2d2YvPhYGmQ48u7FebJQi7MjU1e0zw/viewform?embedded=true"
              width="100%"
              height="1200"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Loading…
            </iframe>
          </div>
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Happens Next?</h2>
          <p className="text-xl text-gray-600">Here's what to expect after you register</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-white text-3xl font-bold">1</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Confirmation Email</h3>
            <p className="text-gray-600 leading-relaxed">
              You'll receive a confirmation email with event details, logistics, and important dates to remember.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-orange-400 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-white text-3xl font-bold">2</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Event Reminders</h3>
            <p className="text-gray-600 leading-relaxed">
              We'll send you reminders as the event approaches, including schedule updates and what to bring.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-white text-3xl font-bold">3</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Check-In Day</h3>
            <p className="text-gray-600 leading-relaxed">
              Show up on March 21st, check in at the registration desk, and get ready to build something amazing!
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
