"use client";
import { Cart } from "./ui/Cart";

export default function NewInvoice() {
  return (
    <div>
      <h2 className="text-white text-5xl text-center py-10">
        Nuevo Comprobante
      </h2>
      <Cart />
    </div>
  );
}
