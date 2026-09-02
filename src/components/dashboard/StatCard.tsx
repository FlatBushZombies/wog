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
        "rounded-[0.375rem] border p-[1.25rem]",
        accent ? "border-navy bg-navy text-white" : "border-line bg-white"
      )}
    >
      <div className="flex items-center justify-between">
        <p className={cn("text-eyebrow", accent ? "text-white/60" : "text-muted")}>{label}</p>
        {Icon && (
          <Icon size={18} className={accent ? "text-white/60" : "text-subtle"} aria-hidden="true" />
        )}
      </div>
      <p className="text-h2 mt-[0.5rem]">{value}</p>
      {hint && <p className={cn("text-body mt-[0.25rem]", accent ? "text-white/70" : "text-muted")}>{hint}</p>}
    </div>
  );
}
