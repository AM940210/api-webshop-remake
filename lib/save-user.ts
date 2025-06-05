import { prisma } from "@/lib/db";

export async function saveUserToDb(user: { name?: string; email?: string; image?: string }) {
  if (!user.email) return;

  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        image: user.image,
        isAdmin: false, // default
      },
    });
  }
}
