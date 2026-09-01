"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { requireSession } from "@/lib/auth/session";
import { requireDb } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { withRetry } from "@/lib/db/retry";

const eventSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional(),
  category: z.enum(["women", "men", "youth", "sunday_school", ""]).optional(),
  eventDate: z.string().trim().min(1, "Date is required"),
  eventTime: z.string().trim().optional(),
  location: z.string().trim().optional(),
});

function parseEventForm(formData: FormData) {
  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    category: formData.get("category"),
    eventDate: formData.get("eventDate"),
    eventTime: formData.get("eventTime"),
    location: formData.get("location"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid event details");
  }

  return {
    title: parsed.data.title,
    description: parsed.data.description || null,
    category: parsed.data.category ? parsed.data.category : null,
    eventDate: parsed.data.eventDate,
    eventTime: parsed.data.eventTime || null,
    location: parsed.data.location || null,
  };
}

function revalidateEvents() {
  revalidatePath("/dashboard/events");
  revalidatePath("/dashboard");
  revalidatePath("/");
}

export async function createEvent(formData: FormData) {
  await requireSession();
  const db = requireDb();
  const data = parseEventForm(formData);

  await withRetry(() => db.insert(events).values(data));
  revalidateEvents();
}

export async function updateEvent(formData: FormData) {
  await requireSession();
  const db = requireDb();

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing event id");

  const data = parseEventForm(formData);
  await withRetry(() => db.update(events).set(data).where(eq(events.id, id)));
  revalidateEvents();
}

export async function deleteEvent(formData: FormData) {
  await requireSession();
  const db = requireDb();

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing event id");

  await withRetry(() => db.delete(events).where(eq(events.id, id)));
  revalidateEvents();
  redirect("/dashboard/events");
}
