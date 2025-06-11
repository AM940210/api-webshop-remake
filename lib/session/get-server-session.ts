"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getServerSession() {
  const rawHeaders = headers();
  const h = rawHeaders as unknown as Headers; // 💥 bypassar TS-buggen

  const session = await auth.api.getSession({
    headers: h,
  });

  return session;
}
