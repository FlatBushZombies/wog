import { and, asc, desc, eq, gte, lt } from "drizzle-orm";
import { db } from "./index";
import { attendance, members, events, type Member } from "./schema";
import { withRetry } from "./retry";

export type Category = "women" | "men" | "youth" | "sunday_school";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export interface UpcomingEvent {
  id: string;
  title: string;
  eventDate: string;
  eventTime: string | null;
  location: string | null;
}

export async function getNextUpcomingEvent(): Promise<UpcomingEvent | null> {
  if (!db) return null;
  try {
    const rows = await withRetry(() =>
      db!
        .select({
          id: events.id,
          title: events.title,
          eventDate: events.eventDate,
          eventTime: events.eventTime,
          location: events.location,
        })
        .from(events)
        .where(gte(events.eventDate, todayIso()))
        .orderBy(asc(events.eventDate))
        .limit(1)
    );
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getMembersByCategory(category: Category): Promise<Member[]> {
  return withRetry(() =>
    db!
      .select()
      .from(members)
      .where(eq(members.category, category))
      .orderBy(asc(members.fullName))
  );
}

export async function getAllMembers(): Promise<Member[]> {
  return withRetry(() => db!.select().from(members).orderBy(asc(members.fullName)));
}

export async function getRecentMembers(limit = 5): Promise<Member[]> {
  return withRetry(() =>
    db!.select().from(members).orderBy(desc(members.createdAt)).limit(limit)
  );
}

export async function getDashboardStats() {
  const [all, upcomingEvent] = await Promise.all([getAllMembers(), getNextUpcomingEvent()]);

  const counts: Record<Category, number> = { women: 0, men: 0, youth: 0, sunday_school: 0 };
  for (const m of all) counts[m.category as Category]++;

  return {
    totalMembers: all.length,
    counts,
    upcomingEvent,
  };
}

export async function getUpcomingEvents() {
  return withRetry(() =>
    db!
      .select()
      .from(events)
      .where(gte(events.eventDate, todayIso()))
      .orderBy(asc(events.eventDate))
  );
}

export async function getPastEvents() {
  return withRetry(() =>
    db!
      .select()
      .from(events)
      .where(lt(events.eventDate, todayIso()))
      .orderBy(desc(events.eventDate))
  );
}

export async function getEventById(id: string) {
  const rows = await withRetry(() => db!.select().from(events).where(eq(events.id, id)).limit(1));
  return rows[0] ?? null;
}

export interface AttendanceListItem {
  memberId: string;
  fullName: string;
  category: Category;
  attended: boolean;
}

export async function getAttendanceForEvent(eventId: string): Promise<AttendanceListItem[]> {
  const rows = await withRetry(() =>
    db!
      .select({
        memberId: members.id,
        fullName: members.fullName,
        category: members.category,
        attended: attendance.attended,
      })
      .from(members)
      .leftJoin(
        attendance,
        and(eq(attendance.memberId, members.id), eq(attendance.eventId, eventId))
      )
      .orderBy(asc(members.fullName))
  );

  return rows.map((row) => ({
    memberId: row.memberId,
    fullName: row.fullName,
    category: row.category as Category,
    attended: row.attended ?? false,
  }));
}
