import { db } from "../prisma/db";

export async function getUser(sessionId: string) {
  const user = await db.user.findUnique({
    where: {
      githubId: sessionId,
    },
  });

  return user;
}
