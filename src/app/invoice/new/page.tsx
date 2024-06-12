"use client"
import axiosInstance from "@/utils/axiosInstance";
import { Cart } from "./ui/Cart";

export default function NewInvoice() {
  return (
    <div>
      <h2 className="text-white text-3xl text-center py-10">Nueva factura</h2>
      <Cart />
    </div>
  );
}
