import { Metadata } from "next";
import ListRepair from "./ui/ListRepair";
export const metadata: Metadata = {
  title: "Comprobantes",
};

export default function repairListPage() {
  return (
    <div className="bg-custom-bg2  bg-cover bg-center bg-no-repeat min-h-screen">
      <h2 className="text-white text-5xl text-center py-10">
        Listado de comprobantes de garantia/reparacion
      </h2>
      <ListRepair />
    </div>
  );
}
