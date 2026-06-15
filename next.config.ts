import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    domains: [
      "cdn.dummyjson.com",
      "www.theshoecareshop.com",
      "theshoecareshop.com",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;