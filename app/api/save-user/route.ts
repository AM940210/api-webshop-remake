import { NextRequest, NextResponse } from "next/server";
import { db } from "@/prisma/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, email, name, image } = body;

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const existing = await db.user.findUnique({
      where: { githubId: id },
    });

    if (!existing) {
      await db.user.create({
        data: {
          githubId: id,
          email,
          name,
          image,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
