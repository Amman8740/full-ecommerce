"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type CartContextType = {
  count: number;
  addItem: () => void;
  removeItem: () => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);

  const addItem = () => setCount((c) => c + 1);
  const removeItem = () => setCount((c) => Math.max(0, c - 1));
  const clear = () => setCount(0);

  return (
    <CartContext.Provider value={{ count, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
