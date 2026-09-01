import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return drizzle(neon(url), { schema });
}

export const db = getDb();

export function requireDb() {
  if (!db) {
    throw new Error(
      "DATABASE_URL is not configured. Add it to .env.local and restart the server."
    );
  }
  return db;
}
