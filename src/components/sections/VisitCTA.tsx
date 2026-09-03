"use client";

import { ScrollReveal } from "../effects/ScrollReveal";
import { PillButton } from "../ui/PillButton";
import { visitContent, site } from "@/content/site";
import { useUiState } from "@/lib/ui-state";

export function VisitCTA() {
  const { openModal } = useUiState();

  return (
    <section
      id="visit"
      className="relative overflow-hidden bg-gradient-to-br from-accent-dark via-accent to-accent-light py-[5rem] text-white sm:py-[7rem]"
    >
      <span
        aria-hidden="true"
        className="watermark-text pointer-events-none absolute -bottom-[2rem] left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center text-[6rem] text-white/[0.05] sm:text-[11rem]"
      >
        {site.name}
      </span>

      <div className="shell relative z-10">
        <ScrollReveal className="max-w-[36rem]">
          <h2 className="text-h1">
            {visitContent.heading}
          </h2>
          <p className="text-body-lg mt-[1.25rem] text-white/75">{visitContent.body}</p>
          <div className="mt-[2rem] flex flex-wrap gap-[0.875rem]">
            <PillButton variant="white" onClick={() => openModal("visit")}>
              {visitContent.primaryCta}
            </PillButton>
            <PillButton
              variant="outline"
              className="border-white/25 text-white"
              onClick={() => openModal("connect")}
            >
              {visitContent.secondaryCta}
            </PillButton>
          </div>
        </ScrollReveal>

        <ScrollReveal
          delay={0.15}
          className="mt-[3.5rem] grid grid-cols-1 gap-[2rem] border-t border-white/15 pt-[2.5rem] sm:grid-cols-3"
        >
          {visitContent.details.map((detail) => (
            <div key={detail.label}>
              <p className="text-eyebrow text-white/60">
                {detail.label}
              </p>
              <p className="text-h3 mt-[0.375rem]">{detail.value}</p>
            </div>
          ))}
          <div>
            <p className="text-eyebrow text-white/60">
              What to Expect
            </p>
            <p className="text-h3 mt-[0.375rem]">{visitContent.expect.join(" • ")}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
