import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  /** Ссылка на сайт или карточку компании */
  companyUrl: text("company_url"),
  /** Название выбранной услуги */
  service: text("service"),
  /** Ориентировочный бюджет (свободный текст) */
  budget: text("budget"),
  message: text("message"),
  type: text("type").default("order"), // 'order' | 'contact' | 'calculator' | 'exit_intent'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
