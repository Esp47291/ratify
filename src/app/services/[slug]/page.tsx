import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCta from "@/components/ServiceCta";
import ServiceIcon from "@/components/ServiceIcon";
import { getService, services } from "@/lib/services-data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.intro,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return notFound();

  return (
    <main className="pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-[var(--accent)] flex items-center justify-center mx-auto mb-6">
              <ServiceIcon name={service.icon} className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold text-zinc-900 mb-4">{service.title}</h1>
            <p className="text-zinc-500 max-w-2xl mx-auto leading-relaxed">{service.intro}</p>
            <p className="mt-4 text-lg font-bold text-[var(--accent)]">{service.price}</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <AnimatedSection direction="left">
            <div className="card-bg rounded-xl p-8 h-full">
              <h2 className="text-xl font-bold mb-4">Что входит</h2>
              <ul className="space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-zinc-600 text-sm leading-relaxed">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right">
            <div className="card-bg rounded-xl p-8 h-full">
              <h2 className="text-xl font-bold mb-4">Кому подойдёт</h2>
              <ul className="list-disc list-inside space-y-3 text-zinc-600 text-sm leading-relaxed">
                {service.forWho.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div className="card-bg rounded-xl p-8 mb-6">
            <h2 className="text-xl font-bold mb-6">Как проходит работа</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="text-2xl font-bold text-[var(--accent)] tabular-nums">{i + 1}</span>
                  <div>
                    <h3 className="font-semibold text-zinc-900">{step.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mt-1">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </AnimatedSection>

        {service.note && <p className="text-sm text-zinc-500 leading-relaxed mb-8">{service.note}</p>}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <ServiceCta label="Оставить заявку" serviceTitle={service.title} />
          <Link href="/prices" className="btn-secondary">
            Все цены
          </Link>
        </div>
      </div>
    </main>
  );
}
