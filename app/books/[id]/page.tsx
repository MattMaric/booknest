
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { books } from "../../lib/books";

type BookDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default function BookDetailsPage({
  params,
}: BookDetailsPageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-stone-50 px-6 py-12">
          <div className="mx-auto max-w-3xl animate-pulse">
            <div className="h-4 w-36 rounded bg-stone-200" />
            <div className="mt-8 rounded-2xl border border-stone-200 bg-white p-8 sm:p-12">
              <div className="h-4 w-32 rounded bg-stone-200" />
              <div className="mt-4 h-10 w-3/4 rounded bg-stone-200" />
              <div className="mt-4 h-5 w-1/2 rounded bg-stone-200" />
              <div className="mt-10 h-24 rounded bg-stone-200" />
            </div>
          </div>
        </main>
      }
    >
      <BookDetailsContent params={params} />
    </Suspense>
  );
}

async function BookDetailsContent({
  params,
}: BookDetailsPageProps) {
  const { id } = await params;
  const book = books.find((book) => book.id === id);

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/books"
          className="text-sm text-amber-800 hover:underline"
        >
          ← Back to all books
        </Link>

        <article className="mt-8 rounded-2xl border border-stone-200 bg-white p-8 sm:p-12">
          <p className="text-sm font-medium text-amber-800">
            {book.category}
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            {book.title}
          </h1>

          <p className="mt-3 text-lg text-stone-600">
            by {book.author}
          </p>

          <div className="my-8 border-t border-stone-200" />

          <h2 className="text-lg font-semibold">
            About this book
          </h2>

          <p className="mt-3 leading-7 text-stone-600">
            {book.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-2xl font-bold">
              ${book.price.toFixed(2)}
            </p>

            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-lg bg-amber-800 px-6 py-3 font-medium text-white opacity-60"
              title="Purchasing will be implemented later"
            >
              Add to cart
            </button>
          </div>
        </article>
      </div>
    </main>
  );
}
