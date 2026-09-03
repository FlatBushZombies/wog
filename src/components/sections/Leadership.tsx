import Image from "next/image";
import { SectionHeader } from "../ui/SectionHeader";
import { Card } from "../ui/Card";
import { ScrollReveal } from "../effects/ScrollReveal";
import { leadershipContent } from "@/content/site";
import { siteImages } from "@/content/images";

export function Leadership() {
  return (
    <section className="bg-surface py-[5rem] sm:py-[7rem]">
      <div className="shell">
        <ScrollReveal>
          <SectionHeader eyebrow={leadershipContent.eyebrow} heading={leadershipContent.heading} />
        </ScrollReveal>

        <div className="mt-[3.5rem] grid grid-cols-1 gap-[1.5rem] lg:grid-cols-[0.85fr_1.15fr]">
          <ScrollReveal delay={0.05}>
            <Card className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={siteImages.pastor.src}
                alt={siteImages.pastor.alt}
                fill
                sizes="(min-width: 1024px) 32vw, 80vw"
                className="object-cover"
              />
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Card className="flex h-full flex-col justify-center p-[2rem] sm:p-[2.5rem]">
              <blockquote className="text-body-lg font-serif border-l-2 border-accent pl-[1.25rem] italic leading-relaxed text-ink/80">
                “{leadershipContent.quote}”
              </blockquote>
              <div className="mt-[1.5rem] pl-[1.25rem]">
                <p className="text-body font-semibold text-ink">{leadershipContent.name}</p>
                <p className="text-caption text-muted">{leadershipContent.role}</p>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
