import ListComponent from "@/components/listItems/ListItems";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <ListComponent/>
    </div>
  );
}
