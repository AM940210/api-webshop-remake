// app/api/session/route.ts
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  return NextResponse.json(session);
}
