"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { requireSession } from "@/lib/auth/session";
import { requireDb } from "@/lib/db";
import { members } from "@/lib/db/schema";
import { withRetry } from "@/lib/db/retry";

const categorySchema = z.enum(["women", "men", "youth", "sunday_school"]);

const CATEGORY_PATH: Record<z.infer<typeof categorySchema>, string> = {
  women: "/dashboard/women",
  men: "/dashboard/men",
  youth: "/dashboard/youth",
  sunday_school: "/dashboard/sunday-school",
};

const memberSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required"),
  email: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email"),
  phone: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  category: categorySchema,
});

function revalidateCategory(category: z.infer<typeof categorySchema>) {
  revalidatePath(CATEGORY_PATH[category]);
  revalidatePath("/dashboard");
}

export async function createMember(formData: FormData) {
  await requireSession();
  const db = requireDb();

  const parsed = memberSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    notes: formData.get("notes"),
    category: formData.get("category"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid member details");
  }

  await withRetry(() =>
    db.insert(members).values({
      fullName: parsed.data.fullName,
      email: parsed.data.email ?? null,
      phone: parsed.data.phone || null,
      notes: parsed.data.notes || null,
      category: parsed.data.category,
    })
  );

  revalidateCategory(parsed.data.category);
}

export async function updateMember(formData: FormData) {
  await requireSession();
  const db = requireDb();

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing member id");

  const parsed = memberSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    notes: formData.get("notes"),
    category: formData.get("category"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid member details");
  }

  await withRetry(() =>
    db
      .update(members)
      .set({
        fullName: parsed.data.fullName,
        email: parsed.data.email ?? null,
        phone: parsed.data.phone || null,
        notes: parsed.data.notes || null,
        category: parsed.data.category,
      })
      .where(eq(members.id, id))
  );

  revalidateCategory(parsed.data.category);
}

export async function deleteMember(formData: FormData) {
  await requireSession();
  const db = requireDb();

  const id = String(formData.get("id") ?? "");
  const category = categorySchema.parse(formData.get("category"));
  if (!id) throw new Error("Missing member id");

  await withRetry(() => db.delete(members).where(eq(members.id, id)));

  revalidateCategory(category);
}
