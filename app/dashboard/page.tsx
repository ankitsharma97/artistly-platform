import type { Metadata } from "next"
import DashboardClientPage from "./DashboardClientPage"

// Note: This would normally be in layout.tsx or generated
export const metadata: Metadata = {
  title: "Manager Dashboard - Artistly",
  description: "Manage your artist bookings and view performance analytics.",
}

export default function DashboardPage() {
  return <DashboardClientPage />
}
