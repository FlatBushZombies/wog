import { getUpcomingEvents, getPastEvents } from "@/lib/db/queries";
import { EventForm } from "@/components/dashboard/EventForm";
import { EventList } from "@/components/dashboard/EventList";

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()]);

  return (
    <div>
      <div className="flex flex-col gap-[1rem] sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-h1 text-ink">Events</h1>
          <p className="text-body-lg mt-[0.25rem] text-muted">
            Create events and track who attends.
          </p>
        </div>
        <EventForm />
      </div>

      <div className="mt-[1.5rem] flex flex-col gap-[2rem]">
        <EventList title="Upcoming" events={upcoming} />
        <EventList title="Past" events={past} />
      </div>
    </div>
  );
}
