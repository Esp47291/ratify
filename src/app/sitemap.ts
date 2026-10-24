import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

const routes = [
  "/",
  "/about",
  "/contacts",
  "/faq",
  "/guarantees",
  "/calculator",
  "/offer",
  "/prices",
  "/privacy",
  ...services.map((s) => `/services/${s.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") ? 0.8 : 0.6,
  }));
}
