"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/ui/LogoMark";
import { site } from "@/content/site";
import { logoutAction } from "@/app/dashboard/(app)/logout-action";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard" },
  { label: "Women", href: "/dashboard/women" },
  { label: "Men", href: "/dashboard/men" },
  { label: "Youth", href: "/dashboard/youth" },
  { label: "Sunday School", href: "/dashboard/sunday-school" },
  { label: "Events", href: "/dashboard/events" },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-[0.25rem]">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "rounded-[0.875rem] px-[1rem] py-[0.75rem] text-[0.9rem] font-medium transition-colors",
            isActive(pathname, item.href)
              ? "bg-ink text-white"
              : "text-ink/70 hover:bg-surface hover:text-ink"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function LogoutButton({ className }: { className?: string }) {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className={cn(
          "w-full rounded-[0.875rem] border border-line px-[1rem] py-[0.75rem] text-left text-[0.9rem] font-medium text-muted transition-colors hover:border-subtle hover:text-ink",
          className
        )}
      >
        Log out
      </button>
    </form>
  );
}

export function DashboardNav({ adminEmail }: { adminEmail: string }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile topbar */}
      <div className="flex items-center justify-between border-b border-line bg-white px-[1.25rem] py-[1rem] md:hidden">
        <div className="flex items-center gap-[0.5rem]">
          <LogoMark variant="black" size={22} />
          <span className="text-[0.95rem] font-semibold tracking-tight text-ink">
            {site.name} Admin
          </span>
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open dashboard menu"
          aria-expanded={drawerOpen}
          className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border border-line"
        >
          <span className="flex flex-col gap-[0.25rem]">
            <span className="h-[0.09rem] w-[1.1rem] bg-ink" />
            <span className="h-[0.09rem] w-[1.1rem] bg-ink" />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[70] flex md:hidden">
          <div
            className="absolute inset-0 bg-[rgba(17,17,17,0.4)] backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative flex h-full w-[16rem] max-w-[80vw] flex-col justify-between bg-background p-[1.25rem]">
            <div>
              <div className="mb-[1.5rem] flex items-center justify-between">
                <div className="flex items-center gap-[0.5rem]">
                  <LogoMark variant="black" size={22} />
                  <span className="text-[0.95rem] font-semibold tracking-tight text-ink">
                    {site.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="text-[1.25rem] leading-none text-muted"
                >
                  ×
                </button>
              </div>
              <NavLinks pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
            </div>
            <div className="flex flex-col gap-[0.75rem]">
              <p className="truncate text-[0.75rem] text-muted">{adminEmail}</p>
              <LogoutButton />
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-[100dvh] w-[16rem] shrink-0 flex-col justify-between border-r border-line bg-background p-[1.5rem] md:flex">
        <div>
          <div className="mb-[2rem] flex items-center gap-[0.5rem]">
            <LogoMark variant="black" size={24} />
            <span className="text-[1rem] font-semibold tracking-tight text-ink">
              {site.name} Admin
            </span>
          </div>
          <NavLinks pathname={pathname} />
        </div>
        <div className="flex flex-col gap-[0.75rem]">
          <p className="truncate text-[0.75rem] text-muted">{adminEmail}</p>
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
