import { SectionHeader } from "../ui/SectionHeader";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "../effects/ScrollReveal";
import { MinistryRow } from "./MinistryRow";
import { ministries } from "@/content/ministries";

export function Ministries() {
  return (
    <section id="ministries" className="bg-background py-[5rem] sm:py-[7rem]">
      <div className="shell">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Ministries"
            heading="Find your place."
            subtext="Church is more than a Sunday gathering. Discover the communities where you can grow, serve and connect."
          />
        </ScrollReveal>

        <ScrollStagger className="mt-[3rem] grid grid-cols-1 gap-[1.25rem] sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((ministry) => (
            <ScrollStaggerItem key={ministry.id} className="h-full">
              <MinistryRow ministry={ministry} />
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
