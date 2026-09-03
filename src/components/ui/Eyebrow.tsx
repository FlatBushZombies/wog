import { cn } from "@/lib/utils";

export function Eyebrow({ children, className, light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <span
      className={cn(
        "text-eyebrow inline-flex items-center gap-[0.5rem] rounded-full px-[1rem] py-[0.5rem]",
        light ? "bg-white/10 text-white/80" : "bg-accent/10 text-accent",
        className
      )}
    >
      <span className={cn("h-[0.375rem] w-[0.375rem] rounded-full", light ? "bg-accent-light" : "bg-accent")} />
      {children}
    </span>
  );
}
