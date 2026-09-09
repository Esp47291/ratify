"use client";

import { useState } from "react";
import { TrendingUp, MapPin, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import OrderModal from "@/components/OrderModal";

const cases = [
  {
    title: "Фитнес-клуб",
    platform: "Яндекс.Карты",
    niche: "Фитнес",
    emoji: "🏋️",
    before: { reviews: 4, rating: 3.6 },
    ordered: 328,
    after: { reviews: 332, rating: 4.6 },
    result: "Клуб открылся не так давно, отзывы писались редко. Работая с залом уже третий год, мы заметно повысили оценку",
    period: "3 года",
    growth: "3,6 → 4,6",
  },
  {
    title: "Стоматология",
    platform: "Яндекс.Карты",
    niche: "Медицина",
    emoji: "🦷",
    before: { reviews: 54, rating: 4.4 },
    ordered: 149,
    after: { reviews: 203, rating: 4.8 },
    result: "Повысили оценку организации с помощью положительных отзывов",
    period: "несколько месяцев",
    growth: "4,4 → 4,8",
  },
  {
    title: "Маникюрный салон",
    platform: "Яндекс.Карты",
    niche: "Бьюти",
    emoji: "💅",
    before: { reviews: 0, rating: null },
    ordered: 147,
    after: { reviews: 147, rating: 5.0 },
    result: "Салон был совсем новый, необходимо было добавить отзывов, чтобы повысить доверие. Работаем второй год",
    period: "2 года",
    growth: "0 → 5,0",
  },
  {
    title: "Ресторан",
    platform: "Яндекс.Карты",
    niche: "Ресторанный бизнес",
    emoji: "🍽️",
    before: { reviews: 553, rating: 4.6 },
    ordered: 519,
    after: { reviews: 1072, rating: 4.9 },
    result: "Повысили посещаемость сети ресторанов с помощью увеличения числа положительных отзывов и продвижения на картах",
    period: "несколько месяцев",
    growth: "4,6 → 4,9",
  },
  {
    title: "Магазин автозапчастей",
    platform: "Яндекс.Карты",
    niche: "Автозапчасти",
    emoji: "🔧",
    before: { reviews: 0, rating: 3.1 },
    ordered: 70,
    after: { reviews: 70, rating: 4.7 },
    result: "Конкуренты писали негативные отзывы, пришлось вытеснять их позитивом. С задачей справились",
    period: "несколько месяцев",
    growth: "3,1 → 4,7",
  },
  {
    title: "Ремонт сантехники",
    platform: "Яндекс.Карты",
    niche: "Сервис и ремонт",
    emoji: "🚿",
    before: { reviews: 14, rating: 4.2 },
    ordered: 147,
    after: { reviews: 161, rating: 5.0 },
    result: "Заметно повысили оценку организации, специализирующейся на ремонте сантехники и бытовой техники",
    period: "несколько месяцев",
    growth: "4,2 → 5,0",
  },
];

export default function CasesPage() {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <main className="pt-28 pb-24">
      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="section-label">
              Портфолио
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">
              Реальные кейсы{" "}
              <span className="gradient-text">наших клиентов</span>
            </h1>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Конкретные результаты для реального бизнеса с цифрами и подтверждёнными итогами
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {cases.map((c, i) => (
            <AnimatedSection key={i} delay={i * 100} direction="up">
              <div className="card-bg card-bg-hover rounded-xl p-7 h-full flex flex-col transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <div className="text-4xl mb-3">{c.emoji}</div>
                    <p className="text-zinc-500 text-xs font-medium mb-1">{c.niche}</p>

                    <h3 className="text-zinc-900 font-bold text-lg">{c.title}</h3>
                    <span className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-600 text-xs">
                      <MapPin className="w-3 h-3" />{c.platform}
                    </span>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/25 shrink-0">
                    <span className="text-emerald-600 font-bold text-sm whitespace-nowrap">{c.growth}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="bg-zinc-50 rounded-xl px-2 py-2.5 text-center flex flex-col min-h-[85px]">
                    <div className="flex flex-col items-center gap-0.5 flex-1 justify-center">
                      <p className="text-zinc-500 text-[10px] uppercase tracking-wide">Было</p>
                      <p className="text-zinc-900 font-bold text-sm leading-none">{c.before.reviews}</p>
                      <p className="text-zinc-500 text-[10px]">отз.</p>
                    </div>
                    <p className="text-zinc-500 text-xs">{c.before.rating ? `★${c.before.rating}` : "—"}</p>
                  </div>
                  <div className="bg-teal-50 border border-zinc-200 rounded-xl px-2 py-2.5 text-center flex flex-col min-h-[85px]">
                    <div className="flex flex-col items-center gap-0.5 flex-1 justify-center">
                      <p className="text-teal-700 text-[10px] uppercase tracking-wide">Заказ</p>
                      <p className="text-zinc-900 font-bold text-sm leading-none">{c.ordered}</p>
                      <p className="text-zinc-500 text-[10px]">отзывов</p>
                    </div>
                    <p className="text-transparent text-xs select-none">—</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-2 py-2.5 text-center flex flex-col min-h-[85px]">
                    <div className="flex flex-col items-center gap-0.5 flex-1 justify-center">
                      <p className="text-emerald-600 text-[10px] uppercase tracking-wide">Стало</p>
                      <p className="text-zinc-900 font-bold text-sm leading-none">{c.after.reviews}</p>
                      <p className="text-zinc-500 text-[10px]">отз.</p>
                    </div>
                    <p className="text-emerald-600 text-xs">{c.after.rating ? `★${c.after.rating}` : "—"}</p>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-zinc-100">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p className="text-emerald-600 text-sm font-semibold">{c.result}</p>
                  </div>
                  <p className="text-zinc-500 text-xs mt-2">Период: {c.period}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300}>
          <div className="text-center card-bg rounded-xl p-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Хотите такой же результат?</h2>
            <p className="text-zinc-500 mb-8">Закажите накрутку отзывов и увидьте разницу уже через неделю</p>
            <button
              onClick={() => setOrderOpen(true)}
              className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-5"
            >
              <span>Заказать накрутку</span>
              <ArrowRight className="w-5 h-5 relative z-10" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
