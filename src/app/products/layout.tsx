import ListComponent from "@/components/listItems/ListItems";
import Navbar from "@/components/navbar/NavBar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      <div>
        <ListComponent></ListComponent>
      </div>
    </main>
  );
}
