import type { Metadata } from "next"
import OnboardingClientPage from "./OnboardingClientPage"

// Note: This would normally be in layout.tsx or generated
export const metadata: Metadata = {
  title: "Join as Artist - Artistly",
  description: "Create your artist profile and start receiving booking requests from event planners.",
}

export default function OnboardingPage() {
  return <OnboardingClientPage />
}
