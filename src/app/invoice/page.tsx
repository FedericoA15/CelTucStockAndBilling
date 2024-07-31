import { Metadata } from "next";
import ListInvoice from "./ui/ListInvoice";

export const metadata: Metadata = {
  title: "Comprobantes",
};

export default function InvoicePage() {
  return (
    <div>
      <h2 className="text-white text-5xl text-center py-10">Comprobantes</h2>
      <ListInvoice/>
    </div>
  );
}
