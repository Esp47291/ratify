"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  CheckCircle,
  Loader2,
  Send,
  Phone,
  Mail,
  MessageCircle,
  Eye,
  ShieldCheck,
  MessagesSquare,
} from "lucide-react";
import OrderModal from "@/components/OrderModal";
import ExitIntentModal from "@/components/ExitIntentModal";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceIcon from "@/components/ServiceIcon";
import { services, processSteps, faqs } from "@/lib/services-data";
import { formatPhoneMask, isCompletePhone, normalizePhoneDigits } from "@/lib/phone";
import { EMAIL, EMAIL_MAILTO, PHONE_DISPLAY, PHONE_TEL, TELEGRAM_HANDLE, TELEGRAM_URL } from "@/lib/contacts";

const principles = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Прозрачная отчётность",
    desc: "Регулярно показываем расходы, заявки, позиции и трафик, а не общие слова.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Честные методы",
    desc: "Без накрутки поведенческих факторов и покупных отзывов: только то, что не подведёт ваш сайт.",
  },
  {
    icon: <MessagesSquare className="w-6 h-6" />,
    title: "Связь в мессенджерах",
    desc: "Пишите в Telegram, WhatsApp, Max или VK, чтобы быстро уточнять детали по задаче.",
  },
];

export default function HomePage() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError("Заполните имя и телефон");
      return;
    }
    if (!isCompletePhone(form.phone)) {
      setError("Введите номер полностью: +7 (999) 123-45-67");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: `+${normalizePhoneDigits(form.phone)}`,
          type: "contact",
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", phone: "", message: "" });
      } else {
        setError("Ошибка отправки. Попробуйте ещё раз.");
      }
    } catch {
      setError("Ошибка отправки. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="overflow-x-hidden">
      <ExitIntentModal />
      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />

      {/* HERO */}
      <section className="hero-dark relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 hero-centered">
          <AnimatedSection delay={0}>
            <p className="section-label">Интернет-маркетинг</p>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <h1 className="heading-xl mb-6">
              Приводим клиентов <span className="accent-text">из поиска и рекламы</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={160}>
            <p className="text-lg text-white/70 max-w-2xl mb-8 leading-relaxed">
              Настраиваем Яндекс.Директ, продвигаем сайты в поиске, разбираем продукт и ведём карточки на картах.
              Работаем честными методами и показываем цифры.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={240}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => setOrderOpen(true)}
                className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5"
              >
                <span>Оставить заявку</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link href="/calculator" className="btn-secondary inline-flex items-center justify-center gap-2 px-7 py-3.5">
                Рассчитать бюджет
              </Link>
            </div>
          </AnimatedSection>
        </div>
        <div className="hero-blend-edge" />
      </section>

      {/* SERVICES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="section-label">Услуги</span>
              <h2 className="heading-lg">Чем мы занимаемся</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <AnimatedSection key={s.slug} delay={i * 80}>
                <Link href={`/services/${s.slug}`} className="card-bg card-bg-hover rounded-2xl p-6 flex gap-4 h-full">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-[var(--accent)] flex items-center justify-center flex-shrink-0">
                    <ServiceIcon name={s.icon} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-zinc-900 mb-1">{s.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-3">{s.short}</p>
                    <span className="text-sm font-semibold text-[var(--accent)]">{s.price}</span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="section-label">Как мы работаем</span>
              <h2 className="heading-lg">От заявки до результата</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 80}>
                <div className="card-bg rounded-xl p-6 h-full">
                  <div className="text-3xl font-bold text-[var(--accent)] mb-3 tabular-nums">{i + 1}</div>
                  <h3 className="font-bold text-zinc-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="section-label">Принципы</span>
              <h2 className="heading-lg">На чём строится работа</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {principles.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 80}>
                <div className="card-bg rounded-xl p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-[var(--accent)] flex items-center justify-center mb-4">
                    {p.icon}
                  </div>
                  <h3 className="font-bold text-zinc-900 mb-2">{p.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR TEASER */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <AnimatedSection>
            <div className="promo-banner flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Посчитайте рекламный бюджет</h2>
                <p className="text-white/70 max-w-xl">
                  Введите цену клика, конверсию и средний чек — калькулятор покажет, сколько заявок и выручки
                  получится при ваших цифрах.
                </p>
              </div>
              <Link href="/calculator" className="btn-primary inline-flex items-center justify-center gap-2 whitespace-nowrap">
                <span>Открыть калькулятор</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <span className="section-label">Вопросы</span>
              <h2 className="heading-lg">Частые вопросы</h2>
            </div>
          </AnimatedSection>
          <div className="space-y-3">
            {faqs.slice(0, 4).map((f, i) => (
              <div key={f.q} className="card-bg rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-semibold text-zinc-900 text-sm">{f.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 text-zinc-400 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <div className={`faq-answer ${openFaq === i ? "open" : ""}`}>
                  <p className="px-5 pb-4 text-sm text-zinc-500 leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/faq" className="text-sm font-semibold text-[var(--accent)]">
              Все вопросы →
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20" id="contact">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <AnimatedSection>
            <span className="section-label">Связаться</span>
            <h2 className="heading-lg mb-4">Расскажите о задаче</h2>
            <p className="text-zinc-500 mb-8 leading-relaxed">
              Оставьте контакты, и мы вернёмся с вопросами и предложением. Или напишите напрямую.
            </p>
            <ul className="space-y-4">
              <li>
                <a href={PHONE_TEL} className="flex items-center gap-3 text-zinc-700 hover:text-zinc-900">
                  <Phone className="w-5 h-5 text-[var(--accent)]" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={EMAIL_MAILTO} className="flex items-center gap-3 text-zinc-700 hover:text-zinc-900">
                  <Mail className="w-5 h-5 text-[var(--accent)]" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-700 hover:text-zinc-900"
                >
                  <MessageCircle className="w-5 h-5 text-[var(--accent)]" />
                  {TELEGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="card-bg rounded-2xl p-6 sm:p-8">
              {success ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">Заявка принята!</h3>
                  <p className="text-zinc-500 text-sm">Мы свяжемся с вами в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input-field"
                    required
                  />
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: formatPhoneMask(e.target.value) })}
                    onFocus={() => {
                      if (!form.phone) setForm({ ...form, phone: "+7 (" });
                    }}
                    onBlur={() => {
                      if (form.phone === "+7" || form.phone === "+7 (" || form.phone === "+7 ()") {
                        setForm({ ...form, phone: "" });
                      }
                    }}
                    maxLength={18}
                    className="input-field"
                    required
                  />
                  <textarea
                    rows={4}
                    placeholder="Коротко о задаче (необязательно)"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-field"
                  />
                  {error && (
                    <p className="text-red-600 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>{loading ? "Отправляем..." : "Отправить"}</span>
                  </button>
                  <p className="text-center text-xs text-zinc-500">
                    Нажимая кнопку, вы соглашаетесь с{" "}
                    <Link href="/privacy" className="text-[var(--accent)] hover:underline">
                      политикой конфиденциальности
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
