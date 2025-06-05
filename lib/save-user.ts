import { db } from "@/lib/db";

export async function saveUserToDb(user: {
  id: string;
  email: string;
  name?: string;
}) {
  const existing = await db.user.findUnique({
    where: { githubId: user.id },
  });

  if (!existing) {
    await db.user.create({
      data: {
        githubId: user.id,
        email: user.email,
        name: user.name,
      },
    });
  }
}
