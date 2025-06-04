import { auth } from "@/lib/auth-server";
import { db } from "@/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const sessionResponse = await auth.handler(request); // ✅ bara skicka hela request
  const session = await sessionResponse.json();

  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
