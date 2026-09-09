#!/usr/bin/env bash
# Одноразовый деплой на VPS Timeweb Cloud.
# Запуск на сервере (консоль Timeweb или ваш SSH):
#   export SITE_URL=http://72.56.232.108:3000
#   export TELEGRAM_BOT_TOKEN=...
#   export TELEGRAM_CHAT_ID=...
#   bash scripts/bootstrap-server.sh

set -euo pipefail

APP_DIR="${APP_DIR:-/opt/qqqweqw}"
REPO="${REPO:-https://github.com/xiloeiwqq/qqqweqw.git}"
SITE_URL="${SITE_URL:-http://72.56.232.108:3000}"
PORT="${PORT:-3000}"

require_var() {
  if [[ -z "${!1:-}" ]]; then
    echo "Переменная $1 обязательна" >&2
    exit 1
  fi
}

require_var TELEGRAM_BOT_TOKEN
require_var TELEGRAM_CHAT_ID

echo "==> Обновление системы и установка зависимостей..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq git curl ca-certificates

if ! command -v docker >/dev/null 2>&1; then
  echo "==> Установка Docker..."
  curl -fsSL https://get.docker.com | sh
fi

systemctl enable docker >/dev/null 2>&1 || true
systemctl start docker >/dev/null 2>&1 || true

if ! docker compose version >/dev/null 2>&1; then
  apt-get install -y -qq docker-compose-plugin
fi

echo "==> Клонирование репозитория..."
mkdir -p "$(dirname "$APP_DIR")"
if [[ -d "$APP_DIR/.git" ]]; then
  git -C "$APP_DIR" pull
else
  git clone "$REPO" "$APP_DIR"
fi

echo "==> Создание .env..."
cat > "$APP_DIR/.env" <<EOF
SITE_URL=${SITE_URL}
DATABASE_URL=postgresql://postgres:postgres@db:5432/app_db
DATABASE_SSL=false
PORT=${PORT}
TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}
TELEGRAM_PROXY=
EOF

echo "==> Сборка и запуск Docker Compose..."
cd "$APP_DIR"
docker compose up -d --build

echo "==> Ожидание healthcheck..."
for i in $(seq 1 36); do
  if curl -sf "http://127.0.0.1:${PORT}/api/health" | grep -q '"ok":true'; then
    echo "OK: /api/health"
    break
  fi
  sleep 5
  if [[ "$i" -eq 36 ]]; then
    echo "Ошибка: healthcheck не прошёл" >&2
    docker compose logs --tail=100 web
    exit 1
  fi
done

echo "==> Тест заявки + Telegram..."
curl -sf -X POST "http://127.0.0.1:${PORT}/api/leads" \
  -H "Content-Type: application/json" \
  -d '{"name":"Deploy Test","phone":"+79990000000","type":"order","message":"bootstrap check"}' \
  | tee /tmp/lead-test.json

echo ""
echo "Готово: ${SITE_URL}"
echo "Проверьте Telegram — должно прийти сообщение «Deploy Test»."
