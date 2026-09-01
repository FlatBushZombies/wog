"use client";

import { useState } from "react";
import Link from "next/link";
import type { ChurchEventRow } from "@/lib/db/schema";
import { updateEvent, deleteEvent } from "@/app/dashboard/(app)/events/actions";

const inputClass =
  "rounded-[0.75rem] border border-line bg-white px-[0.75rem] py-[0.5rem] text-[0.85rem] text-ink outline-none focus-visible:border-accent";

function formatEventDate(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function EventDetailHeader({ event }: { event: ChurchEventRow }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateEvent(formData);
          setEditing(false);
        }}
        className="flex flex-col gap-[0.625rem] rounded-[1.25rem] border border-line bg-white p-[1.25rem]"
      >
        <input type="hidden" name="id" value={event.id} />
        <div className="grid grid-cols-1 gap-[0.625rem] sm:grid-cols-2">
          <input name="title" defaultValue={event.title} required className={inputClass} placeholder="Event title" />
          <select name="category" defaultValue={event.category ?? ""} className={inputClass}>
            <option value="">All ministries</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="youth">Youth</option>
            <option value="sunday_school">Sunday School</option>
          </select>
          <input name="eventDate" type="date" defaultValue={event.eventDate} required className={inputClass} />
          <input name="eventTime" defaultValue={event.eventTime ?? ""} className={inputClass} placeholder="Time" />
          <input name="location" defaultValue={event.location ?? ""} className={inputClass} placeholder="Location" />
          <input name="description" defaultValue={event.description ?? ""} className={inputClass} placeholder="Description" />
        </div>
        <div className="flex gap-[0.5rem]">
          <button type="submit" className="rounded-full bg-ink px-[1.25rem] py-[0.5rem] text-[0.8rem] font-medium text-white">
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-full border border-line px-[1.25rem] py-[0.5rem] text-[0.8rem] font-medium text-muted"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="rounded-[1.25rem] border border-line bg-white p-[1.25rem]">
      <Link href="/dashboard/events" className="text-[0.8rem] font-medium text-muted hover:text-ink">
        ← All events
      </Link>
      <div className="mt-[0.75rem] flex flex-col gap-[1rem] sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[1.5rem] font-semibold tracking-tight text-ink">{event.title}</h1>
          <p className="mt-[0.25rem] text-[0.9rem] text-muted">
            {formatEventDate(event.eventDate)}
            {event.eventTime ? ` • ${event.eventTime}` : ""}
            {event.location ? ` • ${event.location}` : ""}
          </p>
          {event.description && <p className="mt-[0.5rem] text-[0.9rem] text-ink/80">{event.description}</p>}
        </div>
        <div className="flex gap-[0.5rem]">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-full border border-line px-[1rem] py-[0.5rem] text-[0.8rem] font-medium text-ink"
          >
            Edit
          </button>
          <form
            action={async (formData) => {
              if (!window.confirm(`Delete "${event.title}"? This also removes its attendance records.`)) return;
              await deleteEvent(formData);
            }}
          >
            <input type="hidden" name="id" value={event.id} />
            <button
              type="submit"
              className="rounded-full border border-line px-[1rem] py-[0.5rem] text-[0.8rem] font-medium text-red-600"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
