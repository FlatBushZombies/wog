"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoBadge } from "../ui/LogoBadge";
import { site } from "@/content/site";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { useAppReady } from "@/lib/app-ready";
import { useMediaQuery } from "@/lib/use-media-query";

const DURATION = 1300;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function PageLoader() {
  const { setReady } = useAppReady();
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    lockScroll("loader");
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = window.setTimeout(() => setVisible(false), 50);
      return () => window.clearTimeout(timer);
    }

    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const t = Math.min((now - start) / DURATION, 1);
      setProgress(Math.round(easeInOutCubic(t) * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => setVisible(false), 150);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion]);

  function handleExitComplete() {
    unlockScroll("loader");
    setReady(true);
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden rounded-b-[2rem] bg-ink text-white"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="flex flex-col items-center gap-[1rem] px-[1.5rem]"
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-[0.75rem]">
              <LogoBadge size={48} ring />
              <span className="text-[1.6rem] font-semibold tracking-tight">{site.name}</span>
            </div>
            <p className="max-w-[20rem] text-center text-[1rem] text-white/60">{site.tagline}</p>
          </motion.div>

          <motion.div
            className="mt-[3rem] w-[16rem] max-w-[70vw]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-[0.5rem] flex items-center justify-between text-[0.9rem] uppercase tracking-[0.15em] text-white/50">
              <span>Loading</span>
              <span className="tabular-nums">{String(progress).padStart(3, "0")}</span>
            </div>
            <div className="h-px w-full bg-white/15">
              <div
                className="h-full bg-accent-light"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
