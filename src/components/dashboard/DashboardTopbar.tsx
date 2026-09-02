import { Search } from "lucide-react";
import { site } from "@/content/site";

export function DashboardTopbar({ adminEmail }: { adminEmail: string }) {
  return (
    <header className="sticky top-0 z-40 hidden items-center justify-between gap-[1rem] border-b border-line bg-background/80 px-[2rem] py-[0.875rem] backdrop-blur-md md:flex">
      <p className="text-eyebrow text-muted">{site.name} Admin</p>

      <div className="flex flex-1 items-center justify-end gap-[0.875rem]">
        <div className="relative w-full max-w-[16rem]">
          <Search size={15} className="absolute left-[0.75rem] top-1/2 -translate-y-1/2 text-subtle" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search members, events..."
            className="text-body w-full rounded-[0.4rem] border border-line bg-white py-[0.5rem] pl-[2rem] pr-[0.75rem] text-ink outline-none focus-visible:border-accent"
          />
        </div>
        <span className="flex h-[2.25rem] w-[2.25rem] shrink-0 items-center justify-center rounded-full bg-accent text-caption font-semibold text-white">
          {adminEmail.charAt(0).toUpperCase()}
        </span>
      </div>
    </header>
  );
}
