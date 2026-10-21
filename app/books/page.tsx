
import Link from "next/link";
import { books } from "../lib/books";

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm text-amber-800 hover:underline"
        >
          ← Back to home
        </Link>

        <h1 className="mt-6 text-4xl font-bold tracking-tight">
          All Books
        </h1>

        <p className="mt-3 text-stone-600">
          Discover your next favorite read.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <article
              key={book.id}
              className="rounded-xl border border-stone-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm text-amber-800">
                {book.category}
              </p>

              <h2 className="mt-3 text-xl font-semibold">
                {book.title}
              </h2>

              <p className="mt-2 text-sm text-stone-600">
                by {book.author}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-semibold">
                  ${book.price.toFixed(2)}
                </span>

                <Link
                  href={`/books/${book.id}`}
                  className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-100"
                >
                  View details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
