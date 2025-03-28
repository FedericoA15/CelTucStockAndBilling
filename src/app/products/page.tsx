import { Metadata } from "next";
import ListComponent from "./ui/ListItems";
import TimeSheet from "@/components/timeSheet/TimeSheet";

export const metadata: Metadata = {
  title: "Productos",
};

export default function productPage() {
  return (
    <div className="bg-custom-bg2  bg-cover bg-center bg-no-repeat min-h-screen">
      <h2 className="text-white text-5xl text-center py-10">Productos</h2>
      <TimeSheet />
      <ListComponent />
    </div>
  );
}
