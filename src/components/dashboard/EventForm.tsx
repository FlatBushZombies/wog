"use client";

import { useRef, useState } from "react";
import { createEvent } from "@/app/dashboard/(app)/events/actions";

const inputClass =
  "rounded-[0.75rem] border border-line bg-white px-[0.75rem] py-[0.5rem] text-[0.95rem] text-ink outline-none focus-visible:border-accent";

export function EventForm() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-ink px-[1.25rem] py-[0.625rem] text-[0.95rem] font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
      >
        Add Event
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createEvent(formData);
        formRef.current?.reset();
        setOpen(false);
      }}
      className="flex flex-col gap-[0.625rem] rounded-[1rem] border border-line bg-white p-[1rem]"
    >
      <div className="grid grid-cols-1 gap-[0.625rem] sm:grid-cols-2">
        <input name="title" required className={inputClass} placeholder="Event title" />
        <select name="category" className={inputClass} defaultValue="">
          <option value="">All ministries</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="youth">Youth</option>
          <option value="sunday_school">Sunday School</option>
        </select>
        <input name="eventDate" type="date" required className={inputClass} />
        <input name="eventTime" className={inputClass} placeholder="Time (e.g. 9:00 AM)" />
        <input name="location" className={inputClass} placeholder="Location (optional)" />
        <input name="description" className={inputClass} placeholder="Description (optional)" />
      </div>
      <div className="flex gap-[0.5rem]">
        <button type="submit" className="rounded-full bg-ink px-[1.25rem] py-[0.5rem] text-[0.9rem] font-medium text-white">
          Save Event
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-full border border-line px-[1.25rem] py-[0.5rem] text-[0.9rem] font-medium text-muted"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
