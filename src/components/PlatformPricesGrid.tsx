"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { platformPrices } from "@/lib/services-data";

export { platformPrices };

interface PlatformPricesGridProps {
  className?: string;
  onPlatformClick?: () => void;
}

export default function PlatformPricesGrid({ className = "", onPlatformClick }: PlatformPricesGridProps) {
  return (
    <div>
      <p className="text-sm text-zinc-600 mb-3">Тарифы указаны для размещения отзывов на Яндекс.Картах.</p>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {platformPrices.map((p, i) => (
        <AnimatedSection key={p.name} delay={i * 80}>
          <div
            className={`card-bg card-bg-hover rounded-2xl p-6 flex items-center gap-4 ${
              onPlatformClick ? "cursor-pointer" : ""
            }`}
            onClick={onPlatformClick}
            onKeyDown={
              onPlatformClick
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onPlatformClick();
                    }
                  }
                : undefined
            }
            role={onPlatformClick ? "button" : undefined}
            tabIndex={onPlatformClick ? 0 : undefined}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              {typeof p.icon === "string" && p.icon.startsWith("/") ? (
                // use platform icon from public/icons
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.icon} alt={p.name} className="w-10 h-10 object-contain" />
              ) : (
                <div className="text-4xl">{p.icon}</div>
              )}
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="text-zinc-900 font-bold">{p.name}</h3>
              {p.note && <p className="accent-text text-xs mt-0.5">{p.note}</p>}
            </div>
            <div className="text-right flex-shrink-0">
              {p.price ? (
                <span className="text-xl font-bold text-zinc-900">{p.price} ₽</span>
              ) : (
                <span className="accent-text font-semibold text-sm">По запросу</span>
              )}
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  </div>
  );
}

