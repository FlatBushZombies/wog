import { Eyebrow } from "../ui/Eyebrow";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "../effects/ScrollReveal";
import { communityContent } from "@/content/site";

export function Community() {
  return (
    <section className="bg-ink py-[5rem] text-white sm:py-[7rem]">
      <div className="shell">
        <ScrollReveal className="max-w-[32rem]">
          <Eyebrow light>{communityContent.eyebrow}</Eyebrow>
          <h2 className="text-h2 mt-[1rem] text-white">
            {communityContent.heading}
          </h2>
        </ScrollReveal>

        <ScrollStagger className="mt-[3.5rem] grid grid-cols-1 gap-[2rem] border-t border-white/10 pt-[2.5rem] sm:grid-cols-2 lg:grid-cols-4">
          {communityContent.columns.map((column) => (
            <ScrollStaggerItem key={column.title}>
              <p className="text-h3 uppercase tracking-[0.04em] text-accent-light">
                {column.title}
              </p>
              <p className="text-body mt-[0.75rem] text-white/70">
                {column.description}
              </p>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
