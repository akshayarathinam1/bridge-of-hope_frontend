import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Backend media files served during local development
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
      {
        // Production media CDN / Django storage backend
        protocol: "https",
        hostname: "media.bhfoundations.com",
      },
    ],
  },
};

export default nextConfig;
