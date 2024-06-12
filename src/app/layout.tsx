import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/utils/cartContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CelTuc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <html lang="en">
        <body className={inter.className}>
          <div>{children}</div>
        </body>
      </html>
    </CartProvider>
  );
}
