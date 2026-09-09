import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Договор оферты — ratify",
};

export default function OfferPage() {
  return (
    <main className="pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-bg rounded-xl p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-zinc-900 mb-8">Публичная оферта</h1>
          <div className="space-y-6 text-zinc-500 leading-relaxed">
            <p>Дата вступления в силу: 01 января 2025 г.</p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">1. Предмет договора</h2>
            <p>
              ratify (далее — Исполнитель) обязуется оказать услуги по размещению отзывов на интернет-площадках
              (далее — Услуги), а Заказчик обязуется оплатить данные Услуги в соответствии с условиями настоящей Оферты.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">2. Условия оказания услуг</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Исполнитель оказывает услуги по размещению отзывов на указанных Заказчиком площадках</li>
              <li>Оплата производится только за опубликованные отзывы, прошедшие модерацию площадки</li>
              <li>Сроки выполнения: 3–14 рабочих дней в зависимости от объёма и площадки</li>
              <li>Исполнитель предоставляет отчёт со скриншотами и ссылками на опубликованные отзывы</li>
            </ul>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">3. Стоимость услуг</h2>
            <p>
              Стоимость услуг определяется в соответствии с действующим прайс-листом, размещённым на сайте,
              либо согласовывается индивидуально для каждого заказа.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">4. Порядок оплаты</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Предоплата 50% при подтверждении заказа</li>
              <li>Остаток 50% — после предоставления отчёта о публикации</li>
              <li>Способы оплаты: банковский перевод, банковские карты</li>
            </ul>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">5. Гарантии и ответственность</h2>
            <p>
              Исполнитель гарантирует использование реальных пользовательских аккаунтов. В случае удаления
              отзыва модерацией площадки в течение 30 дней с момента публикации, Исполнитель обязуется заменить
              отзыв бесплатно или вернуть стоимость данного отзыва.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">6. Конфиденциальность</h2>
            <p>
              Стороны обязуются сохранять конфиденциальность информации, полученной в ходе сотрудничества.
              Исполнитель не раскрывает данные Заказчика третьим лицам.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">7. Акцепт оферты</h2>
            <p>
              Акцептом данной Оферты является оплата Заказчиком счёта на оказание услуг или отправка заявки
              через форму на сайте. С момента акцепта договор считается заключённым.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">8. Контакты Исполнителя</h2>
            <p>
              ratify<br />
              Email: <a href="mailto:gipno262@gmail.com" className="text-teal-700 hover:underline">gipno262@gmail.com</a><br />
              Телефон: <a href="tel:+79373717757" className="text-teal-700 hover:underline">+7 937 371 77 57</a><br />
              Telegram: <a href="https://t.me/Manager_Seo_Smm" className="text-teal-700 hover:underline">@Manager_Seo_Smm</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
