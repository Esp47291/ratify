import type { Metadata } from "next";
import { CheckCircle, X } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCta from "@/components/ServiceCta";

export const metadata: Metadata = {
  title: "Гарантии",
  description: "Что мы гарантируем в работе и чего не обещаем: прозрачность, договор, честные методы.",
};

const promises = [
  {
    title: "Прозрачная отчётность",
    text: "Регулярно присылаем отчёты: расходы, заявки, позиции, трафик. Вы видите, на что уходит бюджет.",
  },
  {
    title: "Договор и понятные условия",
    text: "Работаем по договору: состав услуг, сроки и порядок оплаты фиксируются до начала работ.",
  },
  {
    title: "Честные методы",
    text: "Не накручиваем поведенческие факторы, не покупаем отзывы и не используем приёмы, за которые площадки наказывают.",
  },
  {
    title: "Конфиденциальность",
    text: "Данные вашей компании и доступы используются только для работы по задаче и не передаются третьим лицам.",
  },
];

const notPromised = [
  "Конкретное место в поиске к конкретной дате",
  "Фиксированное число заявок или продаж",
  "Результат без доработок сайта, если сайт мешает конверсии",
];

export default function GuaranteesPage() {
  return (
    <main className="pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="section-label">Гарантии</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">Что мы обещаем и чего нет</h1>
            <p className="text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              В маркетинге результат зависит от ниши, конкуренции и сайта, поэтому мы гарантируем то, что зависит от
              нас: качество работы и прозрачность.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {promises.map((p, i) => (
            <AnimatedSection key={p.title} delay={i * 80}>
              <div className="card-bg rounded-xl p-6 h-full">
                <CheckCircle className="w-6 h-6 text-[var(--accent)] mb-3" />
                <h2 className="font-bold text-zinc-900 mb-2">{p.title}</h2>
                <p className="text-sm text-zinc-500 leading-relaxed">{p.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="card-bg rounded-xl p-8 mb-10">
            <h2 className="text-xl font-bold mb-4">Чего мы не обещаем</h2>
            <ul className="space-y-3">
              {notPromised.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-zinc-600">
                  <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-zinc-500 leading-relaxed mt-5">
              Если вам обещают гарантированный топ или гарантированные заявки, стоит насторожиться.
            </p>
          </div>
        </AnimatedSection>

        <div className="text-center">
          <ServiceCta label="Обсудить задачу" />
        </div>
      </div>
    </main>
  );
}
