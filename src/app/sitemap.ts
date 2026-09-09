import type { MetadataRoute } from "next";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

const routes = [
  "/",
  "/about",
  "/cases",
  "/contacts",
  "/faq",
  "/guarantees",
  "/calculator",
  "/offer",
  "/prices",
  "/privacy",
  "/services/yandex",
  "/services/google",
  "/services/2gis",
  "/services/zoon",
  "/services/avito",
  "/services/yandex-business",
  "/services/yandex-direct",
  "/services/other",
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
