-- Таблица заявок для чистой базы
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  company_url TEXT,
  service TEXT,
  budget TEXT,
  message TEXT,
  type TEXT DEFAULT 'order',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Для уже существующих баз со старой схемой (безопасно, ничего не удаляет):
ALTER TABLE leads ADD COLUMN IF NOT EXISTS service TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS budget TEXT;

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
