"use client";

import { useState } from "react";
import Link from "next/link";
import type { Book } from "../../lib/books";
import Image from "next/image";

type BookCatalogProps = {
  books: Book[];
};

export default function BookCatalog({ books }: BookCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(books.map((book) => book.category))),
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch = `${book.title} ${book.author}`
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="mt-8 grid gap-4 sm:grid-cols-[2fr_1fr]">
        <div>
          <label
            htmlFor="book-search"
            className="mb-2 block text-sm font-medium"
          >
            Search books
          </label>
          <input
            id="book-search"
            type="search"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
          />
        </div>

        <div>
          <label
            htmlFor="book-category"
            className="mb-2 block text-sm font-medium"
          >
            Category
          </label>
          <select
            id="book-category"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 outline-none focus:border-amber-700 focus:ring-2 focus:ring-amber-700/20"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-stone-600" aria-live="polite">
        {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"}{" "}
        found
      </p>

      {filteredBooks.length > 0 ? (
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <article
              key={book.id}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[3/4] w-full bg-stone-100">
                <Image
                  src={book.image}
                  alt={`Cover of ${book.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-4"
                />
              </div>

              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
                  {book.category}
                </p>

                <h2 className="mt-2 text-xl font-bold text-stone-900">
                  {book.title}
                </h2>

                <p className="mt-1 text-sm text-stone-600">by {book.author}</p>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-lg font-bold text-stone-900">
                    ${book.price.toFixed(2)}
                  </span>

                  <Link
                    href={`/books/${book.id}`}
                    className="rounded-lg bg-amber-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-900"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-dashed border-stone-300 px-6 py-12 text-center">
          <h2 className="text-lg font-semibold">No books found</h2>
          <p className="mt-2 text-stone-600">
            Try another search term or select a different category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-4 rounded-lg bg-amber-800 px-4 py-2 text-sm font-medium text-white hover:bg-amber-900"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
