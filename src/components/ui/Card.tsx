import { cn } from "@/lib/utils";

/** Shared card language: white surface, small-moderate radius, subtle shadow. */
export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[0.5rem] border border-line bg-white shadow-[0_1px_2px_rgba(16,23,63,0.04),0_16px_32px_-20px_rgba(16,23,63,0.25)]",
        className
      )}
    >
      {children}
    </div>
  );
}
