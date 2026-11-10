"use server";

import { requireUser } from "../lib/auth-guard";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export type ProfileActionState = {
  success: boolean;
  message: string;
};

export async function updateProfileName(
  _previousState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  // Verify authentication
  const user = await requireUser("/profile");

  // Get the submitted name
  const name = formData.get("name");

  if (typeof name !== "string") {
    return {
      success: false,
      message: "Invalid form data.",
    };
  }

  const normalizedName = name.trim();

  // Validate the name
  if (normalizedName.length < 2 || normalizedName.length > 50) {
    return {
      success: false,
      message: "Name must be between 2 and 50 characters.",
    };
  }

  // Update the authenticated user's record
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: normalizedName,
    },
  });

  revalidatePath("/profile");

  return {
    success: true,
    message: "Your name has been updated successfully.",
  };
}