"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/lib/smooth-scroll";
import { ArrowIcon } from "./ArrowIcon";

type Variant = "dark" | "light" | "outline" | "accent";

const VARIANT_CLASSES: Record<Variant, string> = {
  dark: "bg-ink text-white",
  light: "bg-surface text-ink",
  outline: "border border-line bg-transparent text-ink",
  accent: "bg-accent text-white",
};

const ARROW_BADGE_CLASSES: Record<Variant, string> = {
  dark: "bg-white/15",
  light: "bg-ink/10",
  outline: "bg-ink/5",
  accent: "bg-white/20",
};

interface PillButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
}

export function PillButton({
  children,
  href,
  onClick,
  variant = "dark",
  arrow = true,
  className,
  type = "button",
}: PillButtonProps) {
  const { scrollToSection } = useSmoothScroll();

  const classes = cn(
    "group inline-flex items-center gap-[0.75rem] rounded-full py-[0.75rem] pl-[1.5rem] transition-transform duration-300 ease-out hover:scale-[1.04]",
    arrow ? "pr-[0.5rem]" : "pr-[1.5rem]",
    "text-[0.9rem] font-medium",
    VARIANT_CLASSES[variant],
    className
  );

  const arrowBadge = arrow && (
    <span
      className={cn(
        "flex h-[2rem] w-[2rem] items-center justify-center rounded-full transition-transform duration-300 ease-out group-hover:translate-x-[2px]",
        ARROW_BADGE_CLASSES[variant]
      )}
    >
      <ArrowIcon />
    </span>
  );

  if (href?.startsWith("#")) {
    return (
      <button
        type="button"
        className={classes}
        onClick={() => {
          onClick?.();
          scrollToSection(href);
        }}
      >
        <span>{children}</span>
        {arrowBadge}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        <span>{children}</span>
        {arrowBadge}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      <span>{children}</span>
      {arrowBadge}
    </button>
  );
}
