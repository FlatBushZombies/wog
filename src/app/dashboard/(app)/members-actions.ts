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
  church: z.string().trim().optional().transform((v) => (v && v.length > 0 ? v : "Word of Grace")),
  branch: z.string().trim().optional().transform((v) => (v && v.length > 0 ? v : "Main Branch")),
  addedBy: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  category: categorySchema,
});

function revalidateCategory(category: z.infer<typeof categorySchema>) {
  revalidatePath(CATEGORY_PATH[category]);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/members");
}

export type MemberActionResponse = {
  success: boolean;
  error?: string;
};

export async function createMember(formData: FormData): Promise<MemberActionResponse> {
  try {
    const session = await requireSession();
    const db = requireDb();

    const parsed = memberSchema.safeParse({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      church: formData.get("church"),
      branch: formData.get("branch"),
      addedBy: formData.get("addedBy") || session?.role || "Admin",
      notes: formData.get("notes"),
      category: formData.get("category"),
    });

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid member details" };
    }

    await withRetry(() =>
      db.insert(members).values({
        fullName: parsed.data.fullName,
        email: parsed.data.email ?? null,
        phone: parsed.data.phone || null,
        church: parsed.data.church,
        branch: parsed.data.branch,
        addedBy: parsed.data.addedBy || null,
        notes: parsed.data.notes || null,
        category: parsed.data.category,
      })
    );

    revalidateCategory(parsed.data.category);
    return { success: true };
  } catch (err: unknown) {
    console.error("createMember error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to create member due to a database error.",
    };
  }
}

export async function updateMember(formData: FormData): Promise<MemberActionResponse> {
  try {
    await requireSession();
    const db = requireDb();

    const id = String(formData.get("id") ?? "");
    if (!id) return { success: false, error: "Missing member id" };

    const parsed = memberSchema.safeParse({
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      church: formData.get("church"),
      branch: formData.get("branch"),
      addedBy: formData.get("addedBy"),
      notes: formData.get("notes"),
      category: formData.get("category"),
    });

    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid member details" };
    }

    await withRetry(() =>
      db
        .update(members)
        .set({
          fullName: parsed.data.fullName,
          email: parsed.data.email ?? null,
          phone: parsed.data.phone || null,
          church: parsed.data.church,
          branch: parsed.data.branch,
          addedBy: parsed.data.addedBy || null,
          notes: parsed.data.notes || null,
          category: parsed.data.category,
        })
        .where(eq(members.id, id))
    );

    revalidateCategory(parsed.data.category);
    return { success: true };
  } catch (err: unknown) {
    console.error("updateMember error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to update member due to a server error.",
    };
  }
}

export async function deleteMember(formData: FormData): Promise<MemberActionResponse> {
  try {
    await requireSession();
    const db = requireDb();

    const id = String(formData.get("id") ?? "");
    const categoryResult = categorySchema.safeParse(formData.get("category"));
    if (!id) return { success: false, error: "Missing member id" };
    if (!categoryResult.success) return { success: false, error: "Invalid category" };

    await withRetry(() => db.delete(members).where(eq(members.id, id)));

    revalidateCategory(categoryResult.data);
    return { success: true };
  } catch (err: unknown) {
    console.error("deleteMember error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete member due to a server error.",
    };
  }
}
