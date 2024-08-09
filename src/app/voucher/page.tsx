import Link from "next/link";
import { Metadata } from "next";
import ReceiptForm from "./ui/ReceiptForm";

export const metadata: Metadata = {
  title: "Comprobantes",
};

export default function voucherPage() {
  return (
    <div className="bg-custom-bg2 bg-cover bg-center bg-no-repeat min-h-screen">
      <h2 className="text-white text-5xl text-center py-10">
        Comprobantes de venta de celulares
      </h2>
      <div className="text-center">
        <Link href="voucher/list">
          <button className="bg-blue-500 text-white py-2 px-4 my-2 rounded hover:bg-blue-700">
            Ver lista de comprobantes
          </button>
        </Link>
      </div>
      <ReceiptForm />
    </div>
  );
}
