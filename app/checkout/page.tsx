
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import { getBooks } from "../lib/books-db";
import CheckoutContent from "./CheckoutContent";

async function CheckoutData() {
  await connection();

  const books = await getBooks();

  return <CheckoutContent books={books} />;
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/cart"
          className="text-sm text-amber-800 hover:underline"
        >
          ← Back to cart
        </Link>

        <h1 className="mt-6 text-4xl font-bold tracking-tight">
          Checkout
        </h1>

        <Suspense
          fallback={
            <p className="mt-8 text-stone-600">
              Loading checkout...
            </p>
          }
        >
          <CheckoutData />
        </Suspense>
      </div>
    </main>
  );
}
