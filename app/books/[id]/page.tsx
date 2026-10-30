import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { books } from "../../lib/books";
import Image from "next/image";
import AddToCartButton from "../../components/cart/AddToCartButton";

type BookDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default function BookDetailsPage({ params }: BookDetailsPageProps) {
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

async function BookDetailsContent({ params }: BookDetailsPageProps) {
  const { id } = await params;
  const book = books.find((book) => book.id === id);

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-12 text-stone-900">
      <div className="mx-auto max-w-3xl">
        <Link href="/books" className="text-sm text-amber-800 hover:underline">
          ← Back to all books
        </Link>

        <div className="mt-8 grid gap-8 sm:grid-cols-[minmax(0,280px)_1fr] sm:items-start">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl bg-stone-100 shadow-sm">
            <Image
              src={book.image}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(max-width: 640px) 100vw, 280px"
              className="object-contain p-4"
              priority
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">
              {book.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900">
              {book.title}
            </h1>

            <p className="mt-3 text-lg text-stone-600">by {book.author}</p>

            <p className="mt-6 leading-7 text-stone-700">{book.description}</p>

            <p className="mt-6 text-2xl font-bold text-stone-900">
              ${book.price.toFixed(2)}
            </p>
            <AddToCartButton bookId={book.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
