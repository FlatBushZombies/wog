"use client";

import { site, socialLinks, footerContent } from "@/content/site";
import { PillButton } from "../ui/PillButton";
import { AnimatedLink } from "../ui/AnimatedLink";
import { useUiState } from "@/lib/ui-state";

export function Footer() {
  const { openModal } = useUiState();

  return (
    <footer className="relative overflow-hidden rounded-t-[2rem] bg-ink text-white">
      <div className="shell relative z-10 py-[3.5rem] sm:py-[4.5rem]">
        <div className="flex flex-col gap-[1.5rem] border-b border-white/10 pb-[2.5rem] sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-[24rem] text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.75rem]">
            Come worship with us.
          </h2>
          <PillButton variant="accent" onClick={() => openModal("visit")}>
            Plan Your Visit
          </PillButton>
        </div>

        <div className="grid grid-cols-2 gap-x-[1.5rem] gap-y-[2.5rem] pt-[2.5rem] sm:grid-cols-4">
          <div>
            <p className="mb-[0.75rem] text-[1rem] font-semibold">{site.name}</p>
            <p className="max-w-[14rem] text-[0.875rem] text-white/60">{site.tagline}</p>
          </div>

          <div className="flex flex-col gap-[0.625rem]">
            <p className="mb-[0.25rem] text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white/40">
              Explore
            </p>
            {footerContent.explore.map((item) => (
              <AnimatedLink key={item.label} href={item.href} className="text-[0.9rem] text-white/80">
                {item.label}
              </AnimatedLink>
            ))}
          </div>

          <div className="flex flex-col gap-[0.625rem]">
            <p className="mb-[0.25rem] text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white/40">
              Connect
            </p>
            {socialLinks.map((social) => (
              <AnimatedLink key={social.label} href={social.href} external className="text-[0.9rem] text-white/80">
                {social.label}
              </AnimatedLink>
            ))}
            <button
              type="button"
              onClick={() => openModal("connect")}
              className="group inline-flex w-fit items-center gap-[0.375rem] text-[0.9rem] text-white/80 opacity-70 transition-all duration-300 hover:translate-x-[4px] hover:opacity-100"
            >
              Contact
            </button>
          </div>

          <div className="flex flex-col gap-[0.375rem]">
            <p className="mb-[0.25rem] text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white/40">
              Visit
            </p>
            <p className="text-[0.9rem] text-white/80">{site.address}</p>
            <p className="text-[0.9rem] text-white/80">{site.serviceDay}</p>
            <p className="text-[0.9rem] text-white/80">{site.serviceTimes}</p>
          </div>
        </div>

        <div className="mt-[3rem] flex flex-col gap-[0.75rem] border-t border-white/10 pt-[1.5rem] text-[0.8rem] text-white/50 sm:flex-row sm:items-center sm:justify-between">
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
