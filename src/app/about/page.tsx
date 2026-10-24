import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCta from "@/components/ServiceCta";
import ServiceIcon from "@/components/ServiceIcon";
import { services } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "О нас",
  description: "ratify — интернет-маркетинг: Яндекс.Директ, SEO, аудит сайта и ведение карточек на картах.",
};

const approach = [
  {
    title: "Сначала разбираемся",
    text: "Прежде чем что-то запускать, изучаем продукт, сайт и текущую рекламу, чтобы не тратить бюджет впустую.",
  },
  {
    title: "Работаем с цифрами",
    text: "Решения принимаем по данным: расходам, заявкам, позициям и трафику, а не по ощущениям.",
  },
  {
    title: "Говорим как есть",
    text: "Если сайт мешает продажам или ниша сложная, скажем об этом сразу и предложим, что менять.",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="section-label">О компании</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-6">
              ratify — <span className="gradient-text">интернет-маркетинг</span>
            </h1>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Помогаем бизнесу получать клиентов из поиска и рекламы: настраиваем Яндекс.Директ, продвигаем сайты,
              разбираем продукты и ведём карточки компаний на картах.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Чем занимаемся</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {services.map((s, i) => (
            <AnimatedSection key={s.slug} delay={i * 80}>
              <Link href={`/services/${s.slug}`} className="card-bg card-bg-hover rounded-xl p-6 flex gap-4 h-full">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                  <ServiceIcon name={s.icon} className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{s.short}</p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <h2 className="text-2xl font-bold text-zinc-900 mb-6">Как мы подходим к работе</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {approach.map((a, i) => (
            <AnimatedSection key={a.title} delay={i * 80}>
              <div className="card-bg rounded-xl p-6 h-full">
                <h3 className="font-bold text-zinc-900 mb-2">{a.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{a.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center">
          <ServiceCta label="Обсудить задачу" />
        </div>
      </div>
    </main>
  );
}
