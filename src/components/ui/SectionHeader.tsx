import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

/**
 * The repeating section-opener: a centered pill eyebrow, a centered bold
 * heading, and an optional centered one-line subtext. Content below this
 * header reverts to left-aligned text inside cards.
 */
export function SectionHeader({
  eyebrow,
  heading,
  subtext,
  light = false,
  className,
}: {
  eyebrow: string;
  heading: string;
  subtext?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-[34rem] text-center", className)}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>
      <h2 className={cn("text-h2 mt-[1.25rem]", light ? "text-white" : "text-ink")}>{heading}</h2>
      {subtext && (
        <p className={cn("text-body-lg mt-[1rem]", light ? "text-white/70" : "text-muted")}>
          {subtext}
        </p>
      )}
    </div>
  );
}
