import { Music, BookOpen, Users, HeartHandshake } from "lucide-react";
import { SectionHeader } from "../ui/SectionHeader";
import { IconChip } from "../ui/IconChip";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "../effects/ScrollReveal";
import { communityContent } from "@/content/site";

const ICONS = {
  Worship: Music,
  Word: BookOpen,
  Community: Users,
  Mission: HeartHandshake,
} as const;

export function Community() {
  return (
    <section className="bg-ink py-[5rem] text-white sm:py-[7rem]">
      <div className="shell">
        <ScrollReveal>
          <SectionHeader eyebrow={communityContent.eyebrow} heading={communityContent.heading} light />
        </ScrollReveal>

        <ScrollStagger className="mt-[3.5rem] grid grid-cols-1 gap-[1.25rem] sm:grid-cols-2 lg:grid-cols-4">
          {communityContent.columns.map((column) => {
            const Icon = ICONS[column.title as keyof typeof ICONS];
            return (
              <ScrollStaggerItem key={column.title}>
                <div className="h-full rounded-[0.5rem] border border-white/10 bg-white/5 p-[1.75rem]">
                  <IconChip icon={Icon} light />
                  <p className="text-h3 mt-[1.25rem] uppercase tracking-[0.04em] text-white">
                    {column.title}
                  </p>
                  <p className="text-body mt-[0.5rem] text-white/60">{column.description}</p>
                </div>
              </ScrollStaggerItem>
            );
          })}
        </ScrollStagger>
      </div>
    </section>
  );
}
