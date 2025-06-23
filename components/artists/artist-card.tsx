"use client"

import Image from "next/image"
import { Star, MapPin, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Artist } from "@/types"

interface ArtistCardProps {
  artist: Artist
  onQuoteRequest?: (artistId: string) => void
}

export function ArtistCard({ artist, onQuoteRequest }: ArtistCardProps) {
  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-40 sm:h-48 w-full">
          <Image
            src={artist.profileImage || `/placeholder.svg?height=200&width=300`}
            alt={`${artist.name} - ${artist.category.join(", ")}`}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
          />
          {artist.isVerified && (
            <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-3 sm:p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-base sm:text-lg text-gray-900 line-clamp-1 flex-1 mr-2">{artist.name}</h3>
          <div className="flex items-center space-x-1 text-xs sm:text-sm flex-shrink-0">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{artist.rating}</span>
            <span className="text-gray-500">({artist.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
          <span className="text-xs sm:text-sm truncate">{artist.location}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
          {artist.category.slice(0, 3).map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs">
              {cat}
            </Badge>
          ))}
          {artist.category.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{artist.category.length - 3}
            </Badge>
          )}
        </div>

        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3">{artist.bio}</p>

        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
          <span>Languages:</span>
          <span className="font-medium truncate ml-2">{artist.languages.slice(0, 2).join(", ")}</span>
        </div>

        <div className="text-base sm:text-lg font-semibold text-blue-600">{artist.feeRange}</div>
      </CardContent>

      <CardFooter className="p-3 sm:p-4 pt-0">
        <Button className="w-full h-10 sm:h-11 text-sm sm:text-base" onClick={() => onQuoteRequest?.(artist.id)}>
          Ask for Quote
          <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
