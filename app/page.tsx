import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Star, Users, Calendar, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CATEGORIES } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "Artistly - Connect with Performing Artists",
  description: "Book talented performing artists for your events. Browse singers, dancers, DJs, speakers and more.",
  keywords: "artist booking, event planning, performers, entertainment",
  openGraph: {
    title: "Artistly - Connect with Performing Artists",
    description: "Book talented performing artists for your events",
    type: "website",
  },
}

const categoryIcons: Record<string, string> = {
  Singers: "🎤",
  Dancers: "💃",
  DJs: "🎧",
  Speakers: "🎯",
  Musicians: "🎸",
  Comedians: "😄",
  Magicians: "🎩",
  Bands: "🎵",
}

const features = [
  {
    icon: Users,
    title: "Verified Artists",
    description: "All artists are verified and background-checked for your peace of mind.",
  },
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Simple booking process with instant quotes and availability checks.",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Safe and secure payment processing with full refund protection.",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    description: "Read reviews and ratings from previous clients to make informed decisions.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Perfect Artists for
              <span className="block text-yellow-300">Your Next Event</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
              Connect with talented performing artists across India. From singers to dancers, DJs to speakers - book the
              best entertainment for your events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/artists">
                  Browse Artists
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-blue-400"
              >
                <Link href="/onboarding">Join as Artist</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover talented artists across various performance categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.slice(0, 8).map((category) => (
              <Link key={category} href={`/artists?category=${encodeURIComponent(category)}`} className="group">
                <Card className="h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group-hover:border-blue-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{categoryIcons[category] || "🎭"}</div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{category}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Artistly?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make it easy to find and book the perfect entertainment for your events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Next Artist?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of event planners who trust Artistly for their entertainment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/artists">
                Start Browsing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-blue-400"
            >
              <Link href="/onboarding">List Your Talent</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
