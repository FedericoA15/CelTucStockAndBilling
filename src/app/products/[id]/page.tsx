import { Metadata, ResolvingMetadata } from "next";
import { ProductDetail } from "./ui/ProductDetail";
import BackButton from "@/components/buttons/BackButton";


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Producto Detalles",
  };
}

export default async function ProductIdPage({ params }: Props) {
  const { id } = params;

  return (
    <div>
      <h2 className="text-white text-5xl text-center py-10">Producto {id}</h2>
      <BackButton/>
      <ProductDetail id={id} />
    </div>
  );
}
