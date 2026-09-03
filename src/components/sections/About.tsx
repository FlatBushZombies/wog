import { SectionHeader } from "../ui/SectionHeader";
import { Card } from "../ui/Card";
import { ScrollReveal } from "../effects/ScrollReveal";
import { AnimatedLink } from "../ui/AnimatedLink";
import { aboutContent, socialLinks } from "@/content/site";

function RadialMotif() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      <circle cx="200" cy="200" r="150" stroke="var(--line)" strokeWidth="1" fill="none" />
      <circle cx="200" cy="200" r="105" stroke="var(--line)" strokeWidth="1" fill="none" />
      <circle cx="200" cy="200" r="60" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const x1 = 200 + Math.cos(angle) * 165;
        const y1 = 200 + Math.sin(angle) * 165;
        const x2 = 200 + Math.cos(angle) * 185;
        const y2 = 200 + Math.sin(angle) * 185;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--subtle)"
            strokeWidth="1"
          />
        );
      })}
      <circle cx="200" cy="200" r="4" fill="var(--accent)" />
    </svg>
  );
}

export function About() {
  return (
    <section id="about" className="bg-background py-[5rem] sm:py-[7rem]">
      <div className="shell">
        <ScrollReveal>
          <SectionHeader
            eyebrow={aboutContent.eyebrow}
            heading={aboutContent.heading}
            subtext={aboutContent.body}
          />
        </ScrollReveal>

        <div className="mt-[3.5rem] grid grid-cols-1 gap-[1.5rem] lg:grid-cols-[0.85fr_1.15fr]">
          <ScrollReveal delay={0.05}>
            <Card className="flex h-full items-center justify-center p-[2.5rem]">
              <div className="aspect-square w-full max-w-[16rem]">
                <RadialMotif />
              </div>
            </Card>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Card className="flex h-full flex-col justify-center gap-[1.5rem] p-[2rem] sm:p-[2.5rem]">
              <div>
                <p className="text-eyebrow text-ink">{aboutContent.footerLabel}</p>
                <p className="text-body mt-[0.5rem] text-muted">
                  {aboutContent.footerTags.join(" • ")}
                </p>
              </div>
              <div className="flex items-center gap-[1.25rem] border-t border-line pt-[1.5rem]">
                {socialLinks.map((social) => (
                  <AnimatedLink key={social.label} href={social.href} external className="text-body text-ink">
                    {social.label}
                  </AnimatedLink>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
