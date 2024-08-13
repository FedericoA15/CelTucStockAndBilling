import { Metadata } from "next";
import ContractForm from "./ui/ContractForm";

export const metadata: Metadata = {
  title: "Comprobantes",
};

export default function contractPage() {
  return (
    <div className="bg-custom-bg2 bg-cover bg-center bg-no-repeat min-h-screen">
      <h2 className="text-white text-5xl text-center py-10">
        Comprobantes de contratos de compra de celulares
      </h2>
      <ContractForm />
    </div>
  );
}
