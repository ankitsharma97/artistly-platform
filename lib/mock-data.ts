import type { Artist, BookingRequest } from "@/types"

export const CATEGORIES = ["Singers", "Dancers", "Speakers", "DJs", "Musicians", "Comedians", "Magicians", "Bands"]

export const LANGUAGES = ["English", "Hindi", "Tamil", "Telugu", "Marathi", "Bengali", "Gujarati", "Punjabi"]

export const FEE_RANGES = [
  "Under ₹10,000",
  "₹10,000 - ₹25,000",
  "₹25,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "Above ₹1,00,000",
]

export const LOCATIONS = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"]

export const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Priya Sharma",
    bio: "Professional classical singer with 10+ years of experience in Bollywood and regional music.",
    category: ["Singers"],
    languages: ["Hindi", "English", "Punjabi"],
    feeRange: "₹25,000 - ₹50,000",
    location: "Mumbai",
    rating: 4.8,
    reviewCount: 127,
    isVerified: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "DJ Arjun",
    bio: "Electronic music producer and DJ specializing in wedding and corporate events.",
    category: ["DJs"],
    languages: ["Hindi", "English"],
    feeRange: "₹50,000 - ₹1,00,000",
    location: "Delhi",
    rating: 4.9,
    reviewCount: 89,
    isVerified: true,
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    name: "Kavya Dance Troupe",
    bio: "Contemporary and classical dance group with award-winning choreography.",
    category: ["Dancers"],
    languages: ["Tamil", "English", "Hindi"],
    feeRange: "₹10,000 - ₹25,000",
    location: "Chennai",
    rating: 4.7,
    reviewCount: 156,
    isVerified: true,
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    name: "Rohit Motivational Speaker",
    bio: "Corporate trainer and motivational speaker with expertise in leadership development.",
    category: ["Speakers"],
    languages: ["English", "Hindi", "Marathi"],
    feeRange: "₹25,000 - ₹50,000",
    location: "Pune",
    rating: 4.6,
    reviewCount: 73,
    isVerified: false,
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    name: "The Harmony Band",
    bio: "Live music band specializing in rock, pop, and fusion performances.",
    category: ["Musicians", "Singers"],
    languages: ["English", "Hindi"],
    feeRange: "Above ₹1,00,000",
    location: "Bangalore",
    rating: 4.9,
    reviewCount: 201,
    isVerified: true,
    createdAt: "2024-01-05",
  },
  {
    id: "6",
    name: "Comedy King Rajesh",
    bio: "Stand-up comedian with viral social media presence and corporate show experience.",
    category: ["Comedians"],
    languages: ["Hindi", "English", "Gujarati"],
    feeRange: "₹10,000 - ₹25,000",
    location: "Ahmedabad",
    rating: 4.5,
    reviewCount: 94,
    isVerified: true,
    createdAt: "2024-02-05",
  },
]

export const mockBookingRequests: BookingRequest[] = [
  {
    id: "1",
    artistId: "1",
    artistName: "Priya Sharma",
    eventDate: "2024-07-15",
    location: "Mumbai",
    budget: "₹30,000",
    status: "pending",
    createdAt: "2024-06-20",
  },
  {
    id: "2",
    artistId: "2",
    artistName: "DJ Arjun",
    eventDate: "2024-08-01",
    location: "Delhi",
    budget: "₹75,000",
    status: "accepted",
    createdAt: "2024-06-18",
  },
]
