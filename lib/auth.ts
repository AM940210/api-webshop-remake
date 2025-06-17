// lib/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { db } from "@/lib/db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = user.isAdmin;
      }
      return session;
    },
  },
};

//Hjälpfunktion för att hämta session i API-routes/server actions
export async function getAuthSession() {
  return getServerSession(authOptions);
}
