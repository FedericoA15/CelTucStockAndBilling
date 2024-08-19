import { Metadata, ResolvingMetadata } from "next";
import BackButton from "@/components/buttons/BackButton";
import { ContractDetails } from "./ui/ContractDetails";

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Comprobante de ventas",
  };
}

export default async function voucherIdPage({ params }: Props) {
  const { id } = params;

  return (
    <div>
      <h2 className="text-white text-5xl text-center py-10">
        Comprobante de ventas {id}
      </h2>
      <BackButton />
      <ContractDetails id={id} />
    </div>
  );
}
