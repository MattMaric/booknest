"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import Link from "next/link";

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
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={handleAddToCart}
        className="rounded-lg bg-amber-800 px-5 py-3 font-semibold text-white transition hover:bg-amber-900"
      >
        {added ? "Added to cart!" : "Add to cart"}
      </button>

      <Link
        href="/cart"
        className="font-semibold text-amber-800 hover:underline"
      >
        View cart →
      </Link>
    </div>
  );
}
