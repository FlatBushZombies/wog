import { cn } from "@/lib/utils";

export function TagChip({ children, className, light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "text-caption inline-flex items-center rounded-[0.4rem] border px-[0.875rem] py-[0.4rem] uppercase tracking-[0.05em]",
        light ? "border-white/20 text-white/80" : "border-line text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
