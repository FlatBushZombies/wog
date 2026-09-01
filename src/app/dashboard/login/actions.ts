"use server";

import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth/session";

export type LoginState = { error: string | null };

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/dashboard");

  const adminEmail = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!adminEmail || !adminPassword) {
    return { error: "Admin login is not configured on the server." };
  }

  if (email !== adminEmail || password !== adminPassword) {
    return { error: "Incorrect email or password." };
  }

  await createSession();
  redirect(redirectTo.startsWith("/dashboard") ? redirectTo : "/dashboard");
}
