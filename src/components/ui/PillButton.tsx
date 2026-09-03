"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/lib/smooth-scroll";
import { ArrowIcon } from "./ArrowIcon";

type Variant = "dark" | "light" | "outline" | "accent" | "white";

const VARIANT_CLASSES: Record<Variant, string> = {
  dark: "bg-ink text-white",
  light: "bg-surface text-ink",
  outline: "border border-line bg-transparent text-ink",
  accent: "bg-accent text-white",
  white: "bg-white text-accent",
};

const ARROW_BADGE_CLASSES: Record<Variant, string> = {
  dark: "bg-white/15",
  light: "bg-ink/10",
  outline: "bg-ink/5",
  accent: "bg-white/20",
  white: "bg-accent/10",
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
    "group inline-flex items-center gap-[0.75rem] rounded-[0.5rem] py-[0.75rem] pl-[1.5rem] transition-transform duration-300 ease-out hover:scale-[1.03]",
    arrow ? "pr-[0.5rem]" : "pr-[1.5rem]",
    "text-caption font-semibold normal-case tracking-normal",
    VARIANT_CLASSES[variant],
    className
  );

  const arrowBadge = arrow && (
    <span
      className={cn(
        "flex h-[2rem] w-[2rem] items-center justify-center rounded-[0.3rem] transition-transform duration-300 ease-out group-hover:translate-x-[2px]",
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
