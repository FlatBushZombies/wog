import { BarChart3 } from "lucide-react";
import {
  getDashboardStats,
  getEventAttendanceSummary,
  getMemberGrowthByMonth,
} from "@/lib/db/queries";
import { CATEGORY_LABELS } from "@/lib/db/schema";
import { MeterRow } from "@/components/dashboard/MeterRow";
import { ColumnChart } from "@/components/dashboard/ColumnChart";

function formatEventDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default async function AnalyticsPage() {
  const [stats, growth, attendanceSummary] = await Promise.all([
    getDashboardStats(),
    getMemberGrowthByMonth(6),
    getEventAttendanceSummary(6),
  ]);

  const categoryKeys = Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>;

  return (
    <div>
      <div className="flex items-center gap-[0.625rem]">
        <BarChart3 size={22} className="text-accent" aria-hidden="true" />
        <h1 className="text-h1 text-ink">Analytics</h1>
      </div>
      <p className="text-body-lg mt-[0.375rem] text-muted">
        How {"DMWOG's"} membership and event attendance are trending.
      </p>

      <div className="mt-[1.75rem] grid grid-cols-1 gap-[1rem] lg:grid-cols-2">
        <div className="rounded-[0.375rem] border border-line bg-white p-[1.5rem]">
          <h2 className="text-h3 text-ink">Members by Ministry</h2>
          <p className="text-body mt-[0.25rem] text-muted">
            {stats.totalMembers} people across all ministries.
          </p>
          <div className="mt-[1.5rem] flex flex-col gap-[1rem]">
            {categoryKeys.map((key) => (
              <MeterRow
                key={key}
                label={CATEGORY_LABELS[key]}
                value={stats.counts[key]}
                total={stats.totalMembers || 1}
                valueLabel={String(stats.counts[key])}
              />
            ))}
          </div>
        </div>

        <div className="rounded-[0.375rem] border border-line bg-white p-[1.5rem]">
          <h2 className="text-h3 text-ink">New Members</h2>
          <p className="text-body mt-[0.25rem] text-muted">Added per month, last 6 months.</p>
          <div className="mt-[1.5rem]">
            <ColumnChart data={growth} />
          </div>
        </div>
      </div>

      <div className="mt-[1rem] rounded-[0.375rem] border border-line bg-white p-[1.5rem]">
        <h2 className="text-h3 text-ink">Event Attendance</h2>
        <p className="text-body mt-[0.25rem] text-muted">
          Share of eligible members who attended each recent event.
        </p>
        <div className="mt-[1.5rem] flex flex-col gap-[1rem]">
          {attendanceSummary.length === 0 ? (
            <p className="text-body rounded-[0.375rem] border border-dashed border-line p-[1.5rem] text-center text-muted">
              No past events with attendance yet.
            </p>
          ) : (
            attendanceSummary.map((event) => (
              <MeterRow
                key={event.id}
                label={`${event.title} · ${formatEventDate(event.eventDate)}`}
                value={event.attended}
                total={event.eligible || 1}
                valueLabel={
                  event.eligible > 0
                    ? `${Math.round((event.attended / event.eligible) * 100)}%`
                    : "—"
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
