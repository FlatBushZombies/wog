"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { HeroCard } from "./HeroCard";
import { Eyebrow } from "../ui/Eyebrow";
import { PillButton } from "../ui/PillButton";
import { TagChip } from "../ui/TagChip";
import { ArrowIcon } from "../ui/ArrowIcon";
import { heroContent, site } from "@/content/site";
import { siteImages } from "@/content/images";
import { useAppReady } from "@/lib/app-ready";
import { useUiState } from "@/lib/ui-state";

const EASE = [0.215, 0.61, 0.355, 1] as const;

export interface HeroUpcomingEvent {
  title: string;
  date: string;
  time: string | null;
}

export function Hero({ upcomingEvent }: { upcomingEvent?: HeroUpcomingEvent | null }) {
  const { ready } = useAppReady();
  const { openModal } = useUiState();

  return (
    <section
      id="home"
      className="relative overflow-hidden rounded-b-[2rem] bg-background pb-[3rem] pt-[7.5rem] sm:pt-[8.5rem] sm:pb-[4rem]"
    >
      <div className="shell">
        {upcomingEvent && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="mb-[1.5rem] inline-flex flex-wrap items-center gap-[0.5rem] rounded-full border border-accent/25 bg-accent/10 px-[1rem] py-[0.5rem] text-[0.85rem] font-medium text-accent-dark"
          >
            <span className="uppercase tracking-[0.08em]">Next Event</span>
            <span className="text-muted">•</span>
            <span className="text-ink">{upcomingEvent.title}</span>
            <span className="text-muted">
              {upcomingEvent.date}
              {upcomingEvent.time ? ` · ${upcomingEvent.time}` : ""}
            </span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-[3rem] lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-[2.5rem]">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              <Eyebrow>{heroContent.eyebrow}</Eyebrow>
            </motion.div>

            <h1 className="mt-[1rem] text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[3.25rem] lg:text-[3.75rem]">
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
              className="mt-[1.25rem] max-w-[26rem] text-[1.05rem] text-muted"
            >
              {heroContent.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
              className="mt-[1.75rem] flex flex-wrap items-center gap-[0.875rem]"
            >
              <PillButton variant="dark" href="#visit">
                {heroContent.primaryCta}
              </PillButton>
              <PillButton variant="outline" href="#messages">
                {heroContent.secondaryCta}
              </PillButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
              className="mt-[2.25rem]"
            >
              <p className="mb-[0.75rem] text-[0.85rem] font-medium uppercase tracking-[0.1em] text-muted">
                {heroContent.welcomeLabel}
              </p>
              <div className="flex flex-wrap gap-[0.5rem]">
                {heroContent.welcomeChips.map((chip) => (
                  <TagChip key={chip}>{chip}</TagChip>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: photo collage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.4 }}
            className="grid grid-cols-2 gap-[1rem]"
          >
            <button
              type="button"
              onClick={() => openModal("connect")}
              aria-label={heroContent.welcomeLabel}
              className="group relative col-span-1 aspect-[3/4] self-end overflow-hidden rounded-[1.5rem] text-left"
            >
              <Image
                src={siteImages.congregation.src}
                alt={siteImages.congregation.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(10,10,10,0.9), rgba(10,10,10,0.1) 60%)",
                }}
              />
              <div className="absolute inset-x-[0.875rem] bottom-[0.875rem] flex items-center justify-between gap-[0.5rem]">
                <span className="text-[0.95rem] font-medium leading-tight text-white">
                  {heroContent.welcomeLabel}
                </span>
                <span className="flex h-[2rem] w-[2rem] shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowIcon className="text-white" />
                </span>
              </div>
            </button>

            <div className="relative col-span-1 aspect-[3/5] overflow-hidden rounded-[1.5rem]">
              <Image
                src={siteImages.pastor.src}
                alt={siteImages.pastor.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover"
              />

              <div className="absolute right-[0.75rem] top-[0.75rem] flex items-center gap-[0.625rem] rounded-[1rem] bg-white p-[0.75rem] shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                <span className="flex h-[2.25rem] w-[2.25rem] shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Calendar size={16} aria-hidden="true" />
                </span>
                <div className="leading-tight">
                  <p className="text-[0.95rem] font-semibold text-ink">{site.serviceTimes}</p>
                  <p className="text-[0.75rem] text-muted">{site.serviceDay}</p>
                </div>
              </div>

              <div className="absolute inset-x-[0.75rem] bottom-[0.75rem]">
                <HeroCard />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-[3rem] flex flex-wrap items-center justify-between gap-[0.75rem] border-t border-line pt-[1.25rem] text-[0.85rem] font-medium uppercase tracking-[0.08em] text-muted"
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
