import Link from "next/link";
import type { ChurchEventRow } from "@/lib/db/schema";
import { CATEGORY_LABELS } from "@/lib/db/schema";

function formatEventDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function EventList({ title, events }: { title: string; events: ChurchEventRow[] }) {
  return (
    <div>
      <p className="text-eyebrow text-muted">{title}</p>
      <div className="mt-[0.75rem] flex flex-col gap-[0.75rem]">
        {events.length === 0 ? (
          <p className="text-body rounded-[0.375rem] border border-dashed border-line p-[1.5rem] text-center text-muted">
            Nothing here yet.
          </p>
        ) : (
          events.map((event) => (
            <Link
              key={event.id}
              href={`/dashboard/events/${event.id}`}
              className="flex flex-col gap-[0.375rem] rounded-[0.375rem] border border-line bg-white p-[1rem] transition-colors hover:border-subtle sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-[0.875rem]">
                {event.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element -- admin-provided arbitrary URL
                  <img
                    src={event.imageUrl}
                    alt=""
                    className="h-[3rem] w-[3rem] shrink-0 rounded-[0.4rem] object-cover"
                  />
                )}
                <div>
                  <p className="text-body font-medium text-ink">{event.title}</p>
                  <p className="text-caption text-muted">
                    {formatEventDate(event.eventDate)}
                    {event.eventTime ? ` • ${event.eventTime}` : ""}
                    {event.location ? ` • ${event.location}` : ""}
                  </p>
                </div>
              </div>
              <span className="text-caption font-medium uppercase tracking-[0.06em] text-accent">
                {event.category ? CATEGORY_LABELS[event.category] : "All Ministries"}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
