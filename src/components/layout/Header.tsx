"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LogoBadge } from "../ui/LogoBadge";
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
            "flex items-center justify-between rounded-[0.5rem] border border-line px-[1rem] py-[0.75rem] text-ink backdrop-blur-md transition-colors duration-300 sm:px-[1.5rem]",
            scrolled || isMenuOpen ? "bg-background/95 shadow-sm" : "bg-background/70"
          )}
        >
          <button
            type="button"
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-[0.5rem]"
            aria-label="DMWOG home"
          >
            <LogoBadge size={38} ring />
            <span className="text-h3">{site.name}</span>
          </button>

          <nav className="hidden items-center gap-[1.75rem] md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <motion.button
                key={link.label}
                type="button"
                whileHover={{ y: -2, opacity: 1 }}
                initial={{ opacity: 0.7 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="text-eyebrow"
                onClick={() =>
                  link.href === "#contact" ? openModal("connect") : scrollToSection(link.href)
                }
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-[0.625rem]">
            <div className="hidden flex-col items-end rounded-[0.4rem] border border-line px-[0.875rem] py-[0.375rem] text-right leading-[1.15] lg:flex">
              <span className="text-eyebrow opacity-60">
                {site.serviceDay}
              </span>
              <span className="text-body font-semibold">{site.serviceTimes}</span>
            </div>
            <PillButton
              variant="accent"
              arrow
              className="hidden sm:inline-flex"
              onClick={() => openModal("visit")}
            >
              Join Us
            </PillButton>
            <button
              type="button"
              onClick={openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="dmwog-nav-overlay"
              aria-label="Open menu"
              className="flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[0.4rem] border border-line"
            >
              <span className="flex flex-col gap-[0.25rem]">
                <span className="h-[0.09rem] w-[1.1rem] bg-ink" />
                <span className="h-[0.09rem] w-[1.1rem] bg-ink" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
