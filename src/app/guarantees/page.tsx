"use client";

import { useState } from "react";
import { CheckCircle, Shield, RefreshCw, Lock, FileText, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import OrderModal from "@/components/OrderModal";

const guarantees = [
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Платите только за опубликованные отзывы",
    desc: "Если отзыв не прошёл модерацию по любой причине — вы его не оплачиваете. Это главное правило нашей работы. Мы несём полную ответственность за результат.",
    color: "text-[var(--accent)]",
    bg: "bg-teal-50",
    border: "border-zinc-200",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "100% живые аккаунты",
    desc: "Используем только реальные профили с историей активности. Никаких ботов, фakes и массовых регистраций. Каждый аккаунт прошёл ручную проверку нашими специалистами.",
    color: "text-[var(--ink)]",
    bg: "bg-teal-50",
    border: "border-zinc-200",
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Полная анонимность",
    desc: "Мы не передаём ваши данные третьим лицам. Работаем по NDA. Конфиденциальность — это не просто слова, это основа долгосрочных отношений с клиентами.",
    color: "text-[var(--ink)]",
    bg: "bg-teal-50",
    border: "border-zinc-200",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Естественные тексты",
    desc: "Каждый отзыв уникален и написан с учётом специфики вашего бизнеса. Мы изучаем компанию перед написанием. Отзывы выглядят органично и не вызывают подозрений.",
    color: "text-[var(--accent)]",
    bg: "bg-teal-50",
    border: "border-zinc-200",
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: "Гарантия прохождения модерации",
    desc: "Если отзыв удалён модерацией в течение 30 дней после публикации — мы заменяем его бесплатно. Мы следим за судьбой каждого размещённого отзыва.",
    color: "text-[var(--accent)]",
    bg: "bg-teal-50",
    border: "border-zinc-200",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Прозрачная отчётность",
    desc: "Предоставляем скриншоты и прямые ссылки на каждый опубликованный отзыв. Полный отчёт в согласованный срок. Вы видите каждый результат.",
    color: "text-[var(--ink)]",
    bg: "bg-teal-50",
    border: "border-zinc-200",
  },
];

export default function GuaranteesPage() {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <main className="pt-28 pb-24">
      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="section-label">
              Гарантии
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">
              Ваша защита —{" "}
              <span className="gradient-text">наш приоритет</span>
            </h1>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Работаем честно и прозрачно. Каждое обещание подкреплено реальными гарантиями.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {guarantees.map((g, i) => (
            <AnimatedSection key={i} delay={i * 100} direction="up">
              <div className="card-bg card-bg-hover rounded-xl p-8 h-full flex flex-col">
                <div className={`w-16 h-16 rounded-2xl ${g.bg} border ${g.border} flex items-center justify-center ${g.color} mb-6`}>
                  {g.icon}
                </div>
                <h3 className="text-zinc-900 font-bold text-xl mb-4">{g.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed flex-grow">{g.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Process */}
        <AnimatedSection delay={200}>
          <div className="card-bg rounded-xl p-10 mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 mb-8 text-center">Как работает наша гарантия?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", text: "Вы делаете заказ и оплачиваете 50%" },
                { step: "2", text: "Мы размещаем отзывы в оговорённые сроки" },
                { step: "3", text: "Предоставляем полный отчёт по каждому" },
                { step: "4", text: "Вы оплачиваете только опубликованные" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {s.step}
                  </div>
                  <p className="text-zinc-600 text-sm leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="text-center card-bg rounded-xl p-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Готовы начать безопасно?</h2>
            <p className="text-zinc-500 mb-8">Работаем по гарантии. Платите только за результат.</p>
            <button
              onClick={() => setOrderOpen(true)}
              className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-5"
            >
              <span>Заказать с гарантией</span>
              <ArrowRight className="w-5 h-5 relative z-10" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
