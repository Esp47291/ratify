"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  TrendingUp,
  Shield,
  Trophy,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Download,
  CheckCircle,
  ArrowRight,
  Zap,
  MapPin,
  Send,
  Loader2,
  Clock,
  Mail,
  Phone,
  BarChart3,
  Users,
  Headphones,
} from "lucide-react";
import OrderModal from "@/components/OrderModal";
import ChecklistModal from "@/components/ChecklistModal";
import ExitIntentModal from "@/components/ExitIntentModal";
import AnimatedSection from "@/components/AnimatedSection";
import PlatformsAndPricesSection from "@/components/PlatformsAndPricesSection";
import { EMAIL, EMAIL_MAILTO, PHONE_DISPLAY, PHONE_TEL, TELEGRAM_HANDLE, TELEGRAM_URL } from "@/lib/contacts";

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Быстрый старт",
    desc: "Первые отзывы публикуются уже через 24–48 часов после согласования заказа.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Безопасность",
    desc: "Живые аккаунты, естественные тексты и безопасные темпы — без риска блокировки.",
  },
  {
    icon: <Headphones className="w-6 h-6" />,
    title: "Поддержка 24/7",
    desc: "Менеджер на связи круглосуточно в Telegram, WhatsApp, Max и VK.",
  },
];

const stats = [
  { value: 98, label: "Проходят модерацию", desc: "Отзывы публикуются и остаются на площадке" },
  { value: 100, label: "Живые аккаунты", desc: "Только реальные профили с историей активности" },
  { value: 95, label: "Довольных клиентов", desc: "Возвращаются за повторными заказами" },
];

const serviceBlocks = [
  {
    icon: <Star className="w-6 h-6" />,
    title: "Отзывы на картах",
    desc: "Яндекс.Карты, Google, 2ГИС, Zoon — поднимаем рейтинг и привлекаем клиентов.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Яндекс.Бизнес",
    desc: "Ежемесячная поддержка карточки: актуализация, ответы, мониторинг репутации.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Авито и маркетплейсы",
    desc: "Отзывы на Авито и других площадках с учётом строгой модерации.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Яндекс.Директ",
    desc: "Настройка рекламных кампаний для привлечения клиентов из поиска.",
  },
];

const benefits = [
  {
    icon: <TrendingUp className="w-7 h-7" />,
    title: "Рост продаж",
    desc: "Положительные отзывы повышают конверсию на 30–50%.",
    color: "text-[var(--accent)]",
    bg: "bg-teal-50",
    border: "border-zinc-200",
  },
  {
    icon: <Shield className="w-7 h-7" />,
    title: "Доверие клиентов",
    desc: "Живые отзывы создают социальное доказательство.",
    color: "text-[var(--ink)]",
    bg: "bg-teal-50",
    border: "border-zinc-200",
  },
  {
    icon: <Trophy className="w-7 h-7" />,
    title: "Обход конкурентов",
    desc: "Компании с высоким рейтингом получают преимущество в выдаче.",
    color: "text-[var(--accent)]",
    bg: "bg-teal-50",
    border: "border-zinc-200",
  },
];

const cases = [
  {
    title: "Фитнес-клуб",
    platform: "Яндекс.Карты",
    niche: "Фитнес",
    before: { reviews: 4, rating: 3.6 },
    after: { reviews: 332, rating: 4.6 },
    result: "С 3,6 до 4,6 за 3 года",
  },
  {
    title: "Стоматология",
    platform: "Яндекс.Карты",
    niche: "Медицина",
    before: { reviews: 54, rating: 4.4 },
    after: { reviews: 203, rating: 4.8 },
    result: "С 4,4 до 4,8",
  },
];

const statsGrid = [
  { value: "2 500+", label: "Клиентов" },
  { value: "50 000+", label: "Отзывов" },
  { value: "98%", label: "Модерация" },
  { value: "5 мин", label: "Ответ" },
  { value: "8", label: "Площадок" },
  { value: "24/7", label: "Поддержка" },
];

const faqs = [
  {
    q: "Накрутка отзывов — это законно?",
    a: "Да. Отзывы оставляют реальные люди с реальных аккаунтов. Мы не нарушаем законодательство.",
  },
  {
    q: "Не забанят ли мою компанию?",
    a: "Нет, если отзывы естественные. Мы соблюдаем безопасные темпы и имитируем органический рост.",
  },
  {
    q: "Сколько времени занимает накрутка?",
    a: "В среднем 3–7 дней. Зависит от объёма и площадки.",
  },
  {
    q: "Как узнать, что отзывы опубликованы?",
    a: "Предоставляем скриншоты и ссылки на каждый опубликованный отзыв.",
  },
  {
    q: "Вы даёте гарантию?",
    a: "Да. Гарантируем прохождение модерации или возвращаем деньги.",
  },
  {
    q: "Какие площадки обслуживаете?",
    a: "Яндекс.Карты, Google, 2ГИС, Zoon, Авито и другие — уточняйте у менеджера.",
  },
];

function StatRing({ value }: { value: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="stat-ring">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--border)" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="stat-ring__value">{value}%</div>
    </div>
  );
}

export default function HomePage() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [checklistOpen, setChecklistOpen] = useState(false);
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
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: "contact" }),
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
      <ChecklistModal isOpen={checklistOpen} onClose={() => setChecklistOpen(false)} />

      {/* 1. HERO */}
      <section className="hero-dark relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8 hero-centered">
          <AnimatedSection delay={0}>
            <p className="section-label">Сервис управления репутацией</p>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <h1 className="heading-xl mb-6">
              Живые отзывы на картах —{" "}
              <span className="accent-text">от 120 ₽</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={160}>
            <p className="text-lg text-white/70 max-w-2xl mb-8 leading-relaxed">
              Поднимаем рейтинг на Яндекс.Картах, Google, 2ГИС и Zoon.
              Реальные аккаунты, естественные тексты, оплата только за опубликованные отзывы.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={240}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <button
                onClick={() => setOrderOpen(true)}
                className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-3.5"
              >
                <span>Оставить заявку</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#platforms-prices"
                className="btn-secondary inline-flex items-center justify-center gap-2 px-7 py-3.5"
              >
                Смотреть цены
              </a>
            </div>
            <p className="text-sm text-white/50">
              На связи 24/7 ·{" "}
              <a href={TELEGRAM_URL} className="text-white/80 hover:text-white underline underline-offset-2">
                {TELEGRAM_HANDLE}
              </a>
            </p>
          </AnimatedSection>
        </div>
        <div className="hero-blend-edge" aria-hidden="true" />
      </section>

      {/* 2. FEATURES INTRO */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
            <AnimatedSection direction="left" className="lg:col-span-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
                <span className="gradient-text">ratify</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={100} direction="right" className="lg:col-span-8">
              <p className="text-zinc-500 leading-relaxed">
                Профессиональная накрутка живых отзывов для бизнеса любого масштаба.
                87% потребителей читают отзывы перед покупкой — мы помогаем быть на шаг впереди конкурентов.
              </p>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <AnimatedSection key={i} delay={i * 120} direction="up">
                <div className="card-bg card-bg-hover rounded-xl p-7 h-full">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-zinc-200 flex items-center justify-center text-[var(--accent)] mb-5">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{f.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 2b. B2B / DNS */}
      <section className="py-16 border-y border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-bg rounded-xl p-7">
                <h2 className="text-xl font-bold text-zinc-900 mb-2">Работаем с DNS</h2>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Берём заказы по точкам и карточкам DNS: отзывы на картах и площадках, аккуратные темпы, отчёт по факту публикации.
                </p>
              </div>
              <div className="card-bg rounded-xl p-7">
                <h2 className="text-xl font-bold text-zinc-900 mb-2">Крупные компании — по договору</h2>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Готовы работать с юрлицами: договор, закрывающие документы, выделенный менеджер. Ночь и день — без разницы, мы на связи всегда.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 3. ORDER CHECK */}
      <section className="py-16 border-y border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection direction="left">
              <div className="order-check-card">
                <div className="order-check-line order-check-line--ok">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Заказ #4821 — Яндекс.Карты, 20 отзывов</span>
                </div>
                <div className="order-check-line order-check-line--ok">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>18 из 20 опубликованы · модерация пройдена</span>
                </div>
                <div className="order-check-line">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>2 отзыва на проверке · ожидание до 24 ч</span>
                </div>
                <div className="order-check-line mt-3 pt-3 border-t border-zinc-200">
                  <span className="text-zinc-400">Статус: в работе · отчёт отправлен в Telegram</span>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={120} direction="right">
              <span className="section-label">Прозрачность</span>
              <h2 className="heading-lg mb-4">
                Проверка <span className="gradient-text">заказа</span>
              </h2>
              <p className="text-zinc-500 mb-6 leading-relaxed">
                После оформления вы получаете статус каждого отзыва: написан, отправлен, опубликован.
                Скриншоты и ссылки — в личном отчёте или Telegram.
              </p>
              <button
                onClick={() => setOrderOpen(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <span>Оформить заказ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 4. PLATFORMS AND PRICES */}
      <PlatformsAndPricesSection onOrder={() => setOrderOpen(true)} />

      {/* 5. STATS RINGS */}
      <section className="py-24 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {stats.map((s, i) => (
              <AnimatedSection key={i} delay={i * 120}>
                <div className="text-center">
                  <StatRing value={s.value} />
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{s.label}</h3>
                  <p className="text-zinc-500 text-sm">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SERVICES / HOW TO ORDER */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="card-bg rounded-xl p-8 mb-12">
              <p className="text-zinc-600 leading-relaxed">
                Оформите заказ через каталог выше или напишите менеджеру в Telegram.
                Укажите ссылку на компанию, площадку и количество отзывов — мы подберём темп и тексты.
                Оплата только за опубликованные отзывы, прошедшие модерацию.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {serviceBlocks.map((s, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="flex gap-5 p-6 card-bg card-bg-hover rounded-xl h-full">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-zinc-200 flex items-center justify-center text-[var(--accent)] shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 mb-2">{s.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DASHBOARD / CASES PREVIEW */}
      <section className="py-24 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection direction="left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cases.map((c, i) => (
                  <div
                    key={i}
                    className="card-bg rounded-xl p-5"
                  >
                    <span className="text-xs text-zinc-500">{c.niche}</span>
                    <h3 className="font-bold text-zinc-900 mt-1 mb-3">{c.title}</h3>
                    <div className="flex gap-3 text-sm mb-3">
                      <div>
                        <p className="text-zinc-500 text-xs">До</p>
                        <p className="font-semibold">{c.before.rating}★</p>
                      </div>
                      <div>
                        <p className="text-[var(--accent)] text-xs">После</p>
                        <p className="font-semibold text-[var(--accent)]">{c.after.rating}★</p>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--accent)] font-medium">{c.result}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={120} direction="right">
              <span className="section-label">Результаты</span>
              <h2 className="heading-lg mb-4">
                Реальные <span className="gradient-text">кейсы</span>
              </h2>
              <p className="text-zinc-500 mb-6 leading-relaxed">
                Более 2 500 компаний подняли рейтинг с нашей помощью.
                Фитнес-клубы, клиники, салоны — работаем с любой нишей.
              </p>
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--accent-hover)] font-semibold"
              >
                Все кейсы
                <ChevronRight className="w-4 h-4" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 8. STATS GRID + BENEFITS */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
            {statsGrid.map((s, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <div className={`stats-grid-block h-full ${i % 3 === 0 ? "stats-grid-block--accent" : ""}`}>
                  <p className="text-xl font-bold mb-1">{s.value}</p>
                  <p className="text-xs opacity-80">{s.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <AnimatedSection key={i} delay={i * 120}>
                <div className="card-bg card-bg-hover rounded-xl p-7 h-full">
                  <div className={`w-14 h-14 rounded-2xl ${b.bg} border ${b.border} flex items-center justify-center ${b.color} mb-5`}>
                    {b.icon}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-2">{b.title}</h3>
                  <p className="text-zinc-500 text-sm">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PROMO BANNER */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="promo-banner grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Чек-лист по безопасной накрутке
                </h2>
                <p className="opacity-90 mb-6 text-sm leading-relaxed">
                  Шаблоны текстов, безопасные темпы по площадкам и советы по прохождению модерации — бесплатно.
                </p>
                <button
                  onClick={() => setChecklistOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 rounded-lg font-semibold text-sm hover:bg-zinc-100 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Скачать бесплатно
                </button>
              </div>
              <div className="hidden lg:flex justify-end">
                <div className="w-48 h-48 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Shield className="w-20 h-20 opacity-60" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 10. FAQ TWO COLUMNS */}
      <section className="py-24 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="section-label">FAQ</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
                Ответы на{" "}
                <span className="gradient-text">часто задаваемые вопросы</span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="faq-two-col">
            {faqs.map((f, i) => (
              <AnimatedSection key={i} delay={i * 60}>
                <div
                  className={`card-bg rounded-xl overflow-hidden transition-all ${
                    openFaq === i ? "border-teal-600" : ""
                  }`}
                >
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="text-zinc-900 font-semibold text-sm pr-4">{f.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[var(--accent)] shrink-0 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div className={`faq-answer ${openFaq === i ? "open" : ""}`}>
                    <div className="px-5 pb-4 text-zinc-500 text-sm leading-relaxed border-t border-zinc-100 pt-3">
                      {f.a}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection delay={200}>
            <div className="text-center mt-10">
              <Link href="/faq" className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold">
                Все вопросы и ответы
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 11. CONTACT FORM */}
      <section className="py-24 border-t border-zinc-200" id="contacts">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="section-label">Контакты</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900">
                Контакты и{" "}
                <span className="gradient-text">обратная связь</span>
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection direction="left">
              <div className="space-y-5">
                {[
                  { icon: <MessageCircle className="w-5 h-5" />, title: "Telegram", value: TELEGRAM_HANDLE, href: TELEGRAM_URL },
                  { icon: <Mail className="w-5 h-5" />, title: "Email", value: EMAIL, href: EMAIL_MAILTO },
                  { icon: <Phone className="w-5 h-5" />, title: "Телефон", value: PHONE_DISPLAY, href: PHONE_TEL },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith("https") ? "_blank" : undefined}
                    rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 card-bg rounded-xl hover:border-zinc-300 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-teal-50 border border-zinc-200 flex items-center justify-center text-[var(--accent)]">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500">{item.title}</p>
                      <p className="font-semibold text-zinc-900">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={120} direction="right">
              {success ? (
                <div className="card-bg rounded-xl p-10 text-center">
                  <CheckCircle className="w-12 h-12 text-[var(--accent)] mx-auto mb-4" />
                  <p className="text-zinc-900 font-semibold">Сообщение отправлено!</p>
                  <p className="text-zinc-500 text-sm mt-2">Ответим в ближайшее время.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="card-bg rounded-xl p-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Ваше имя *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 text-sm outline-none focus:border-teal-600"
                  />
                  <input
                    type="tel"
                    placeholder="Телефон *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 text-sm outline-none focus:border-teal-600"
                  />
                  <textarea
                    placeholder="Сообщение"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 text-sm outline-none focus:border-teal-600 resize-none"
                  />
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3.5"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>{loading ? "Отправка..." : "Отправить"}</span>
                  </button>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="py-20 border-t border-zinc-200">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <AnimatedSection>
            <h2 className="heading-lg mb-5">Готовы поднять рейтинг?</h2>
            <p className="text-lg text-zinc-500 mb-8">
              Выберите услугу в каталоге или оставьте заявку — свяжемся за 5 минут.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setOrderOpen(true)}
                className="btn-primary inline-flex items-center gap-2 px-8 py-3.5"
              >
                <span>Оставить заявку</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-2 px-8 py-3.5"
              >
                <MessageCircle className="w-4 h-4" />
                Telegram
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
