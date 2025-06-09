// lib/save-user.ts
import { db } from "@/lib/db";

export async function saveUserToDb(user: {
  name?: string;
  email?: string;
  image?: string;
}) {
  if (!user.email) return;

  const existingUser = await db.user.findUnique({
    where: { email: user.email },
  });

  if (existingUser) {
    return existingUser; // returnera den som finns
  }

  const createdUser = await db.user.create({
    data: {
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin: false,
    },
  });

  return createdUser;
}
