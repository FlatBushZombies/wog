"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Message } from "@/content/messages";
import { TagChip } from "../ui/TagChip";
import { PillButton } from "../ui/PillButton";

export function MessageViewer({
  message,
  onClose,
}: {
  message: Message | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [message, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(17,17,17,0.5)] px-[1.25rem] backdrop-blur-[16px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            className="w-full max-w-[36rem] overflow-hidden rounded-[2rem] bg-ink text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-viewer-heading"
          >
            <div className="flex aspect-video items-center justify-center border-b border-white/10 bg-black/40">
              <span className="text-[0.9rem] font-medium uppercase tracking-[0.1em] text-white/60">
                Watch Message
              </span>
            </div>
            <div className="p-[1.75rem]">
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/50">
                {message.category} • {message.date}
              </p>
              <h3 id="message-viewer-heading" className="mt-[0.5rem] text-[1.5rem] font-semibold tracking-tight">
                {message.title}
              </h3>
              <p className="mt-[0.25rem] text-[0.9rem] text-white/60">{message.speaker}</p>
              <p className="mt-[1rem] text-[0.95rem] text-white/70">{message.description}</p>
              <div className="mt-[1rem] flex flex-wrap gap-[0.5rem]">
                {message.tags.map((tag) => (
                  <TagChip key={tag} light>
                    {tag}
                  </TagChip>
                ))}
              </div>
              <PillButton variant="light" arrow={false} onClick={onClose} className="mt-[1.5rem]">
                Close
              </PillButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
