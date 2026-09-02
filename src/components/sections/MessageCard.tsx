"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Message } from "@/content/messages";
import { ArrowIcon } from "../ui/ArrowIcon";
import { TagChip } from "../ui/TagChip";
import { site } from "@/content/site";

export function MessageCard({ message, onSelect }: { message: Message; onSelect: (message: Message) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(message)}
      whileHover={{ y: -8, scale: 1.012 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group relative flex min-h-[22rem] w-full flex-col justify-between overflow-hidden rounded-[2rem] bg-ink p-[1.5rem] text-left text-white"
    >
      <Image
        src={message.image.src}
        alt={message.image.alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover opacity-60 transition-opacity duration-500 group-hover:opacity-45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(10,10,10,0.95), rgba(10,10,10,0.35) 55%, rgba(10,10,10,0.55))",
        }}
      />

      <span
        aria-hidden="true"
        className="watermark-text pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[3rem] text-white/[0.06]"
      >
        {site.name}
      </span>

      <div className="relative z-10 flex items-center justify-between text-[0.8rem] font-medium uppercase tracking-[0.1em] text-white/70">
        <span>{message.category}</span>
        <span>{message.date}</span>
      </div>

      <div className="relative z-10">
        <h3 className="text-[1.35rem] font-semibold leading-tight tracking-tight">{message.title}</h3>
        <p className="mt-[0.375rem] text-[0.95rem] text-white/60">{message.speaker}</p>
        <div className="mt-[0.875rem] flex flex-wrap items-center justify-between gap-[0.75rem]">
          <div className="flex flex-wrap gap-[0.375rem]">
            {message.tags.map((tag) => (
              <TagChip key={tag} light>
                {tag}
              </TagChip>
            ))}
          </div>
          <span className="flex h-[2.25rem] w-[2.25rem] shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-[1.08]">
            <ArrowIcon upRight />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
