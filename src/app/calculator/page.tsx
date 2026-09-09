"use client";

import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import RatingCalculator from "@/components/RatingCalculator";

const facts = [
  {
    title: "Это не среднее арифметическое",
    text: "Яндекс прямо пишет: рейтинг компании — не просто среднее всех звёзд. Учитываются достоверность автора, его история оценок и то, насколько отзыву можно доверять. Подозрительная активность почти обнуляет вес.",
  },
  {
    title: "Свежие отзывы сильнее старых",
    text: "Рейтинг пересчитывается каждый день по всем оценкам за время жизни карточки, но рынок и разборы алгоритма сходятся: недавние мнения влияют заметнее. Пачка старых пятёрок слабо держит карточку, если в ленте свежие двойки.",
  },
  {
    title: "Сколько отзывов нужно",
    text: "На Яндексе рейтинг обычно «оживает» после 3–5 оценок. До ~40–50 отзывов цифра ещё прыгает. Около 100 отзывов — ориентир устойчивой карточки. Google часто показывает рейтинг примерно с 5 отзывов и сильнее сглаживает малое число оценок. В 2ГИС устойчивость ближе к 10–20+.",
  },
  {
    title: "Почему 5 новых ≠ 5 старых",
    text: "Новый отзыв с текстом от активного («надёжного») автора может сдвинуть балл сильнее, чем несколько коротких оценок с новых аккаунтов. Поэтому калькулятор даёт оценку пакета, а не гарантию до 0,1 звезды.",
  },
];

export default function CalculatorPage() {
  return (
    <main className="pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="section-label">Калькулятор рейтинга</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">
              Сколько отзывов нужно,{" "}
              <span className="gradient-text">если учитывать свежесть</span>
            </h1>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Введите текущий балл и число отзывов. Ползунок актуальности показывает, насколько сильнее новые оценки
              тянут рейтинг, если старые уже «остыли».
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <AnimatedSection delay={80} className="lg:col-span-3">
            <RatingCalculator />
          </AnimatedSection>

          <AnimatedSection delay={140} className="lg:col-span-2 space-y-4">
            {facts.map((f) => (
              <div key={f.title} className="card-bg rounded-xl p-5">
                <h2 className="font-bold text-zinc-900 mb-2">{f.title}</h2>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.text}</p>
              </div>
            ))}
            <p className="text-xs text-zinc-400 leading-relaxed">
              Источники логики: справка Яндекс Бизнеса «Рейтинг компании» (вес автора, доверие, ежедневный пересчёт,
              рейтинг ≠ среднее), плюс отраслевые разборы 2025–2026: свежесть порядка 10–15% вклада, приоритет последних
              оценок, устойчивость ближе к 40–100 отзывам. Формулы карт закрытые — цифры калькулятора ориентировочные.
            </p>
            <Link href="/prices" className="inline-flex text-sm font-semibold text-[var(--accent)]">
              Смотреть тарифы →
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
}
