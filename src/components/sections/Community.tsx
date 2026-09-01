import { Eyebrow } from "../ui/Eyebrow";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "../effects/ScrollReveal";
import { communityContent } from "@/content/site";

export function Community() {
  return (
    <section className="bg-ink py-[5rem] text-white sm:py-[7rem]">
      <div className="shell">
        <ScrollReveal className="max-w-[32rem]">
          <Eyebrow light>{communityContent.eyebrow}</Eyebrow>
          <h2 className="mt-[1rem] text-[2rem] font-semibold leading-[1.1] tracking-tight sm:text-[2.75rem]">
            {communityContent.heading}
          </h2>
        </ScrollReveal>

        <ScrollStagger className="mt-[3.5rem] grid grid-cols-1 gap-[2rem] border-t border-white/10 pt-[2.5rem] sm:grid-cols-2 lg:grid-cols-4">
          {communityContent.columns.map((column) => (
            <ScrollStaggerItem key={column.title}>
              <p className="text-[1.1rem] font-semibold uppercase tracking-[0.06em] text-accent-light">
                {column.title}
              </p>
              <p className="mt-[0.75rem] text-[1rem] leading-relaxed text-white/70">
                {column.description}
              </p>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
