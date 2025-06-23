import { NextResponse } from "next/server"
import { mockBookingRequests } from "@/lib/mock-data"

export async function GET() {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json({
      bookings: mockBookingRequests,
      total: mockBookingRequests.length,
    })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const newBooking = {
      id: Date.now().toString(),
      ...body,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json({
      success: true,
      booking: newBooking,
      message: "Booking request submitted successfully!",
    })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to submit booking request" }, { status: 500 })
  }
}
