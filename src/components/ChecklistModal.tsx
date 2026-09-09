"use client";

import { useState } from "react";
import { X, CheckCircle, Loader2, Download } from "lucide-react";

interface ChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChecklistModal({ isOpen, onClose }: ChecklistModalProps) {
  const [form, setForm] = useState({ name: "", contact: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.contact) {
      setError("Заполните все поля");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const isEmail = form.contact.includes("@");
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: isEmail ? form.contact : null,
          phone: !isEmail ? form.contact : null,
          type: "checklist",
        }),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", contact: "" });
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
      <div className="modal-content w-full max-w-md bg-white border border-zinc-200 rounded-xl shadow-2xl overflow-hidden">
        <div className="relative p-8 pb-6 border-b border-zinc-200">
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute top-5 right-5 z-10 w-8 h-8 rounded-lg bg-zinc-50 hover:bg-gray-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-[var(--cream)]" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 mb-1">Получить чек-лист бесплатно</h2>
            <p className="text-zinc-500 text-sm">«Как накручивать отзывы и не попасть под блокировку»</p>
          </div>
        </div>

        <div className="p-8">
          {success ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Чек-лист отправлен!</h3>
              <p className="text-zinc-500 text-sm mb-6">
                Мы пришлём вам чек-лист в течение нескольких минут. Проверьте почту или мессенджер.
              </p>
              <button onClick={onClose} className="btn-gold px-8 py-3 text-sm">
                Закрыть
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Иван"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-all text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">
                  Email или Телефон
                </label>
                <input
                  type="text"
                  placeholder="ivan@mail.ru или +7..."
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900 placeholder-gray-400 focus:outline-none focus:border-[var(--accent)] transition-all text-sm"
                  required
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
                className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                <span>{loading ? "Отправляем..." : "Скачать чек-лист"}</span>
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
