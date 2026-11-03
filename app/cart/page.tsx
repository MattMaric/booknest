import { Suspense } from "react";
import { getBooks } from "../lib/books-db";
import CartContent from "./CartContent";

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex-1 bg-stone-50 px-6 py-12 text-stone-900">
          <div className="mx-auto w-full max-w-6xl">
            <p className="text-stone-600">Loading your cart...</p>
          </div>
        </main>
      }
    >
      <CartPageContent />
    </Suspense>
  );
}

async function CartPageContent() {
  const books = await getBooks();

  return <CartContent books={books} />;
}