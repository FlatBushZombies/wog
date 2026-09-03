"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ChurchEvent } from "@/content/events";
import { ArrowIcon } from "../ui/ArrowIcon";
import { TagChip } from "../ui/TagChip";
import { useUiState } from "@/lib/ui-state";

export function EventCard({ event }: { event: ChurchEvent }) {
  const { openModal } = useUiState();
  const isRecurring = event.frequency.toLowerCase().startsWith("every");

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="flex h-full flex-col overflow-hidden rounded-[0.5rem] border border-line bg-white shadow-[0_1px_2px_rgba(16,23,63,0.04),0_16px_32px_-20px_rgba(16,23,63,0.25)]"
    >
      {event.image ? (
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-[0.5rem]">
          <Image
            src={event.image.src}
            alt={event.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute left-[0.875rem] top-[0.875rem] flex h-[3.25rem] w-[3.25rem] flex-col items-center justify-center rounded-[0.4rem] bg-white leading-none shadow-sm">
            <span className="text-caption font-semibold uppercase tracking-[0.08em] text-accent">
              {event.month}
            </span>
            <span className="text-h3 mt-[0.125rem] text-ink">{event.day}</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-[1rem] bg-accent/10 p-[1.5rem]">
          <div className="flex h-[3.25rem] w-[3.25rem] shrink-0 flex-col items-center justify-center rounded-[0.4rem] bg-white leading-none shadow-sm">
            <span className="text-caption font-semibold uppercase tracking-[0.08em] text-accent">
              {event.month}
            </span>
            <span className="text-h3 mt-[0.125rem] text-ink">{event.day}</span>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col p-[1.5rem]">
        <TagChip className={isRecurring ? "border-accent/30 text-accent" : ""}>
          {event.frequency}
        </TagChip>

        <h3 className="text-h3 mt-[0.875rem] text-ink">{event.title}</h3>
        <p className="text-body mt-[0.5rem] flex-1 text-muted">{event.description}</p>

        <div className="text-caption mt-[1rem] flex flex-wrap gap-x-[1rem] gap-y-[0.375rem] uppercase tracking-[0.06em] text-muted">
          <span>{event.time}</span>
          {event.location && <span>{event.location}</span>}
        </div>

        <button
          type="button"
          onClick={() => openModal("visit")}
          className="text-caption group mt-[1.25rem] inline-flex w-fit items-center gap-[0.375rem] uppercase tracking-[0.05em] text-ink opacity-70 transition-all duration-300 hover:translate-x-[4px] hover:opacity-100"
        >
          Join This Event
          <ArrowIcon className="group-hover:translate-x-[3px]" />
        </button>
      </div>
    </motion.article>
  );
}
