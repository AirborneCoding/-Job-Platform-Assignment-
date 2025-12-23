import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const connectionString = process.env.DATABASE_URL
const client = new Client({
  connectionString,
});

export const db = drizzle(client);

export const connectDB = {
  connect: (callback: (err: Error | null) => void) => {
    client
      .connect()
      .then(() => {
        console.log("PostgreSQL connected successfully");
        callback(null);
      })
      .catch((err) => {
        console.error("PostgreSQL connection error:", err);
        callback(err);
      });
  },
};

process.on("SIGINT", async () => {
  await client.end();
  process.exit();
});
