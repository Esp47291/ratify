"use client";

import { useMemo, useState } from "react";
import {
  bayesianDisplayRating,
  projectRating,
  reviewsNeededArithmetic,
  reviewsNeededWithRecency,
  stabilityHint,
  type MapPlatform,
} from "@/lib/rating-math";

const platforms: { id: MapPlatform; label: string }[] = [
  { id: "yandex", label: "Яндекс.Карты" },
  { id: "google", label: "Google Карты" },
  { id: "2gis", label: "2ГИС" },
];

export default function RatingCalculator() {
  const [platform, setPlatform] = useState<MapPlatform>("yandex");
  const [currentRating, setCurrentRating] = useState(4.2);
  const [currentCount, setCurrentCount] = useState(28);
  const [targetRating, setTargetRating] = useState(4.7);
  const [recency, setRecency] = useState(35);
  const [newStar, setNewStar] = useState(5);

  const result = useMemo(() => {
    const arith = reviewsNeededArithmetic(currentRating, currentCount, targetRating, newStar);
    const rec = reviewsNeededWithRecency(currentRating, currentCount, targetRating, recency, newStar);
    const add = Number.isFinite(rec) ? rec : 0;
    const projected = projectRating({
      currentRating,
      currentCount,
      addCount: add,
      recencyPercent: recency,
      newStar,
    });
    return { arith, rec, projected };
  }, [currentRating, currentCount, targetRating, recency, newStar]);

  const bayesNow = bayesianDisplayRating(currentRating, currentCount);
  const hint = stabilityHint(platform, currentCount);
  const impossible = targetRating >= newStar;
  const alreadyThere = targetRating <= currentRating;

  return (
    <div className="card-bg rounded-xl p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="text-xl font-bold text-zinc-900 mb-1">Калькулятор рейтинга</h3>
        <p className="text-zinc-500 text-sm">
          Оценка, а не точная формула карт. Учитываем, что свежие отзывы тянут рейтинг сильнее старых.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {platforms.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPlatform(p.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              platform === p.id
                ? "bg-[var(--accent)] text-white"
                : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">
            Текущий рейтинг
          </span>
          <input
            type="number"
            min={1}
            max={5}
            step={0.1}
            value={currentRating}
            onChange={(e) => setCurrentRating(Number(e.target.value))}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">
            Сколько отзывов сейчас
          </span>
          <input
            type="number"
            min={0}
            step={1}
            value={currentCount}
            onChange={(e) => setCurrentCount(Number(e.target.value))}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">
            Целевой рейтинг
          </span>
          <input
            type="number"
            min={1}
            max={5}
            step={0.1}
            value={targetRating}
            onChange={(e) => setTargetRating(Number(e.target.value))}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
          />
        </label>
        <label className="block">
          <span className="block text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">
            Оценка новых отзывов
          </span>
          <select
            value={newStar}
            onChange={(e) => setNewStar(Number(e.target.value))}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-zinc-900"
          >
            <option value={5}>5 ★</option>
            <option value={4}>4 ★</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="flex justify-between text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">
          <span>Насколько свежие текущие отзывы</span>
          <span className="tabular-nums text-zinc-900">{recency}%</span>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={recency}
          onChange={(e) => setRecency(Number(e.target.value))}
          className="w-full accent-[var(--accent)]"
        />
        <span className="flex justify-between text-xs text-zinc-400 mt-1">
          <span>В основном старые — новые сильнее двигают рейтинг</span>
          <span>В основном свежие</span>
        </span>
      </label>

      <div className="rounded-xl bg-teal-50 border border-zinc-200 p-5 space-y-3">
        {alreadyThere ? (
          <p className="text-zinc-900 font-semibold">Цель уже не выше текущего рейтинга — новые отзывы не нужны для этой цифры.</p>
        ) : impossible ? (
          <p className="text-zinc-900 font-semibold">Целевой балл нельзя обогнать оценками ниже или равными цели. Нужны более высокие звёзды.</p>
        ) : (
          <>
            <p className="text-zinc-900 text-lg font-bold">
              С учётом актуальности: ≈ {result.rec} отзывов на {newStar}★
            </p>
            <p className="text-zinc-600 text-sm">
              Если считать простое среднее (все отзывы равны): ≈ {result.arith} шт.
              {result.rec < result.arith
                ? " У вас относительно старая база — свежие оценки «весят» больше, поэтому отзывов нужно меньше."
                : " Текущие отзывы уже свежие, разница со средним меньше."}
            </p>
            <p className="text-zinc-600 text-sm">
              Прогноз после пакета: {result.projected.withRecency}★ с учётом свежести
              {" "}(простое среднее дало бы {result.projected.arithmetic}★).
            </p>
          </>
        )}
        {platform === "google" && (
          <p className="text-zinc-500 text-sm">
            У Google при малом числе отзывов отображаемый балл часто ближе к общему среднему.
            Сглаженная оценка сейчас ≈ {bayesNow.toFixed(1)}★.
          </p>
        )}
        <p className="text-zinc-600 text-sm leading-relaxed">{hint}</p>
      </div>
    </div>
  );
}
