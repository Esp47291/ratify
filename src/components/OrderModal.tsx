"use client";

import { useState } from "react";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { formatPhoneMask, isCompletePhone, normalizePhoneDigits } from "@/lib/phone";
import { normalizeCompanyUrl } from "@/lib/url";
import { services } from "@/lib/services-data";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Название услуги, выбранной по умолчанию */
  defaultService?: string;
}

const inputClass =
  "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] focus:bg-zinc-100 transition-all text-sm";
const labelClass = "block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide";

export default function OrderModal({ isOpen, onClose, defaultService = "" }: OrderModalProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    companyUrl: "",
    service: defaultService,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

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
          companyUrl: normalizeCompanyUrl(form.companyUrl),
          phone: `+${normalizePhoneDigits(form.phone)}`,
          type: "order",
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", phone: "", email: "", companyUrl: "", service: defaultService, message: "" });
      } else {
        setError("Произошла ошибка. Попробуйте ещё раз.");
      }
    } catch {
      setError("Произошла ошибка. Попробуйте ещё раз.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay"
      style={{ background: "rgba(27,42,74,0.45)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white border border-zinc-200 rounded-xl shadow-xl shadow-zinc-900/8">
        <div className="px-8 pt-8 pb-6 border-b border-zinc-200 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Оставить заявку</h2>
            <p className="text-zinc-500 text-sm mt-1">Свяжемся, уточним задачу и предложим решение</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="w-8 h-8 rounded-md bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8">
          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">Заявка принята!</h3>
              <p className="text-zinc-500 mb-8">Мы свяжемся с вами в ближайшее время.</p>
              <button onClick={onClose} className="btn-primary px-8 py-3">
                <span>Закрыть</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Ваше имя *</label>
                  <input
                    type="text"
                    placeholder="Иван Иванов"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Телефон *</label>
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
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  placeholder="ivan@company.ru"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Что вас интересует</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Пока не знаю, нужна консультация</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Сайт или карточка компании</label>
                <input
                  type="text"
                  inputMode="url"
                  placeholder="example.com"
                  value={form.companyUrl}
                  onChange={(e) => setForm({ ...form, companyUrl: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Комментарий</label>
                <textarea
                  rows={3}
                  placeholder="Коротко опишите задачу"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={inputClass}
                />
              </div>

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
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                <span>{loading ? "Отправляем..." : "Отправить заявку"}</span>
              </button>

              <p className="text-center text-xs text-zinc-500">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="/privacy" className="text-[var(--accent)] hover:underline">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
