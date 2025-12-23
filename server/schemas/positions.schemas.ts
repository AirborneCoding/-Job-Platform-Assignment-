import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  jsonb,
  boolean,
  integer
} from "drizzle-orm/pg-core";

export const positions = pgTable("positions", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  department: varchar("department", { length: 100 }).notNull(),
  workType: varchar("work_type", { length: 50 }).notNull(),
  location: varchar("location", { length: 100 }),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
    positionId: integer("position_id").references(() => positions.id),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  resumePath: varchar("resume_path", { length: 512 }).notNull(),
  spontaneous: boolean("spontaneous").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// "db:generate": "drizzle-kit generate",
//   "db:migrate": "drizzle-kit migrate"