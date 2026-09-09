"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { TELEGRAM_URL } from "@/lib/contacts";

const services = [
  { name: "Яндекс.Карты", href: "/services/yandex", price: "от 350 ₽" },
  { name: "Google Карты", href: "/services/google", price: "от 150 ₽" },
  { name: "2ГИС", href: "/services/2gis", price: "от 120 ₽" },
  { name: "Zoon", href: "/services/zoon", price: "от 150 ₽" },
  { name: "Авито", href: "/services/avito", price: "от 1300 ₽" },
  { name: "Ежемесячная поддержка — Яндекс.Бизнес", href: "/services/yandex-business", price: "от 9 900 ₽/мес" },
  { name: "Настройка Яндекс.Директа", href: "/services/yandex-direct", price: "Индивидуально" },
  { name: "Другие площадки", href: "/services/other", price: "Индивидуально" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const onDarkHero = pathname === "/" && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-[var(--surface-warm)]/90 backdrop-blur-md border-b border-zinc-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-baseline gap-1.5 group">
            <span className={`font-bold text-lg tracking-tight transition-colors ${onDarkHero ? "text-white" : "text-zinc-900"}`}>ratify</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            <div className="dropdown-trigger relative group">
              <button className={`flex items-center gap-1 px-3.5 py-2 rounded-md transition-colors text-sm font-medium ${
                onDarkHero
                  ? "text-white/80 hover:text-white hover:bg-white/10"
                  : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
              }`}>
                Услуги
                <ChevronDown className="w-3.5 h-3.5 opacity-50" />
              </button>
              <div className="dropdown-menu absolute top-full left-0 mt-1 w-60 bg-white border border-zinc-200 rounded-lg shadow-lg shadow-zinc-900/5 overflow-hidden py-1">
                {services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-50 transition-colors group/item"
                  >
                    <span className="text-zinc-700 group-hover/item:text-zinc-900 text-sm">{s.name}</span>
                    <span className="text-zinc-400 text-xs tabular-nums">{s.price}</span>
                  </Link>
                ))}
              </div>
            </div>

            {[
              { name: "Цены", href: "/prices" },
              { name: "Калькулятор", href: "/calculator" },
              { name: "Гарантии", href: "/guarantees" },
              { name: "Кейсы", href: "/cases" },
              { name: "О нас", href: "/about" },
              { name: "Контакты", href: "/contacts" },
              { name: "FAQ", href: "/faq" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-md transition-colors text-sm font-medium ${
                  onDarkHero
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--accent)] text-white rounded-md text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
            >
              Telegram
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            className={`lg:hidden p-2 rounded-md transition-colors ${
              onDarkHero
                ? "text-white/80 hover:text-white hover:bg-white/10"
                : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-zinc-200">
          <div className="px-5 py-4 space-y-1">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 text-zinc-700 rounded-md hover:bg-zinc-50"
            >
              <span className="text-sm font-medium">Услуги</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            {servicesOpen && (
              <div className="pl-3 space-y-0.5 pb-2">
                {services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="flex items-center justify-between px-3 py-2 text-zinc-500 hover:text-zinc-900 rounded-md hover:bg-zinc-50 text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{s.name}</span>
                    <span className="text-zinc-400 text-xs">{s.price}</span>
                  </Link>
                ))}
              </div>
            )}

            {[
              { name: "Цены", href: "/prices" },
              { name: "Калькулятор", href: "/calculator" },
              { name: "Гарантии", href: "/guarantees" },
              { name: "Кейсы", href: "/cases" },
              { name: "О нас", href: "/about" },
              { name: "Контакты", href: "/contacts" },
              { name: "FAQ", href: "/faq" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2.5 text-zinc-700 hover:bg-zinc-50 rounded-md text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 w-full mt-3 px-4 py-2.5 bg-[var(--accent)] text-white rounded-md text-sm font-medium"
            >
              Telegram
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
