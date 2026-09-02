import { Eyebrow } from "../ui/Eyebrow";
import { ScrollReveal } from "../effects/ScrollReveal";
import { EventCard } from "./EventCard";
import { events } from "@/content/events";

export function Events() {
  return (
    <section id="events" className="bg-background py-[5rem] sm:py-[7rem]">
      <div className="shell">
        <ScrollReveal className="max-w-[32rem]">
          <Eyebrow>What&apos;s Happening</Eyebrow>
          <h2 className="text-h2 mt-[1rem] text-ink">
            Come together.
          </h2>
        </ScrollReveal>

        <div className="mt-[2.5rem] border-b border-line">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
