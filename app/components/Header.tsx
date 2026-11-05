
import Link from "next/link";
import { auth } from "../../auth";
import { logoutUser } from "../actions/auth";
import CartLink from "./cart/CartLink";
import { connection } from "next/server";

export default async function Header() {
  await connection();
  
  const session = await auth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          BookNest
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/books"
            className="text-gray-700 transition hover:text-gray-900"
          >
            Browse books
          </Link>

          <CartLink />

          {session?.user ? (
            <>
              <span className="text-sm font-medium text-gray-700">
                Hello, {session.user.name || session.user.email}
              </span>

              <form action={logoutUser}>
                <button
                  type="submit"
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-700 transition hover:text-gray-900"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
