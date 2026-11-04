
"use server";

import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";

type RegistrationResult = {
  success: boolean;
  message: string;
};

export async function registerUser(
  _previousState: RegistrationResult,
  formData: FormData
): Promise<RegistrationResult> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  // Validate input types
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return {
      success: false,
      message: "Invalid form data.",
    };
  }

  // Normalize and validate input
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  const emailIsValid =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

  if (normalizedName.length < 2 || normalizedName.length > 50) {
    return {
      success: false,
      message: "Name must be between 2 and 50 characters.",
    };
  }

  if (!emailIsValid) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      message: "Password must contain at least 8 characters.",
    };
  }

  if (new TextEncoder().encode(password).length > 72) {
    return {
      success: false,
      message: "Password is too long.",
    };
  }

  // Check whether the email is already registered
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  // Hash the password
  const passwordHash = await hash(password, 12);

  // Create the user
  try {
    await prisma.user.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        passwordHash,
      },
    });

    return {
      success: true,
      message: "Your account has been created successfully.",
    };
  } catch (error) {
    // Handle a duplicate email in case of simultaneous requests
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }

    throw error;
  }
}
