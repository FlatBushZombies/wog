"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";
import { LogoBadge } from "@/components/ui/LogoBadge";
import { site } from "@/content/site";

const initialState: LoginState = { error: null };

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-background px-[1.25rem] py-[3rem]">
      <div className="w-full max-w-[26rem]">
        <div className="mb-[2rem] flex flex-col items-center gap-[0.875rem] text-center">
          <LogoBadge size={72} ring />
          <div>
            <p className="text-h3 text-ink">
              {site.name} Admin
            </p>
            <p className="text-body mt-[0.25rem] text-muted">
              Sign in to manage members and events.
            </p>
          </div>
        </div>

        <form
          action={formAction}
          className="flex flex-col gap-[1rem] rounded-[0.375rem] border border-line bg-white p-[1.75rem] shadow-[0_1px_0_rgba(0,0,0,0.02)]"
        >
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <label className="flex flex-col gap-[0.375rem]">
            <span className="text-caption font-medium text-muted">Email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="username"
              className="text-body-lg rounded-[0.4rem] border border-line bg-white px-[1.125rem] py-[0.875rem] text-ink outline-none focus-visible:border-accent"
            />
          </label>

          <label className="flex flex-col gap-[0.375rem]">
            <span className="text-caption font-medium text-muted">Password</span>
            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              className="text-body-lg rounded-[0.4rem] border border-line bg-white px-[1.125rem] py-[0.875rem] text-ink outline-none focus-visible:border-accent"
            />
          </label>

          {state.error && (
            <p role="alert" className="text-body font-medium text-accent">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="text-body mt-[0.5rem] rounded-[0.4rem] bg-navy px-[1.5rem] py-[1rem] text-center font-medium text-white transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
