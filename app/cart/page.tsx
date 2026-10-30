"use client";

import Image from "next/image";
import Link from "next/link";
import { books } from "../lib/books";
import { useCart } from "../components/cart/CartContext";

export default function CartPage() {
  const { items, isLoaded, removeFromCart, updateQuantity } = useCart();

  if (!isLoaded) {
    return (
      <main className="min-h-screen flex-1 bg-stone-50 text-stone-900">
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <p className="text-stone-600">Loading your cart...</p>
        </div>
      </main>
    );
  }
  const cartItems = items.flatMap((item) => {
    const book = books.find((book) => book.id === item.bookId);

    return book ? [{ ...item, book }] : [];
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <Link href="/books" className="text-sm text-amber-800 hover:underline">
          ← Continue shopping
        </Link>

        <h1 className="mt-6 text-4xl font-bold tracking-tight">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-8 text-center">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-stone-600">
              Find your next favorite book and add it to your cart.
            </p>
            <Link
              href="/books"
              className="mt-5 inline-block rounded-lg bg-amber-800 px-5 py-3 font-semibold text-white hover:bg-amber-900"
            >
              Browse books
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
            <div className="space-y-4">
              {cartItems.map(({ book, quantity }) => (
                <article
                  key={book.id}
                  className="flex gap-4 rounded-2xl border border-stone-200 bg-white p-4"
                >
                  <div className="relative h-32 w-24 shrink-0 bg-stone-100">
                    <Image
                      src={book.image}
                      alt={`Cover of ${book.title}`}
                      fill
                      sizes="96px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/books/${book.id}`}
                      className="font-bold hover:text-amber-800"
                    >
                      {book.title}
                    </Link>
                    <p className="mt-1 text-sm text-stone-600">
                      by {book.author}
                    </p>
                    <p className="mt-2 font-semibold">
                      ${book.price.toFixed(2)} each
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <label
                        htmlFor={`quantity-${book.id}`}
                        className="text-sm text-stone-600"
                      >
                        Quantity
                      </label>
                      <input
                        id={`quantity-${book.id}`}
                        type="number"
                        min="1"
                        max="99"
                        value={quantity}
                        onChange={(event) => {
                          const value = Number(event.target.value);
                          if (
                            Number.isInteger(value) &&
                            value >= 1 &&
                            value <= 99
                          ) {
                            updateQuantity(book.id, value);
                          }
                        }}
                        className="w-20 rounded-lg border border-stone-300 px-2 py-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeFromCart(book.id)}
                        className="text-sm text-red-700 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <p className="shrink-0 font-bold">
                    ${(book.price * quantity).toFixed(2)}
                  </p>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-bold">Order summary</h2>
              <div className="mt-4 flex justify-between gap-4 text-stone-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="mt-2 text-xs text-stone-500">
                Shipping and taxes are not included.
              </p>
              <button
                type="button"
                disabled
                className="mt-6 w-full cursor-not-allowed rounded-lg bg-amber-800 px-4 py-3 font-semibold text-white opacity-60"
              >
                Checkout (coming soon)
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
