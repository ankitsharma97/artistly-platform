import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Artist, FilterOptions } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterArtists(artists: Artist[], filters: FilterOptions): Artist[] {
  return artists.filter((artist) => {
    // Category filter
    if (filters.category.length > 0) {
      const hasMatchingCategory = filters.category.some((cat) => artist.category.includes(cat))
      if (!hasMatchingCategory) return false
    }

    // Location filter
    if (filters.location && artist.location !== filters.location) {
      return false
    }

    // Price range filter
    if (filters.priceRange && artist.feeRange !== filters.priceRange) {
      return false
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      const searchableText =
        `${artist.name} ${artist.bio} ${artist.category.join(" ")} ${artist.location}`.toLowerCase()
      if (!searchableText.includes(query)) {
        return false
      }
    }

    return true
  })
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
