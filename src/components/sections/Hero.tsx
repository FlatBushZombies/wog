"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
      className="relative flex min-h-[92vh] flex-col overflow-hidden bg-ink text-white"
    >
      <div className="absolute inset-0">
        <Image
          src={siteImages.congregation.src}
          alt={siteImages.congregation.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,11,16,0.75) 0%, rgba(10,11,16,0.55) 35%, rgba(10,11,16,0.85) 100%)",
          }}
        />
      </div>

      <div className="shell relative z-10 flex flex-1 flex-col justify-end gap-[2.5rem] pb-[3rem] pt-[7.5rem] sm:pt-[8.5rem]">
        {upcomingEvent && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            className="inline-flex w-fit flex-wrap items-center gap-[0.5rem] rounded-[0.5rem] border border-accent-light/30 bg-accent-light/10 px-[1rem] py-[0.5rem] text-caption text-white"
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

        <div className="grid grid-cols-1 gap-[2.5rem] lg:grid-cols-[1.1fr_0.8fr] lg:items-end">
          <div className="max-w-[36rem]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              <Eyebrow light>{heroContent.eyebrow}</Eyebrow>
            </motion.div>

            <h1 className="text-h1 mt-[1rem] text-white">
              {heroContent.headingLines.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={ready ? { y: "0%", opacity: 1 } : {}}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.1 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
              className="text-body-lg mt-[1.25rem] max-w-[28rem] text-white/70"
            >
              {heroContent.body}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.65 }}
              className="mt-[1.75rem] flex flex-wrap items-center gap-[0.875rem]"
            >
              <PillButton variant="accent" href="#visit">
                {heroContent.primaryCta}
              </PillButton>
              <PillButton variant="outline" className="border-white/25 text-white" href="#messages">
                {heroContent.secondaryCta}
              </PillButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
              className="mt-[2rem]"
            >
              <p className="text-eyebrow mb-[0.75rem] text-white/50">{heroContent.welcomeLabel}</p>
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
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.35 }}
            className="lg:justify-self-end"
          >
            <HeroCard />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="text-eyebrow flex flex-wrap items-center justify-between gap-[0.75rem] border-t border-white/15 pt-[1.25rem] text-white/50"
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
