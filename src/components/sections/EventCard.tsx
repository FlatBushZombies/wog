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
        <span className="text-[0.9rem] font-medium uppercase tracking-[0.1em] text-accent">
          {event.month}
        </span>
        <span className="mt-[0.25rem] text-[2.5rem] font-semibold tracking-tight text-ink sm:text-[3rem]">
          {event.day}
        </span>
      </div>

      <div>
        <h3 className="text-[1.35rem] font-semibold tracking-tight text-ink sm:text-[1.75rem]">
          {event.title}
        </h3>
        <p className="mt-[0.5rem] text-[0.9rem] text-muted">{event.description}</p>
        <div className="mt-[1rem] flex flex-wrap gap-x-[1.25rem] gap-y-[0.5rem] text-[0.9rem] font-medium uppercase tracking-[0.06em] text-muted">
          <span>{event.frequency}</span>
          <span>{event.time}</span>
          {event.location && <span>{event.location}</span>}
        </div>
        <button
          type="button"
          onClick={() => openModal("visit")}
          className="group mt-[1rem] inline-flex items-center gap-[0.375rem] text-[0.95rem] font-medium uppercase tracking-[0.05em] text-ink opacity-70 transition-all duration-300 hover:translate-x-[4px] hover:opacity-100"
        >
          Join This Event
          <ArrowIcon className="group-hover:translate-x-[3px]" />
        </button>
      </div>

      {event.image && (
        <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[1.25rem] sm:block">
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
