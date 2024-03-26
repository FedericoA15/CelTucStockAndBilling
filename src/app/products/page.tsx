import ListComponent from "@/components/listItems/ListItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Productos",
};

export default function LoginPage() {
  return (
    <div>
      <ListComponent/>
    </div>
  );
}
