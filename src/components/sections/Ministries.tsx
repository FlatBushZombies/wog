import { Eyebrow } from "../ui/Eyebrow";
import { ScrollReveal } from "../effects/ScrollReveal";
import { MinistryRow } from "./MinistryRow";
import { ministries } from "@/content/ministries";

export function Ministries() {
  return (
    <section id="ministries" className="bg-background py-[5rem] sm:py-[7rem]">
      <div className="shell">
        <ScrollReveal className="max-w-[32rem]">
          <Eyebrow>Ministries</Eyebrow>
          <h2 className="mt-[1rem] text-[2rem] font-semibold leading-[1.1] tracking-tight text-ink sm:text-[2.75rem]">
            Find your place.
          </h2>
          <p className="mt-[1.25rem] text-[1rem] text-muted">
            Church is more than a Sunday gathering. Discover the communities where you can grow,
            serve and connect.
          </p>
        </ScrollReveal>

        <div className="mt-[2.5rem] border-b border-line">
          {ministries.map((ministry) => (
            <MinistryRow key={ministry.id} ministry={ministry} />
          ))}
        </div>
      </div>
    </section>
  );
}
