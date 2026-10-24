import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import CalculatorWithModal from "@/components/CalculatorWithModal";

export const metadata: Metadata = {
  title: "Калькулятор рекламного бюджета",
  description: "Посчитайте, сколько заявок и выручки даст рекламный бюджет при вашей цене клика, конверсии и среднем чеке.",
};

const tips = [
  {
    title: "Где взять цену клика",
    text: "Если реклама уже идёт, возьмите среднюю цену клика из отчёта Директа. Если нет — введите осторожную оценку для вашей ниши.",
  },
  {
    title: "Где взять конверсию",
    text: "Конверсию сайта показывает Яндекс Метрика: доля посетителей, которые оставили заявку или позвонили.",
  },
  {
    title: "Заявки в продажи",
    text: "Это ваша внутренняя статистика: сколько из обратившихся в итоге купили. Если данных нет, лучше взять консервативное значение.",
  },
];

export default function CalculatorPage() {
  return (
    <main className="pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="section-label">Калькулятор</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">
              Рекламный бюджет <span className="gradient-text">в цифрах</span>
            </h1>
            <p className="text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              Введите свои показатели и посмотрите, сколько кликов, заявок и продаж получится. Расчёт показывает
              арифметику ваших цифр, а не прогноз.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          <AnimatedSection delay={80} className="lg:col-span-3">
            <CalculatorWithModal />
          </AnimatedSection>

          <AnimatedSection delay={140} className="lg:col-span-2 space-y-4">
            {tips.map((t) => (
              <div key={t.title} className="card-bg rounded-xl p-5">
                <h2 className="font-bold text-zinc-900 mb-2">{t.title}</h2>
                <p className="text-sm text-zinc-500 leading-relaxed">{t.text}</p>
              </div>
            ))}
            <Link href="/prices" className="inline-flex text-sm font-semibold text-[var(--accent)]">
              Смотреть цены →
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
}
