"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogoMark } from "../ui/LogoMark";
import { PillButton } from "../ui/PillButton";
import { navLinks, site } from "@/content/site";
import { useAppReady } from "@/lib/app-ready";
import { useUiState } from "@/lib/ui-state";
import { useSmoothScroll } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

export function Header() {
  const { ready } = useAppReady();
  const { openMenu, openModal, isMenuOpen } = useUiState();
  const { scrollToSection } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 72);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const inverted = scrolled || isMenuOpen;

  return (
    <motion.header
      initial={{ opacity: 0, y: -14 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="shell mt-[1rem] sm:mt-[1.25rem]">
        <div
          className={cn(
            "flex items-center justify-between rounded-[1.25rem] border px-[1rem] py-[0.75rem] backdrop-blur-md transition-colors duration-300 sm:px-[1.5rem]",
            inverted
              ? "border-line bg-background/90 text-ink"
              : "border-white/15 bg-white/10 text-white"
          )}
        >
          <button
            type="button"
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-[0.5rem]"
            aria-label="DMWOG home"
          >
            <LogoMark variant={inverted ? "black" : "white"} />
            <span className="text-[1rem] font-semibold tracking-tight">{site.name}</span>
          </button>

          <nav className="hidden items-center gap-[1.75rem] md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <motion.button
                key={link.label}
                type="button"
                whileHover={{ y: -2, opacity: 1 }}
                initial={{ opacity: 0.7 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="text-[0.8rem] font-medium uppercase tracking-[0.06em]"
                onClick={() =>
                  link.href === "#contact" ? openModal("connect") : scrollToSection(link.href)
                }
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-[0.625rem]">
            <div
              className={cn(
                "hidden flex-col items-end rounded-[0.875rem] border px-[0.875rem] py-[0.375rem] text-right leading-[1.15] lg:flex",
                inverted ? "border-line" : "border-white/15"
              )}
            >
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.1em] opacity-60">
                {site.serviceDay}
              </span>
              <span className="text-[0.75rem] font-semibold">{site.serviceTimes}</span>
            </div>
            <PillButton
              variant={inverted ? "dark" : "light"}
              arrow={false}
              className="hidden sm:inline-flex"
              onClick={() => openModal("visit")}
            >
              Visit Us
            </PillButton>
            <button
              type="button"
              onClick={openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="dmwog-nav-overlay"
              aria-label="Open menu"
              className={cn(
                "flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full border",
                inverted ? "border-line" : "border-white/15"
              )}
            >
              <span className="flex flex-col gap-[0.25rem]">
                <span className={cn("h-[0.09rem] w-[1.1rem]", inverted ? "bg-ink" : "bg-white")} />
                <span className={cn("h-[0.09rem] w-[1.1rem]", inverted ? "bg-ink" : "bg-white")} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
