"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import OrderModal from "@/components/OrderModal";

import PlatformPricesGrid from "@/components/PlatformPricesGrid";

const tariffs = [
  {
    name: "Старт",
    price: 450,
    count: "5 отзывов",
    platforms: "1 площадка",
    support: "Email",
    report: "По запросу",
    speed: "3–5 дней",
    popular: false,
  },
  {
    name: "Бизнес",
    price: 400,
    count: "20 отзывов",
    platforms: "2 площадки",
    support: "Email + чат",
    report: "Скриншоты",
    speed: "5–7 дней",
    popular: true,
  },
  {
    name: "Премиум",
    price: 350,
    count: "50+ отзывов",
    platforms: "Все площадки",
    support: "24/7",
    report: "Полный отчёт",
    speed: "7–14 дней",
    popular: false,
  },
];

export default function PricesPage() {
  const [orderOpen, setOrderOpen] = useState(false);
  return (
    <main className="pt-28 pb-24">
      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="section-label">
              Прайс-лист
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">
              Цены на накрутку{" "}
              <span className="gradient-text">отзывов</span>
            </h1>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Прозрачные цены без скрытых платежей. Платите только за опубликованные отзывы.
            </p>
          </div>
        </AnimatedSection>

        {/* Tariffs */}
        <AnimatedSection delay={100}>
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Тарифные планы</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {tariffs.map((t, i) => (
            <AnimatedSection key={i} delay={i * 120}>
              <div className={`relative rounded-xl p-8 border flex flex-col h-full transition-all duration-300 hover:-translate-y-2 ${
                t.popular
                  ? "card-bg border-[var(--accent)] ring-1 ring-[var(--accent)]"
                  : "card-bg border-zinc-200"
              }`}>
                {t.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-[var(--accent)] rounded-full text-white text-sm font-bold">
                    🔥 Популярный
                  </div>
                )}
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">{t.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-zinc-900">от {t.price} ₽</span>
                  <span className="text-zinc-500 text-sm mb-1">/отзыв</span>
                </div>
                <ul className="space-y-3 flex-grow mb-8">
                  {[
                    `📦 ${t.count}`,
                    `🌐 ${t.platforms}`,
                    `🛎 Поддержка: ${t.support}`,
                    `📊 Отчёт: ${t.report}`,
                    `⏱ Срок: ${t.speed}`,
                  ].map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-zinc-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setOrderOpen(true)}
                  className={t.popular ? "btn-primary w-full" : "w-full py-3 px-6 rounded-xl border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all font-semibold text-sm"}
                >
                  <span>{t.popular ? "Заказать" : "Выбрать"}</span>
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Platform prices */}
        <AnimatedSection delay={200}>
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Цены по площадкам</h2>
        </AnimatedSection>
        <PlatformPricesGrid className="mb-16" />

        {/* CTA */}
        <AnimatedSection delay={300}>
          <div className="text-center card-bg rounded-xl p-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Готовы начать?</h2>
            <p className="text-zinc-500 mb-8">Оптовые заказы от 100+ отзывов — обсудим индивидуальные условия</p>
            <button
              onClick={() => setOrderOpen(true)}
              className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-5"
            >
              <span>Заказать накрутку отзывов</span>
              <ArrowRight className="w-5 h-5 relative z-10" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
