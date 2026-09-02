import { cn } from "@/lib/utils";

export function TagChip({ children, className, light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-[0.875rem] py-[0.4rem] text-[0.85rem] font-medium uppercase tracking-[0.05em]",
        light ? "border-white/20 text-white/80" : "border-line text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
