import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";
import { getDashboardStats, getRecentMembers, getUpcomingEvents } from "@/lib/db/queries";
import type { Member, ChurchEventRow } from "@/lib/db/schema";
import { StatCard } from "@/components/dashboard/StatCard";
import { CATEGORY_LABELS } from "@/lib/db/schema";

const EMPTY_STATS = {
  totalMembers: 0,
  counts: { women: 0, men: 0, youth: 0, sunday_school: 0 },
  upcomingEvent: null,
};

function formatEventDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatJoined(date: Date) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default async function DashboardOverviewPage() {
  const [statsResult, recentMembersResult, upcomingEventsResult] = await Promise.allSettled([
    getDashboardStats(),
    getRecentMembers(5),
    getUpcomingEvents(),
  ]);

  const stats = statsResult.status === "fulfilled" ? statsResult.value : EMPTY_STATS;
  const recentMembers: Member[] =
    recentMembersResult.status === "fulfilled" ? recentMembersResult.value : [];
  const upcomingEvents: ChurchEventRow[] =
    upcomingEventsResult.status === "fulfilled" ? upcomingEventsResult.value : [];
  const hasPartialError = [statsResult, recentMembersResult, upcomingEventsResult].some(
    (r) => r.status === "rejected"
  );

  return (
    <div>
      <h1 className="text-[2rem] font-semibold tracking-tight text-ink">Overview</h1>
      <p className="mt-[0.375rem] text-[1rem] text-muted">
        A snapshot of {"DMWOG's"} members and upcoming events.
      </p>

      {hasPartialError && (
        <p className="mt-[1rem] rounded-[0.875rem] border border-accent/30 bg-accent/10 px-[1rem] py-[0.75rem] text-[0.9rem] font-medium text-accent-dark">
          Some data couldn&apos;t load just now — the database connection blipped. Refresh to try again.
        </p>
      )}

      <div className="mt-[1.75rem] rounded-[1.25rem] border border-line bg-white p-[1.5rem]">
        <p className="text-[0.95rem] font-medium uppercase tracking-[0.06em] text-accent">
          Next Upcoming Event
        </p>
        {stats.upcomingEvent ? (
          <div className="mt-[0.625rem] flex flex-col gap-[0.375rem] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[1.4rem] font-semibold text-ink">{stats.upcomingEvent.title}</p>
              <p className="mt-[0.25rem] flex flex-wrap items-center gap-x-[1rem] gap-y-[0.25rem] text-[0.95rem] text-muted">
                <span className="inline-flex items-center gap-[0.375rem]">
                  <Calendar size={16} aria-hidden="true" />
                  {formatEventDate(stats.upcomingEvent.eventDate)}
                  {stats.upcomingEvent.eventTime ? ` · ${stats.upcomingEvent.eventTime}` : ""}
                </span>
                {stats.upcomingEvent.location && (
                  <span className="inline-flex items-center gap-[0.375rem]">
                    <MapPin size={16} aria-hidden="true" />
                    {stats.upcomingEvent.location}
                  </span>
                )}
              </p>
            </div>
            <Link
              href="/dashboard/events"
              className="shrink-0 rounded-full border border-line px-[1.125rem] py-[0.625rem] text-[0.9rem] font-medium text-ink hover:border-subtle"
            >
              View Events
            </Link>
          </div>
        ) : (
          <p className="mt-[0.625rem] text-[1rem] text-muted">
            No upcoming events yet.{" "}
            <Link href="/dashboard/events" className="font-medium text-ink underline">
              Add one
            </Link>
            .
          </p>
        )}
      </div>

      <div className="mt-[1.5rem] grid grid-cols-2 gap-[1rem] sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total Members" value={stats.totalMembers} icon={Users} accent />
        {(Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>).map((key) => (
          <StatCard key={key} label={CATEGORY_LABELS[key]} value={stats.counts[key]} />
        ))}
      </div>

      <div className="mt-[1.5rem] grid grid-cols-1 gap-[1rem] lg:grid-cols-2">
        <div className="rounded-[1.25rem] border border-line bg-white p-[1.5rem]">
          <div className="flex items-center justify-between">
            <h2 className="text-[1.15rem] font-semibold text-ink">Recently Added</h2>
            <span className="text-[0.95rem] text-muted">{recentMembers.length}</span>
          </div>
          <div className="mt-[1rem] flex flex-col gap-[0.75rem]">
            {recentMembers.length === 0 ? (
              <p className="rounded-[1rem] border border-dashed border-line p-[1.25rem] text-center text-[0.9rem] text-muted">
                No members yet.
              </p>
            ) : (
              recentMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between gap-[0.75rem]">
                  <div className="min-w-0">
                    <p className="truncate text-[0.95rem] font-medium text-ink">{member.fullName}</p>
                    <p className="text-[0.9rem] text-muted">
                      {CATEGORY_LABELS[member.category]} · Added {formatJoined(member.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-line bg-white p-[1.5rem]">
          <div className="flex items-center justify-between">
            <h2 className="text-[1.15rem] font-semibold text-ink">Upcoming Events</h2>
            <Link href="/dashboard/events" className="text-[0.95rem] font-medium text-ink underline">
              See all
            </Link>
          </div>
          <div className="mt-[1rem] flex flex-col gap-[0.75rem]">
            {upcomingEvents.length === 0 ? (
              <p className="rounded-[1rem] border border-dashed border-line p-[1.25rem] text-center text-[0.9rem] text-muted">
                Nothing scheduled yet.
              </p>
            ) : (
              upcomingEvents.slice(0, 4).map((event) => (
                <Link
                  key={event.id}
                  href={`/dashboard/events/${event.id}`}
                  className="flex items-center justify-between gap-[0.75rem] rounded-[0.875rem] px-[0.5rem] py-[0.375rem] transition-colors hover:bg-surface"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[0.95rem] font-medium text-ink">{event.title}</p>
                    <p className="text-[0.9rem] text-muted">
                      {formatEventDate(event.eventDate)}
                      {event.eventTime ? ` · ${event.eventTime}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 text-[0.85rem] font-medium uppercase tracking-[0.05em] text-accent">
                    {event.category ? CATEGORY_LABELS[event.category] : "All"}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
