"use client";

import type { LucideIcon } from "lucide-react";
import { Share2, ArrowRight } from "lucide-react";
import { site, socialLinks, footerContent } from "@/content/site";
import { PillButton } from "../ui/PillButton";
import { AnimatedLink } from "../ui/AnimatedLink";
import { LogoBadge } from "../ui/LogoBadge";
import { useUiState } from "@/lib/ui-state";

const SOCIAL_ICONS: Record<string, LucideIcon> = {
  Facebook: Share2,
};

export function Footer() {
  const { openModal } = useUiState();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="shell relative z-10 py-[3.5rem] sm:py-[4.5rem]">
        <div className="flex flex-col gap-[1.5rem] border-b border-white/10 pb-[2.5rem] sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-h2 max-w-[24rem]">
            Come worship with us.
          </h2>
          <PillButton variant="accent" onClick={() => openModal("visit")}>
            Plan Your Visit
          </PillButton>
        </div>

        <div className="grid grid-cols-2 gap-x-[1.5rem] gap-y-[2.5rem] pt-[2.5rem] sm:grid-cols-4">
          <div>
            <div className="mb-[0.875rem] flex items-center gap-[0.625rem]">
              <LogoBadge size={40} ring />
              <p className="text-h3">{site.name}</p>
            </div>
            <p className="text-body max-w-[14rem] text-white/60">{site.tagline}</p>
            <div className="mt-[1.25rem] flex items-center gap-[0.625rem]">
              {socialLinks.map((social) => {
                const Icon = SOCIAL_ICONS[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-[2.25rem] w-[2.25rem] items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 hover:border-white/40 hover:text-white"
                  >
                    {Icon ? <Icon size={16} aria-hidden="true" /> : social.label.charAt(0)}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-[0.625rem]">
            <p className="text-eyebrow mb-[0.25rem] text-white/40">
              Explore
            </p>
            {footerContent.explore.map((item) => (
              <AnimatedLink key={item.label} href={item.href} className="text-body text-white/80">
                {item.label}
              </AnimatedLink>
            ))}
            <button
              type="button"
              onClick={() => openModal("connect")}
              className="text-body group inline-flex w-fit items-center gap-[0.375rem] text-white/80 opacity-70 transition-all duration-300 hover:translate-x-[4px] hover:opacity-100"
            >
              Contact
            </button>
          </div>

          <div className="flex flex-col gap-[0.375rem]">
            <p className="text-eyebrow mb-[0.25rem] text-white/40">
              Visit
            </p>
            <p className="text-body text-white/80">{site.address}</p>
            <p className="text-body text-white/80">{site.serviceDay}</p>
            <p className="text-body text-white/80">{site.serviceTimes}</p>
          </div>

          <div className="flex flex-col gap-[0.75rem]">
            <p className="text-eyebrow mb-[0.25rem] text-white/40">
              Stay Connected
            </p>
            <p className="text-body text-white/60">Get news on messages and events.</p>
            <form
              onSubmit={(event) => event.preventDefault()}
              className="flex items-center gap-[0.5rem] rounded-[0.4rem] border border-white/15 bg-white/5 p-[0.375rem] pl-[0.875rem]"
            >
              <input
                type="email"
                required
                placeholder="Email address"
                aria-label="Email address"
                className="text-body min-w-0 flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-[2.25rem] w-[2.25rem] shrink-0 items-center justify-center rounded-[0.3rem] bg-accent text-white transition-transform duration-300 hover:scale-[1.06]"
              >
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>

        <div className="text-caption mt-[3rem] flex flex-col gap-[0.75rem] border-t border-white/10 pt-[1.5rem] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.founded} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-[1.25rem]">
            {footerContent.legal.map((link) => (
              <AnimatedLink key={link.label} href={link.href} className="text-white/50">
                {link.label}
              </AnimatedLink>
            ))}
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="watermark-text pointer-events-none absolute -bottom-[3rem] left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center text-[8rem] text-white/[0.05] sm:text-[13rem]"
      >
        {site.name}
      </span>
    </footer>
  );
}
