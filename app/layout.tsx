import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/cart/CartContext";
import Header from "./components/Header";
import { Suspense } from "react";

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
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 antialiased">
        <CartProvider>
          <Suspense
            fallback={
              <header className="border-b border-gray-200 bg-white">
                <nav className="mx-auto flex max-w-7xl items-center px-6 py-4">
                  <span className="text-2xl font-bold text-gray-900">
                    BookNest
                  </span>
                </nav>
              </header>
            }
          >
            <Header />
          </Suspense>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
