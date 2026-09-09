"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, Globe, Star } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import OrderModal from "@/components/OrderModal";

export default function GooglePage() {
  const [orderOpen, setOrderOpen] = useState(false);
  return (
    <main className="pt-28 pb-24">
      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="mb-6">
              <img src="/icons/google-maps.svg" alt="Google Карты" className="w-16 h-16 mx-auto object-contain" />
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-600 text-sm font-medium mb-4">
              от 150 ₽ за отзыв
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">
              Накрутка отзывов на{" "}
              <span className="gradient-text">Google Картах</span>
            </h1>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
              Google Maps — глобальная платформа, которая влияет на выдачу в Google Search. Отзывы здесь видят
              пользователи по всему миру и помогают занять топовые позиции в поиске.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <AnimatedSection direction="left">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-zinc-900">Почему Google Карты?</h2>
              <ul className="space-y-4">
                {[
                  "Отзывы в Google влияют на SEO-позиции сайта",
                  "Виден международной аудитории",
                  "Интеграция с Google Search и Assistant",
                  "Высокое доверие пользователей к платформе",
                  "Рейтинг отображается в поисковой выдаче",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-600">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={() => setOrderOpen(true)} className="btn-primary inline-flex items-center gap-2 px-8 py-4 mt-4">
                <span>Заказать отзывы на Google</span>
                <ArrowRight className="w-5 h-5 relative z-10" />
              </button>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="card-bg rounded-xl p-8">
              <h3 className="text-xl font-bold text-zinc-900 mb-6">Стоимость и сроки</h3>
              <div className="space-y-4">
                {[
                  { count: "5 отзывов", price: "750 ₽", per: "150 ₽/отзыв", days: "3-5 дней" },
                  { count: "20 отзывов", price: "2 800 ₽", per: "140 ₽/отзыв", days: "5-7 дней" },
                  { count: "50 отзывов", price: "6 500 ₽", per: "130 ₽/отзыв", days: "7-14 дней" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
                    <div>
                      <p className="text-zinc-900 font-semibold">{t.count}</p>
                      <p className="text-zinc-500 text-sm">{t.per} · {t.days}</p>
                    </div>
                    <p className="text-teal-700 font-bold text-lg">{t.price}</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setOrderOpen(true)} className="btn-primary w-full mt-6"><span>Оставить заявку</span></button>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Globe className="w-6 h-6" />, title: "Международный охват", desc: "Ваша компания видна аудитории по всему миру" },
              { icon: <CheckCircle className="w-6 h-6" />, title: "SEO-эффект", desc: "Отзывы в Google напрямую влияют на ранжирование сайта" },
              { icon: <Star className="w-6 h-6" />, title: "Rich snippets", desc: "Рейтинг отображается прямо в поисковой выдаче" },
            ].map((item, i) => (
              <div key={i} className="card-bg rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 mb-4">{item.icon}</div>
                <h3 className="text-zinc-900 font-bold mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
