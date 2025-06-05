import { betterAuth } from "better-auth";
import { db } from "@/lib/db";

console.log("👉 BetterAuth config körs!");
console.log("👉 DB-adapter:", typeof db.user?.findUnique);

export const auth = betterAuth({
  adapter: db,
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  onSignIn: async ({ user }: { user: any }) => {
    console.log("✅ onSignIn körs med", user);

    let dbUser = await db.user.findUnique({
      where: { githubId: user.id },
    });

    if (!dbUser) {
      dbUser = await db.user.create({
        data: {
          githubId: user.id,
          email: user.email,
          name: user.name ?? "",
          isAdmin: false,
        },
      });
    }

    return {
      isAdmin: dbUser.isAdmin,
    };
  },
});
