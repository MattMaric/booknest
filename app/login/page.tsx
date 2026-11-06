import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-12">
          Loading login form...
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  );
}