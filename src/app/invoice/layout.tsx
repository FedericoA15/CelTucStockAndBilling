import Navbar from "@/components/navbar/NavBar";

export default function InvoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-gray-800">
      <Navbar />
      <div>
        {children}
      </div>
    </main>
  );
}
