import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoBadge({
  size = 40,
  className,
  ring = false,
}: {
  size?: number;
  className?: string;
  ring?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white",
        ring && "ring-1 ring-black/[0.06]",
        className
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.jpeg"
        alt="DMWOG — Deliverance Ministries and The Way of God Church International"
        width={size}
        height={size}
        className="h-full w-full object-contain p-[7%]"
      />
    </span>
  );
}
