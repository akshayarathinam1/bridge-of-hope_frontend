import type { NextConfig } from "next";
import { LEGACY_PROGRAM_SLUGS } from "./src/lib/program-redirects";

const nextConfig: NextConfig = {
  // Program pages now live at their dashboard address; keep the old links working.
  async redirects() {
    return Object.entries(LEGACY_PROGRAM_SLUGS).map(([from, to]) => ({
      source: `/programs/${from}`,
      destination: `/programs/${to}`,
      permanent: true,
    }));
  },
  images: {
    // Next.js 16 won't fetch images from private addresses such as localhost:8000 (SSRF guard).
    // Locally the Django media server is on localhost, so allow it in development only;
    // production photos come from media.bhfoundations.com below.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
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
