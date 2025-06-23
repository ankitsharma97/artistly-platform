"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { ArtistCard } from "@/components/artists/artist-card"
import { ArtistFilters } from "@/components/artists/artist-filters"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorMessage } from "@/components/ui/error-message"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import type { Artist, FilterOptions } from "@/types"
import type { ReadonlyURLSearchParams } from "next/navigation"

function getFiltersFromParams(sp: ReadonlyURLSearchParams): FilterOptions {
  const categoryParam = sp.get("category") ?? ""
  const locationParam = sp.get("location") ?? ""
  const priceParam = sp.get("price") ?? ""
  const searchParam = sp.get("search") ?? ""

  return {
    category: categoryParam ? categoryParam.split(",") : [],
    location: locationParam,
    priceRange: priceParam,
    searchQuery: searchParam,
  }
}

export default function ArtistsPageClient() {
  const searchParams = useSearchParams()

  // Initialise ONCE from URL
  const [filters, setFilters] = useState<FilterOptions>(() => getFiltersFromParams(searchParams))

  const [artists, setArtists] = useState<Artist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { toast } = useToast()

  const fetchArtists = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (filters.category.length > 0) {
        params.append("category", filters.category.join(","))
      }
      if (filters.location) {
        params.append("location", filters.location)
      }
      if (filters.priceRange) {
        params.append("priceRange", filters.priceRange)
      }
      if (filters.searchQuery) {
        params.append("search", filters.searchQuery)
      }

      const response = await fetch(`/api/artists?${params.toString()}`)
      if (!response.ok) {
        throw new Error("Failed to fetch artists")
      }

      const data = await response.json()
      setArtists(data.artists)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [filters.category.join(","), filters.location, filters.priceRange, filters.searchQuery])

  useEffect(() => {
    fetchArtists()
  }, [fetchArtists])

  const handleQuoteRequest = async (artistId: string) => {
    try {
      const artist = artists.find((a) => a.id === artistId)
      if (!artist) return

      // Simulate quote request
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistId,
          artistName: artist.name,
          eventDate: "",
          location: "",
          budget: artist.feeRange,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit quote request")
      }

      toast({
        title: "Quote Request Sent!",
        description: `Your quote request has been sent to ${artist.name}. They will contact you soon.`,
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send quote request. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage message={error} onRetry={fetchArtists} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Browse Artists</h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Discover talented performing artists for your next event</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row">
          <ArtistFilters filters={filters} onFiltersChange={setFilters} resultsCount={artists.length} />

          <div className="flex-1 p-3 sm:p-4 md:p-6">
            {loading ? (
              <div className="flex items-center justify-center py-8 sm:py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : artists.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 text-4xl sm:text-6xl mb-3 sm:mb-4">🎭</div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No artists found</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 px-4">Try adjusting your filters or search terms</p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setFilters({
                      category: [],
                      location: "",
                      priceRange: "",
                      searchQuery: "",
                    })
                  }
                  className="h-10 sm:h-11 px-4 sm:px-6"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {artists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} onQuoteRequest={handleQuoteRequest} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
