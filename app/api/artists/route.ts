import { NextResponse } from "next/server"
import { mockArtists } from "@/lib/mock-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const location = searchParams.get("location")
    const priceRange = searchParams.get("priceRange")
    const search = searchParams.get("search")

    let filteredArtists = mockArtists

    if (category) {
      const categories = category.split(",")
      filteredArtists = filteredArtists.filter((artist) => categories.some((cat) => artist.category.includes(cat)))
    }

    if (location) {
      filteredArtists = filteredArtists.filter((artist) => artist.location === location)
    }

    if (priceRange) {
      filteredArtists = filteredArtists.filter((artist) => artist.feeRange === priceRange)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredArtists = filteredArtists.filter(
        (artist) =>
          artist.name.toLowerCase().includes(searchLower) ||
          artist.bio.toLowerCase().includes(searchLower) ||
          artist.category.some((cat) => cat.toLowerCase().includes(searchLower)),
      )
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      artists: filteredArtists,
      total: filteredArtists.length,
    })
  } catch (error) {
    console.error("Error fetching artists:", error)
    return NextResponse.json({ error: "Failed to fetch artists" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Simulate artist creation
    const newArtist = {
      id: Date.now().toString(),
      ...body,
      rating: 0,
      reviewCount: 0,
      isVerified: false,
      createdAt: new Date().toISOString(),
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      artist: newArtist,
      message: "Artist profile created successfully!",
    })
  } catch (error) {
    console.error("Error creating artist:", error)
    return NextResponse.json({ error: "Failed to create artist profile" }, { status: 500 })
  }
}
