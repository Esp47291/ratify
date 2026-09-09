"use client";

import { useState } from "react";
import { Star, Users, Shield, Award, ArrowRight, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import OrderModal from "@/components/OrderModal";

const values = [
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Безопасность",
    desc: "Используем только реальные аккаунты. Имитируем органический рост. Никаких блокировок.",
    color: "text-[var(--ink)]",
    bg: "bg-teal-50",
    border: "border-zinc-200",
  },
  {
    icon: <Star className="w-7 h-7" />,
    title: "Качество",
    desc: "Каждый отзыв уникален, написан живым языком с учётом специфики вашего бизнеса.",
    color: "text-[var(--accent)]",
    bg: "bg-teal-50",
    border: "border-zinc-200",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Клиентоориентированность",
    desc: "Персональный подход к каждому клиенту. Работаем на результат, а не на процесс.",
    color: "text-[var(--ink)]",
    bg: "bg-teal-50",
    border: "border-zinc-200",
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: "Ответственность",
    desc: "Платите только за опубликованные отзывы. Предоставляем полный отчёт по каждому.",
    color: "text-[var(--accent)]",
    bg: "bg-teal-50",
    border: "border-zinc-200",
  },
];

const team = [
  { name: "Алексей Смирнов", role: "Основатель и CEO", avatar: "А", color: "bg-[var(--ink)] text-white" },
  { name: "Мария Петрова", role: "Руководитель отдела контента", avatar: "М", color: "bg-[var(--accent)] text-white" },
  { name: "Дмитрий Козлов", role: "Технический директор", avatar: "Д", color: "bg-[var(--ink)] text-white" },
  { name: "Анна Волкова", role: "Менеджер по работе с клиентами", avatar: "А", color: "bg-[var(--accent)] text-white" },
];

export default function AboutPage() {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <main className="pt-28 pb-24">
      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <AnimatedSection>
          <div className="text-center mb-20">
            <span className="section-label">
              О компании
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-6">
              ratify —{" "}
              <span className="gradient-text">ваш партнёр</span>
              <br />по росту репутации
            </h1>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Мы помогаем бизнесу выстраивать доверие через живые, естественные отзывы на всех ключевых
              площадках. За годы работы мы помогли более 2 500 компаниям поднять рейтинг и привлечь новых клиентов.
            </p>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {[
              { value: "2 500+", label: "Клиентов" },
              { value: "95 000+", label: "Отзывов" },
              { value: "6", label: "Площадок" },
              { value: "4.9 ★", label: "Рейтинг качества" },
            ].map((s, i) => (
              <div key={i} className="card-bg rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{s.value}</div>
                <div className="text-zinc-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Story */}
        <AnimatedSection delay={150}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-6">Наша история</h2>
              <div className="space-y-4 text-zinc-500 leading-relaxed">
                <p>
                  ratify основано в 2020 году командой маркетологов и SEO-специалистов, которые заметили острую
                  потребность бизнеса в управлении репутацией на картах.
                </p>
                <p>
                  Мы начинали с небольших заказов для местных ресторанов и салонов красоты. Сегодня среди наших
                  клиентов — сети отелей, медицинские клиники, автодилеры и крупные ретейлеры.
                </p>
                <p>
                  Главный принцип нашей работы: <span className="text-zinc-900 font-semibold">качество важнее количества</span>.
                  Мы никогда не используем ботов и массовые накрутки — только живые люди с реальными аккаунтами.
                </p>
              </div>
            </div>
            <div className="card-bg rounded-xl p-8">
              <h3 className="text-zinc-900 font-bold text-xl mb-6">Почему выбирают нас?</h3>
              <ul className="space-y-4">
                {[
                  "Живые отзывы от реальных пользователей",
                  "Платите только за опубликованные",
                  "Работаем по NDA и гарантируем анонимность",
                  "Персональный менеджер для каждого клиента",
                  "Полная прозрачность и отчётность",
                  "6+ лет опыта в репутационном маркетинге",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Values */}
        <AnimatedSection delay={200}>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Наши ценности</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {values.map((v, i) => (
            <AnimatedSection key={i} delay={i * 100} direction="up">
              <div className="card-bg card-bg-hover rounded-2xl p-6 text-center h-full">
                <div className={`w-14 h-14 rounded-2xl ${v.bg} border ${v.border} flex items-center justify-center ${v.color} mx-auto mb-5`}>
                  {v.icon}
                </div>
                <h3 className="text-zinc-900 font-bold text-lg mb-3">{v.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Team */}
        <AnimatedSection delay={250}>
          <h2 className="text-3xl font-bold text-zinc-900 mb-8 text-center">Наша команда</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {team.map((m, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="card-bg rounded-2xl p-6 text-center">
                <div className={`w-16 h-16 rounded-2xl ${m.color} flex items-center justify-center font-bold text-xl mx-auto mb-4`}>
                  {m.avatar}
                </div>
                <h3 className="text-zinc-900 font-bold mb-1">{m.name}</h3>
                <p className="text-zinc-500 text-sm">{m.role}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={300}>
          <div className="text-center card-bg rounded-xl p-12">
            <h2 className="text-3xl font-bold text-zinc-900 mb-4">Готовы к сотрудничеству?</h2>
            <p className="text-zinc-500 mb-8">Свяжитесь с нами и обсудим ваши задачи</p>
            <button
              onClick={() => setOrderOpen(true)}
              className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-5"
            >
              <span>Заказать консультацию</span>
              <ArrowRight className="w-5 h-5 relative z-10" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
