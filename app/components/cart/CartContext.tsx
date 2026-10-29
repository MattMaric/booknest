"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { CartItem } from "../../lib/cart";

type CartContextType = {
  items: CartItem[];
  addToCart: (bookId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(bookId: string) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.bookId === bookId);

      if (existingItem) {
        return currentItems.map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { bookId, quantity: 1 }];
    });
  }

  return (
    <CartContext.Provider value={{ items, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
