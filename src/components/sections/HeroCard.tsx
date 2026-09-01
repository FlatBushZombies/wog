"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroCardSlides } from "@/content/site";
import { ArrowIcon } from "../ui/ArrowIcon";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 4500;

export function HeroCard({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % heroCardSlides.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, []);

  function go(nextDirection: 1 | -1) {
    setDirection(nextDirection);
    setIndex((prev) => (prev + nextDirection + heroCardSlides.length) % heroCardSlides.length);
  }

  const active = heroCardSlides[index];

  return (
    <div
      className={cn(
        "w-full max-w-[21rem] rounded-[1.25rem] border border-white/15 bg-white/10 p-[1.25rem] text-white backdrop-blur-md",
        className
      )}
    >
      <div className="relative h-[4.75rem] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.button
            key={active.label}
            type="button"
            onClick={() => go(1)}
            custom={direction}
            initial={{ y: direction * 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -direction * 14, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="absolute inset-0 text-left"
          >
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.1em] text-accent-light">
              {active.label}
            </p>
            <p className="mt-[0.375rem] text-[1rem] font-medium leading-snug text-white/90">
              {active.description}
            </p>
          </motion.button>
        </AnimatePresence>
      </div>

      <div className="mt-[1rem] flex items-center justify-between">
        <div className="flex items-center gap-[0.375rem]">
          {heroCardSlides.map((slide, i) => (
            <button
              key={slide.label}
              type="button"
              aria-label={`Show ${slide.label}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={cn(
                "h-[0.375rem] rounded-full transition-all duration-300",
                i === index ? "w-[1.25rem] bg-accent-light" : "w-[0.375rem] bg-white/25"
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous"
          className="flex h-[1.75rem] w-[1.75rem] items-center justify-center rounded-full border border-white/20"
        >
          <ArrowIcon className="rotate-180" />
        </button>
      </div>
    </div>
  );
}
