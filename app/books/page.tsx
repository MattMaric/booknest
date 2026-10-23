
import Link from "next/link";
import BookCatalog from "./components/BookCatalog";
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

        <BookCatalog books={books} />
      </div>
    </main>
  );
}
