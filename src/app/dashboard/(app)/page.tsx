import Link from "next/link";
import { getDashboardStats } from "@/lib/db/queries";
import { StatCard } from "@/components/dashboard/StatCard";
import { CATEGORY_LABELS } from "@/lib/db/schema";

function formatEventDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default async function DashboardOverviewPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="text-[1.75rem] font-semibold tracking-tight text-ink">Overview</h1>
      <p className="mt-[0.25rem] text-[0.9rem] text-muted">
        A snapshot of {"DMWOG's"} members and upcoming events.
      </p>

      <div className="mt-[1.5rem] grid grid-cols-2 gap-[0.875rem] sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total Members" value={stats.totalMembers} />
        {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map((key) => (
          <StatCard key={key} label={CATEGORY_LABELS[key]} value={stats.counts[key]} />
        ))}
      </div>

      <div className="mt-[1.5rem] rounded-[1.25rem] border border-line bg-white p-[1.25rem]">
        <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-muted">
          Next Upcoming Event
        </p>
        {stats.upcomingEvent ? (
          <div className="mt-[0.5rem]">
            <p className="text-[1.1rem] font-semibold text-ink">{stats.upcomingEvent.title}</p>
            <p className="mt-[0.25rem] text-[0.9rem] text-muted">
              {formatEventDate(stats.upcomingEvent.eventDate)}
              {stats.upcomingEvent.eventTime ? ` • ${stats.upcomingEvent.eventTime}` : ""}
              {stats.upcomingEvent.location ? ` • ${stats.upcomingEvent.location}` : ""}
            </p>
          </div>
        ) : (
          <p className="mt-[0.5rem] text-[0.9rem] text-muted">
            No upcoming events yet.{" "}
            <Link href="/dashboard/events" className="font-medium text-ink underline">
              Add one
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
