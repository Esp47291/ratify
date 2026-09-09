export const PHONE_DIGITS = "79373717757";
export const PHONE_E164 = "+79373717757";
export const PHONE_DISPLAY = "+7 937 371 77 57";
export const PHONE_TEL = "tel:+79373717757";

export const EMAIL = "gipno262@gmail.com";
export const EMAIL_MAILTO = `mailto:${EMAIL}`;

export const TELEGRAM_HANDLE = "@Manager_Seo_Smm";
export const TELEGRAM_URL = "https://t.me/Manager_Seo_Smm";

/** WhatsApp открывает чат по номеру. */
export const WHATSAPP_URL = `https://wa.me/${PHONE_DIGITS}`;

/**
 * У Max нет публичной ссылки вида wa.me по телефону.
 * Открываем поиск/приложение; номер указан в подписи.
 * Когда появится личная ссылка max.ru/u/..., её можно подставить сюда.
 */
export const MAX_URL = "https://max.ru/";

/**
 * У VK тоже нет официального wa.me по телефону без id профиля.
 * Открываем поиск человека по номеру.
 */
export const VK_URL = `https://vk.com/search?c%5Bsection%5D=people&c%5Bq%5D=%2B${PHONE_DIGITS}`;

export const HOURS_TITLE = "Круглосуточно, без выходных";
export const HOURS_TEXT =
  "На связи всегда: день и ночь, будни и праздники. Пишите в любой мессенджер — ответим.";
