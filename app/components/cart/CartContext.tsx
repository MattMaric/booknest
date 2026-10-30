"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { CartItem } from "../../lib/cart";

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  isLoaded: boolean;
  addToCart: (bookId: string) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("booknest-cart");

      if (storedCart) {
        const parsed: unknown = JSON.parse(storedCart);

        if (Array.isArray(parsed)) {
          const validItems = parsed.filter(
            (item): item is CartItem =>
              typeof item === "object" &&
              item !== null &&
              "bookId" in item &&
              typeof item.bookId === "string" &&
              "quantity" in item &&
              typeof item.quantity === "number" &&
              Number.isInteger(item.quantity) &&
              item.quantity > 0,
          );

          setItems(validItems);
        }
      }
    } catch {
      console.error("Failed to load the saved cart.");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      localStorage.setItem("booknest-cart", JSON.stringify(items));
    } catch {
      console.error("Failed to save the cart.");
    }
  }, [items, isLoaded]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

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

  function removeFromCart(bookId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.bookId !== bookId),
    );
  }

  function updateQuantity(bookId: string, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(bookId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.bookId === bookId ? { ...item, quantity } : item,
      ),
    );
  }

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        isLoaded,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
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
