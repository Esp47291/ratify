"use client";

import { useState } from "react";
import OrderModal from "@/components/OrderModal";

interface ServiceCtaProps {
  label?: string;
  /** Название услуги, которая будет выбрана в форме */
  serviceTitle?: string;
  className?: string;
}

/** Кнопка, открывающая форму заявки. Нужна, чтобы серверные страницы могли показывать модальное окно. */
export default function ServiceCta({
  label = "Оставить заявку",
  serviceTitle = "",
  className = "btn-primary",
}: ServiceCtaProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        <span>{label}</span>
      </button>
      <OrderModal isOpen={open} onClose={() => setOpen(false)} defaultService={serviceTitle} />
    </>
  );
}
