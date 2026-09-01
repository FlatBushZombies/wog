import { Eyebrow } from "../ui/Eyebrow";
import { WordReveal } from "../effects/TextReveal";
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
      <div className="shell grid grid-cols-1 items-center gap-[3rem] lg:grid-cols-2 lg:gap-[5rem]">
        <ScrollReveal className="order-2 flex aspect-square max-w-[26rem] items-center justify-center lg:order-1">
          <RadialMotif />
        </ScrollReveal>

        <div className="order-1 lg:order-2">
          <Eyebrow>{aboutContent.eyebrow}</Eyebrow>
          <h2 className="mt-[1rem] max-w-[22rem] text-[2rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[2.5rem]">
            <WordReveal text={aboutContent.heading} />
          </h2>
          <p className="mt-[1.5rem] max-w-[26rem] text-[1rem] leading-relaxed text-muted">
            {aboutContent.body}
          </p>

          <ScrollReveal delay={0.15} className="mt-[3rem] flex flex-wrap items-center justify-between gap-[1.5rem] border-t border-line pt-[1.75rem]">
            <div>
              <p className="text-[0.9rem] font-semibold uppercase tracking-[0.06em] text-ink">
                {aboutContent.footerLabel}
              </p>
              <p className="mt-[0.25rem] text-[0.85rem] text-muted">
                {aboutContent.footerTags.join(" • ")}
              </p>
            </div>
            <div className="flex items-center gap-[1.25rem]">
              {socialLinks.map((social) => (
                <AnimatedLink key={social.label} href={social.href} external className="text-ink">
                  {social.label}
                </AnimatedLink>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
