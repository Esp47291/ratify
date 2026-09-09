"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed z-40 left-4 sm:left-5 md:left-6 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] md:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] w-11 h-11 sm:w-12 sm:h-12 md:w-10 md:h-10 rounded-full md:rounded-md border-2 border-[var(--ink)] bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center shadow-lg hover:bg-[var(--surface-muted)] active:scale-95 transition-all"
      aria-label="Наверх"
    >
      <ArrowUp className="w-5 h-5 md:w-4 md:h-4" />
    </button>
  );
}
