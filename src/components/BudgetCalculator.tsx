"use client";

import { useMemo, useState } from "react";
import { calcBudget } from "@/lib/budget-math";

interface BudgetCalculatorProps {
  onDiscuss?: () => void;
}

const fields = [
  { key: "budget", label: "Рекламный бюджет, ₽", hint: "Сколько вы готовы тратить в месяц" },
  { key: "cpc", label: "Цена клика, ₽", hint: "Средняя стоимость одного перехода на сайт" },
  { key: "conversionPct", label: "Конверсия сайта, %", hint: "Какая доля посетителей оставляет заявку" },
  { key: "closePct", label: "Заявки в продажи, %", hint: "Какая доля заявок заканчивается покупкой" },
  { key: "avgCheck", label: "Средний чек, ₽", hint: "Сколько приносит одна продажа" },
] as const;

type FieldKey = (typeof fields)[number]["key"];

// Значения ниже — только пример для наглядности, подставьте свои.
const initial: Record<FieldKey, string> = {
  budget: "50000",
  cpc: "40",
  conversionPct: "3",
  closePct: "20",
  avgCheck: "15000",
};

function fmt(n: number, digits = 0): string {
  return n.toLocaleString("ru-RU", { maximumFractionDigits: digits });
}

export default function BudgetCalculator({ onDiscuss }: BudgetCalculatorProps) {
  const [values, setValues] = useState<Record<FieldKey, string>>(initial);

  const result = useMemo(
    () =>
      calcBudget({
        budget: Number(values.budget),
        cpc: Number(values.cpc),
        conversionPct: Number(values.conversionPct),
        closePct: Number(values.closePct),
        avgCheck: Number(values.avgCheck),
      }),
    [values]
  );

  const tiles = [
    { label: "Кликов", value: fmt(result.clicks) },
    { label: "Заявок", value: fmt(result.leads, 1) },
    { label: "Цена заявки", value: result.costPerLead === null ? "—" : `${fmt(result.costPerLead)} ₽` },
    { label: "Продаж", value: fmt(result.sales, 1) },
    { label: "Выручка", value: `${fmt(result.revenue)} ₽` },
    {
      label: "Выручка к бюджету",
      value: result.returnPct === null ? "—" : `${result.returnPct > 0 ? "+" : ""}${fmt(result.returnPct)}%`,
    },
  ];

  return (
    <div className="card-bg rounded-2xl p-6 sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {fields.map((f) => (
          <div key={f.key}>
            <label
              htmlFor={`calc-${f.key}`}
              className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide"
            >
              {f.label}
            </label>
            <input
              id={`calc-${f.key}`}
              type="number"
              inputMode="decimal"
              min="0"
              value={values[f.key]}
              onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
              className="input-field"
            />
            <p className="text-xs text-zinc-400 mt-1.5">{f.hint}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {tiles.map((t) => (
          <div key={t.label} className="stats-grid-block">
            <div className="text-xl font-bold text-zinc-900 tabular-nums">{t.value}</div>
            <div className="text-xs text-zinc-500 mt-1">{t.label}</div>
          </div>
        ))}
      </div>

      <p className="text-xs text-zinc-400 leading-relaxed mb-6">
        Расчёт — простая арифметика по введённым вами числам. Значения по умолчанию — только пример. Это не
        прогноз и не обещание результата: реальные показатели зависят от ниши, сайта и конкуренции.
      </p>

      {onDiscuss && (
        <button type="button" onClick={onDiscuss} className="btn-primary">
          <span>Обсудить расчёт</span>
        </button>
      )}
    </div>
  );
}
