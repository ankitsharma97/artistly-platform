import type { Metadata } from "next"
import ArtistsPageClient from "./ArtistsPageClient"

// Note: This would normally be in layout.tsx or generated
export const metadata: Metadata = {
  title: "Browse Artists - Artistly",
  description: "Discover talented performing artists for your events. Filter by category, location, and price range.",
}

export default function ArtistsPage() {
  return <ArtistsPageClient />
}
