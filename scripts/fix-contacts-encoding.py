from pathlib import Path

TARGET = Path(__file__).resolve().parents[1] / "src" / "app" / "contacts" / "page.tsx"

CONTENT = r'''"use client";

import { useState } from "react";
import { Mail, Phone, MessageCircle, Send, CheckCircle, Loader2, Clock } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

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
              Ответим в течение 5 минут в рабочее время. В выходные — в течение часа.
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
                  value: "@Manager_Seo_Smm",
                  href: "https://t.me/Manager_Seo_Smm",
                  desc: "Самый быстрый способ — ответим за 5 минут",
                  color: "text-teal-700",
                  bg: "bg-teal-50",
                  border: "border-zinc-200",
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: "Телефон",
                  value: "8 (800) 123-45-67",
                  href: "tel:+78001234567",
                  desc: "Бесплатно по России. Пн–Пт 9:00–19:00",
                  color: "text-emerald-600",
                  bg: "bg-emerald-500/10",
                  border: "border-emerald-500/20",
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Email",
                  value: "info@a2smm.ru",
                  href: "mailto:info@a2smm.ru",
                  desc: "Ответ в течение 2 часов в рабочее время",
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

              <div className="p-6 card-bg rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <h3 className="text-zinc-900 font-bold">Время работы</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Понедельник – Пятница</span>
                    <span className="text-zinc-900 font-semibold">9:00 – 20:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Суббота</span>
                    <span className="text-zinc-900 font-semibold">10:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Воскресенье</span>
                    <span className="text-zinc-500">Выходной</span>
                  </div>
                </div>
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
                  <p className="text-zinc-500">Мы свяжемся с вами в течение 5 минут.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Имя *</label>
                      <input type="text" placeholder="Иван" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all text-sm" required />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Телефон *</label>
                      <input type="tel" placeholder="+7..." value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all text-sm" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Email</label>
                    <input type="email" placeholder="ivan@mail.ru" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Сообщение</label>
                    <textarea rows={5} placeholder="Расскажите о вашем проекте..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-all text-sm resize-none" />
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
'''

TARGET.write_bytes(CONTENT.encode("utf-8"))
TARGET.read_bytes().decode("utf-8")
print(f"Fixed: {TARGET}")
