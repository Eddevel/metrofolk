// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ← allows all external images (dev + quick fix)
      },
      // Or be strict in production:
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
       },
      {
         protocol: "https",
         hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;