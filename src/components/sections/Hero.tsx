"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDays, Share2 } from "lucide-react";
import { HeroCard } from "./HeroCard";
import { Eyebrow } from "../ui/Eyebrow";
import { PillButton } from "../ui/PillButton";
import { heroContent, site, socialLinks } from "@/content/site";
import { siteImages } from "@/content/images";
import { useAppReady } from "@/lib/app-ready";
import { useSmoothScroll } from "@/lib/smooth-scroll";

const EASE = [0.215, 0.61, 0.355, 1] as const;

export interface HeroUpcomingEvent {
  title: string;
  date: string;
  time: string | null;
}

export function Hero({ upcomingEvent }: { upcomingEvent?: HeroUpcomingEvent | null }) {
  const { ready } = useAppReady();
  const { scrollToSection } = useSmoothScroll();

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
              "linear-gradient(180deg, rgba(10,11,16,0.8) 0%, rgba(10,11,16,0.6) 35%, rgba(10,11,16,0.88) 100%)",
          }}
        />
      </div>

      <div className="shell relative z-10 flex flex-1 flex-col justify-center gap-[2.5rem] pb-[3rem] pt-[8rem] sm:pt-[9rem]">
        <div className="mx-auto flex max-w-[42rem] flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <Eyebrow light>{heroContent.eyebrow}</Eyebrow>
          </motion.div>

          <h1 className="text-h1 mt-[1.25rem] text-white">
            {heroContent.headingLines.map((line, i) => {
              const isLast = i === heroContent.headingLines.length - 1;
              return (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className={`block ${isLast ? "text-accent-light" : ""}`}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={ready ? { y: "0%", opacity: 1 } : {}}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.1 }}
                  >
                    {line}
                  </motion.span>
                </span>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            className="text-body-lg mt-[1.25rem] max-w-[30rem] text-white/70"
          >
            {heroContent.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.65 }}
            className="mt-[1.75rem] flex flex-wrap items-center justify-center gap-[1rem]"
          >
            <PillButton variant="accent" href="#visit">
              {heroContent.primaryCta}
            </PillButton>
            <PillButton variant="outline" className="border-white/25 text-white" href="#messages">
              {heroContent.secondaryCta}
            </PillButton>

            {upcomingEvent ? (
              <button
                type="button"
                onClick={() => scrollToSection("#events")}
                className="group flex items-center gap-[0.75rem] text-left"
              >
                <span className="flex h-[2.75rem] w-[2.75rem] shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 group-hover:border-white/50">
                  <CalendarDays size={18} aria-hidden="true" />
                </span>
                <span className="text-caption text-white/80">
                  <span className="block text-white">{upcomingEvent.title}</span>
                  <span className="text-white/50">
                    {upcomingEvent.date}
                    {upcomingEvent.time ? ` · ${upcomingEvent.time}` : ""}
                  </span>
                </span>
              </button>
            ) : (
              <a
                href={socialLinks[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-[0.75rem]"
              >
                <span className="flex h-[2.75rem] w-[2.75rem] shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors duration-300 group-hover:border-white/50">
                  <Share2 size={18} aria-hidden="true" />
                </span>
                <span className="text-caption text-white/80">Follow Us</span>
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.35 }}
          className="mx-auto w-full max-w-[21rem]"
        >
          <HeroCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mx-auto grid w-full max-w-[46rem] grid-cols-2 gap-y-[1.5rem] border-t border-white/15 pt-[2rem] sm:grid-cols-4"
        >
          {heroContent.welcomeChips.map((chip, i) => (
            <div
              key={chip}
              className={`text-center ${i > 0 ? "border-white/10 sm:border-l" : ""}`}
            >
              <p className="text-h3 text-white">{chip}</p>
              <p className="text-caption mt-[0.375rem] text-white/50">{heroContent.welcomeLabel}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="text-eyebrow flex flex-wrap items-center justify-center gap-[0.75rem] text-white/50 sm:justify-between"
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
