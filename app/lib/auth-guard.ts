import "server-only";

import { auth } from "../../auth";
import { redirect } from "next/navigation";

export async function requireUser(callbackUrl = "/") {
  const session = await auth();

  if (!session?.user) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
    );
  }

  return session.user;
}