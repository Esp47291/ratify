"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Gift, Loader2, CheckCircle } from "lucide-react";
import { formatPhoneMask, isCompletePhone, normalizePhoneDigits } from "@/lib/phone";

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleMouseLeave = useCallback(
    (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        setIsOpen(true);
        setShown(true);
      }
    },
    [shown]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handlePhoneChange = (value: string) => {
    setForm({ ...form, phone: formatPhoneMask(value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setError("Пожалуйста, заполните обязательные поля");
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
          type: "exit_intent",
          message: "Exit intent - 3 отзыва в подарок",
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", phone: "" });
      } else {
        setError("Произошла ошибка. Попробуйте ещё раз.");
      }
    } catch {
      setError("Произошла ошибка. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-start justify-center pt-8 p-4"
      style={{ background: "rgba(27,42,74,0.75)", backdropFilter: "blur(8px)" }}
    >
      <div className="exit-modal w-full max-w-lg bg-white border border-zinc-200 rounded-xl shadow-xl shadow-zinc-900/8 overflow-hidden">
        <div className="relative">
          <div className="bg-[var(--ink)] p-6 text-center">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-3">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <p className="text-white/90 text-sm font-medium mb-1">Постойте! Специальное предложение:</p>
              <h2 className="text-white text-2xl font-bold">3 отзыва в ПОДАРОК</h2>
              <p className="text-white/90 text-sm mt-2">при первом заказе</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8">
          {success ? (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Заявка принята!</h3>
              <p className="text-zinc-500 text-sm mb-6">Мы свяжемся с вами в течение 5 минут.</p>
              <button onClick={() => setIsOpen(false)} className="btn-primary px-8 py-3 text-sm">
                <span>Закрыть</span>
              </button>
            </div>
          ) : (
            <>
              <p className="text-zinc-600 text-center mb-6 text-sm">
                Оставьте заявку прямо сейчас и получите{" "}
                <span className="text-teal-700 font-bold">3 бесплатных отзыва</span> при первом заказе
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-all text-sm"
                  required
                />
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={form.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onFocus={() => {
                    if (!form.phone) setForm({ ...form, phone: "+7 (" });
                  }}
                  onBlur={() => {
                    if (form.phone === "+7" || form.phone === "+7 (" || form.phone === "+7 ()") {
                      setForm({ ...form, phone: "" });
                    }
                  }}
                  maxLength={18}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-all text-sm"
                  required
                />
                {error && (
                  <p className="text-red-600 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  <span>{loading ? "Отправляем..." : "Получить 3 отзыва бесплатно"}</span>
                </button>
              </form>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-zinc-500 text-xs mt-4 hover:text-zinc-600 transition-colors"
              >
                Нет, спасибо — уйду без подарка
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
