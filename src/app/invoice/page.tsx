import { Metadata } from "next";
import ListInvoice from "./ui/ListInvoice";

export const metadata: Metadata = {
  title: "Productos",
};

export default function InvoicePage() {
  return (
    <div>
      <h2 className="text-white text-5xl text-center py-10">Facturas</h2>
      <ListInvoice/>
    </div>
  );
}
