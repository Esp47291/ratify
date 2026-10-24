export interface BudgetInput {
  /** Рекламный бюджет за период, ₽ */
  budget: number;
  /** Средняя цена клика, ₽ */
  cpc: number;
  /** Конверсия сайта: посетитель → заявка, % */
  conversionPct: number;
  /** Доля заявок, которые становятся продажей, % */
  closePct: number;
  /** Средний чек, ₽ */
  avgCheck: number;
}

export interface BudgetResult {
  clicks: number;
  leads: number;
  costPerLead: number | null;
  sales: number;
  revenue: number;
  /** (выручка − рекламный бюджет) / рекламный бюджет, % */
  returnPct: number | null;
}

function safe(n: number): number {
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/**
 * Чистая арифметика по введённым пользователем числам.
 * Это не прогноз и не обещание результата.
 */
export function calcBudget(input: BudgetInput): BudgetResult {
  const budget = safe(input.budget);
  const cpc = safe(input.cpc);
  const conv = Math.min(safe(input.conversionPct), 100) / 100;
  const close = Math.min(safe(input.closePct), 100) / 100;
  const check = safe(input.avgCheck);

  const clicks = cpc > 0 ? budget / cpc : 0;
  const leads = clicks * conv;
  const costPerLead = leads > 0 ? budget / leads : null;
  const sales = leads * close;
  const revenue = sales * check;
  const returnPct = budget > 0 ? ((revenue - budget) / budget) * 100 : null;

  return { clicks, leads, costPerLead, sales, revenue, returnPct };
}
