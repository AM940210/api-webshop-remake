"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface ProductFromDB {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string | null;
  articleNumber: string;
}

export interface CartItem extends ProductFromDB {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: ProductFromDB, quantity?: number) => void;
  removeItem: (productId: string) => void;
updateQuantity: (productId: string, quantity: number) => void;

  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  const addItem = (product: ProductFromDB, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updatedItems;
      if (existing) {
        updatedItems = prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast({ title: `Uppdaterade ${product.title} till ${existing.quantity + quantity} st` });
      } else {
        updatedItems = [...prev, { ...product, quantity }];
        toast({ title: `Lade till ${product.title} i varukorgen` });
      }
      return updatedItems;
    });
    setTimeout(() => setIsCartOpen(true), 300);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => {
      const removed = prev.find((item) => item.id === productId);
      if (removed) toast({ title: `Tog bort ${removed.title} från varukorgen` });
      return prev.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(productId);
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
    toast({ title: `Ändrade antal till ${quantity}` });
  };

  const clearCart = () => {
    setItems([]);
    toast({ title: "Varukorg rensad" });
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  const closeCart = () => setIsCartOpen(false);
  const openCart = () => setIsCartOpen(true);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        toggleCart,
        closeCart,
        openCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
