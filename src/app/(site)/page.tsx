import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Leadership } from "@/components/sections/Leadership";
import { FaithBand } from "@/components/sections/FaithBand";
import { Messages } from "@/components/sections/Messages";
import { Ministries } from "@/components/sections/Ministries";
import { Events } from "@/components/sections/Events";
import { Community } from "@/components/sections/Community";
import { VisitCTA } from "@/components/sections/VisitCTA";
import { Footer } from "@/components/layout/Footer";
import { getNextUpcomingEvent } from "@/lib/db/queries";

function formatHeroEventDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default async function Home() {
  const nextEvent = await getNextUpcomingEvent();
  const upcomingEvent = nextEvent
    ? {
        title: nextEvent.title,
        date: formatHeroEventDate(nextEvent.eventDate),
        time: nextEvent.eventTime,
      }
    : null;

  return (
    <>
      <Hero upcomingEvent={upcomingEvent} />
      <About />
      <Leadership />
      <FaithBand />
      <Messages />
      <Ministries />
      <Events />
      <Community />
      <div className="px-0 pb-[0.75rem] sm:pb-[1rem]">
        <VisitCTA />
      </div>
      <Footer />
    </>
  );
}
