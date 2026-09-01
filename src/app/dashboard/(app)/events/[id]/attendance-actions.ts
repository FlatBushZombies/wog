"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/session";
import { requireDb } from "@/lib/db";
import { attendance } from "@/lib/db/schema";
import { withRetry } from "@/lib/db/retry";

export async function setAttendance(eventId: string, memberId: string, attended: boolean) {
  await requireSession();
  const db = requireDb();

  await withRetry(() =>
    db
      .insert(attendance)
      .values({ eventId, memberId, attended, markedAt: new Date() })
      .onConflictDoUpdate({
        target: [attendance.eventId, attendance.memberId],
        set: { attended, markedAt: new Date() },
      })
  );

  revalidatePath(`/dashboard/events/${eventId}`);
}
