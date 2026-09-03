import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Small rounded-square, accent-tinted icon chip used on feature-style cards. */
export function IconChip({
  icon: Icon,
  size = 44,
  light = false,
  className,
}: {
  icon: LucideIcon;
  size?: number;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[0.5rem]",
        light ? "bg-white/10 text-white" : "bg-accent/10 text-accent",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.45)} strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}
