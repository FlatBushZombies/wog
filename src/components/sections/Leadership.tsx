import Image from "next/image";
import { Eyebrow } from "../ui/Eyebrow";
import { ScrollReveal } from "../effects/ScrollReveal";
import { leadershipContent } from "@/content/site";
import { siteImages } from "@/content/images";

export function Leadership() {
  return (
    <section className="bg-surface py-[5rem] sm:py-[7rem]">
      <div className="shell grid grid-cols-1 items-center gap-[2.5rem] lg:grid-cols-[0.85fr_1.15fr] lg:gap-[4rem]">
        <ScrollReveal className="relative aspect-[4/5] w-full max-w-[24rem] overflow-hidden rounded-[1.5rem] lg:max-w-none">
          <Image
            src={siteImages.pastor.src}
            alt={siteImages.pastor.alt}
            fill
            sizes="(min-width: 1024px) 32vw, 80vw"
            className="object-cover"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <Eyebrow>{leadershipContent.eyebrow}</Eyebrow>
          <h2 className="mt-[1rem] max-w-[28rem] text-[2rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[2.5rem]">
            {leadershipContent.heading}
          </h2>
          <blockquote className="mt-[1.5rem] max-w-[32rem] border-l-2 border-accent pl-[1.25rem] text-[1.15rem] leading-relaxed text-ink/80 sm:text-[1.3rem]">
            “{leadershipContent.quote}”
          </blockquote>
          <div className="mt-[1.5rem]">
            <p className="text-[1rem] font-semibold text-ink">{leadershipContent.name}</p>
            <p className="text-[0.95rem] text-muted">{leadershipContent.role}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
