"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, ChevronDown, Home, LogOut, Menu, Users, X } from "lucide-react";
import { LogoBadge } from "@/components/ui/LogoBadge";
import { site } from "@/content/site";
import { logoutAction } from "@/app/dashboard/(app)/logout-action";
import type { Category } from "@/lib/db/queries";
import { CATEGORY_LABELS } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

const MINISTRY_ITEMS: Array<{ label: string; href: string; category: Category }> = [
  { label: CATEGORY_LABELS.women, href: "/dashboard/women", category: "women" },
  { label: CATEGORY_LABELS.men, href: "/dashboard/men", category: "men" },
  { label: CATEGORY_LABELS.youth, href: "/dashboard/youth", category: "youth" },
  { label: CATEGORY_LABELS.sunday_school, href: "/dashboard/sunday-school", category: "sunday_school" },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function CountBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="ml-auto flex h-[1.5rem] min-w-[1.5rem] items-center justify-center rounded-full bg-navy px-[0.4rem] text-[0.95rem] font-semibold text-white">
      {count}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-[0.5rem] mt-[1.5rem] flex items-center gap-[0.375rem] px-[0.5rem] text-[0.9rem] font-semibold uppercase tracking-[0.06em] text-muted first:mt-0">
      {children}
    </p>
  );
}

function NavBody({
  pathname,
  counts,
  onNavigate,
}: {
  pathname: string;
  counts: Record<Category, number> | null;
  onNavigate?: () => void;
}) {
  const totalMembers = counts ? Object.values(counts).reduce((a, b) => a + b, 0) : 0;

  return (
    <div>
      <div className="mb-[0.5rem] flex items-center gap-[0.75rem] rounded-[1rem] border border-line bg-white px-[0.875rem] py-[0.875rem]">
        <LogoBadge size={40} ring />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.95rem] font-semibold leading-tight text-ink">{site.name}</p>
          <p className="truncate text-[0.9rem] text-muted">Admin Dashboard</p>
        </div>
        <ChevronDown size={16} className="shrink-0 text-muted" aria-hidden="true" />
      </div>

      <Link
        href="/dashboard"
        onClick={onNavigate}
        className={cn(
          "mt-[0.75rem] flex items-center gap-[0.625rem] rounded-[0.875rem] px-[0.875rem] py-[0.75rem] text-[0.95rem] font-medium transition-colors",
          isActive(pathname, "/dashboard")
            ? "bg-ink text-white"
            : "text-ink/75 hover:bg-surface hover:text-ink"
        )}
      >
        <Home size={18} aria-hidden="true" />
        Overview
      </Link>

      <SectionLabel>
        <Users size={14} aria-hidden="true" />
        Ministries
        <span className="ml-auto text-muted/70">{totalMembers}</span>
      </SectionLabel>
      <nav className="flex flex-col gap-[0.125rem]">
        {MINISTRY_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-[0.625rem] rounded-[0.875rem] px-[0.875rem] py-[0.75rem] text-[0.95rem] font-medium transition-colors",
              isActive(pathname, item.href)
                ? "bg-ink text-white"
                : "text-ink/75 hover:bg-surface hover:text-ink"
            )}
          >
            <span
              className={cn(
                "h-[0.4rem] w-[0.4rem] rounded-full",
                isActive(pathname, item.href) ? "bg-accent-light" : "bg-subtle"
              )}
            />
            {item.label}
            {counts && (
              <CountBadge
                count={counts[item.category]}
              />
            )}
          </Link>
        ))}
      </nav>

      <SectionLabel>
        <Calendar size={14} aria-hidden="true" />
        Events
      </SectionLabel>
      <Link
        href="/dashboard/events"
        onClick={onNavigate}
        className={cn(
          "flex items-center gap-[0.625rem] rounded-[0.875rem] px-[0.875rem] py-[0.75rem] text-[0.95rem] font-medium transition-colors",
          isActive(pathname, "/dashboard/events")
            ? "bg-ink text-white"
            : "text-ink/75 hover:bg-surface hover:text-ink"
        )}
      >
        <Calendar size={18} aria-hidden="true" />
        All Events
      </Link>
    </div>
  );
}

function SundayCard() {
  return (
    <div className="rounded-[1rem] bg-navy px-[1rem] py-[1rem] text-white">
      <p className="text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-white/60">
        This {site.serviceDay.replace(/s$/, "")}
      </p>
      <p className="mt-[0.25rem] text-[1.05rem] font-semibold">{site.serviceTimes}</p>
      <p className="text-[0.95rem] text-white/70">{site.address}</p>
    </div>
  );
}

function ProfileFooter({ adminEmail }: { adminEmail: string }) {
  return (
    <div className="flex flex-col gap-[0.75rem]">
      <SundayCard />
      <div className="flex items-center gap-[0.625rem] rounded-[1rem] border border-line bg-white px-[0.75rem] py-[0.625rem]">
        <span className="flex h-[2.25rem] w-[2.25rem] shrink-0 items-center justify-center rounded-full bg-accent text-[0.9rem] font-semibold text-white">
          {adminEmail.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.95rem] font-medium text-ink">{adminEmail}</p>
          <p className="flex items-center gap-[0.3rem] text-[0.95rem] text-muted">
            <span className="h-[0.4rem] w-[0.4rem] rounded-full bg-green-500" />
            Online
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            aria-label="Log out"
            className="flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <LogOut size={16} aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
}

export function DashboardNav({
  adminEmail,
  counts,
}: {
  adminEmail: string;
  counts: Record<Category, number> | null;
}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile topbar */}
      <div className="flex items-center justify-between border-b border-line bg-white px-[1.25rem] py-[1rem] md:hidden">
        <div className="flex items-center gap-[0.625rem]">
          <LogoBadge size={34} ring />
          <span className="text-[1rem] font-semibold tracking-tight text-ink">
            {site.name} Admin
          </span>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open dashboard menu"
          aria-expanded={drawerOpen}
          className="flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-full border border-line"
        >
          <Menu size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[70] flex md:hidden">
          <div
            className="absolute inset-0 bg-[rgba(17,17,17,0.4)] backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative flex h-full w-[19rem] max-w-[84vw] flex-col justify-between overflow-y-auto bg-background p-[1.25rem]">
            <div>
              <div className="mb-[0.5rem] flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-full text-muted hover:bg-surface hover:text-ink"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
              <NavBody pathname={pathname} counts={counts} onNavigate={() => setDrawerOpen(false)} />
            </div>
            <div className="mt-[1.5rem]">
              <ProfileFooter adminEmail={adminEmail} />
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-[100dvh] w-[18rem] shrink-0 flex-col justify-between overflow-y-auto border-r border-line bg-background p-[1.25rem] md:flex">
        <NavBody pathname={pathname} counts={counts} />
        <div className="mt-[1.5rem]">
          <ProfileFooter adminEmail={adminEmail} />
        </div>
      </aside>
    </>
  );
}
