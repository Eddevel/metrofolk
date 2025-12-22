// lib/blog-data.ts — ONLY METADATA (NO HTML!)
export const blogPosts = [
  {
    id: "1",
    slug: "future-of-solar-energy-in-nigeria",
    title: "The Future of Solar Energy in Nigeria: 2025 and Beyond",
    excerpt: "Why solar is no longer an option but a necessity for Nigerian homes and businesses.",
    author: "Engr. Chike Okonkwo",
    date: "2025-03-15",
    readTime: "6 min read",
    image: "/images/blog/solarpanel-in-9ja.png",
    featured: true,
  },
  {
    id: "2",
    slug: "how-to-choose-the-right-inverter",
    title: "How to Choose the Right Inverter for Your Home",
    excerpt: "A complete guide to understanding inverter types, capacity, and brands.",
    author: "Tolu Adebayo",
    date: "2025-03-10",
    readTime: "4 min read",
    image: "/images/blog/inverter-guide.jpg",
  },
  {
    id: "3",
    slug: "benefits-of-low-voltage-panels",
    title: "Why Every Modern Building Needs Low-Voltage Panels",
    excerpt: "Safety, efficiency, and cost savings explained with real project examples.",
    author: "Metrofolk Team",
    date: "2025-03-05",
    readTime: "5 min read",
    image: "/images/blog/lv-panel.jpg",
  },
] as const;