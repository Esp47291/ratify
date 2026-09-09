"use client";

import { useMemo, useState } from "react";
import { Search, ShoppingCart, RotateCcw } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import {
  platformCategories,
  reviewServices,
  type ReviewService,
} from "@/lib/services-data";

interface PlatformsAndPricesSectionProps {
  onOrder?: (service?: ReviewService) => void;
}

function ServiceCard({
  service,
  onOrder,
}: {
  service: ReviewService;
  onOrder?: (service: ReviewService) => void;
}) {
  const [qty, setQty] = useState(service.minQty);

  const total = service.price ? service.price * qty : null;

  return (
    <div className="platform-service-card">
      <div className="platform-service-card__header">
        {service.icon.startsWith("/") ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={service.icon} alt="" className="w-7 h-7 object-contain" />
        ) : (
          <span className="text-2xl">{service.icon}</span>
        )}
        <ShoppingCart className="w-5 h-5 opacity-70 ml-auto" />
      </div>

      <div className="platform-service-card__body">
        <p className="text-xs text-zinc-500 mb-1">{service.platformName}</p>
        <h3 className="font-bold text-zinc-900 text-sm leading-snug mb-2">{service.name}</h3>

        <div className="flex items-baseline justify-between gap-2 mb-3">
          {service.price ? (
            <span className="text-lg font-bold text-zinc-900">{service.price} ₽</span>
          ) : (
            <span className="accent-text font-semibold text-sm">По запросу</span>
          )}
          <span className="text-xs text-zinc-400">мин. {service.minQty} шт.</span>
        </div>

        {service.note && (
          <p className="text-xs accent-text mb-3">{service.note}</p>
        )}

        <div className="flex items-center gap-2 mb-3">
          <label className="text-xs text-zinc-500 shrink-0">Кол-во</label>
          <input
            type="number"
            min={service.minQty}
            value={qty}
            onChange={(e) => setQty(Math.max(service.minQty, Number(e.target.value) || service.minQty))}
            className="platform-service-card__input flex-1"
          />
        </div>

        {total !== null && (
          <p className="text-xs text-zinc-500 mb-3">
            Итого: <span className="font-semibold text-zinc-900">{total.toLocaleString("ru-RU")} ₽</span>
          </p>
        )}

        <div className="flex gap-2 mt-auto">
          <button
            type="button"
            onClick={() => onOrder?.(service)}
            className="platform-service-card__buy flex-1"
          >
            Купить
          </button>
          <button
            type="button"
            onClick={() => onOrder?.(service)}
            className="platform-service-card__cart flex-1"
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PlatformsAndPricesSection({ onOrder }: PlatformsAndPricesSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filteredServices = useMemo(() => {
    const q = search.trim().toLowerCase();
    return reviewServices.filter((s) => {
      const matchesCategory = activeCategory === "all" || s.platformId === activeCategory;
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.platformName.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const resetFilters = () => {
    setActiveCategory("all");
    setSearch("");
  };

  return (
    <section className="py-24" id="platforms-prices">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="section-label">Каталог</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 mb-4">
              Площадки и{" "}
              <span className="gradient-text">цены</span>
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto">
              Выберите площадку, укажите количество и оформите заказ. Платите только за опубликованные отзывы.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={80}>
          <div className="platform-search-bar mb-8">
            <Search className="w-5 h-5 text-zinc-400 shrink-0" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск по площадке или услуге..."
              className="platform-search-bar__input"
            />
            <button type="button" className="platform-search-bar__btn">
              Найти
            </button>
            <button
              type="button"
              onClick={resetFilters}
              className="platform-search-bar__reset"
              title="Сбросить фильтры"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <AnimatedSection delay={120} direction="left">
            <aside className="platform-sidebar lg:w-56 shrink-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 px-3">
                Площадки
              </p>
              <nav className="space-y-0.5 max-h-80 lg:max-h-[520px] overflow-y-auto">
                {platformCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`platform-sidebar__item w-full text-left ${
                      activeCategory === cat.id ? "platform-sidebar__item--active" : ""
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </nav>
            </aside>
          </AnimatedSection>

          <div className="flex-1 min-w-0">
            {filteredServices.length === 0 ? (
              <div className="card-bg rounded-xl p-12 text-center text-zinc-500">
                Ничего не найдено. Попробуйте другой запрос или сбросьте фильтры.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredServices.map((service, i) => (
                  <AnimatedSection key={service.id} delay={i * 40}>
                    <ServiceCard service={service} onOrder={onOrder} />
                  </AnimatedSection>
                ))}
              </div>
            )}

            <AnimatedSection delay={200}>
              <div className="flex flex-wrap gap-2 mt-8">
                {platformCategories
                  .filter((c) => c.id !== "all")
                  .map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`platform-tag ${
                        activeCategory === cat.id ? "platform-tag--active" : ""
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
