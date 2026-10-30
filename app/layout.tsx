import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/cart/CartContext";
import CartLink from "./components/cart/CartLink";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookNest | Your Next Favorite Book",
  description:
    "Discover your next favorite book at BookNest, your online bookstore.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <header className="border-b border-stone-200 bg-white px-6 py-3">
            <div className="flex max-w-6xl items-center justify-between">
              <Link href="/" className="text-xl font-bold text-stone-900">
                BookNest
              </Link>

              <nav className="flex items-center gap-6 text-sm">
                <Link
                  href="/books"
                  className="text-stone-900 hover:text-amber-700"
                >
                  Browse books
                </Link>

                <CartLink />
              </nav>
            </div>
          </header>

          {children}
        </CartProvider>
      </body>
    </html>
  );
}
