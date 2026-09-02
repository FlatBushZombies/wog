import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = false,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border p-[1.25rem]",
        accent ? "border-navy bg-navy text-white" : "border-line bg-white"
      )}
    >
      <div className="flex items-center justify-between">
        <p
          className={cn(
            "text-[0.95rem] font-medium uppercase tracking-[0.06em]",
            accent ? "text-white/60" : "text-muted"
          )}
        >
          {label}
        </p>
        {Icon && (
          <Icon size={18} className={accent ? "text-white/60" : "text-subtle"} aria-hidden="true" />
        )}
      </div>
      <p className="mt-[0.5rem] text-[2rem] font-semibold tracking-tight">{value}</p>
      {hint && (
        <p className={cn("mt-[0.25rem] text-[0.95rem]", accent ? "text-white/70" : "text-muted")}>
          {hint}
        </p>
      )}
    </div>
  );
}
