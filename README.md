# ratify

Сайт маркетингового агентства: Яндекс.Директ, SEO-продвижение, аудит сайта и продукта, ведение карточки в Яндекс.Бизнесе. Заявки с форм сохраняются в PostgreSQL и приходят в Telegram. Контекст и правила работы — в `CLAUDE.md`.

---

## Запуск через Docker (скопируй и вставь)

Нужны **Docker** и **Docker Compose**. В папке проекта:

```bash
copy .env.example .env
docker compose up -d --build
```

Папка называется `мой сайт` — из‑за кириллицы Compose раньше ругался `project name must not be empty`. В `docker-compose.yml` уже прописано `name: ratify`, обычная команда выше должна работать. Запасной вариант: `docker compose -p ratify up -d --build`.

Сайт: http://localhost:3000  
Проверка: http://localhost:3000/api/health

Полезные команды:

```bash
docker compose ps              # статус контейнеров
docker compose logs -f web     # логи сайта
docker compose logs -f db      # логи базы
docker compose down            # остановить
docker compose down -v         # остановить и стереть данные БД
```

На Linux/Mac вместо `copy` используй `cp .env.example .env`.

Перед запуском в `.env` обязательно задай `SITE_URL` и `POSTGRES_PASSWORD`. Порт базы наружу не открыт — сайт ходит в неё по внутренней сети Docker. Для локальной отладки раскомментируй `ports` у сервиса `db` в `docker-compose.yml` (только `127.0.0.1`).

---

## Что значат названия

### Файлы в корне

| Имя | Зачем |
|-----|--------|
| `Dockerfile` | Рецепт образа сайта (сборка Next.js) |
| `docker-compose.yml` | Запуск **сайта + PostgreSQL** одной командой (обычный VPS / локально) |
| `docker-compose.timeweb.yml` | Только сайт, без своей БД — для Timeweb (база из панели) |
| `.env.example` | Шаблон настроек. Копируешь в `.env` и заполняешь (пароль БД и секрет сессий генерируются через `openssl rand -hex 24`) |
| `.env` | Реальные секреты и адреса. **Не коммить в git** |
| `package.json` | Список npm-пакетов и скриптов (аналог requirements для Node) |
| `package-lock.json` | Точные версии пакетов |
| `next.config.ts` | Настройки Next.js |
| `drizzle.config.ts` | Настройки ORM (схема БД) |
| `tsconfig.json` | Настройки TypeScript |
| `postcss.config.mjs` | Плагин Tailwind для CSS |
| `eslint.config.mjs` | Проверка кода |

### Папки

| Имя | Зачем |
|-----|--------|
| `src/app/` | Страницы сайта и API (роутинг Next.js) |
| `src/app/api/leads/` | Приём заявок с форм (имя, телефон, услуга, сайт, комментарий) |
| `src/app/api/health/` | Проверка «сайт жив + БД отвечает» |
| `src/components/` | Шапка, подвал, форма заявки, калькулятор бюджета |
| `src/db/` | Таблицы и подключение к PostgreSQL |
| `src/lib/` | Данные услуг (`services-data.ts`), расчёт бюджета, Telegram, ссылки, телефоны |
| `public/` | Картинки и иконки, которые отдаются как есть |
| `scripts/` | SQL для создания таблиц, скрипты деплоя |
| `icons/` | Исходники иконок (дубли в `public/icons`) |

### Сервисы в Docker (`docker-compose.yml`)

| Имя | Что это |
|-----|---------|
| `web` | Контейнер сайта, порт **3000** |
| `db` | PostgreSQL 16, база `app_db`, наружу не публикуется |
| `pgdata` | Том: данные базы не пропадают после `docker compose down` |

### Переменные в `.env`

| Имя | Обязательно | Что значит |
|-----|-------------|------------|
| `SITE_URL` | да | Публичный URL сайта **без** `/` в конце, например `https://example.com` |
| `POSTGRES_PASSWORD` | да (Docker) | Пароль PostgreSQL в `docker-compose.yml`. Только буквы и цифры |
| `DATABASE_URL` | да* | Строка к Postgres. *В Docker Compose для `web` собирается сама из `POSTGRES_PASSWORD`. Нужна для запуска без Docker и для `drizzle-kit` |
| `SESSION_SECRET` | после перехода на маркетплейс | Секрет подписи сессий |
| `DATABASE_SSL` | нет | `true` — если база на хостинге со SSL. В локальном Docker — `false` |
| `PORT` | нет | Порт на хосте (по умолчанию `3000`) |
| `TELEGRAM_BOT_TOKEN` | нет | Токен бота от @BotFather. Пусто = уведомления выключены |
| `TELEGRAM_CHAT_ID` | нет | Куда слать заявки (чат/группа) |
| `TELEGRAM_PROXY` | нет | Прокси до Telegram, если `api.telegram.org` недоступен |
| `TELEGRAM_API_IP` | нет | IP для обхода блокировки DNS в `docker-compose.yml` (по умолчанию известный адрес) |
| `DEV_ORIGINS` | нет | Адреса локальной сети для dev-сервера через запятую |

---

## Что нужно (requirements)

Список пакетов — в `package.json`.

Кратко:

- **Через Docker:** Docker + Docker Compose. Node и Postgres ставить не нужно.
- **Без Docker:** Node.js 22+, npm, PostgreSQL 16+.
- Пакеты сайта ставятся командой `npm install` из `package.json` (Next.js, React, Drizzle, pg и т.д.).

---

## Локально без Docker

```bash
npm install
copy .env.example .env
```

В `.env` укажи живой `DATABASE_URL`, затем:

```bash
npm run db:push
npm run dev
```

Сайт: http://localhost:3000

---

## Скрипты npm

| Команда | Что делает |
|---------|------------|
| `npm run dev` | Разработка с горячей перезагрузкой |
| `npm run build` | Сборка продакшена |
| `npm start` | Запуск уже собранного сайта |
| `npm run lint` | Проверка кода |
| `npm run typecheck` | Проверка TypeScript |
| `npm run db:push` | Создать/обновить таблицы в БД |
| `npm run db:generate` | Сгенерировать миграции |
| `npm run db:studio` | GUI для таблиц |

---

## API

| Метод | Путь | Что делает |
|-------|------|------------|
| `POST` | `/api/leads` | Сохранить заявку (+ Telegram, если задан) |
| `GET` | `/api/health` | Проверка сайта и БД |

---

# Дальше — редко нужно

## Docker на Timeweb (своя БД в панели)

```bash
docker compose -f docker-compose.timeweb.yml up -d --build
```

В панели задай `DATABASE_URL`, `DATABASE_SSL=true`, `SITE_URL`, `SESSION_SECRET`.

## Деплой без Docker (VPS)

Нужны Node 22+, PostgreSQL, reverse proxy (Nginx/Caddy), HTTPS, процесс через systemd/PM2.

```bash
npm ci
npm run build
NODE_ENV=production npm start
```

Или standalone после сборки:

```bash
cd .next/standalone && NODE_ENV=production node server.js
```

NPM-пакеты руками не качай — их ставит `npm ci`.

## Nginx (кратко)

```nginx
server {
  listen 80;
  server_name example.com www.example.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Потом HTTPS (Let's Encrypt / панель хостинга).

## Панель хостинга (если не Docker)

- Build: `npm run build`
- Start: `npm start`
- Node: 22+
- Env: `DATABASE_URL`, `SITE_URL`, опционально `DATABASE_SSL=true`, Telegram

## Telegram

Код: `src/lib/telegram.ts`. Пустые `TELEGRAM_*` — отправка не идёт. Ошибка Telegram не ломает заявку в БД.

## Стек

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide, PostgreSQL, Drizzle ORM.

## Лицензия

Приватный проект (`private: true` в `package.json`).
