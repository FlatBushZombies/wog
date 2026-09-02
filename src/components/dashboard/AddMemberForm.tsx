"use client";

import { useRef, useState } from "react";
import { createMember } from "@/app/dashboard/(app)/members-actions";
import type { Category } from "@/lib/db/queries";

const inputClass =
  "rounded-[0.75rem] border border-line bg-white px-[0.75rem] py-[0.5rem] text-[0.95rem] text-ink outline-none focus-visible:border-accent";

export function AddMemberForm({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-ink px-[1.25rem] py-[0.625rem] text-[0.95rem] font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
      >
        Add Member
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await createMember(formData);
        formRef.current?.reset();
        setOpen(false);
      }}
      className="flex flex-col gap-[0.625rem] rounded-[1rem] border border-line bg-white p-[1rem]"
    >
      <input type="hidden" name="category" value={category} />
      <div className="grid grid-cols-1 gap-[0.625rem] sm:grid-cols-2">
        <input name="fullName" required className={inputClass} placeholder="Full name" />
        <input name="email" type="email" className={inputClass} placeholder="Email (optional)" />
        <input name="phone" className={inputClass} placeholder="Phone (optional)" />
        <input name="notes" className={inputClass} placeholder="Notes (optional)" />
      </div>
      <div className="flex gap-[0.5rem]">
        <button type="submit" className="rounded-full bg-ink px-[1.25rem] py-[0.5rem] text-[0.9rem] font-medium text-white">
          Save Member
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
