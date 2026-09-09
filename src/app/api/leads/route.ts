import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { notifyTelegramLead } from "@/lib/telegram";
import { normalizeCompanyUrl } from "@/lib/url";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, companyUrl, reviewCount, message, type } = body;

    if (!name) {
      return NextResponse.json({ error: "Имя обязательно" }, { status: 400 });
    }

    const normalizedUrl = companyUrl ? normalizeCompanyUrl(String(companyUrl)) : "";

    const payload = {
      name,
      phone: phone || null,
      email: email || null,
      companyUrl: normalizedUrl || null,
      reviewCount: reviewCount ? parseInt(reviewCount, 10) : null,
      message: message || null,
      type: type || "order",
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
      return NextResponse.json(
        { error: "Ошибка сервера" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: leadId ?? null,
      saved: Boolean(leadId),
      notified: telegramOk,
    });
  } catch (error) {
    console.error("Error handling lead:", error);
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
