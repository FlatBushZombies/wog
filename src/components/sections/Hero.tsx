"use client";

import { motion } from "framer-motion";
import { LiquidReveal } from "../effects/LiquidReveal";
import { HeroCard } from "./HeroCard";
import { Eyebrow } from "../ui/Eyebrow";
import { PillButton } from "../ui/PillButton";
import { TagChip } from "../ui/TagChip";
import { heroContent, site } from "@/content/site";
import { siteImages } from "@/content/images";
import { useAppReady } from "@/lib/app-ready";

const EASE = [0.215, 0.61, 0.355, 1] as const;

export interface HeroUpcomingEvent {
  title: string;
  date: string;
  time: string | null;
}

export function Hero({ upcomingEvent }: { upcomingEvent?: HeroUpcomingEvent | null }) {
  const { ready } = useAppReady();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden rounded-b-[2rem] bg-ink text-white"
    >
      <div className="absolute inset-0">
        <LiquidReveal base={siteImages.heroBase} reveal={siteImages.heroReveal} />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,.25), transparent, rgba(0,0,0,.5))",
          }}
        />
      </div>

      <span
        aria-hidden="true"
        className="watermark-text pointer-events-none absolute bottom-[6rem] left-1/2 w-full -translate-x-1/2 select-none whitespace-nowrap text-center text-[5rem] text-white/[0.35] sm:text-[9rem] lg:text-[13rem]"
      >
        {site.name}
      </span>

      <div className="shell relative z-10 flex flex-1 flex-col justify-end gap-[2.5rem] pb-[2.5rem] pt-[7rem] sm:pt-[8rem]">
        <div className="flex flex-col gap-[1.5rem] lg:flex-row lg:items-end lg:justify-between lg:gap-[3rem]">
          <div className="max-w-[36rem]">
            {upcomingEvent && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
                className="mb-[1rem] inline-flex flex-wrap items-center gap-[0.5rem] rounded-full border border-accent-light/40 bg-accent/15 px-[1rem] py-[0.5rem] text-[0.8rem] font-medium text-accent-light"
              >
                <span className="uppercase tracking-[0.08em]">Next Event</span>
                <span className="text-white/40">•</span>
                <span className="text-white">{upcomingEvent.title}</span>
                <span className="text-white/60">
                  {upcomingEvent.date}
                  {upcomingEvent.time ? ` · ${upcomingEvent.time}` : ""}
                </span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              <Eyebrow light>{heroContent.eyebrow}</Eyebrow>
            </motion.div>

            <h1 className="mt-[1rem] text-[2.5rem] font-semibold leading-[1.05] tracking-tight sm:text-[3.5rem] lg:text-[4.25rem]">
              {heroContent.headingLines.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={ready ? { y: "0%", opacity: 1 } : {}}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.1 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
              className="mt-[1.25rem] max-w-[28rem] text-[1rem] text-white/75 sm:text-[1.05rem]"
            >
              {heroContent.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
              className="mt-[1.75rem] flex flex-wrap items-center gap-[0.875rem]"
            >
              <PillButton variant="light" href="#visit">
                {heroContent.primaryCta}
              </PillButton>
              <PillButton variant="outline" href="#messages" className="border-white/25 text-white">
                {heroContent.secondaryCta}
              </PillButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
              className="mt-[2rem]"
            >
              <p className="mb-[0.75rem] text-[0.75rem] font-medium uppercase tracking-[0.1em] text-white/50">
                {heroContent.welcomeLabel}
              </p>
              <div className="flex flex-wrap gap-[0.5rem]">
                {heroContent.welcomeChips.map((chip) => (
                  <TagChip key={chip} light>
                    {chip}
                  </TagChip>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.4 }}
            className="lg:mb-[0.5rem]"
          >
            <HeroCard />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-wrap items-center justify-between gap-[0.75rem] border-t border-white/15 pt-[1.25rem] text-[0.75rem] font-medium uppercase tracking-[0.08em] text-white/60"
        >
          <span>
            {site.serviceDay} • {site.serviceTimes}
          </span>
          <span className="hidden sm:inline">{site.address}</span>
          <span>Scroll to explore ↓</span>
        </motion.div>
      </div>
    </section>
  );
}
