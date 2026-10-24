import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { notifyTelegramLead } from "@/lib/telegram";
import { normalizeCompanyUrl } from "@/lib/url";

const LEAD_TYPES = new Set(["order", "contact", "calculator", "exit_intent"]);

/** Приводит значение к обрезанной строке или null. */
function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = clean(body?.name, 120);
    if (!name) {
      return NextResponse.json({ error: "Имя обязательно" }, { status: 400 });
    }

    const rawUrl = clean(body?.companyUrl, 500);
    const normalizedUrl = rawUrl ? normalizeCompanyUrl(rawUrl) : "";
    const rawType = clean(body?.type, 30) ?? "order";

    const payload = {
      name,
      phone: clean(body?.phone, 30),
      email: clean(body?.email, 200),
      companyUrl: normalizedUrl || null,
      service: clean(body?.service, 120),
      budget: clean(body?.budget, 60),
      message: clean(body?.message, 2000),
      type: LEAD_TYPES.has(rawType) ? rawType : "order",
    };

    let leadId: number | undefined;

    try {
      const [lead] = await db.insert(leads).values(payload).returning();
      leadId = lead.id;
    } catch (dbError) {
      // DB is preferred storage, but Telegram must still fire if Postgres is down.
      console.error("Error saving lead to DB:", dbError);
    }

    const telegramOk = await notifyTelegramLead({
      id: leadId,
      ...payload,
    });

    if (!leadId && !telegramOk) {
      return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      id: leadId ?? null,
      saved: Boolean(leadId),
      notified: telegramOk,
    });
  } catch (error) {
    console.error("Error handling lead:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
