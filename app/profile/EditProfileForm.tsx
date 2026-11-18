"use client";

import { useActionState } from "react";
import { updateProfileName } from "../actions/profile";

type EditProfileFormProps = {
  currentName: string;
};

const initialState = {
  success: false,
  message: "",
};

export default function EditProfileForm({
  currentName,
}: EditProfileFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateProfileName,
    initialState
  );

  return (
    <form action={formAction} className="mt-4 space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Full name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          defaultValue={currentName}
          required
          minLength={2}
          maxLength={50}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save changes"}
      </button>

      {state.message && (
        <p
          className={`text-sm ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}