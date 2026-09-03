"use client";

import { motion } from "framer-motion";
import { BookOpen, Music, Users } from "lucide-react";
import { Eyebrow } from "../ui/Eyebrow";
import { IconChip } from "../ui/IconChip";
import { faithBandItems } from "@/content/site";
import { springReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

const ICONS = {
  Word: BookOpen,
  Worship: Music,
  Community: Users,
} as const;

const VARIANT_CLASSES = {
  light: "bg-white border border-line text-ink",
  accent: "bg-gradient-to-br from-accent-light to-accent text-white",
  ghost: "bg-white border border-line text-ink",
} as const;

export function FaithBand() {
  return (
    <section aria-label="Word, Worship, Community" className="bg-background pb-[3rem] sm:pb-[4rem]">
      <div className="shell">
        <div className="mb-[2rem] text-center">
          <Eyebrow>Word, Worship, Community</Eyebrow>
        </div>

        <div className="flex flex-col items-stretch gap-[1rem] sm:flex-row sm:items-stretch">
          {faithBandItems.map((item, index) => {
            const Icon = ICONS[item.label as keyof typeof ICONS];
            const isAccent = item.variant === "accent";
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ ...springReveal, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "flex flex-1 flex-col items-center gap-[1rem] rounded-[0.5rem] px-[2rem] py-[2.5rem] text-center shadow-[0_1px_2px_rgba(16,23,63,0.04),0_16px_32px_-20px_rgba(16,23,63,0.25)]",
                  VARIANT_CLASSES[item.variant]
                )}
              >
                <IconChip icon={Icon} light={isAccent} />
                <span className="text-h3 uppercase">{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
