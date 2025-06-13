"use client";

import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/contexts/ToastContext";
import { CartProvider } from "@/contexts/Cartcontext";
import { ProductProvider } from "@/contexts/ProductContext";
import { PropsWithChildren } from "react";

export default function ClientProviders({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <ToastProvider>
        <CartProvider>
          <ProductProvider>{children}</ProductProvider>
        </CartProvider>
      </ToastProvider>
    </SessionProvider>
  );
}
