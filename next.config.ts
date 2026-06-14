import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    globalNotFound: true,
  },
  images: {
    domains: ["cdn.dummyjson.com"],
  },
};

export default nextConfig;
