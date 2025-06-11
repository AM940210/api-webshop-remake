import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getAdminSession() {
  const headersList = headers() as unknown as Headers; // ✅ fixar TS-fel

  const session = await auth.api.getSession({
    headers: headersList,
  });

  return session;
}
