import { Metadata } from "next";
import ListInvoice from "./ui/ListInvoice";

export const metadata: Metadata = {
  title: "Comprobantes",
};

export default function InvoicePage() {
  return (
    <div className="bg-custom-bg2  bg-cover bg-center bg-no-repeat min-h-screen">
      <h2 className="text-white text-5xl text-center py-10">Comprobantes</h2>
      <ListInvoice />
    </div>
  );
}
