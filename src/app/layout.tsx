import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SocialFloatingWidget from "@/components/SocialFloatingWidget";
import { EMAIL, PHONE_E164 } from "@/lib/contacts";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ratify — интернет-маркетинг: Яндекс.Директ, SEO, аудит сайта",
    template: "%s | ratify",
  },
  description:
    "Настройка Яндекс.Директа, SEO-продвижение, аудит сайта и продукта, ведение карточки в Яндекс.Бизнесе. Честные методы и понятная отчётность.",
  keywords:
    "настройка яндекс директ, seo продвижение, аудит сайта, яндекс бизнес, интернет-маркетинг, реклама в поиске",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ratify — интернет-маркетинг",
    description: "Яндекс.Директ, SEO, аудит сайта и ведение карточки на картах. Честные методы и понятная отчётность.",
    type: "website",
    url: siteUrl,
    siteName: "ratify",
    locale: "ru_RU",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ratify",
  url: siteUrl,
  description:
    "Интернет-маркетинг: настройка Яндекс.Директа, SEO-продвижение, аудит сайта и ведение карточки в Яндекс.Бизнесе.",
  telephone: PHONE_E164,
  email: EMAIL,
  availableLanguage: "Russian",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-[var(--surface-warm)] text-zinc-900 antialiased">
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
        <SocialFloatingWidget />
      </body>
    </html>
  );
}
