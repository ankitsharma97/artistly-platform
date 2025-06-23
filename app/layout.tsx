import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Artistly - Connect with Performing Artists",
    template: "%s | Artistly",
  },
  description:
    "Book talented performing artists for your events. Browse singers, dancers, DJs, speakers and more across India.",
  keywords: [
    "artist booking",
    "event planning",
    "performers",
    "entertainment",
    "singers",
    "dancers",
    "DJs",
    "speakers",
  ],
  authors: [{ name: "Artistly Team" }],
  creator: "Artistly",
  publisher: "Artistly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://artistly-demo.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://artistly-demo.vercel.app",
    title: "Artistly - Connect with Performing Artists",
    description:
      "Book talented performing artists for your events. Browse singers, dancers, DJs, speakers and more across India.",
    siteName: "Artistly",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Artistly - Artist Booking Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artistly - Connect with Performing Artists",
    description: "Book talented performing artists for your events.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
