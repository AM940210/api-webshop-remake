import { Inter } from "next/font/google";
import type { Metadata } from "next/types";
import { PropsWithChildren } from "react";

import Header from "@/components/layout/Header";

import Footer from "@/components/layout/Footer";

import { CartProvider } from "@/contexts/Cartcontext";
import { ProductProvider } from "@/contexts/ProductContext";
import { ToastProvider } from "@/contexts/ToastContext";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/* Beskriv din hemsida för sökmotorerna */
export const metadata: Metadata = {
  title: "Webbshoppen",
  description: "Dina favoritprodukter online till en bra pris...",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ToastProvider>
        <CartProvider>

          <Header />
          <main>
          <ProductProvider>{children}</ProductProvider>
          </main>

        </CartProvider>
        </ToastProvider>

        <Footer />

       
      </body>
    </html>
  );
}
