"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ChurchEvent } from "@/content/events";
import { ArrowIcon } from "../ui/ArrowIcon";
import { useUiState } from "@/lib/ui-state";

export function EventCard({ event }: { event: ChurchEvent }) {
  const { openModal } = useUiState();

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="grid grid-cols-[4.5rem_1fr] gap-[1.25rem] border-t border-line py-[1.75rem] sm:grid-cols-[5.5rem_1fr_16rem] sm:gap-[1.75rem]"
    >
      <div className="flex flex-col leading-none">
        <span className="text-caption uppercase tracking-[0.1em] text-accent">
          {event.month}
        </span>
        <span className="text-h1 mt-[0.25rem] text-ink">
          {event.day}
        </span>
      </div>

      <div>
        <h3 className="text-h3 text-ink">
          {event.title}
        </h3>
        <p className="text-body mt-[0.5rem] text-muted">{event.description}</p>
        <div className="text-caption mt-[1rem] flex flex-wrap gap-x-[1.25rem] gap-y-[0.5rem] uppercase tracking-[0.06em] text-muted">
          <span>{event.frequency}</span>
          <span>{event.time}</span>
          {event.location && <span>{event.location}</span>}
        </div>
        <button
          type="button"
          onClick={() => openModal("visit")}
          className="text-caption group mt-[1rem] inline-flex items-center gap-[0.375rem] uppercase tracking-[0.05em] text-ink opacity-70 transition-all duration-300 hover:translate-x-[4px] hover:opacity-100"
        >
          Join This Event
          <ArrowIcon className="group-hover:translate-x-[3px]" />
        </button>
      </div>

      {event.image && (
        <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[0.5rem] sm:block">
          <Image
            src={event.image.src}
            alt={event.image.alt}
            fill
            sizes="16rem"
            className="object-cover"
          />
        </div>
      )}
    </motion.article>
  );
}
