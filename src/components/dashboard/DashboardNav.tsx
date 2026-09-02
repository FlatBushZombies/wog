"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Calendar, ChevronDown, Home, LogOut, Users } from "lucide-react";
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

const TAB_ITEMS: Array<{ label: string; href: string; icon: typeof Home }> = [
  { label: "Overview", href: "/dashboard", icon: Home },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: CATEGORY_LABELS.women, href: "/dashboard/women", icon: Users },
  { label: CATEGORY_LABELS.men, href: "/dashboard/men", icon: Users },
  { label: CATEGORY_LABELS.youth, href: "/dashboard/youth", icon: Users },
  { label: "Sunday School", href: "/dashboard/sunday-school", icon: Users },
  { label: "Events", href: "/dashboard/events", icon: Calendar },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function CountBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="ml-auto flex h-[1.5rem] min-w-[1.5rem] items-center justify-center rounded-full bg-navy px-[0.4rem] text-caption font-semibold text-white">
      {count}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-eyebrow mb-[0.5rem] mt-[1.5rem] flex items-center gap-[0.375rem] px-[0.5rem] text-muted first:mt-0">
      {children}
    </p>
  );
}

function navItemClass(active: boolean) {
  return cn(
    "flex items-center gap-[0.625rem] rounded-[0.4rem] px-[0.875rem] py-[0.75rem] text-body font-medium transition-colors",
    active
      ? "bg-accent/10 text-accent-dark ring-1 ring-inset ring-accent/20"
      : "text-ink/70 hover:bg-surface hover:text-ink"
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
      <div className="mb-[0.5rem] flex items-center gap-[0.75rem] rounded-[0.4rem] border border-line bg-white px-[0.875rem] py-[0.875rem]">
        <LogoBadge size={40} ring />
        <div className="min-w-0 flex-1">
          <p className="truncate text-body font-semibold leading-tight text-ink">{site.name}</p>
          <p className="truncate text-caption text-muted">Admin Dashboard</p>
        </div>
        <ChevronDown size={16} className="shrink-0 text-muted" aria-hidden="true" />
      </div>

      <Link href="/dashboard" onClick={onNavigate} className={cn("mt-[0.75rem]", navItemClass(isActive(pathname, "/dashboard")))}>
        <Home size={18} aria-hidden="true" />
        Overview
      </Link>

      <Link
        href="/dashboard/analytics"
        onClick={onNavigate}
        className={cn("mt-[0.125rem]", navItemClass(isActive(pathname, "/dashboard/analytics")))}
      >
        <BarChart3 size={18} aria-hidden="true" />
        Analytics
      </Link>

      <SectionLabel>
        <Users size={14} aria-hidden="true" />
        Ministries
        <span className="ml-auto text-muted/70">{totalMembers}</span>
      </SectionLabel>
      <nav className="flex flex-col gap-[0.125rem]">
        {MINISTRY_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link key={item.href} href={item.href} onClick={onNavigate} className={navItemClass(active)}>
              <span className={cn("h-[0.4rem] w-[0.4rem] rounded-full", active ? "bg-accent" : "bg-subtle")} />
              {item.label}
              {counts && <CountBadge count={counts[item.category]} />}
            </Link>
          );
        })}
      </nav>

      <SectionLabel>
        <Calendar size={14} aria-hidden="true" />
        Events
      </SectionLabel>
      <Link href="/dashboard/events" onClick={onNavigate} className={navItemClass(isActive(pathname, "/dashboard/events"))}>
        <Calendar size={18} aria-hidden="true" />
        All Events
      </Link>
    </div>
  );
}

function SundayCard() {
  return (
    <div className="rounded-[0.4rem] bg-navy px-[1rem] py-[1rem] text-white">
      <p className="text-eyebrow text-white/60">This {site.serviceDay.replace(/s$/, "")}</p>
      <p className="text-body mt-[0.25rem] font-semibold">{site.serviceTimes}</p>
      <p className="text-caption text-white/70">{site.address}</p>
    </div>
  );
}

function ProfileFooter({ adminEmail }: { adminEmail: string }) {
  return (
    <div className="flex flex-col gap-[0.75rem]">
      <SundayCard />
      <div className="flex items-center gap-[0.625rem] rounded-[0.4rem] border border-line bg-white px-[0.75rem] py-[0.625rem]">
        <span className="flex h-[2.25rem] w-[2.25rem] shrink-0 items-center justify-center rounded-full bg-accent text-caption font-semibold text-white">
          {adminEmail.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-body font-medium text-ink">{adminEmail}</p>
          <p className="flex items-center gap-[0.3rem] text-caption text-muted">
            <span className="h-[0.4rem] w-[0.4rem] rounded-full bg-green-500" />
            Online
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            aria-label="Log out"
            className="flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-[0.4rem] text-muted transition-colors hover:bg-surface hover:text-ink"
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

  return (
    <>
      {/* Mobile top identity bar — slim, chrome only. Navigation lives in the bottom tab bar. */}
      <div className="flex items-center justify-between border-b border-line bg-white px-[1.25rem] py-[0.875rem] md:hidden">
        <div className="flex items-center gap-[0.625rem]">
          <LogoBadge size={32} ring />
          <span className="text-body font-semibold tracking-tight text-ink">{site.name} Admin</span>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            aria-label="Log out"
            className="flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-[0.4rem] border border-line text-muted"
          >
            <LogOut size={16} aria-hidden="true" />
          </button>
        </form>
      </div>

      {/* Mobile bottom tab bar */}
      <nav
        aria-label="Dashboard sections"
        className="fixed inset-x-0 bottom-0 z-[70] flex overflow-x-auto border-t border-line bg-white/95 backdrop-blur-md md:hidden"
      >
        {TAB_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex w-[4.5rem] shrink-0 flex-col items-center gap-[0.25rem] py-[0.625rem] text-center",
                active ? "text-accent" : "text-muted"
              )}
            >
              <Icon size={18} aria-hidden="true" />
              <span className="text-[0.7rem] font-medium leading-none">{item.label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>

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
