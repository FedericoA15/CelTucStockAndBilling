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
        {children}
      </div>
    </main>
  );
}
