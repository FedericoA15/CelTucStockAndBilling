import { Metadata } from "next";
import ListComponent from "./ui/ListItems";

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
