import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/utils/cartContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
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
          {children}
          <ToastContainer
              theme="dark"
              bodyClassName="toastify-dark"
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
        </body>
      </html>
    </CartProvider>
  );
}
