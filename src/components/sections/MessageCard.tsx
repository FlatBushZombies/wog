"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Message } from "@/content/messages";
import { ArrowIcon } from "../ui/ArrowIcon";
import { TagChip } from "../ui/TagChip";

export function MessageCard({ message, onSelect }: { message: Message; onSelect: (message: Message) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(message)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[0.5rem] border border-line bg-white text-left shadow-[0_1px_2px_rgba(16,23,63,0.04),0_16px_32px_-20px_rgba(16,23,63,0.25)]"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-[0.5rem]">
        <Image
          src={message.image.src}
          alt={message.image.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[4.5rem]"
          style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.55), rgba(10,10,10,0))" }}
        />
        <div className="absolute left-[0.875rem] top-[0.875rem]">
          <TagChip light>{message.category}</TagChip>
        </div>
        <span className="text-caption absolute right-[0.875rem] top-[0.875rem] text-white/90">
          {message.date}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-[1.5rem]">
        <div>
          <h3 className="text-h3 text-ink">{message.title}</h3>
          <p className="text-body mt-[0.375rem] text-muted">{message.speaker}</p>
        </div>
        <div className="mt-[1.25rem] flex flex-wrap items-center justify-between gap-[0.75rem]">
          <div className="flex flex-wrap gap-[0.375rem]">
            {message.tags.map((tag) => (
              <TagChip key={tag}>{tag}</TagChip>
            ))}
          </div>
          <span className="flex h-[2.25rem] w-[2.25rem] shrink-0 items-center justify-center rounded-[0.4rem] bg-accent/10 text-accent transition-transform duration-300 group-hover:rotate-45 group-hover:scale-[1.08]">
            <ArrowIcon upRight />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
