"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, ShoppingBag, Shield } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import OrderModal from "@/components/OrderModal";

export default function AvitoPage() {
  const [orderOpen, setOrderOpen] = useState(false);
  return (
    <main className="pt-28 pb-24">
      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="mb-6">
              <img src="/icons/avito.svg" alt="Авито" className="w-16 h-16 mx-auto object-contain" />
            </div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 border border-zinc-200 text-[var(--accent)] text-sm font-medium mb-4">
              от 1 300 ₽ за отзыв
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">
              Накрутка отзывов на{" "}
              <span className="gradient-text">Авито</span>
            </h1>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
              Авито — крупнейшая площадка объявлений в России. Высокий рейтинг аккаунта критически важен
              для доверия покупателей и успеха продаж. Сложная модерация — но мы справляемся.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
          <AnimatedSection direction="left">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-zinc-900">Почему Авито?</h2>
              <ul className="space-y-4">
                {[
                  "60 млн пользователей ежемесячно",
                  "Доверие к продавцу напрямую зависит от рейтинга",
                  "Высокий рейтинг повышает видимость объявлений",
                  "Покупатели читают отзывы перед каждой сделкой",
                  "Критически важно для бизнеса-аккаунтов",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-600">
                    <CheckCircle className="w-5 h-5 text-[var(--accent)] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-xl bg-teal-50 border border-zinc-200">
                <p className="text-[var(--accent)] text-sm">
                  ⚠️ Авито имеет сложную систему антифрода. Цена выше, но мы гарантируем публикацию только
                  через живые аккаунты с историей транзакций.
                </p>
              </div>
              <button onClick={() => setOrderOpen(true)} className="btn-primary inline-flex items-center gap-2 px-8 py-4 mt-2">
                <span>Заказать отзывы на Авито</span>
                <ArrowRight className="w-5 h-5 relative z-10" />
              </button>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="card-bg rounded-xl p-8">
              <h3 className="text-xl font-bold text-zinc-900 mb-6">Стоимость и сроки</h3>
              <div className="space-y-4">
                {[
                  { count: "3 отзыва", price: "3 900 ₽", per: "1 300 ₽/отзыв", days: "5-7 дней" },
                  { count: "10 отзывов", price: "12 000 ₽", per: "1 200 ₽/отзыв", days: "10-14 дней" },
                  { count: "20 отзывов", price: "22 000 ₽", per: "1 100 ₽/отзыв", days: "14-21 день" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-colors">
                    <div>
                      <p className="text-zinc-900 font-semibold">{t.count}</p>
                      <p className="text-zinc-500 text-sm">{t.per} · {t.days}</p>
                    </div>
                    <p className="text-[var(--accent)] font-bold text-lg">{t.price}</p>
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
              { icon: <ShoppingBag className="w-6 h-6" />, title: "Для продавцов", desc: "Повышайте доверие покупателей и увеличивайте продажи" },
              { icon: <Shield className="w-6 h-6" />, title: "Антидетект", desc: "Аккаунты с историей транзакций — не вызывают подозрений" },
              { icon: <CheckCircle className="w-6 h-6" />, title: "Гарантия", desc: "Платите только за опубликованные отзывы" },
            ].map((item, i) => (
              <div key={i} className="card-bg rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-zinc-200 flex items-center justify-center text-[var(--accent)] mb-4">{item.icon}</div>
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
