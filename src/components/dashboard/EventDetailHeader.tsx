"use client";

import { useState } from "react";
import Link from "next/link";
import type { ChurchEventRow } from "@/lib/db/schema";
import { updateEvent, deleteEvent } from "@/app/dashboard/(app)/events/actions";

const inputClass =
  "text-body rounded-[0.4rem] border border-line bg-white px-[0.75rem] py-[0.5rem] text-ink outline-none focus-visible:border-accent";

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
        className="flex flex-col gap-[0.625rem] rounded-[0.375rem] border border-line bg-white p-[1.25rem]"
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
          <input
            name="imageUrl"
            type="url"
            defaultValue={event.imageUrl ?? ""}
            className={`${inputClass} sm:col-span-2`}
            placeholder="Image URL (optional, e.g. a Pexels photo link)"
          />
        </div>
        <div className="flex gap-[0.5rem]">
          <button type="submit" className="text-caption rounded-[0.4rem] bg-ink px-[1.25rem] py-[0.5rem] font-medium text-white">
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="text-caption rounded-[0.4rem] border border-line px-[1.25rem] py-[0.5rem] font-medium text-muted"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="rounded-[0.375rem] border border-line bg-white p-[1.25rem]">
      <Link href="/dashboard/events" className="text-body font-medium text-muted hover:text-ink">
        ← All events
      </Link>
      <div className="mt-[0.75rem] flex flex-col gap-[1rem] sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-[1rem] sm:flex-row sm:items-start">
          {event.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- admin-provided arbitrary URL, not an optimized local/known asset
            <img
              src={event.imageUrl}
              alt=""
              className="h-[6rem] w-[6rem] shrink-0 rounded-[0.4rem] object-cover"
            />
          )}
          <div>
            <h1 className="text-h2 text-ink">{event.title}</h1>
            <p className="text-body mt-[0.25rem] text-muted">
              {formatEventDate(event.eventDate)}
              {event.eventTime ? ` • ${event.eventTime}` : ""}
              {event.location ? ` • ${event.location}` : ""}
            </p>
            {event.description && <p className="text-body mt-[0.5rem] text-ink/80">{event.description}</p>}
          </div>
        </div>
        <div className="flex gap-[0.5rem]">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-caption rounded-[0.4rem] border border-line px-[1rem] py-[0.5rem] font-medium text-ink"
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
              className="text-caption rounded-[0.4rem] border border-line px-[1rem] py-[0.5rem] font-medium text-red-600"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
