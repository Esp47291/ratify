import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCta from "@/components/ServiceCta";
import { faqs } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Вопросы и ответы",
  description: "Ответы на частые вопросы об услугах, стоимости и порядке работы.",
};

export default function FaqPage() {
  return (
    <main className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <span className="section-label">FAQ</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">Частые вопросы</h1>
          </div>
        </AnimatedSection>

        <div className="faq-two-col mb-10">
          {faqs.map((f) => (
            <details key={f.q} className="card-bg rounded-xl group">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-5 py-4">
                <span className="font-semibold text-zinc-900 text-sm">{f.q}</span>
                <ChevronDown className="w-4 h-4 flex-shrink-0 text-zinc-400 transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-4 text-sm text-zinc-500 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        <div className="text-center">
          <p className="text-zinc-500 mb-4">Не нашли ответ? Задайте вопрос.</p>
          <ServiceCta label="Задать вопрос" />
        </div>
      </div>
    </main>
  );
}
