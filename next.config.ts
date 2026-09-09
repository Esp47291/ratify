import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR / next assets when opening the site from LAN (phone, another PC)
  allowedDevOrigins: ["192.168.31.158"],
  // Compact self-contained build for VPS / Docker (npm start works from .next/standalone)
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
