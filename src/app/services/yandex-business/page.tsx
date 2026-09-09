"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import OrderModal from "@/components/OrderModal";

export default function YandexBusinessPage() {
  const [orderOpen, setOrderOpen] = useState(false);
  return (
    <main className="pt-28 pb-24">
      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <div className="mb-6">
              <img src="/icons/yandex-maps.svg" alt="Яндекс.Бизнес" className="w-16 h-16 mx-auto object-contain" />
            </div>
            <h1 className="text-4xl font-bold text-zinc-900 mb-4">Ежемесячная поддержка — Яндекс.Бизнес</h1>
            <p className="text-zinc-500">Пакет ежемесячной поддержки: мониторинг, ответы на отзывы, публикации и рост репутации в локальной выдаче.</p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="left">
          <div className="card-bg rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">Что входит</h3>
            <ul className="list-disc list-inside space-y-2 text-zinc-600">
              <li>Мониторинг новых отзывов и уведомления</li>
              <li>Ответы и работа с негативом</li>
              <li>Регулярные публикации и обновления карточки</li>
              <li>Отчётность и рекомендации для роста</li>
            </ul>
            <div className="mt-6">
              <button onClick={() => setOrderOpen(true)} className="btn-primary">Оставить заявку на тариф</button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
