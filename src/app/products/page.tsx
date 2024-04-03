import { Metadata } from "next";
import ListComponent from "./ui/ListItems";

export const metadata: Metadata = {
  title: "Productos",
};

export default function productPage() {
  return (
    <div>
      <ListComponent/>
    </div>
  );
}
