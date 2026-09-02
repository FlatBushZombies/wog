"use client";

import { useMemo, useState, useTransition } from "react";
import type { AttendanceListItem, Category } from "@/lib/db/queries";
import { CATEGORY_LABELS } from "@/lib/db/schema";
import { setAttendance } from "@/app/dashboard/(app)/events/[id]/attendance-actions";
import { cn } from "@/lib/utils";

const FILTERS: Array<{ label: string; value: Category | "all" }> = [
  { label: "All", value: "all" },
  { label: CATEGORY_LABELS.women, value: "women" },
  { label: CATEGORY_LABELS.men, value: "men" },
  { label: CATEGORY_LABELS.youth, value: "youth" },
  { label: CATEGORY_LABELS.sunday_school, value: "sunday_school" },
];

export function AttendanceChecklist({
  eventId,
  members,
}: {
  eventId: string;
  members: AttendanceListItem[];
}) {
  const [attendanceState, setAttendanceState] = useState(
    Object.fromEntries(members.map((m) => [m.memberId, m.attended]))
  );
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Category | "all">("all");
  const [, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return members.filter((m) => {
      const matchesFilter = filter === "all" || m.category === filter;
      const matchesSearch = m.fullName.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [members, filter, search]);

  const attendedCount = Object.values(attendanceState).filter(Boolean).length;

  function toggle(memberId: string) {
    const next = !attendanceState[memberId];
    setAttendanceState((prev) => ({ ...prev, [memberId]: next }));
    startTransition(async () => {
      try {
        await setAttendance(eventId, memberId, next);
      } catch {
        setAttendanceState((prev) => ({ ...prev, [memberId]: !next }));
      }
    });
  }

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-[1.25rem] mb-[1rem] bg-background px-[1.25rem] pb-[1rem] pt-[0.25rem] sm:mx-0 sm:px-0">
        <div className="flex flex-col gap-[0.75rem] sm:flex-row sm:items-center sm:justify-between">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search people..."
            className="rounded-[0.875rem] border border-line bg-white px-[1rem] py-[0.625rem] text-[0.9rem] outline-none focus-visible:border-accent"
          />
          <p className="whitespace-nowrap text-[0.95rem] font-medium text-muted">
            {attendedCount} / {members.length} attended
          </p>
        </div>

        <div className="mt-[0.75rem] flex flex-wrap gap-[0.5rem]">
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={cn(
                "rounded-full border px-[0.875rem] py-[0.4rem] text-[0.9rem] font-medium transition-colors",
                filter === item.value
                  ? "border-ink bg-ink text-white"
                  : "border-line text-muted hover:border-subtle"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[0.5rem]">
        {filtered.length === 0 ? (
          <p className="rounded-[1rem] border border-dashed border-line p-[1.5rem] text-center text-[0.9rem] text-muted">
            No one matches.
          </p>
        ) : (
          filtered.map((member) => (
            <label
              key={member.memberId}
              className="flex cursor-pointer items-center justify-between gap-[1rem] rounded-[1rem] border border-line bg-white p-[0.875rem]"
            >
              <div>
                <p className="text-[0.9rem] font-medium text-ink">{member.fullName}</p>
                <p className="text-[0.95rem] text-muted">{CATEGORY_LABELS[member.category]}</p>
              </div>
              <input
                type="checkbox"
                checked={attendanceState[member.memberId] ?? false}
                onChange={() => toggle(member.memberId)}
                className="h-[1.25rem] w-[1.25rem] accent-accent"
              />
            </label>
          ))
        )}
      </div>
    </div>
  );
}
