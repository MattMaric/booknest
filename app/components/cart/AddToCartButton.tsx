"use client";

import { useState } from "react";
import { useCart } from "./CartContext";

type AddToCartButtonProps = {
  bookId: string;
};

export default function AddToCartButton({ bookId }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(bookId);
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="mt-6 rounded-lg bg-amber-800 px-5 py-3 font-semibold text-white transition hover:bg-amber-900"
    >
      {added ? "Added to cart!" : "Add to cart"}
    </button>
  );
}
