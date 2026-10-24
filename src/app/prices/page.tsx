import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCta from "@/components/ServiceCta";
import ServiceIcon from "@/components/ServiceIcon";
import { services } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Цены",
  description: "Стоимость услуг: ведение карточки в Яндекс.Бизнесе от 9 900 ₽/мес, остальные услуги считаем индивидуально.",
};

export default function PricesPage() {
  return (
    <main className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="section-label">Цены</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">Сколько это стоит</h1>
            <p className="text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              Там, где цену можно назвать заранее, мы её называем. Остальное считаем после короткого брифа, потому что
              задачи и ниши слишком разные.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {services.map((s, i) => (
            <AnimatedSection key={s.slug} delay={i * 80}>
              <div className="card-bg card-bg-hover rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-[var(--accent)] flex items-center justify-center">
                    <ServiceIcon name={s.icon} className="w-5 h-5" />
                  </div>
                  <h2 className="font-bold text-zinc-900">{s.title}</h2>
                </div>
                <p className="text-2xl font-bold text-zinc-900 mb-2">{s.price}</p>
                <p className="text-sm text-zinc-500 leading-relaxed mb-5 flex-1">{s.short}</p>
                <Link href={`/services/${s.slug}`} className="text-sm font-semibold text-[var(--accent)]">
                  Что входит →
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <p className="text-sm text-zinc-500 text-center leading-relaxed mb-8">
          Рекламный бюджет и стоимость работ обсуждаются отдельно. Точную смету готовим после брифа.
        </p>
        <div className="text-center">
          <ServiceCta label="Рассчитать стоимость" />
        </div>
      </div>
    </main>
  );
}
