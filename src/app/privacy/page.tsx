import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — ratify",
};

export default function PrivacyPage() {
  return (
    <main className="pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-bg rounded-xl p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-zinc-900 mb-8">Политика конфиденциальности</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-zinc-500 leading-relaxed">
            <p>Дата последнего обновления: 01 января 2025 г.</p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности (далее — Политика) описывает, как ratify (далее — Компания)
              собирает, использует и защищает персональные данные пользователей сайта.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">2. Какие данные мы собираем</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Имя и контактные данные (телефон, email)</li>
              <li>Информация о заказах и предпочтениях</li>
              <li>Технические данные (IP-адрес, тип браузера, cookies)</li>
              <li>Данные, которые вы добровольно предоставляете в формах</li>
            </ul>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">3. Цели обработки данных</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Обработка и выполнение заказов</li>
              <li>Обратная связь и поддержка клиентов</li>
              <li>Улучшение качества наших услуг</li>
              <li>Информирование о новостях и акциях (с вашего согласия)</li>
            </ul>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">4. Защита данных</h2>
            <p>
              Мы используем современные методы шифрования и защиты данных. Ваши персональные данные не передаются
              третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством РФ.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">5. Cookies</h2>
            <p>
              Сайт использует файлы cookies для улучшения работы и персонализации. Вы можете отключить cookies
              в настройках браузера, однако это может повлиять на функциональность сайта.
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">6. Ваши права</h2>
            <p>
              Вы имеете право на доступ, исправление и удаление ваших персональных данных. Для этого обратитесь
              по адресу: <a href="mailto:gipno262@gmail.com" className="text-teal-700 hover:underline">gipno262@gmail.com</a>
            </p>

            <h2 className="text-xl font-bold text-zinc-900 mt-8 mb-4">7. Контакты</h2>
            <p>
              По вопросам, связанным с обработкой персональных данных, обращайтесь:{" "}
              <a href="mailto:gipno262@gmail.com" className="text-teal-700 hover:underline">gipno262@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
