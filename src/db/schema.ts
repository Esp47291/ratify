import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  companyUrl: text("company_url"),
  reviewCount: integer("review_count"),
  message: text("message"),
  type: text("type").default("order"), // 'order' | 'checklist'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
