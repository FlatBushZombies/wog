"use client";

import { useState } from "react";
import type { Member } from "@/lib/db/schema";
import { updateMember, deleteMember } from "@/app/dashboard/(app)/members-actions";

const inputClass =
  "rounded-[0.75rem] border border-line bg-white px-[0.75rem] py-[0.5rem] text-[0.85rem] text-ink outline-none focus-visible:border-accent";

export function MemberRow({ member }: { member: Member }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateMember(formData);
          setEditing(false);
        }}
        className="flex flex-col gap-[0.625rem] rounded-[1rem] border border-line bg-surface p-[1rem]"
      >
        <input type="hidden" name="id" value={member.id} />
        <input type="hidden" name="category" value={member.category} />
        <div className="grid grid-cols-1 gap-[0.625rem] sm:grid-cols-2">
          <input name="fullName" defaultValue={member.fullName} required className={inputClass} placeholder="Full name" />
          <input name="email" defaultValue={member.email ?? ""} type="email" className={inputClass} placeholder="Email" />
          <input name="phone" defaultValue={member.phone ?? ""} className={inputClass} placeholder="Phone" />
          <input name="notes" defaultValue={member.notes ?? ""} className={inputClass} placeholder="Notes" />
        </div>
        <div className="flex gap-[0.5rem]">
          <button type="submit" className="rounded-full bg-ink px-[1rem] py-[0.5rem] text-[0.8rem] font-medium text-white">
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-full border border-line px-[1rem] py-[0.5rem] text-[0.8rem] font-medium text-muted"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-[0.75rem] rounded-[1rem] border border-line bg-white p-[1rem] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[0.95rem] font-medium text-ink">{member.fullName}</p>
        <p className="text-[0.8rem] text-muted">
          {[member.email, member.phone].filter(Boolean).join(" • ") || "No contact info"}
        </p>
        {member.notes && <p className="mt-[0.25rem] text-[0.8rem] text-muted">{member.notes}</p>}
      </div>
      <div className="flex gap-[0.5rem]">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="rounded-full border border-line px-[0.875rem] py-[0.4rem] text-[0.8rem] font-medium text-ink"
        >
          Edit
        </button>
        <form
          action={async (formData) => {
            if (!window.confirm(`Remove ${member.fullName}?`)) return;
            await deleteMember(formData);
          }}
        >
          <input type="hidden" name="id" value={member.id} />
          <input type="hidden" name="category" value={member.category} />
          <button
            type="submit"
            className="rounded-full border border-line px-[0.875rem] py-[0.4rem] text-[0.8rem] font-medium text-red-600"
          >
            Remove
          </button>
        </form>
      </div>
    </div>
  );
}
