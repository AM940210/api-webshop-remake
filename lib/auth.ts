import { betterAuth } from "better-auth";
import { adapter } from "@/lib/auth-adapter";
import { db } from "@/lib/db";

type SessionContext = {
  session: {
    user?: {
      email?: string | null;
      name?: string | null;
      image?: string | null;
      isAdmin?: boolean;
    };
    expires?: string;
  };
};

type SignInContext = {
  user: {
    email?: string | null;
    name?: string | null;
    image?: string | null;
  };
};

export const auth = betterAuth({
  adapter,
  db,
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  callbacks: {
    async signIn({ user }: SignInContext) {
      if (!user.email) return false;

      const existingUser = await db.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        await db.user.create({
          data: {
            email: user.email,
            name: user.name ?? "",
            image: user.image ?? "",
            isAdmin: false, // sätts manuellt i Prisma Studio
          },
        });
      }

      return true;
    },

    async session({ session }: SessionContext) {
      if (!session.user?.email) return session;

      const user = await db.user.findUnique({
        where: { email: session.user.email },
        select: { isAdmin: true },
      });

      if (user?.isAdmin) {
        session.user.isAdmin = true;
      }

      return session;
    },
  },
});
