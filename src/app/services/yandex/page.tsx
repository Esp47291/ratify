"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, Star, TrendingUp } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import OrderModal from "@/components/OrderModal";
import RatingCalculator from "@/components/RatingCalculator";

export default function YandexPage() {
  const [orderOpen, setOrderOpen] = useState(false);
  return (
    <main className="pt-28 pb-24">
      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="mb-6">
              <img src="/icons/yandex-maps.svg" alt="Яндекс.Карты" className="w-16 h-16 mx-auto object-contain" />
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 border border-zinc-200 text-[var(--accent)] text-sm font-medium mb-4">
              от 350 ₽ за отзыв (тариф Премиум)
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">
              Накрутка отзывов на{" "}
              <span className="gradient-text">Яндекс.Картах</span>
            </h1>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
              Яндекс.Карты — ключевая платформа для российского бизнеса. 73% пользователей ищут компании именно
              здесь. Поднимите рейтинг и привлеките новых клиентов с помощью живых отзывов.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <AnimatedSection direction="left">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-zinc-900">Почему Яндекс.Карты?</h2>
              <ul className="space-y-4">
                {[
                  "73% россиян ищут локальный бизнес через Яндекс",
                  "Рейтинг напрямую влияет на позицию в выдаче",
                  "Отзывы видны в органической выдаче поиска",
                  "Компании с 4.5+ получают на 40% больше звонков",
                  "Отзывы с фото повышают доверие клиентов",
                  "Мы используем систему геотаргетинга: выбираем людей из вашего города, отбираем локальных знатоков и соблюдаем интервалы, чтобы отзывы выглядели естественно",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-600">
                    <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setOrderOpen(true)}
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 mt-4"
              >
                <span>Заказать отзывы на Яндекс</span>
                <ArrowRight className="w-5 h-5 relative z-10" />
              </button>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="card-bg rounded-xl p-8">
              <h3 className="text-xl font-bold text-zinc-900 mb-6">Стоимость и сроки</h3>
              <div className="space-y-4">
                {[
                  { count: "5 отзывов · Старт", price: "2 250 ₽", per: "450 ₽/отзыв", days: "3-4 дня" },
                  { count: "20 отзывов · Бизнес", price: "8 000 ₽", per: "400 ₽/отзыв", days: "5-7 дней" },
                  { count: "50 отзывов · Премиум", price: "17 500 ₽", per: "350 ₽/отзыв", days: "10-14 дней" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
                    <div>
                      <p className="text-zinc-900 font-semibold">{t.count}</p>
                      <p className="text-zinc-500 text-sm">{t.per} · {t.days}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-teal-700 font-bold text-lg">{t.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setOrderOpen(true)}
                className="btn-primary w-full mt-6"
              >
                <span>Оставить заявку</span>
              </button>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Star className="w-6 h-6" />, title: "Реальные аккаунты", desc: "Только живые профили с историей активности на платформе" },
              { icon: <CheckCircle className="w-6 h-6" />, title: "Прошли модерацию", desc: "Платите только за опубликованные отзывы" },
              { icon: <TrendingUp className="w-6 h-6" />, title: "Рост рейтинга", desc: "Среднее повышение рейтинга на 0.8-1.2 звезды за пакет" },
            ].map((item, i) => (
              <div key={i} className="card-bg rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-zinc-200 flex items-center justify-center text-[var(--accent)] mb-4">
                  {item.icon}
                </div>
                <h3 className="text-zinc-900 font-bold mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="mt-12">
            <RatingCalculator />
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
