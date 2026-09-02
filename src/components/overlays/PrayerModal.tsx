"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useUiState, type ModalIntent } from "@/lib/ui-state";
import { LogoBadge } from "../ui/LogoBadge";
import { Eyebrow } from "../ui/Eyebrow";
import { PillButton } from "../ui/PillButton";
import { cn } from "@/lib/utils";

const INTENT_OPTIONS: { value: ModalIntent; label: string }[] = [
  { value: "prayer", label: "I need prayer" },
  { value: "visit", label: "I'd like to visit" },
  { value: "connect", label: "I'd like to connect" },
  { value: "info", label: "I'd like more information" },
];

type Status = "idle" | "sending" | "success";

function PrayerModalPanel({ intent, onClose }: { intent: ModalIntent; onClose: () => void }) {
  const [selectedIntent, setSelectedIntent] = useState<ModalIntent>(intent);
  const [status, setStatus] = useState<Status>("idle");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 100);
    return () => window.clearTimeout(timer);
  }, []);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("success"), 900);
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-[1.25rem] py-[1rem] text-center">
        <LogoBadge size={64} ring />
        <h3 className="text-[1.6rem] font-semibold tracking-tight text-ink">
          Thank you for reaching out.
        </h3>
        <p className="text-[1.05rem] text-muted">
          Your message has been received. Someone from the DMWOG community will be in touch with
          you soon.
        </p>
        <PillButton onClick={onClose} variant="dark" arrow={false} className="mt-[0.5rem]">
          Close
        </PillButton>
      </div>
    );
  }

  return (
    <>
      <Eyebrow className="mb-[0.75rem]">Prayer &amp; Connection</Eyebrow>
      <h3 id="prayer-modal-heading" className="mb-[1.5rem] text-[1.5rem] font-semibold tracking-tight text-ink">
        How can we pray with you?
      </h3>

      <div className="mb-[1.25rem] flex flex-wrap gap-[0.5rem]">
        {INTENT_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setSelectedIntent(option.value)}
            className={cn(
              "rounded-full border px-[0.875rem] py-[0.45rem] text-[0.9rem] font-medium transition-colors",
              selectedIntent === option.value
                ? "border-ink bg-ink text-white"
                : "border-line text-muted hover:border-subtle"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <form className="flex flex-col gap-[0.875rem]" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-[0.375rem]">
          <span className="text-[0.9rem] font-medium text-muted">Name</span>
          <input
            ref={firstFieldRef}
            required
            type="text"
            name="name"
            className="rounded-[0.875rem] border border-line bg-white px-[1rem] py-[0.75rem] text-[0.95rem] text-ink outline-none focus-visible:border-accent"
          />
        </label>
        <label className="flex flex-col gap-[0.375rem]">
          <span className="text-[0.9rem] font-medium text-muted">Email or Phone</span>
          <input
            required
            type="text"
            name="contact"
            className="rounded-[0.875rem] border border-line bg-white px-[1rem] py-[0.75rem] text-[0.95rem] text-ink outline-none focus-visible:border-accent"
          />
        </label>
        <label className="flex flex-col gap-[0.375rem]">
          <span className="text-[0.9rem] font-medium text-muted">How can we pray with you?</span>
          <textarea
            required
            name="message"
            rows={3}
            className="resize-none rounded-[0.875rem] border border-line bg-white px-[1rem] py-[0.75rem] text-[0.95rem] text-ink outline-none focus-visible:border-accent"
          />
        </label>

        <PillButton type="submit" variant="dark" className="mt-[0.5rem] justify-center self-stretch">
          {status === "sending" ? "Sending..." : "Send Request"}
        </PillButton>
      </form>
    </>
  );
}

export function PrayerModal() {
  const { isModalOpen, modalIntent, closeModal } = useUiState();

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-[rgba(17,17,17,0.3)] px-0 backdrop-blur-[16px] sm:items-center sm:px-[1.25rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeModal}
          role="presentation"
        >
          <motion.div
            className="w-full max-w-[28rem] rounded-t-[2rem] bg-background p-[1.75rem] sm:rounded-[2rem] sm:p-[2.25rem]"
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="prayer-modal-heading"
          >
            <PrayerModalPanel intent={modalIntent} onClose={closeModal} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
