import Navbar from "@/components/navbar/NavBar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div>
        {children}
      </div>
    </main>
  );
}
