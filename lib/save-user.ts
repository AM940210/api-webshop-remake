import { db } from "../prisma/db";

export async function saveUserToDb(user: {
  id: string;
  email?: string;
  name?: string;
  image?: string;
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
        image: user.image,
      },
    });
  }
}
