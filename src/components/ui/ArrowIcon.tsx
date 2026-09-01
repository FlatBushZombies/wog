import { cn } from "@/lib/utils";

export function ArrowIcon({ className, upRight = false }: { className?: string; upRight?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={cn("transition-transform duration-300 ease-out", className)}
      aria-hidden="true"
    >
      <path
        d={upRight ? "M4 12L12 4M12 4H5M12 4V11" : "M3 8H13M13 8L9 4M13 8L9 12"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
