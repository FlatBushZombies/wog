import { SectionHeader } from "../ui/SectionHeader";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "../effects/ScrollReveal";
import { EventCard } from "./EventCard";
import { events } from "@/content/events";

export function Events() {
  return (
    <section id="events" className="bg-background py-[5rem] sm:py-[7rem]">
      <div className="shell">
        <ScrollReveal>
          <SectionHeader eyebrow="What's Happening" heading="Come together." />
        </ScrollReveal>

        <ScrollStagger className="mt-[3rem] grid grid-cols-1 gap-[1.25rem] sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <ScrollStaggerItem key={event.id} className="h-full">
              <EventCard event={event} />
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}
