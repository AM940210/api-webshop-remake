// app/api/save-user/route.ts
import { NextResponse } from "next/server";
import { saveUserToDb } from "@/lib/save-user";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await saveUserToDb(body);
    return NextResponse.json(user); // returnera user inkl. isAdmin
  } catch (error) {
    console.error("API error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
