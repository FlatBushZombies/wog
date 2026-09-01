"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LINE_EASE = [0.215, 0.61, 0.355, 1] as const;

export function TextReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.11,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <span className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: LINE_EASE, delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.035,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: LINE_EASE, delay: delay + i * stagger }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}
