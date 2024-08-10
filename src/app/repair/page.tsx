import { Metadata } from "next";
import ReceiptForm from "./ui/RepairtForm";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Comprobantes",
};

export default function repairPage() {
  return (
    <div className="bg-custom-bg2  bg-cover bg-center bg-no-repeat min-h-screen">
      <h2 className="text-white text-5xl text-center py-10">
        Comprobantes de garantia/reparacion
      </h2>
      <ReceiptForm />
    </div>
  );
}
