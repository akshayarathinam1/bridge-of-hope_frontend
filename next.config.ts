import type { NextConfig } from "next";
import { LEGACY_PROGRAM_SLUGS } from "./src/lib/program-redirects";

const isDev = process.env.NODE_ENV !== "production";
const apiOrigin = new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1").origin;

// Razorpay Checkout loads its script from checkout.razorpay.com and opens frames / calls APIs on
// other razorpay.com hosts. 'unsafe-inline' scripts are needed for Next.js's own inline scripts.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://checkout.razorpay.com https://*.razorpay.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:" + (isDev ? " http://localhost:8000" : ""),
  "font-src 'self' data:",
  `connect-src 'self' ${apiOrigin} https://*.razorpay.com${isDev ? " ws: http://localhost:*" : ""}`,
  "frame-src https://api.razorpay.com https://checkout.razorpay.com https://*.razorpay.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://*.razorpay.com",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Razorpay may ask for payment features (UPI intents, saved cards) inside its own frame.
  { key: "Permissions-Policy", value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://api.razorpay.com" "https://checkout.razorpay.com")' },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework in every response.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
