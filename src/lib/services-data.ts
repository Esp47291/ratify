export interface ReviewService {
  id: string;
  platformId: string;
  platformName: string;
  name: string;
  price: number | null;
  minQty: number;
  icon: string;
  href: string;
  note?: string;
}

export const platformCategories = [
  { id: "all", name: "Все площадки" },
  { id: "yandex", name: "Яндекс.Карты" },
  { id: "google", name: "Google Карты" },
  { id: "2gis", name: "2ГИС" },
  { id: "zoon", name: "Zoon" },
  { id: "avito", name: "Авито" },
  { id: "yandex-business", name: "Яндекс.Бизнес" },
  { id: "yandex-direct", name: "Яндекс.Директ" },
  { id: "other", name: "Другие площадки" },
];

export const reviewServices: ReviewService[] = [
  {
    id: "yandex-5star",
    platformId: "yandex",
    platformName: "Яндекс.Карты",
    name: "Отзывы 5★",
    price: 350,
    minQty: 5,
    icon: "/icons/yandex-maps.svg",
    href: "/services/yandex",
    note: "Самая востребованная",
  },
  {
    id: "yandex-4star",
    platformId: "yandex",
    platformName: "Яндекс.Карты",
    name: "Отзывы 4★",
    price: 320,
    minQty: 5,
    icon: "/icons/yandex-maps.svg",
    href: "/services/yandex",
  },
  {
    id: "yandex-reply",
    platformId: "yandex",
    platformName: "Яндекс.Карты",
    name: "Ответы на отзывы",
    price: 200,
    minQty: 1,
    icon: "/icons/yandex-maps.svg",
    href: "/services/yandex",
  },
  {
    id: "google-5star",
    platformId: "google",
    platformName: "Google Карты",
    name: "Отзывы 5★",
    price: 150,
    minQty: 5,
    icon: "/icons/google-maps.svg",
    href: "/services/google",
  },
  {
    id: "google-4star",
    platformId: "google",
    platformName: "Google Карты",
    name: "Отзывы 4★",
    price: 140,
    minQty: 5,
    icon: "/icons/google-maps.svg",
    href: "/services/google",
  },
  {
    id: "2gis-5star",
    platformId: "2gis",
    platformName: "2ГИС",
    name: "Отзывы 5★",
    price: 120,
    minQty: 5,
    icon: "/icons/2gis.png",
    href: "/services/2gis",
    note: "Самая выгодная",
  },
  {
    id: "2gis-4star",
    platformId: "2gis",
    platformName: "2ГИС",
    name: "Отзывы 4★",
    price: 110,
    minQty: 5,
    icon: "/icons/2gis.png",
    href: "/services/2gis",
  },
  {
    id: "zoon-5star",
    platformId: "zoon",
    platformName: "Zoon",
    name: "Отзывы 5★",
    price: 150,
    minQty: 5,
    icon: "/icons/zoon.svg",
    href: "/services/zoon",
  },
  {
    id: "zoon-4star",
    platformId: "zoon",
    platformName: "Zoon",
    name: "Отзывы 4★",
    price: 140,
    minQty: 5,
    icon: "/icons/zoon.svg",
    href: "/services/zoon",
  },
  {
    id: "avito-5star",
    platformId: "avito",
    platformName: "Авито",
    name: "Отзывы 5★",
    price: 1300,
    minQty: 1,
    icon: "/icons/avito.svg",
    href: "/services/avito",
    note: "Сложная модерация",
  },
  {
    id: "avito-4star",
    platformId: "avito",
    platformName: "Авито",
    name: "Отзывы 4★",
    price: 1200,
    minQty: 1,
    icon: "/icons/avito.svg",
    href: "/services/avito",
  },
  {
    id: "yandex-business-support",
    platformId: "yandex-business",
    platformName: "Яндекс.Бизнес",
    name: "Ежемесячная поддержка",
    price: 9900,
    minQty: 1,
    icon: "/icons/yandex-maps.svg",
    href: "/services/yandex-business",
  },
  {
    id: "yandex-direct-setup",
    platformId: "yandex-direct",
    platformName: "Яндекс.Директ",
    name: "Настройка рекламы",
    price: null,
    minQty: 1,
    icon: "/icons/yandex-maps.svg",
    href: "/services/yandex-direct",
  },
  {
    id: "other-custom",
    platformId: "other",
    platformName: "Другие площадки",
    name: "Индивидуальный заказ",
    price: null,
    minQty: 1,
    icon: "🌐",
    href: "/services/other",
    note: "Уточняйте у менеджера",
  },
];

export const platformPrices = reviewServices
  .filter((s, i, arr) => arr.findIndex((x) => x.platformId === s.platformId) === i)
  .map((s) => ({
    name: s.platformName,
    price: s.price,
    icon: s.icon,
    note: s.note ?? "",
  }));
