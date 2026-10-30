"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-amber-900 transition hover:bg-amber-100"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      Cart
      <span className="rounded-full bg-amber-800 px-2 py-0.5 text-xs font-bold text-white">
        {itemCount}
      </span>
    </Link>
  );
}
