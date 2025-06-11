import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/db";

export const adapter = prismaAdapter(db, {
  provider: "sqlite", // eller "postgresql" om du kör det i production
});
