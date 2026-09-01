"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "../ui/LogoMark";
import { PillButton } from "../ui/PillButton";
import { navLinks, site, socialLinks } from "@/content/site";
import { useUiState } from "@/lib/ui-state";
import { useSmoothScroll } from "@/lib/smooth-scroll";

export function NavigationMenu() {
  const { isMenuOpen, closeMenu, openModal } = useUiState();
  const { scrollToSection } = useSmoothScroll();

  function handleNavigate(href: string) {
    closeMenu();
    if (href === "#contact") {
      window.setTimeout(() => openModal("connect"), 350);
    } else {
      window.setTimeout(() => scrollToSection(href), 50);
    }
  }

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          id="dmwog-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[80] flex flex-col bg-ink text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="shell flex items-center justify-between py-[1.5rem]">
            <div className="flex items-center gap-[0.5rem]">
              <LogoMark variant="accent" />
              <span className="text-[1rem] font-semibold tracking-tight">{site.name}</span>
            </div>
            <button
              type="button"
              onClick={closeMenu}
              className="flex items-center gap-[0.5rem] text-[0.8rem] font-medium uppercase tracking-[0.08em] text-white/70 hover:text-white"
            >
              Close
              <span aria-hidden="true" className="text-[1.1rem] leading-none">
                ×
              </span>
            </button>
          </div>

          <nav className="shell flex flex-1 flex-col justify-center gap-[0.5rem]" aria-label="Full navigation">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.label}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 + index * 0.045 }}
                onClick={() => handleNavigate(link.href)}
                className="group flex items-baseline gap-[1rem] py-[0.5rem] text-left"
              >
                <span className="text-[1rem] text-white/40">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-[2.5rem] font-semibold tracking-tight text-white/85 transition-colors group-hover:text-white sm:text-[3.75rem]">
                  {link.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <div className="shell flex flex-col gap-[1.25rem] border-t border-white/10 py-[1.5rem] sm:flex-row sm:items-center sm:justify-between">
            <div className="text-[0.85rem] text-white/60">
              <p className="font-medium text-white">{site.name}</p>
              <p>{site.address}</p>
            </div>
            <div className="flex items-center gap-[1.5rem]">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.8rem] font-medium uppercase tracking-[0.06em] text-white/60 transition-transform hover:scale-[1.15] hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
            <PillButton
              variant="accent"
              onClick={() => {
                closeMenu();
                window.setTimeout(() => openModal("visit"), 350);
              }}
              className="self-start sm:self-auto"
            >
              Plan Your Visit
            </PillButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
