import { Metadata, ResolvingMetadata } from "next";
import { InvoiceDetail } from "./ui/InvoiceDetail";
import BackButton from "@/components/buttons/BackButton";


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {

  return {
    title: "Comprobante",
  };
}

export default async function InvoiceIdPage({ params }: Props) {
  const { id } = params;

  return (
    <div>
      <h2 className="text-white text-5xl text-center py-10">Comprobante {id}</h2>
      <BackButton/>
      <InvoiceDetail id={id} />
    </div>
  );
}
