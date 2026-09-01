import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "./ArrowIcon";

export function AnimatedLink({
  href,
  children,
  className,
  external,
  arrow,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  arrow?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-[0.375rem] opacity-70 transition-all duration-300 ease-out hover:translate-x-[4px] hover:opacity-100",
        className
      )}
    >
      {children}
      {arrow && (
        <ArrowIcon upRight={external} className="group-hover:translate-x-[3px]" />
      )}
    </Link>
  );
}
