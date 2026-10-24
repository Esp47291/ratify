"use client";

import { useState } from "react";
import BudgetCalculator from "@/components/BudgetCalculator";
import OrderModal from "@/components/OrderModal";

export default function CalculatorWithModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BudgetCalculator onDiscuss={() => setOpen(true)} />
      <OrderModal isOpen={open} onClose={() => setOpen(false)} defaultService="Яндекс.Директ" />
    </>
  );
}
