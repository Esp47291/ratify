"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import OrderModal from "@/components/OrderModal";

const faqs = [
  {
    category: "Общие вопросы",
    questions: [
      {
        q: "Накрутка отзывов — это законно?",
        a: "Да. Мы работаем с публичными данными и не нарушаем законодательство. Отзывы оставляют реальные люди с реальных аккаунтов. Это маркетинговый инструмент, аналогичный другим методам продвижения.",
      },
      {
        q: "Не забанят ли мою компанию на картах?",
        a: "Нет, если отзывы естественные. Мы всегда следим за темпами накрутки и имитируем органический рост, чтобы не вызвать подозрений у модерации. За годы работы не было ни одного случая блокировки по нашей вине.",
      },
      {
        q: "Какие площадки вы обслуживаете?",
        a: "Мы работаем с Яндекс.Картами, Google Картами, 2ГИС, Zoon, Авито и многими другими площадками. Для нестандартных запросов уточняйте у менеджера.",
      },
    ],
  },
  {
    category: "Цены и оплата",
    questions: [
      {
        q: "Сколько стоит накрутка отзывов?",
        a: "На Яндекс.Картах тарифы: Старт от 450 ₽, Бизнес от 400 ₽, Премиум от 350 ₽ за отзыв. 2ГИС — от 120 ₽, Google и Zoon — от 150 ₽, Авито — от 1300 ₽. Точную стоимость уточняйте у менеджера.",
      },
      {
        q: "Как происходит оплата?",
        a: "Мы работаем по предоплате 50% — после согласования деталей. Оставшиеся 50% оплачиваются после публикации отзывов. Принимаем банковские переводы, карты и криптовалюту.",
      },
      {
        q: "Есть ли скидки для крупных заказов?",
        a: "Да! При заказе от 50 отзывов — скидка 5%, от 100 отзывов — 10%, от 200 отзывов — индивидуальные условия. Обращайтесь к менеджеру для расчёта.",
      },
    ],
  },
  {
    category: "Процесс и сроки",
    questions: [
      {
        q: "Сколько времени занимает накрутка?",
        a: "В среднем 3–7 дней. Зависит от объёма и площадки. Модерация на некоторых площадках может занять до 24 часов. Крупные заказы (50+ отзывов) выполняются 7–14 дней.",
      },
      {
        q: "Как я узнаю, что отзывы опубликованы?",
        a: "Мы предоставляем скриншоты и ссылки на каждый опубликованный отзыв в виде подробного отчёта. Вы видите каждый отзыв и можете лично проверить его публикацию.",
      },
      {
        q: "Что нужно предоставить для заказа?",
        a: "Ссылку на вашу компанию на картах, желаемое количество отзывов, тон (положительный/нейтральный), и любую информацию о компании, которая поможет сделать отзывы более натуральными.",
      },
    ],
  },
  {
    category: "Гарантии и безопасность",
    questions: [
      {
        q: "Можно ли заказать отрицательные отзывы на конкурентов?",
        a: "Нет. Мы работаем только на улучшение репутации наших клиентов. Этические принципы — на первом месте. Мы категорически отказываемся от заказов, направленных на вред конкурентам.",
      },
      {
        q: "Вы даёте гарантию на публикацию?",
        a: "Да. Мы гарантируем публикацию отзывов или возврат денег за неопубликованные. Вы платите только за результат.",
      },
      {
        q: "Насколько анонимна наша работа?",
        a: "Полностью анонимна. Мы подписываем NDA по запросу клиента, не разглашаем данные о наших клиентах третьим лицам и никогда не упоминаем заказчика в публичных материалах.",
      },
    ],
  },
];

export default function FaqPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <main className="pt-28 pb-24">
      <OrderModal isOpen={orderOpen} onClose={() => setOrderOpen(false)} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="section-label">
              FAQ
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 mb-5">
              Часто задаваемые{" "}
              <span className="gradient-text">вопросы</span>
            </h1>
            <p className="text-zinc-500 max-w-xl mx-auto">
              Всё, что вам нужно знать о накрутке отзывов с ratify
            </p>
          </div>
        </AnimatedSection>

        <div className="space-y-10 mb-16">
          {faqs.map((cat, ci) => (
            <AnimatedSection key={ci} delay={ci * 100}>
              <div>
                <h2 className="text-lg font-bold text-teal-700 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-teal-50 flex items-center justify-center text-sm">
                    {ci + 1}
                  </span>
                  {cat.category}
                </h2>
                <div className="space-y-3">
                  {cat.questions.map((faq, qi) => {
                    const key = `${ci}-${qi}`;
                    return (
                      <div
                        key={key}
                        className={`card-bg rounded-2xl overflow-hidden transition-all duration-300 ${
                          openFaq === key ? "border-teal-600" : ""
                        }`}
                      >
                        <button
                          className="w-full flex items-center justify-between px-6 py-5 text-left"
                          onClick={() => setOpenFaq(openFaq === key ? null : key)}
                        >
                          <span className="text-zinc-900 font-semibold pr-4">{faq.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-teal-700 flex-shrink-0 transition-transform duration-300 ${
                              openFaq === key ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div className={`faq-answer ${openFaq === key ? "open" : ""}`}>
                          <div className="px-6 pb-5 text-zinc-500 text-sm leading-relaxed border-t border-zinc-100 pt-4">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={300}>
          <div className="text-center card-bg rounded-xl p-10">
            <MessageCircle className="w-12 h-12 text-teal-700 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">Не нашли ответ?</h2>
            <p className="text-zinc-500 mb-8">Задайте вопрос напрямую — ответим за 5 минут</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setOrderOpen(true)}
                className="btn-primary inline-flex items-center gap-2 px-8 py-4"
              >
                <span>Задать вопрос</span>
                <ArrowRight className="w-4 h-4 relative z-10" />
              </button>
              <a
                href="https://t.me/Manager_Seo_Smm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-xl border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-teal-700" />
                Telegram
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}
