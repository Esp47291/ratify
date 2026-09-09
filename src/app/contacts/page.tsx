"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Send, CheckCircle, Loader2, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import {
  EMAIL,
  EMAIL_MAILTO,
  HOURS_TEXT,
  HOURS_TITLE,
  MAX_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  TELEGRAM_HANDLE,
  TELEGRAM_URL,
  VK_URL,
  WHATSAPP_URL,
} from "@/lib/contacts";

export default function ContactsPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError("Заполните обязательные поля");
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
        setForm({ name: "", phone: "", email: "", message: "" });
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
    <main className="pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="section-label">Контакты</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">
              Свяжитесь с <span className="gradient-text">нами</span>
            </h1>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Работаем круглосуточно. Ответим в мессенджере в любое время суток — день и ночь.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedSection direction="left">
            <div className="space-y-6">
              {[
                {
                  icon: <MessageCircle className="w-6 h-6" />,
                  title: "Telegram",
                  value: TELEGRAM_HANDLE,
                  href: TELEGRAM_URL,
                  desc: "Быстрый чат — пишите в любое время",
                  color: "text-teal-700",
                  bg: "bg-teal-50",
                  border: "border-zinc-200",
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: "Телефон",
                  value: PHONE_DISPLAY,
                  href: PHONE_TEL,
                  desc: "Звонок, WhatsApp, Max и VK — один номер",
                  color: "text-emerald-600",
                  bg: "bg-emerald-500/10",
                  border: "border-emerald-500/20",
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Email",
                  value: EMAIL,
                  href: EMAIL_MAILTO,
                  desc: "Для договоров, счетов и переписки с юрлицами",
                  color: "text-blue-600",
                  bg: "bg-blue-500/10",
                  border: "border-blue-500/20",
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("https") ? "_blank" : undefined}
                  rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                  className="flex gap-5 p-6 card-bg rounded-2xl hover:border-zinc-200 transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} border ${item.border} flex items-center justify-center ${item.color} flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-zinc-500 text-sm mb-1">{item.title}</p>
                    <p className="text-zinc-900 font-bold text-lg mb-1">{item.value}</p>
                    <p className="text-zinc-500 text-sm">{item.desc}</p>
                  </div>
                </a>
              ))}

              <div className="grid grid-cols-3 gap-3">
                {[
                  { href: WHATSAPP_URL, src: null, label: "WhatsApp", bg: "bg-[#25D366]" },
                  { href: MAX_URL, src: "/icons/max.png", label: "Max", bg: "bg-white" },
                  { href: VK_URL, src: "/icons/vk.png", label: "VK", bg: "bg-white" },
                ].map((m) => (
                  <a
                    key={m.label}
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 card-bg rounded-xl hover:border-zinc-300 transition-colors"
                  >
                    {m.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.src} alt={m.label} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <span className={`w-10 h-10 rounded-full ${m.bg} flex items-center justify-center text-white text-xs font-bold`}>
                        WA
                      </span>
                    )}
                    <span className="text-xs font-semibold text-zinc-700">{m.label}</span>
                  </a>
                ))}
              </div>

              <div className="p-6 card-bg rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-[var(--accent)]" />
                  <h3 className="text-zinc-900 font-bold">Время работы</h3>
                </div>
                <p className="text-zinc-900 font-semibold mb-2">{HOURS_TITLE}</p>
                <p className="text-sm text-zinc-500 leading-relaxed">{HOURS_TEXT}</p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="card-bg rounded-xl p-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6">Напишите нам</h2>
              {success ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-5" />
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3">Сообщение отправлено!</h3>
                  <p className="text-zinc-500">Свяжемся в ближайшее время — мы на связи 24/7.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Имя *</label>
                      <input type="text" placeholder="Иван" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-all text-sm" required />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Телефон *</label>
                      <input type="tel" placeholder={PHONE_DISPLAY} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-all text-sm" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Email</label>
                    <input type="email" placeholder={EMAIL} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Сообщение</label>
                    <textarea rows={5} placeholder="Расскажите о вашем проекте..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-all text-sm resize-none" />
                  </div>
                  {error && <p className="text-red-600 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>}
                  <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 relative z-10" />}
                    <span>{loading ? "Отправляем..." : "Отправить сообщение"}</span>
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </main>
  );
}
