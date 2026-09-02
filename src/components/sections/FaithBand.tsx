"use client";

import { motion } from "framer-motion";
import { ArrowIcon } from "../ui/ArrowIcon";
import { faithBandItems } from "@/content/site";
import { springReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

const VARIANT_CLASSES = {
  light: "bg-surface text-ink",
  accent: "bg-gradient-to-br from-accent-light to-accent text-white",
  ghost: "bg-transparent text-ink border border-line",
} as const;

export function FaithBand() {
  return (
    <section aria-label="Word, Worship, Community" className="bg-background pb-[3rem] sm:pb-[4rem]">
      <div className="shell flex flex-col items-stretch gap-[1rem] sm:flex-row sm:items-center">
        {faithBandItems.map((item, index) => (
          <motion.div key={item.label} className="contents">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ ...springReveal, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={cn(
                "flex flex-1 items-center justify-center rounded-[0.5rem] px-[2rem] py-[2.5rem] text-center sm:py-[3.5rem]",
                VARIANT_CLASSES[item.variant]
              )}
            >
              <span className="text-h3 uppercase">
                {item.label}
              </span>
            </motion.div>

            {index === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ ...springReveal, delay: 0.25 }}
                aria-hidden="true"
                className="flex h-[3rem] w-[3rem] shrink-0 items-center justify-center self-center rounded-[0.4rem] bg-ink text-white sm:h-[3.5rem] sm:w-[3.5rem]"
              >
                <ArrowIcon />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
