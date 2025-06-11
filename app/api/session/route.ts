import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const h = (await import("next/headers")).headers(); // Importera korrekt
  const headers = await h;

  const session = await auth.api.getSession({
    headers: headers as Headers,
  });

  return NextResponse.json(session);
}
