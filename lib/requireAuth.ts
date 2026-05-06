import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAuth(
  roles?: string[],
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  if (roles && !roles.includes(session?.user?.role)) {
    redirect("/unauthorized");
  }

  return session;
}
