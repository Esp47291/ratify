import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SocialFloatingWidget from "@/components/SocialFloatingWidget";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ratify — Накрутка живых отзывов на Яндекс.Картах, Google, 2ГИС",
    template: "%s | ratify",
  },
  description:
    "Профессиональная накрутка отзывов на Яндекс.Картах, Google Картах, 2ГИС, Zoon и Авито. Реальные отзывы от живых пользователей. От 120 ₽ за отзыв. Платите только за опубликованные.",
  keywords:
    "накрутка отзывов, отзывы на яндекс картах, отзывы google, накрутка 2гис, купить отзывы, живые отзывы, рейтинг на картах",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ratify — Накрутка живых отзывов на картах",
    description: "Реальные отзывы от живых пользователей. От 120 ₽ за отзыв.",
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Накрутка отзывов",
              "provider": {
                "@type": "Organization",
                "name": "ratify",
                "url": siteUrl,
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+79373717757",
                  "email": "gipno262@gmail.com",
                  "contactType": "Customer Service",
                  "hoursAvailable": "Mo-Su 00:00-23:59",
                  "availableLanguage": "Russian",
                },
              },
              "description": "Профессиональная накрутка живых отзывов на Яндекс.Картах, Google Картах, 2ГИС, Zoon и Авито от реальных пользователей.",
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "RUB",
                "lowPrice": "120",
                "highPrice": "1300",
                "priceSpecification": [
                  {
                    "@type": "UnitPriceSpecification",
                    "price": "350",
                    "priceCurrency": "RUB",
                    "name": "Яндекс.Карты",
                    "referenceQuantity": {
                      "@type": "QuantitativeValue",
                      "value": "1",
                      "unitCode": "review",
                    },
                  },
                  {
                    "@type": "UnitPriceSpecification",
                    "price": "150",
                    "priceCurrency": "RUB",
                    "name": "Google Карты",
                    "referenceQuantity": {
                      "@type": "QuantitativeValue",
                      "value": "1",
                      "unitCode": "review",
                    },
                  },
                  {
                    "@type": "UnitPriceSpecification",
                    "price": "120",
                    "priceCurrency": "RUB",
                    "name": "2ГИС",
                    "referenceQuantity": {
                      "@type": "QuantitativeValue",
                      "value": "1",
                      "unitCode": "review",
                    },
                  },
                ],
              },
            }),
          }}
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
