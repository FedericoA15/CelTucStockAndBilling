import { Metadata, ResolvingMetadata } from "next";
import BackButton from "@/components/buttons/BackButton";
import { RepairDetails } from "./ui/RepairDetails";

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Comprobante de ventas",
  };
}

export default async function RepairIdPage({ params }: Props) {
  const { id } = params;

  return (
    <div>
      <h2 className="text-white text-5xl text-center py-10">
        Comprobante de garantia/reparacion {id}
      </h2>
      <BackButton />
      <RepairDetails id={id} />
    </div>
  );
}
