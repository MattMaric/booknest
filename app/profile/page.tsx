import { connection } from "next/server";
import { Suspense } from "react";
import { requireUser } from "../lib/auth-guard";
import EditProfileForm from "./EditProfileForm";
import { prisma } from "../lib/prisma";

async function ProfileContent() {
  await connection();

  const sessionUser = await requireUser("/profile");

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: sessionUser.id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return (
    <div className="space-y-8">
      {/* Personal information */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Personal Information
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Full name</p>
            <p className="font-medium text-gray-900">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email address</p>
            <p className="font-medium text-gray-900">{user.email}</p>
          </div>
        </div>
        <EditProfileForm currentName={user.name ?? ""} />
      </section>

      {/* Security */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">
          Security
        </h2>

        <p className="text-sm text-gray-600">
          Manage your password and keep your account secure.
        </p>

        <p className="mt-4 text-sm text-gray-500">
          Password management coming soon.
        </p>
      </section>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12 bg-stone-50 text-stone-900">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          My Profile
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your personal information and account security.
        </p>
      </div>

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