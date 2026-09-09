"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import {
  MAX_URL,
  TELEGRAM_URL,
  VK_URL,
  WHATSAPP_URL,
} from "@/lib/contacts";

const links = [
  {
    label: "Написать в чат",
    href: TELEGRAM_URL,
    bg: "bg-[var(--accent)] hover:bg-[var(--accent-hover)]",
    icon: <MessageCircle className="w-6 h-6 text-white" strokeWidth={2} />,
  },
  {
    label: "WhatsApp",
    href: WHATSAPP_URL,
    bg: "bg-[#25D366] hover:bg-[#20bd5a]",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Max",
    href: MAX_URL,
    bg: "bg-transparent",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/icons/max.png" alt="" className="w-full h-full object-cover" />
    ),
  },
  {
    label: "VK",
    href: VK_URL,
    bg: "bg-transparent",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/icons/vk.png" alt="" className="w-full h-full object-cover" />
    ),
  },
  {
    label: "Telegram",
    href: TELEGRAM_URL,
    bg: "bg-[#2AABEE] hover:bg-[#2299d5]",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
];

export default function SocialFloatingWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed z-50 right-4 sm:right-5 md:right-6 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] md:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="relative flex flex-col items-center">
        <div
          className={`flex flex-col items-center gap-2 sm:gap-2.5 md:gap-3 mb-2 sm:mb-2.5 md:mb-3 transition-all duration-500 ease-out origin-bottom ${
            open
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              aria-hidden={!open}
              tabIndex={open ? 0 : -1}
              className={`w-12 h-12 sm:w-[3.25rem] sm:h-[3.25rem] md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg overflow-hidden transition-all duration-300 ${link.bg}`}
              style={{
                transitionDelay: open ? `${(links.length - 1 - i) * 60}ms` : "0ms",
                transform: open ? "scale(1)" : "scale(0.5)",
                opacity: open ? 1 : 0,
              }}
            >
              {link.icon}
            </a>
          ))}
        </div>

        <div className="relative">
          <div
            className={`absolute right-full top-1/2 -translate-y-1/2 mr-3 transition-all duration-300 ease-out hidden lg:block ${
              open ? "opacity-0 translate-x-2 pointer-events-none" : "opacity-100 translate-x-0"
            }`}
          >
            <div className="relative bg-[var(--ink)] text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-lg whitespace-nowrap social-tooltip">
              Напишите нам!
              <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-[var(--ink)]" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Закрыть меню" : "Связаться с нами"}
            aria-expanded={open}
            className={`relative w-14 h-14 sm:w-[3.75rem] sm:h-[3.75rem] md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl shrink-0 transition-all duration-300 ease-out border-2 border-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--surface-muted)] active:scale-95 ${
              open ? "scale-100 rotate-0" : "md:hover:scale-105"
            }`}
          >
            <span
              className={`absolute transition-all duration-300 ease-out ${
                open ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
              }`}
            >
              <X className="w-6 h-6 sm:w-[1.625rem] sm:h-[1.625rem] md:w-7 md:h-7 text-[var(--ink)]" strokeWidth={2} />
            </span>
            <span
              className={`absolute transition-all duration-300 ease-out ${
                open ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
              }`}
            >
              <MessageCircle className="w-6 h-6 sm:w-[1.625rem] sm:h-[1.625rem] md:w-7 md:h-7 text-[var(--ink)]" strokeWidth={2} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
