import Link from "next/link";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { EMAIL, EMAIL_MAILTO, PHONE_DISPLAY, PHONE_TEL, TELEGRAM_HANDLE, TELEGRAM_URL } from "@/lib/contacts";
import { services } from "@/lib/services-data";

const company = [
  { name: "О нас", href: "/about" },
  { name: "Цены", href: "/prices" },
  { name: "Калькулятор", href: "/calculator" },
  { name: "Гарантии", href: "/guarantees" },
  { name: "FAQ", href: "/faq" },
  { name: "Контакты", href: "/contacts" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-zinc-400 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-baseline gap-1.5 mb-4">
              <span className="text-white font-bold text-lg tracking-tight">ratify</span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500 mb-6 max-w-xs">
              Интернет-маркетинг: Яндекс.Директ, SEO, аудит сайта и ведение карточек на картах. Работаем честными
              методами и показываем цифры.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Услуги</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-sm hover:text-white transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Компания</h4>
            <ul className="space-y-2.5">
              {company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-widest mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a href={EMAIL_MAILTO} className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-zinc-600" />
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={PHONE_TEL} className="flex items-center gap-2.5 text-sm hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-zinc-600" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-zinc-600" />
                  {TELEGRAM_HANDLE}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">© ratify, 2026</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs hover:text-white transition-colors">
              Конфиденциальность
            </Link>
            <Link href="/offer" className="text-xs hover:text-white transition-colors">
              Оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
