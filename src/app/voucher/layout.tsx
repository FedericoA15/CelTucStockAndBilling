import Navbar from "@/components/navbar/NavBar";

export default function InvoiceLayout({
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
