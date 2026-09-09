export type MapPlatform = "yandex" | "google" | "2gis";

export function reviewsNeededArithmetic(
  currentRating: number,
  currentCount: number,
  targetRating: number,
  newStar = 5
): number {
  if (currentCount < 0 || targetRating <= currentRating) return 0;
  if (newStar <= targetRating) return Infinity;
  const x = (currentCount * (targetRating - currentRating)) / (newStar - targetRating);
  return Math.max(0, Math.ceil(x));
}

/**
 * Модель с актуальностью: старые отзывы слабее свежих.
 * recencyPercent 0 — текущие отзывы в основном старые (слабый вес),
 * 100 — текущие свежие (вес ближе к обычному среднему).
 * Новые отзывы всегда с коэффициентом свежести > 1.
 */
export function reviewsNeededWithRecency(
  currentRating: number,
  currentCount: number,
  targetRating: number,
  recencyPercent: number,
  newStar = 5
): number {
  if (currentCount < 0 || targetRating <= currentRating) return 0;
  const wOld = 0.22 + 0.78 * clamp(recencyPercent / 100, 0, 1);
  const wNew = 1.45;
  if (newStar <= targetRating) return Infinity;
  const x =
    (currentCount * wOld * (targetRating - currentRating)) /
    (wNew * (newStar - targetRating));
  return Math.max(0, Math.ceil(x));
}

/** Google-подобное байесовское сглаживание: мало отзывов «притягивает» к ~4.0 */
export function bayesianDisplayRating(rating: number, count: number, priorCount = 8, priorRating = 4): number {
  if (count <= 0) return priorRating;
  return (rating * count + priorRating * priorCount) / (count + priorCount);
}

export function projectRating(opts: {
  currentRating: number;
  currentCount: number;
  addCount: number;
  recencyPercent: number;
  newStar?: number;
}): { arithmetic: number; withRecency: number } {
  const star = opts.newStar ?? 5;
  const { currentRating: r, currentCount: n, addCount: x, recencyPercent } = opts;
  const arith = n + x <= 0 ? r : (r * n + star * x) / (n + x);
  const wOld = 0.22 + 0.78 * clamp(recencyPercent / 100, 0, 1);
  const wNew = 1.45;
  const denom = n * wOld + x * wNew;
  const rec = denom <= 0 ? r : (r * n * wOld + star * x * wNew) / denom;
  return {
    arithmetic: round1(arith),
    withRecency: round1(rec),
  };
}

export function stabilityHint(platform: MapPlatform, count: number): string {
  if (platform === "yandex") {
    if (count < 5) return "Рейтинг на Яндексе может ещё не отображаться или сильно прыгать: обычно нужно хотя бы 3–5 оценок.";
    if (count < 40) return "Карточка уже с рейтингом, но 1–2 свежих отзыва заметно двигают цифру. Для устойчивости ориентир — около 40–50 отзывов.";
    if (count < 100) return "База уже немаленькая. Дальше рост медленнее, зато одна единица слабее роняет оценку. Ориентир «тяжёлой» карточки — около 100 отзывов.";
    return "Большая база: рейтинг устойчивее. Сильнее влияют свежие отзывы и «надёжные авторы», а не просто среднее всех звёзд.";
  }
  if (platform === "google") {
    if (count < 5) return "У Google рейтинг часто появляется примерно после 5 отзывов и сглаживается к среднему по рынку, пока отзывов мало.";
    if (count < 40) return "Пока отзывов меньше ~40, новые оценки заметнее. Алгоритм учитывает не только среднее, но и объём.";
    return "При 40–100+ отзывах оценка стабильнее. Свежие отзывы всё равно важны: их видят первыми в ленте.";
  }
  if (count < 10) return "В 2ГИС при малом числе оценок рейтинг легко качается. Нужно больше 10–20 отзывов, чтобы цифра «села».";
  if (count < 50) return "Средняя устойчивость. Свежие оценки всё ещё хорошо двигают средний балл.";
  return "Крупная база: рост и падение идут медленнее. Актуальность ленты по-прежнему влияет на доверие клиентов.";
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}
