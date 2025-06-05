// lib/db.ts
import { PrismaClient } from "@prisma/client";
export const db = new PrismaClient();
console.log("👉 BetterAuth config körs!");
console.log("👉 DB-adapter:", typeof db.user?.findUnique);

