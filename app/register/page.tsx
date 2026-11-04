
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { registerUser } from "../actions/auth";

const initialState = {
  success: false,
  message: "",
};

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState
  );

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-12 bg-gray-50 text-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-gray-600">
            Join BookNest and discover your next favorite book.
          </p>
        </div>

        <form action={formAction} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block font-medium">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              minLength={2}
              maxLength={50}
              autoComplete="name"
              className="w-full rounded-lg border px-4 py-3"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-medium">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border px-4 py-3"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-lg border px-4 py-3"
              placeholder="At least 8 characters"
            />
          </div>

          {state.message && (
            <p
              role="status"
              aria-live="polite"
              className={
                state.success
                  ? "text-sm text-green-700"
                  : "text-sm text-red-600"
              }
            >
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-black underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
