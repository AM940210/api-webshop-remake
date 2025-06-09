import { betterAuth } from "better-auth";
import { adapter } from "@/lib/auth-adapter";
import { db } from "@/lib/db";

export const auth = betterAuth({
  adapter,
  db,
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
});
