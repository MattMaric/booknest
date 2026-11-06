import { connection } from "next/server";
import { Suspense } from "react";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

async function ProfileContent() {
  await connection();

  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/profile");
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Account Information
      </h2>

      <p className="mb-2 text-gray-700">
        <strong>Name:</strong> {session.user.name}
      </p>

      <p className="text-gray-700">
        <strong>Email:</strong> {session.user.email}
      </p>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 bg-stone-50 text-stone-900">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        My Profile
      </h1>

      <Suspense
        fallback={
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            Loading profile...
          </div>
        }
      >
        <ProfileContent />
      </Suspense>
    </main>
  );
}