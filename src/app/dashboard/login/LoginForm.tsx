"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";
import { LogoMark } from "@/components/ui/LogoMark";
import { site } from "@/content/site";

const initialState: LoginState = { error: null };

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-background px-[1.25rem] py-[3rem]">
      <div className="w-full max-w-[24rem]">
        <div className="mb-[2rem] flex flex-col items-center gap-[0.75rem] text-center">
          <span className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full bg-ink">
            <LogoMark variant="accent" size={24} />
          </span>
          <div>
            <p className="text-[1.1rem] font-semibold tracking-tight text-ink">
              {site.name} Admin
            </p>
            <p className="mt-[0.25rem] text-[0.85rem] text-muted">
              Sign in to manage members and events.
            </p>
          </div>
        </div>

        <form action={formAction} className="flex flex-col gap-[0.875rem] rounded-[1.25rem] border border-line bg-white p-[1.5rem]">
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <label className="flex flex-col gap-[0.375rem]">
            <span className="text-[0.8rem] font-medium text-muted">Email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="username"
              className="rounded-[0.875rem] border border-line bg-white px-[1rem] py-[0.75rem] text-[0.95rem] text-ink outline-none focus-visible:border-accent"
            />
          </label>

          <label className="flex flex-col gap-[0.375rem]">
            <span className="text-[0.8rem] font-medium text-muted">Password</span>
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              className="rounded-[0.875rem] border border-line bg-white px-[1rem] py-[0.75rem] text-[0.95rem] text-ink outline-none focus-visible:border-accent"
            />
          </label>

          {state.error && (
            <p role="alert" className="text-[0.85rem] font-medium text-red-600">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-[0.5rem] rounded-full bg-ink px-[1.5rem] py-[0.875rem] text-center text-[0.9rem] font-medium text-white transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
