"use client";

import { motion } from "framer-motion";
import type { Ministry } from "@/content/ministries";
import { ArrowIcon } from "../ui/ArrowIcon";

export function MinistryRow({ ministry }: { ministry: Ministry }) {
  return (
    <motion.div
      whileHover="hover"
      className="group grid cursor-pointer grid-cols-[3rem_1fr_auto] items-center gap-[1rem] border-t border-line px-[0.5rem] py-[1.5rem] transition-colors duration-300 hover:bg-surface sm:grid-cols-[4rem_1fr_20rem_auto] sm:px-[1rem] sm:py-[2rem]"
    >
      <span className="text-[0.9rem] text-muted">{ministry.number}</span>
      <h3 className="text-[1.5rem] font-semibold tracking-tight text-ink sm:text-[2rem]">
        {ministry.title}
      </h3>
      <p className="hidden text-[0.9rem] text-muted sm:block">{ministry.description}</p>
      <motion.span
        variants={{ hover: { x: 5 } }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
        className="flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center rounded-full border border-line text-ink"
      >
        <ArrowIcon />
      </motion.span>
    </motion.div>
  );
}
