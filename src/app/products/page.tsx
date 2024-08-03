import { Metadata } from "next";
import ListComponent from "./ui/ListItems";
import FormDollar from "./ui/FormDollar";

export const metadata: Metadata = {
  title: "Productos",
};

export default function productPage() {
  return (
    <div>
      <h2 className="text-white text-5xl text-center py-10">Productos</h2>
      <FormDollar/>
      <ListComponent/>
    </div>
  );
}
