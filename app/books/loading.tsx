
export default function BooksLoading() {
  return (
    <main
      className="min-h-screen bg-stone-50 px-6 py-12 text-stone-900"
      aria-busy="true"
      aria-label="Loading books"
    >
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-4 w-28 rounded bg-stone-200" />

        <div className="mt-6 h-10 w-48 rounded bg-stone-200" />

        <div className="mt-3 h-5 w-64 max-w-full rounded bg-stone-200" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-stone-200 bg-white p-6"
            >
              <div className="h-4 w-28 rounded bg-stone-200" />
              <div className="mt-4 h-6 w-3/4 rounded bg-stone-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-stone-200" />
              <div className="mt-8 h-9 w-24 rounded bg-stone-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
