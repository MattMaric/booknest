"use client";

import Link from "next/link";
import { useCart } from "../components/cart/CartContext";
import type { Book } from "../lib/books";

type CheckoutContentProps = {
  books: Book[];
};

export default function CheckoutContent({
  books,
}: CheckoutContentProps) {
  const { items, isLoaded } = useCart();

  if (!isLoaded) {
    return <p className="mt-8 text-stone-600">Loading checkout...</p>;
  }

  const cartItems = items.flatMap((item) => {
    const book = books.find((book) => book.id === item.bookId);

    return book ? [{ ...item, book }] : [];
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-8 text-center">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>

        <p className="mt-2 text-stone-600">
          Add some books before proceeding to checkout.
        </p>

        <Link
          href="/books"
          className="mt-5 inline-block rounded-lg bg-amber-800 px-5 py-3 font-semibold text-white hover:bg-amber-900"
        >
          Browse books
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
      <section className="space-y-4">
        {cartItems.map(({ book, quantity }) => (
          <article
            key={book.id}
            className="flex justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-5"
          >
            <div>
              <h2 className="font-bold">{book.title}</h2>

              <p className="mt-1 text-sm text-stone-600">
                by {book.author}
              </p>

              <p className="mt-2 text-sm text-stone-600">
                Quantity: {quantity}
              </p>
            </div>

            <p className="shrink-0 font-semibold">
              ${(book.price * quantity).toFixed(2)}
            </p>
          </article>
        ))}
      </section>

      <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-bold">Order summary</h2>

        <div className="mt-4 flex justify-between">
          <span className="text-stone-600">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>

        <p className="mt-2 text-xs text-stone-500">
          Shipping and taxes are not included.
        </p>
      </aside>
    </div>
  );
}