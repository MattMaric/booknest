import Copyright from "./components/Copyright";

const featuredBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: 18.99,
    category: "Personal Development",
  },
  {
    id: 2,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 14.99,
    category: "Fantasy",
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 32.99,
    category: "Technology",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="/" className="text-2xl font-bold tracking-tight">
            BookNest
          </a>

          <div className="flex items-center gap-6 text-sm">
            <a href="#featured" className="hover:text-amber-700">
              Browse books
            </a>
            <button type="button" className="font-medium">
              Cart (0)
            </button>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-800">
          Your next chapter starts here
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Find your next
          <span className="text-amber-800"> favorite book.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600">
          Explore stories, discover new ideas, and find books worth keeping
          on your shelf.
        </p>

        <a
          href="#featured"
          className="mt-8 inline-block rounded-lg bg-stone-900 px-6 py-3 font-medium text-white transition hover:bg-stone-700"
        >
          Explore books
        </a>
      </section>

      <section
        id="featured"
        className="border-t border-stone-200 bg-white"
      >
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-800">
              Curated for you
            </p>
            <h2 className="mt-2 text-3xl font-bold">
              Featured books
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBooks.map((book) => (
              <article
                key={book.id}
                className="rounded-xl border border-stone-200 p-6 transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-sm text-amber-800">
                  {book.category}
                </p>

                <h3 className="mt-3 text-xl font-semibold">
                  {book.title}
                </h3>

                <p className="mt-2 text-sm text-stone-600">
                  by {book.author}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="font-semibold">
                    ${book.price.toFixed(2)}
                  </span>

                  <button
                    type="button"
                    className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium transition hover:bg-stone-100"
                  >
                    View book
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 px-6 py-8 text-center text-sm text-stone-500">
        <Copyright />
      </footer>
    </main>
  );
}
