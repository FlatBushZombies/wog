import { boolean, date, pgEnum, pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("category", ["women", "men", "youth", "sunday_school"]);

export const members = pgTable("members", {
  id: uuid("id").defaultRandom().primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  category: categoryEnum("category").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: categoryEnum("category"),
  eventDate: date("event_date").notNull(),
  eventTime: text("event_time"),
  location: text("location"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const attendance = pgTable(
  "attendance",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    eventId: uuid("event_id")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" }),
    memberId: uuid("member_id")
      .notNull()
      .references(() => members.id, { onDelete: "cascade" }),
    attended: boolean("attended").notNull().default(false),
    markedAt: timestamp("marked_at", { withTimezone: true }),
  },
  (table) => [unique("attendance_event_member_unique").on(table.eventId, table.memberId)]
);

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;
export type ChurchEventRow = typeof events.$inferSelect;
export type NewChurchEventRow = typeof events.$inferInsert;
export type AttendanceRow = typeof attendance.$inferSelect;

export const CATEGORY_LABELS: Record<(typeof categoryEnum.enumValues)[number], string> = {
  women: "Women",
  men: "Men",
  youth: "Youth",
  sunday_school: "Sunday School",
};
