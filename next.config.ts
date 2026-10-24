import type { NextConfig } from "next";

// Адреса, с которых разрешён dev-сервер (телефон / другой ПК в локальной сети).
// Задаётся в .env через DEV_ORIGINS=192.168.0.10,192.168.0.11 — в репозитории IP не хранится.
const devOrigins = (process.env.DEV_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  allowedDevOrigins: devOrigins,
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
          // Браузеры учитывают HSTS только по HTTPS, по http:// заголовок безвреден.
          // includeSubDomains намеренно не ставим.
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          // TODO: Content-Security-Policy — в Next.js нужен nonce для inline-скриптов,
          // делаем отдельной задачей, чтобы не сломать сайт.
        ],
      },
    ];
  },
};

export default nextConfig;
