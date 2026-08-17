"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Repeat2, Send, MoreHorizontal } from "lucide-react"
import EchoesIconSVG from "@/components/echoes-icon-svg"

// Utility functions to parse and format numbers
const parseCount = (countStr: string): number => {
  if (countStr.includes("k")) {
    return Number.parseFloat(countStr.replace("k", "")) * 1000
  }
  return Number.parseInt(countStr.replace(",", ""))
}

const formatCount = (count: number): string => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(".0", "") + "k"
  }
  return count.toString()
}

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    username: "plumbgod_ke",
    displayName: "Kevin Macharia",
    avatar: "/images/avatar1.jpeg",
    verified: true,
    content:
      "Here's a visual mockup of my Threads Echoes button idea — imagine a share tracker for posts echoed to IG Stories.",
    image: "/images/post1.jpeg",
    likes: "245",
    comments: "42",
    reposts: "18",
    shares: "89",
    bio: "Building Threads mockups & plumbing things.",
    followers: "1.2K followers",
    interests: ["Plumbing", "React", "Threads UI"],
  },
  {
    id: 2,
    username: "photography_lover",
    displayName: "Photography Lover",
    avatar: "/images/avatar2.jpeg",
    verified: false,
    content: "Perfect sunset views from my hike yesterday ✨ #photography #sunset #nature",
    image: "/images/post2.jpeg",
    likes: "189",
    comments: "23",
    reposts: "12",
    shares: "45",
    bio: "Capturing moments one click at a time",
    followers: "856 followers",
    interests: ["Photography", "Art", "Design"],
  },
  {
    id: 3,
    username: "food_enthusiast",
    displayName: "Food Enthusiast",
    avatar: "/images/avatar3.jpeg",
    verified: true,
    content: "Homemade pasta night! 🍝 Made this creamy mushroom pasta from scratch. #foodie #cooking #homemade",
    image: "/images/post3.jpeg",
    likes: "312",
    comments: "56",
    reposts: "29",
    shares: "78",
    bio: "Food is my love language",
    followers: "2.3K followers",
    interests: ["Cooking", "Food", "Travel"],
  },
  {
    id: 4,
    username: "tech_innovator",
    displayName: "Tech Innovator",
    avatar: "/images/avatar4.jpeg",
    verified: true,
    content:
      "Just got my hands on the new AI-powered smart glasses! The future is here and it's looking crystal clear. What do you think of wearable tech? #TechTrends #AI #FutureIsNow",
    image: "/images/post4.jpeg",
    likes: "578",
    comments: "94",
    reposts: "47",
    shares: "132",
    bio: "Building the future one line of code at a time",
    followers: "5.7K followers",
    interests: ["AI", "Technology", "Innovation", "Startups"],
  },
  {
    id: 5,
    username: "urban_gardener",
    displayName: "Urban Gardener",
    avatar: "/images/avatar5.jpeg",
    verified: false,
    content:
      "My balcony garden is finally thriving! 🌱 Started with just a few herbs and now look at this jungle. Anyone else growing food in small spaces? Share your tips! #UrbanGardening #GrowYourOwn #SmallSpaceGardening",
    image: "/images/post5.jpeg",
    likes: "423",
    comments: "67",
    reposts: "31",
    shares: "89",
    bio: "Turning concrete jungles into actual jungles",
    followers: "3.4K followers",
    interests: ["Gardening", "Sustainability", "Urban Living", "Plants"],
  },
]

// Mock data for Instagram Echoes analytics - comprehensive data for all posts
const mockEchoesAnalytics = [
  {
    postId: 1,
    stories: {
      totalCount: "212",
      totalViews: "5,665",
      totalLikes: "1,322",
      accounts: [
        {
          username: "ganiste_vibes",
          displayName: "Ganiste",
          avatar: "/images/new-avatar1.jpeg",
          verified: true,
          views: "1200",
          likes: "400",
        },
        {
          username: "borter_style",
          displayName: "Borter",
          avatar: "/images/new-avatar2.jpeg",
          verified: true,
          views: "1000",
          likes: "250",
        },
        {
          username: "ice_trans",
          displayName: "Ice Trans",
          avatar: "/images/new-avatar3.jpeg",
          verified: true,
          views: "800",
          likes: "200",
        },
        {
          username: "bowes_official",
          displayName: "Bowes",
          avatar: "/images/new-avatar4.jpeg",
          verified: true,
          views: "600",
          likes: "150",
        },
        {
          username: "phoenix_rising",
          displayName: "Phoenix",
          avatar: "/images/new-avatar5.jpeg",
          verified: true,
          views: "500",
          likes: "100",
        },
        {
          username: "pink_vibes",
          displayName: "Sakura",
          avatar: "/images/creator1.jpeg",
          verified: true,
          views: "400",
          likes: "80",
        },
        {
          username: "alt_style",
          displayName: "Alex",
          avatar: "/images/creator2.jpeg",
          verified: true,
          views: "350",
          likes: "60",
        },
        {
          username: "pink_rebel",
          displayName: "Rose",
          avatar: "/images/creator3.jpeg",
          verified: true,
          views: "300",
          likes: "40",
        },
        {
          username: "minimal_guy",
          displayName: "Jordan",
          avatar: "/images/creator4.jpeg",
          verified: true,
          views: "250",
          likes: "20",
        },
        {
          username: "neon_dreamer",
          displayName: "Skye",
          avatar: "/images/creator5.jpeg",
          verified: true,
          views: "150",
          likes: "10",
        },
      ],
    },
    feed: {
      totalCount: "1.2k",
      totalViews: "54k",
      totalLikes: "10.5k",
      accounts: [
        {
          username: "ganiste_vibes",
          displayName: "Ganiste",
          avatar: "/images/new-avatar1.jpeg",
          verified: true,
          views: "9430",
          likes: "1,890",
        },
        {
          username: "borter_style",
          displayName: "Borter",
          avatar: "/images/new-avatar2.jpeg",
          verified: true,
          views: "8450",
          likes: "1,420",
        },
        {
          username: "ice_trans",
          displayName: "Ice Trans",
          avatar: "/images/new-avatar3.jpeg",
          verified: true,
          views: "7125",
          likes: "1,200",
        },
        {
          username: "bowes_official",
          displayName: "Bowes",
          avatar: "/images/new-avatar4.jpeg",
          verified: true,
          views: "6820",
          likes: "1,045",
        },
        {
          username: "phoenix_rising",
          displayName: "Phoenix",
          avatar: "/images/new-avatar5.jpeg",
          verified: true,
          views: "4930",
          likes: "980",
        },
        {
          username: "pink_vibes",
          displayName: "Sakura",
          avatar: "/images/creator1.jpeg",
          verified: true,
          views: "5300",
          likes: "875",
        },
        {
          username: "alt_style",
          displayName: "Alex",
          avatar: "/images/creator2.jpeg",
          verified: true,
          views: "4560",
          likes: "829",
        },
        {
          username: "pink_rebel",
          displayName: "Rose",
          avatar: "/images/creator3.jpeg",
          verified: true,
          views: "3675",
          likes: "760",
        },
        {
          username: "minimal_guy",
          displayName: "Jordan",
          avatar: "/images/creator4.jpeg",
          verified: true,
          views: "2995",
          likes: "720",
        },
        {
          username: "neon_dreamer",
          displayName: "Skye",
          avatar: "/images/creator5.jpeg",
          verified: true,
          views: "2,745",
          likes: "660",
        },
      ],
    },
  },
  {
    postId: 2,
    stories: {
      totalCount: "189",
      totalViews: "4,234",
      totalLikes: "987",
      accounts: [
        {
          username: "phoenix_rising",
          displayName: "Phoenix",
          avatar: "/images/new-avatar5.jpeg",
          verified: true,
          views: "890",
          likes: "234",
        },
        {
          username: "bowes_official",
          displayName: "Bowes",
          avatar: "/images/new-avatar4.jpeg",
          verified: true,
          views: "756",
          likes: "189",
        },
        {
          username: "ice_trans",
          displayName: "Ice Trans",
          avatar: "/images/new-avatar3.jpeg",
          verified: true,
          views: "645",
          likes: "156",
        },
        {
          username: "ganiste_vibes",
          displayName: "Ganiste",
          avatar: "/images/new-avatar1.jpeg",
          verified: true,
          views: "534",
          likes: "123",
        },
        {
          username: "borter_style",
          displayName: "Borter",
          avatar: "/images/new-avatar2.jpeg",
          verified: true,
          views: "423",
          likes: "98",
        },
        {
          username: "pink_vibes",
          displayName: "Sakura",
          avatar: "/images/creator1.jpeg",
          verified: true,
          views: "367",
          likes: "76",
        },
        {
          username: "alt_style",
          displayName: "Alex",
          avatar: "/images/creator2.jpeg",
          verified: true,
          views: "298",
          likes: "54",
        },
        {
          username: "pink_rebel",
          displayName: "Rose",
          avatar: "/images/creator3.jpeg",
          verified: true,
          views: "234",
          likes: "43",
        },
        {
          username: "minimal_guy",
          displayName: "Jordan",
          avatar: "/images/creator4.jpeg",
          verified: true,
          views: "187",
          likes: "32",
        },
        {
          username: "neon_dreamer",
          displayName: "Skye",
          avatar: "/images/creator5.jpeg",
          verified: true,
          views: "145",
          likes: "21",
        },
      ],
    },
    feed: {
      totalCount: "987",
      totalViews: "43.2k",
      totalLikes: "8.9k",
      accounts: [
        {
          username: "phoenix_rising",
          displayName: "Phoenix",
          avatar: "/images/new-avatar5.jpeg",
          verified: true,
          views: "8,234",
          likes: "1,567",
        },
        {
          username: "bowes_official",
          displayName: "Bowes",
          avatar: "/images/new-avatar4.jpeg",
          verified: true,
          views: "7,890",
          likes: "1,234",
        },
        {
          username: "ice_trans",
          displayName: "Ice Trans",
          avatar: "/images/new-avatar3.jpeg",
          verified: true,
          views: "6,543",
          likes: "1,098",
        },
        {
          username: "ganiste_vibes",
          displayName: "Ganiste",
          avatar: "/images/new-avatar1.jpeg",
          verified: true,
          views: "5,876",
          likes: "987",
        },
        {
          username: "borter_style",
          displayName: "Borter",
          avatar: "/images/new-avatar2.jpeg",
          verified: true,
          views: "4,567",
          likes: "823",
        },
        {
          username: "pink_vibes",
          displayName: "Sakura",
          avatar: "/images/creator1.jpeg",
          verified: true,
          views: "3,987",
          likes: "756",
        },
        {
          username: "alt_style",
          displayName: "Alex",
          avatar: "/images/creator2.jpeg",
          verified: true,
          views: "3,234",
          likes: "645",
        },
        {
          username: "pink_rebel",
          displayName: "Rose",
          avatar: "/images/creator3.jpeg",
          verified: true,
          views: "2,876",
          likes: "534",
        },
        {
          username: "minimal_guy",
          displayName: "Jordan",
          avatar: "/images/creator4.jpeg",
          verified: true,
          views: "2,345",
          likes: "423",
        },
        {
          username: "neon_dreamer",
          displayName: "Skye",
          avatar: "/images/creator5.jpeg",
          verified: true,
          views: "1,987",
          likes: "345",
        },
      ],
    },
  },
  {
    postId: 3,
    stories: {
      totalCount: "298",
      totalViews: "7,432",
      totalLikes: "1,876",
      accounts: [
        {
          username: "ice_trans",
          displayName: "Ice Trans",
          avatar: "/images/new-avatar3.jpeg",
          verified: true,
          views: "1,456",
          likes: "387",
        },
        {
          username: "ganiste_vibes",
          displayName: "Ganiste",
          avatar: "/images/new-avatar1.jpeg",
          verified: true,
          views: "1,234",
          likes: "298",
        },
        {
          username: "phoenix_rising",
          displayName: "Phoenix",
          avatar: "/images/new-avatar5.jpeg",
          verified: true,
          views: "1,087",
          likes: "245",
        },
        {
          username: "bowes_official",
          displayName: "Bowes",
          avatar: "/images/new-avatar4.jpeg",
          verified: true,
          views: "876",
          likes: "198",
        },
        {
          username: "borter_style",
          displayName: "Borter",
          avatar: "/images/new-avatar2.jpeg",
          verified: true,
          views: "743",
          likes: "167",
        },
        {
          username: "pink_vibes",
          displayName: "Sakura",
          avatar: "/images/creator1.jpeg",
          verified: true,
          views: "634",
          likes: "134",
        },
        {
          username: "alt_style",
          displayName: "Alex",
          avatar: "/images/creator2.jpeg",
          verified: true,
          views: "523",
          likes: "112",
        },
        {
          username: "pink_rebel",
          displayName: "Rose",
          avatar: "/images/creator3.jpeg",
          verified: true,
          views: "432",
          likes: "89",
        },
        {
          username: "minimal_guy",
          displayName: "Jordan",
          avatar: "/images/creator4.jpeg",
          verified: true,
          views: "345",
          likes: "67",
        },
        {
          username: "neon_dreamer",
          displayName: "Skye",
          avatar: "/images/creator5.jpeg",
          verified: true,
          views: "267",
          likes: "45",
        },
      ],
    },
    feed: {
      totalCount: "1.8k",
      totalViews: "67.8k",
      totalLikes: "13.2k",
      accounts: [
        {
          username: "ice_trans",
          displayName: "Ice Trans",
          avatar: "/images/new-avatar3.jpeg",
          verified: true,
          views: "12,456",
          likes: "2,387",
        },
        {
          username: "ganiste_vibes",
          displayName: "Ganiste",
          avatar: "/images/new-avatar1.jpeg",
          verified: true,
          views: "11,234",
          likes: "2,098",
        },
        {
          username: "phoenix_rising",
          displayName: "Phoenix",
          avatar: "/images/new-avatar5.jpeg",
          verified: true,
          views: "9,876",
          likes: "1,845",
        },
        {
          username: "bowes_official",
          displayName: "Bowes",
          avatar: "/images/new-avatar4.jpeg",
          verified: true,
          views: "8,743",
          likes: "1,567",
        },
        {
          username: "borter_style",
          displayName: "Borter",
          avatar: "/images/new-avatar2.jpeg",
          verified: true,
          views: "7,634",
          likes: "1,298",
        },
        {
          username: "pink_vibes",
          displayName: "Sakura",
          avatar: "/images/creator1.jpeg",
          verified: true,
          views: "6,523",
          likes: "1,134",
        },
        {
          username: "alt_style",
          displayName: "Alex",
          avatar: "/images/creator2.jpeg",
          verified: true,
          views: "5,432",
          likes: "987",
        },
        {
          username: "pink_rebel",
          displayName: "Rose",
          avatar: "/images/creator3.jpeg",
          verified: true,
          views: "4,345",
          likes: "823",
        },
        {
          username: "minimal_guy",
          displayName: "Jordan",
          avatar: "/images/creator4.jpeg",
          verified: true,
          views: "3,267",
          likes: "645",
        },
        {
          username: "neon_dreamer",
          displayName: "Skye",
          avatar: "/images/creator5.jpeg",
          verified: true,
          views: "2,189",
          likes: "456",
        },
      ],
    },
  },
  {
    postId: 4,
    stories: {
      totalCount: "456",
      totalViews: "12,890",
      totalLikes: "3,245",
      accounts: [
        {
          username: "borter_style",
          displayName: "Borter",
          avatar: "/images/new-avatar2.jpeg",
          verified: true,
          views: "2,345",
          likes: "567",
        },
        {
          username: "phoenix_rising",
          displayName: "Phoenix",
          avatar: "/images/new-avatar5.jpeg",
          verified: true,
          views: "2,123",
          likes: "489",
        },
        {
          username: "bowes_official",
          displayName: "Bowes",
          avatar: "/images/new-avatar4.jpeg",
          verified: true,
          views: "1,876",
          likes: "423",
        },
        {
          username: "ice_trans",
          displayName: "Ice Trans",
          avatar: "/images/new-avatar3.jpeg",
          verified: true,
          views: "1,634",
          likes: "367",
        },
        {
          username: "ganiste_vibes",
          displayName: "Ganiste",
          avatar: "/images/new-avatar1.jpeg",
          verified: true,
          views: "1,423",
          likes: "298",
        },
        {
          username: "pink_vibes",
          displayName: "Sakura",
          avatar: "/images/creator1.jpeg",
          verified: true,
          views: "1,234",
          likes: "245",
        },
        {
          username: "alt_style",
          displayName: "Alex",
          avatar: "/images/creator2.jpeg",
          verified: true,
          views: "1,087",
          likes: "198",
        },
        {
          username: "pink_rebel",
          displayName: "Rose",
          avatar: "/images/creator3.jpeg",
          verified: true,
          views: "876",
          likes: "156",
        },
        {
          username: "minimal_guy",
          displayName: "Jordan",
          avatar: "/images/creator4.jpeg",
          verified: true,
          views: "743",
          likes: "123",
        },
        {
          username: "neon_dreamer",
          displayName: "Skye",
          avatar: "/images/creator5.jpeg",
          verified: true,
          views: "634",
          likes: "89",
        },
      ],
    },
    feed: {
      totalCount: "2.3k",
      totalViews: "89.4k",
      totalLikes: "18.7k",
      accounts: [
        {
          username: "borter_style",
          displayName: "Borter",
          avatar: "/images/new-avatar2.jpeg",
          verified: true,
          views: "15,678",
          likes: "3,245",
        },
        {
          username: "phoenix_rising",
          displayName: "Phoenix",
          avatar: "/images/new-avatar5.jpeg",
          verified: true,
          views: "14,234",
          likes: "2,987",
        },
        {
          username: "bowes_official",
          displayName: "Bowes",
          avatar: "/images/new-avatar4.jpeg",
          verified: true,
          views: "12,876",
          likes: "2,634",
        },
        {
          username: "ice_trans",
          displayName: "Ice Trans",
          avatar: "/images/new-avatar3.jpeg",
          verified: true,
          views: "11,543",
          likes: "2,298",
        },
        {
          username: "ganiste_vibes",
          displayName: "Ganiste",
          avatar: "/images/new-avatar1.jpeg",
          verified: true,
          views: "10,234",
          likes: "1,987",
        },
        {
          username: "pink_vibes",
          displayName: "Sakura",
          avatar: "/images/creator1.jpeg",
          verified: true,
          views: "8,876",
          likes: "1,634",
        },
        {
          username: "alt_style",
          displayName: "Alex",
          avatar: "/images/creator2.jpeg",
          verified: true,
          views: "7,543",
          likes: "1,345",
        },
        {
          username: "pink_rebel",
          displayName: "Rose",
          avatar: "/images/creator3.jpeg",
          verified: true,
          views: "6,234",
          likes: "1,123",
        },
        {
          username: "minimal_guy",
          displayName: "Jordan",
          avatar: "/images/creator4.jpeg",
          verified: true,
          views: "4,876",
          likes: "876",
        },
        {
          username: "neon_dreamer",
          displayName: "Skye",
          avatar: "/images/creator5.jpeg",
          verified: true,
          views: "3,543",
          likes: "634",
        },
      ],
    },
  },
  {
    postId: 5,
    stories: {
      totalCount: "167",
      totalViews: "3,876",
      totalLikes: "823",
      accounts: [
        {
          username: "bowes_official",
          displayName: "Bowes",
          avatar: "/images/new-avatar4.jpeg",
          verified: true,
          views: "756",
          likes: "167",
        },
        {
          username: "ice_trans",
          displayName: "Ice Trans",
          avatar: "/images/new-avatar3.jpeg",
          verified: true,
          views: "634",
          likes: "134",
        },
        {
          username: "phoenix_rising",
          displayName: "Phoenix",
          avatar: "/images/new-avatar5.jpeg",
          verified: true,
          views: "523",
          likes: "112",
        },
        {
          username: "ganiste_vibes",
          displayName: "Ganiste",
          avatar: "/images/new-avatar1.jpeg",
          verified: true,
          views: "432",
          likes: "89",
        },
        {
          username: "borter_style",
          displayName: "Borter",
          avatar: "/images/new-avatar2.jpeg",
          verified: true,
          views: "367",
          likes: "76",
        },
        {
          username: "pink_vibes",
          displayName: "Sakura",
          avatar: "/images/creator1.jpeg",
          verified: true,
          views: "298",
          likes: "54",
        },
        {
          username: "alt_style",
          displayName: "Alex",
          avatar: "/images/creator2.jpeg",
          verified: true,
          views: "234",
          likes: "43",
        },
        {
          username: "pink_rebel",
          displayName: "Rose",
          avatar: "/images/creator3.jpeg",
          verified: true,
          views: "187",
          likes: "32",
        },
        {
          username: "minimal_guy",
          displayName: "Jordan",
          avatar: "/images/creator4.jpeg",
          verified: true,
          views: "145",
          likes: "21",
        },
        {
          username: "neon_dreamer",
          displayName: "Skye",
          avatar: "/images/creator5.jpeg",
          verified: true,
          views: "123",
          likes: "15",
        },
      ],
    },
    feed: {
      totalCount: "743",
      totalViews: "28.9k",
      totalLikes: "6.2k",
      accounts: [
        {
          username: "bowes_official",
          displayName: "Bowes",
          avatar: "/images/new-avatar4.jpeg",
          verified: true,
          views: "6,234",
          likes: "1,234",
        },
        {
          username: "ice_trans",
          displayName: "Ice Trans",
          avatar: "/images/new-avatar3.jpeg",
          verified: true,
          views: "5,876",
          likes: "1,087",
        },
        {
          username: "phoenix_rising",
          displayName: "Phoenix",
          avatar: "/images/new-avatar5.jpeg",
          verified: true,
          views: "4,543",
          likes: "876",
        },
        {
          username: "ganiste_vibes",
          displayName: "Ganiste",
          avatar: "/images/new-avatar1.jpeg",
          verified: true,
          views: "3,876",
          likes: "743",
        },
        {
          username: "borter_style",
          displayName: "Borter",
          avatar: "/images/new-avatar2.jpeg",
          verified: true,
          views: "3,234",
          likes: "634",
        },
        {
          username: "pink_vibes",
          displayName: "Sakura",
          avatar: "/images/creator1.jpeg",
          verified: true,
          views: "2,876",
          likes: "523",
        },
        {
          username: "alt_style",
          displayName: "Alex",
          avatar: "/images/creator2.jpeg",
          verified: true,
          views: "2,345",
          likes: "432",
        },
        {
          username: "pink_rebel",
          displayName: "Rose",
          avatar: "/images/creator3.jpeg",
          verified: true,
          views: "1,987",
          likes: "367",
        },
        {
          username: "minimal_guy",
          displayName: "Jordan",
          avatar: "/images/creator4.jpeg",
          verified: true,
          views: "1,634",
          likes: "298",
        },
        {
          username: "neon_dreamer",
          displayName: "Skye",
          avatar: "/images/creator5.jpeg",
          verified: true,
          views: "1,234",
          likes: "234",
        },
      ],
    },
  },
]

export default function InstagramEchoes() {
  const [activePost, setActivePost] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<"for-you" | "following">("for-you")
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  // Function to calculate total echoes count for a post
  const getTotalEchoesCount = (postId: number): string => {
    const analytics = mockEchoesAnalytics.find((d) => d.postId === postId)
    if (!analytics) return "0"

    const storiesCount = parseCount(analytics.stories.totalCount)
    const feedCount = parseCount(analytics.feed.totalCount)
    return formatCount(storiesCount + feedCount)
  }

  const currentAnalytics = mockEchoesAnalytics.find((d) => d.postId === activePost) || {
    postId: activePost,
    stories: { totalCount: "0", totalViews: "0", totalLikes: "0", accounts: [] },
    feed: { totalCount: "0", totalViews: "0", totalLikes: "0", accounts: [] },
  }

  const platformAnalytics = [
    { label: "WhatsApp Status", shortLabel: "WA", count: "148", views: "3,842", likes: "864", tone: "bg-emerald-500" },
    { label: "Instagram Stories", shortLabel: "IG", count: currentAnalytics.stories.totalCount, views: currentAnalytics.stories.totalViews, likes: currentAnalytics.stories.totalLikes, tone: "bg-fuchsia-500" },
    { label: "Facebook Stories", shortLabel: "FB", count: "96", views: "2,114", likes: "527", tone: "bg-blue-500" },
    { label: "Instagram Feed", shortLabel: "IG", count: currentAnalytics.feed.totalCount, views: currentAnalytics.feed.totalViews, likes: currentAnalytics.feed.totalLikes, tone: "bg-violet-500" },
    { label: "Facebook Feed", shortLabel: "FB", count: "72", views: "1,486", likes: "318", tone: "bg-blue-600" },
  ]

  const totalPlatformCount = platformAnalytics.reduce((total, platform) => total + parseCount(platform.count), 0)

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 bg-white flex flex-col items-center px-4 py-3 border-b border-gray-200 ${activePost !== null ? "hidden" : ""}`}
      >
        <div className="mb-3">
          <Image
            src="/images/threads-logo-new.png"
            alt="Threads Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <nav className="flex space-x-6 text-sm font-medium">
          <span
            className={`${activeTab === "for-you" ? "text-black border-b-2 border-black" : "text-gray-500"} pb-1 cursor-pointer`}
            onClick={() => setActiveTab("for-you")}
          >
            For You
          </span>
          <span
            className={`${activeTab === "following" ? "text-black border-b-2 border-black" : "text-gray-500"} pb-1 cursor-pointer`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </span>
        </nav>
      </header>

      {/* Feed */}
      <main className="pt-4 px-4 pb-4 flex justify-center">
        <div className="max-w-[280px] w-full space-y-3">
          {mockPosts.map((post) => (
            <div key={post.id} className="border-b border-gray-200 pb-4">
              <div className="flex items-start space-x-2">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={post.avatar || "/placeholder.svg"}
                    alt={`${post.username}'s avatar`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="font-semibold text-xs">{post.displayName}</span>
                    {post.verified && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-3 h-3 text-blue-500 flex-shrink-0"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{post.content}</p>
                  <div className="mt-2 aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={`Post by ${post.username}`}
                      width={196}
                      height={245}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="mt-2 flex items-center space-x-2 text-gray-500">
                    <button
                      onClick={() => {
                        if (likedPosts.includes(post.id)) {
                          setLikedPosts(likedPosts.filter((id) => id !== post.id))
                        } else {
                          setLikedPosts([...likedPosts, post.id])
                        }
                      }}
                      className="flex items-center space-x-1"
                      aria-label="Like"
                    >
                      {likedPosts.includes(post.id) ? (
                        <Heart className="w-[15px] h-[15px] text-red-500 fill-red-500" />
                      ) : (
                        <Heart className="w-[15px] h-[15px]" />
                      )}
                      <span className="text-xs">{post.likes}</span>
                    </button>

                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-[15px] h-[15px]" />
                      <span className="text-xs">{post.comments}</span>
                    </div>

                    <button
                      onClick={() => {
                        setActivePost(post.id)
                      }}
                      className="flex items-center space-x-0.5"
                      aria-label="Echoes"
                    >
                      <EchoesIconSVG className="w-[35px] h-[35px]" />
                      <span className="text-xs">{getTotalEchoesCount(post.id)}</span>
                    </button>

                    <div className="flex items-center space-x-1">
                      <Repeat2 className="w-[15px] h-[15px]" />
                      <span className="text-xs">{post.reposts}</span>
                    </div>

                    <button className="flex items-center space-x-1" aria-label="Share">
                      <Send className="w-[15px] h-[15px]" />
                    </button>

                    <button className="ml-auto" aria-label="More options">
                      <MoreHorizontal className="w-[15px] h-[15px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Unified Echoes Analytics Modal */}
      {activePost !== null && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 px-3 backdrop-blur-sm">
          <section className="relative flex h-[88vh] w-full max-w-sm flex-col overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-2xl">
            <button onClick={() => setActivePost(null)} className="absolute left-4 top-4 z-10 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600" aria-label="Close analytics">
              Back
            </button>
            <div className="border-b border-gray-100 px-5 pb-5 pt-5 text-center">
              <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-2xl bg-black">
                <Image src="/images/meta-logo.jpg" alt="Meta logo" width={22} height={22} className="rounded-md object-contain" />
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-400">Echoes analytics</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-950">Your reach, everywhere</h2>
              <p className="mt-1 text-xs text-gray-500">A unified view across stories and feeds on Meta platforms.</p>
            </div>

            <div className="overflow-y-auto px-4 py-4">
              <div className="mb-4 rounded-2xl bg-gray-950 p-4 text-white">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400">Total echoes</p>
                    <p className="mt-1 text-4xl font-semibold tracking-tight">{formatCount(totalPlatformCount)}</p>
                  </div>
                  <div className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-gray-300">All channels</div>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[78%] rounded-full bg-white" />
                </div>
                <div className="mt-2 flex justify-between text-[10px] text-gray-400"><span>Across 5 surfaces</span><span>+18.4% this week</span></div>
              </div>

              <div className="flex flex-col gap-2.5">
                {platformAnalytics.map((platform) => (
                  <article key={platform.label} className="rounded-2xl border border-gray-200 bg-gray-50 p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold text-white ${platform.tone}`}>{platform.shortLabel}</div>
                        <div className="min-w-0"><h3 className="truncate text-sm font-semibold text-gray-900">{platform.label}</h3><p className="text-[11px] text-gray-500">{platform.count} echoes</p></div>
                      </div>
                      <span className="rounded-full bg-white px-2 py-1 text-[10px] font-medium text-gray-500">Live</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gray-200 pt-3 text-xs"><div><p className="text-[10px] uppercase tracking-wide text-gray-400">Views</p><p className="mt-0.5 font-semibold text-gray-800">{platform.views}</p></div><div><p className="text-[10px] uppercase tracking-wide text-gray-400">Likes</p><p className="mt-0.5 font-semibold text-gray-800">{platform.likes}</p></div></div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
