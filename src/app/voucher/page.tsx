import { Metadata } from "next";
import ReceiptForm from "./ReceiptForm";

export const metadata: Metadata = {
  title: "Comprobantes",
};

export default function InvoicePage() {
  return (
    <div>
      <h2 className="text-white text-5xl text-center py-10">
        Comprobantes de venta de celulares
        <ReceiptForm />
      </h2>
    </div>
  );
}
