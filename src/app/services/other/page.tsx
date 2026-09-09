"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, Globe, MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import OrderModal from "@/components/OrderModal";

const platforms = [
  "Tripadvisor", "Booking.com", "Яндекс.Маркет", "Wildberries", "OZON",
  "Отзовик", "IRecommend", "Флампа", "Яндекс.Услуги", "HH.ru",
  "Profi.ru", "YouDo", "Авито Услуги", "Банки.ру", "Sravni.ru",
];

export default function OtherPage() {
  const [orderOpen, setOrderOpen] = useState(false);
  return (
    <main className="pt-28 pb-24">
      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="text-6xl mb-6">🌐</div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 border border-zinc-200 text-[var(--accent)] text-sm font-medium mb-4">
              Индивидуальные цены
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">
              Накрутка отзывов на{" "}
              <span className="gradient-text">других площадках</span>
            </h1>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg">
              Работаем со всеми популярными площадками — маркетплейсами, агрегаторами, отраслевыми порталами.
              Уточните вашу площадку и получите индивидуальное предложение.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="card-bg rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 mb-6">Площадки, с которыми мы работаем</h2>
            <div className="flex flex-wrap gap-3">
              {platforms.map((p) => (
                <span
                  key={p}
                  className="px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-600 text-sm font-medium hover:border-zinc-200 hover:text-zinc-900 transition-all"
                >
                  {p}
                </span>
              ))}
              <span className="px-4 py-2 rounded-xl bg-teal-50 border border-zinc-200 text-teal-700 text-sm font-medium">
                + и многие другие
              </span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Globe className="w-6 h-6" />, title: "Любая площадка", desc: "Работаем со всеми платформами с публичными отзывами" },
              { icon: <CheckCircle className="w-6 h-6" />, title: "Индивидуальный подход", desc: "Цена и сроки рассчитываются для каждой площадки отдельно" },
              { icon: <MessageCircle className="w-6 h-6" />, title: "Быстрый ответ", desc: "Рассчитаем стоимость за 5 минут в Telegram" },
            ].map((item, i) => (
              <div key={i} className="card-bg rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-zinc-200 flex items-center justify-center text-[var(--accent)] mb-4">{item.icon}</div>
                <h3 className="text-zinc-900 font-bold mb-2">{item.title}</h3>
                <p className="text-zinc-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="text-center card-bg rounded-xl p-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Нужна консультация?</h2>
            <p className="text-zinc-500 mb-8">Напишите нам — подберём оптимальное решение для вашей площадки</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setOrderOpen(true)} className="btn-primary inline-flex items-center gap-2 px-8 py-4">
                <span>Оставить заявку</span>
                <ArrowRight className="w-5 h-5 relative z-10" />
              </button>
              <a href="https://t.me/Manager_Seo_Smm" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-xl border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all font-semibold">
                <MessageCircle className="w-4 h-4 text-teal-700" />
                Написать в Telegram
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
