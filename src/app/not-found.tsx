import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative inline-block mb-8">
          <div className="text-[120px] font-bold text-zinc-900/5 leading-none select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-[var(--accent)] flex items-center justify-center shadow-2xl shadow-zinc-900/10">
              <Star className="w-10 h-10 text-white fill-white" />
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Страница не найдена</h1>
        <p className="text-zinc-500 mb-10 max-w-md mx-auto">
          Похоже, вы зашли не туда. Вернитесь на главную — там все наши услуги и контакты.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-lg"
        >
          <ArrowLeft className="w-5 h-5 relative z-10" />
          <span>На главную</span>
        </Link>
      </div>
    </main>
  );
}
