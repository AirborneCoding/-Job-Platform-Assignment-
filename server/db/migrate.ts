import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./connect";
import path from "path";

const migrationsFolder = path.join(process.cwd(), "drizzle");

export async function runMigrations() {
  console.log(" Running database migrations...");
  console.log(`Migrations folder: ${migrationsFolder}`);

  try {
    await migrate(db, { migrationsFolder });
    console.log("Migrations applied successfully");
  } catch (error: any) {
    if (error?.message?.includes("meta/_journal.json")) {
      console.error("Could not find meta/_journal.json – check the path above");
      console.error("   Make sure 'drizzle' folder (with meta/_journal.json) exists in project root");
    } else if (error?.cause?.code === "42P07") {
      console.warn("Table already exists – likely migration already applied (safe to ignore in dev)");
    } else {
      console.error("Migration failed:", error);
    }
  }
}