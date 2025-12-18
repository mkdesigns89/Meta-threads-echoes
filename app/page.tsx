"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Repeat, Eye } from "lucide-react"
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
  const [modalPage, setModalPage] = useState(0) // 0 = Stories, 1 = Feed
  const modalCarouselRef = useRef<HTMLDivElement>(null)

  // Function to calculate total echoes count for a post
  const getTotalEchoesCount = (postId: number): string => {
    const analytics = mockEchoesAnalytics.find((d) => d.postId === postId)
    if (!analytics) return "0"

    const storiesCount = parseCount(analytics.stories.totalCount)
    const feedCount = parseCount(analytics.feed.totalCount)
    const totalCount = storiesCount + feedCount

    return formatCount(totalCount)
  }

  // Handle modal page navigation
  useEffect(() => {
    const modalCarousel = modalCarouselRef.current
    const onModalScroll = () => {
      if (modalCarousel) {
        const index = Math.round(modalCarousel.scrollLeft / modalCarousel.clientWidth)
        setModalPage(index)
      }
    }
    modalCarousel?.addEventListener("scroll", onModalScroll)
    return () => modalCarousel?.removeEventListener("scroll", onModalScroll)
  }, [activePost])

  // Function to navigate to a specific modal page
  const navigateToModalPage = (index: number) => {
    if (modalCarouselRef.current) {
      const pageWidth = modalCarouselRef.current.clientWidth
      modalCarouselRef.current.scrollTo({
        left: pageWidth * index,
        behavior: "smooth",
      })
      setModalPage(index)
    }
  }

  const currentAnalytics = mockEchoesAnalytics.find((d) => d.postId === activePost) || {
    postId: activePost,
    stories: {
      totalCount: "0",
      totalViews: "0",
      totalLikes: "0",
      accounts: [],
    },
    feed: {
      totalCount: "0",
      totalViews: "0",
      totalLikes: "0",
      accounts: [],
    },
  }

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
                        setModalPage(0) // Reset to Stories page when opening
                      }}
                      className="flex items-center space-x-0.5"
                      aria-label="Echoes"
                    >
                      <EchoesIconSVG className="w-[15px] h-[15px]" />
                      <span className="text-xs">{getTotalEchoesCount(post.id)}</span>
                    </button>

                    <div className="flex items-center space-x-1">
                      <Repeat className="w-[15px] h-[15px]" />
                      <span className="text-xs">{post.reposts}</span>
                    </div>

                    <button className="flex items-center space-x-1" aria-label="Share">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-500"
                      >
                        <path
                          d="M22 2L11 13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 2L15 22L11 13L2 9L22 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button className="ml-auto" aria-label="More options">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-500"
                      >
                        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                        <circle cx="6" cy="12" r="1.5" fill="currentColor" />
                        <circle cx="18" cy="12" r="1.5" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Instagram Echoes Analytics Modal */}
      {activePost !== null && (
        <div className="fixed inset-0 z-40 bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[95vw] max-w-sm h-[85vh] shadow-xl border border-gray-200 flex flex-col mx-2">
            {/* Header with Meta logo and title */}
            <div className="text-center py-4">
              <div className="flex justify-center mb-2">
                <svg width="48" height="48" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20.3 13.4c-1.2-2-3.5-4.2-6.6-4.2-3.8 0-6.1 2.8-6.1 6.8 0 3.2 1.8 5.4 4.3 7.2 1.7 1.3 2.5 2.1 2.5 3.6 0 1.4-1 2.4-2.5 2.4-2.3 0-3.5-2-4.6-4.1l-3.2 2c1.5 3 4.2 5.9 7.9 5.9 4.1 0 6.8-2.7 6.8-6.5 0-3.1-1.7-5.2-4.2-7-1.8-1.3-2.7-2.2-2.7-3.7 0-1.3.9-2.2 2.2-2.2 1.9 0 3 1.6 4.1 3.4l3.1-2.6zm8.1 16.5c4.1 0 6.8-2.7 6.8-6.5 0-3.1-1.7-5.2-4.2-7-1.8-1.3-2.7-2.2-2.7-3.7 0-1.3.9-2.2 2.2-2.2 1.9 0 3 1.6 4.1 3.4l3.1-2.6c-1.2-2-3.5-4.2-6.6-4.2-3.8 0-6.1 2.8-6.1 6.8 0 3.2 1.8 5.4 4.3 7.2 1.7 1.3 2.5 2.1 2.5 3.6 0 1.4-1 2.4-2.5 2.4-2.3 0-3.5-2-4.6-4.1l-3.2 2c1.5 3 4.2 5.9 7.9 5.9z"
                    fill="#0081FB"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold" style={{ fontFamily: "cursive" }}>
                Meta echoes
              </h2>
            </div>

            {/* Close button */}
            <button onClick={() => setActivePost(null)} className="absolute top-4 left-4 text-sm text-blue-500">
              &larr; Back
            </button>

            {/* Page indicator dots */}
            <div className="flex justify-center space-x-2 mb-4">
              {["Stories", "Feed"].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => navigateToModalPage(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    modalPage === idx ? "bg-black" : "bg-gray-300"
                  }`}
                  aria-label={`Go to ${idx === 0 ? "Stories" : "Feed"} page`}
                />
              ))}
            </div>

            {/* Horizontal scrollable pages */}
            <div
              ref={modalCarouselRef}
              className="flex overflow-x-scroll snap-x snap-mandatory hide-scrollbar flex-1"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {/* Stories Page */}
              <div className="min-w-full flex-shrink-0 snap-center">
                <div className="flex flex-col h-full">
                  {/* Stats header */}
                  <div className="flex justify-between items-center px-3 mb-4">
                    <div className="flex items-center text-sm font-medium">
                      <span>{currentAnalytics.stories.totalCount} stories</span>
                    </div>
                    <div className="flex space-x-4 text-sm font-medium">
                      <span>{currentAnalytics.stories.totalViews} views</span>
                      <span>{currentAnalytics.stories.totalLikes} likes</span>
                    </div>
                  </div>

                  {/* Accounts list */}
                  <div className="overflow-y-auto flex-1 px-3 pb-4">
                    <div className="space-y-3">
                      {currentAnalytics.stories.accounts.map((account, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 flex items-center justify-center">
                              <Image
                                src={account.avatar || "/placeholder.svg"}
                                alt={account.username}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-1">
                                <span className="font-semibold text-sm truncate">{account.username}</span>
                                {account.verified && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4 text-blue-500 flex-shrink-0"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 truncate">{account.displayName}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm flex-shrink-0">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4 text-gray-600" />
                              <span className="whitespace-nowrap">{account.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
                              <span className="whitespace-nowrap">{account.likes}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed Page */}
              <div className="min-w-full flex-shrink-0 snap-center">
                <div className="flex flex-col h-full">
                  {/* Stats header */}
                  <div className="flex justify-between items-center px-3 mb-4">
                    <div className="flex items-center text-sm font-medium">
                      <span>{currentAnalytics.feed.totalCount} feed</span>
                    </div>
                    <div className="flex space-x-4 text-sm font-medium">
                      <span>{currentAnalytics.feed.totalViews} views</span>
                      <span>{currentAnalytics.feed.totalLikes} likes</span>
                    </div>
                  </div>

                  {/* Accounts list */}
                  <div className="overflow-y-auto flex-1 px-3 pb-4">
                    <div className="space-y-3">
                      {currentAnalytics.feed.accounts.map((account, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 flex items-center justify-center">
                              <Image
                                src={account.avatar || "/placeholder.svg"}
                                alt={account.username}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-1">
                                <span className="font-semibold text-sm truncate">{account.username}</span>
                                {account.verified && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4 text-blue-500 flex-shrink-0"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 truncate">{account.displayName}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm flex-shrink-0">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4 text-gray-600" />
                              <span className="whitespace-nowrap">{account.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
                              <span className="whitespace-nowrap">{account.likes}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
