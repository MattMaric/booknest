
import Link from "next/link";

export default function BookNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-50 px-6 py-12 text-stone-900">
      <div className="max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">
          BookNest
        </p>

        <h1 className="mt-4 text-4xl font-bold tracking-tight">
          Book not found
        </h1>

        <p className="mt-4 leading-7 text-stone-600">
          Sorry, we couldn't find that book. It may have been
          removed or the link might be incorrect.
        </p>

        <Link
          href="/books"
          className="mt-8 inline-block rounded-lg bg-amber-800 px-6 py-3 font-medium text-white transition hover:bg-amber-900"
        >
          Browse all books
        </Link>
      </div>
    </main>
  );
}
