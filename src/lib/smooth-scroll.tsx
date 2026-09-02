"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface SmoothScrollContextValue {
  scrollToSection: (id: string) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollToSection: (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  },
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

function applyAdaptiveGrid() {
  const FONT_BASE = 18;
  const baseWidth = 1920;
  const coef = 0.6666;
  const w = window.innerWidth;
  const widthReduction = ((baseWidth - w) / baseWidth) * 100;
  const size = FONT_BASE - (FONT_BASE * (widthReduction * coef)) / 100;

  if (size > FONT_BASE) {
    document.documentElement.style.fontSize = `${size}px`;
  } else {
    document.documentElement.style.removeProperty("font-size");
  }
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    applyAdaptiveGrid();
    window.addEventListener("resize", applyAdaptiveGrid);

    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      const lenis = new Lenis({ smoothWheel: true });
      lenisRef.current = lenis;

      let frameId: number;
      function raf(time: number) {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      }
      frameId = requestAnimationFrame(raf);

      return () => {
        cancelAnimationFrame(frameId);
        lenis.destroy();
        window.removeEventListener("resize", applyAdaptiveGrid);
      };
    }

    return () => window.removeEventListener("resize", applyAdaptiveGrid);
  }, []);

  useEffect(() => {
    if (locked) {
      lenisRef.current?.stop();
    } else {
      lenisRef.current?.start();
    }
  }, [locked]);

  useEffect(() => {
    function onLockChange(event: Event) {
      const detail = (event as CustomEvent<boolean>).detail;
      setLocked(detail);
    }
    window.addEventListener("dmwog:scroll-lock", onLockChange);
    return () => window.removeEventListener("dmwog:scroll-lock", onLockChange);
  }, []);

  function scrollToSection(id: string) {
    const target = document.querySelector(id);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target as HTMLElement, { offset: 0 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <SmoothScrollContext.Provider value={{ scrollToSection }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
