"use server";

import { requireUser } from "../lib/auth-guard";
import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import { compare, hash } from "bcryptjs";

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

export async function changePassword(
  _previousState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  //  Verify authentication
  const user = await requireUser("/profile");

  //  Get submitted passwords
  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  if (
    typeof currentPassword !== "string" ||
    typeof newPassword !== "string" ||
    typeof confirmPassword !== "string"
  ) {
    return {
      success: false,
      message: "Invalid form data.",
    };
  }

  //  Validate passwords
  if (!currentPassword || !newPassword || !confirmPassword) {
    return {
      success: false,
      message: "All password fields are required.",
    };
  }

  if (newPassword.length < 8 || Buffer.byteLength(newPassword, "utf8") > 72) {
    return {
      success: false,
      message: "New password must be at least 8 characters and no more than 72 bytes.",
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      success: false,
      message: "New passwords do not match.",
    };
  }

  if (currentPassword === newPassword) {
    return {
      success: false,
      message: "Your new password must be different from your current password.",
    };
  }

  //  Retrieve the user's existing password hash
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      passwordHash: true,
    },
  });

  if (!dbUser) {
    return {
      success: false,
      message: "User not found.",
    };
  }

  //  Verify the current password
  const passwordIsValid = await compare(
    currentPassword,
    dbUser.passwordHash
  );

  if (!passwordIsValid) {
    return {
      success: false,
      message: "Current password is incorrect.",
    };
  }

  //  Hash the new password
  const newPasswordHash = await hash(newPassword, 12);

  //  Update the password in the database
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordHash: newPasswordHash,
    },
  });

  return {
    success: true,
    message: "Your password has been changed successfully.",
  };
}