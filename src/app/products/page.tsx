import { Metadata } from "next";
import ListComponent from "./ui/ListItems";

export const metadata: Metadata = {
  title: "Productos",
};

export default function productPage() {
  return (
    <div>
      <h2 className="text-white text-3xl text-center py-10">Productos</h2>
      <ListComponent/>
    </div>
  );
}
