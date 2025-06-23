export interface Artist {
  id: string
  name: string
  bio: string
  category: string[]
  languages: string[]
  feeRange: string
  location: string
  profileImage?: string
  rating: number
  reviewCount: number
  isVerified: boolean
  createdAt: string
}

export interface BookingRequest {
  id: string
  artistId: string
  artistName: string
  eventDate: string
  location: string
  budget: string
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

export interface FilterOptions {
  category: string[]
  location: string
  priceRange: string
  searchQuery: string
}

export interface FormData {
  name: string
  bio: string
  category: string[]
  languages: string[]
  feeRange: string
  location: string
  profileImage?: File
}
