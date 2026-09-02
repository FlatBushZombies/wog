"use client";

import { useState } from "react";
import type { Member } from "@/lib/db/schema";
import { updateMember, deleteMember } from "@/app/dashboard/(app)/members-actions";

const inputClass =
  "text-body rounded-[0.4rem] border border-line bg-white px-[0.75rem] py-[0.5rem] text-ink outline-none focus-visible:border-accent";

export function MemberRow({ member }: { member: Member }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateMember(formData);
          setEditing(false);
        }}
        className="flex flex-col gap-[0.625rem] rounded-[0.375rem] border border-line bg-surface p-[1rem]"
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
          <button type="submit" className="text-caption rounded-[0.4rem] bg-ink px-[1rem] py-[0.5rem] font-medium text-white">
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="text-caption rounded-[0.4rem] border border-line px-[1rem] py-[0.5rem] font-medium text-muted"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-[0.75rem] rounded-[0.375rem] border border-line bg-white p-[1rem] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-body font-medium text-ink">{member.fullName}</p>
        <p className="text-caption text-muted">
          {[member.email, member.phone].filter(Boolean).join(" • ") || "No contact info"}
        </p>
        {member.notes && <p className="text-caption mt-[0.25rem] text-muted">{member.notes}</p>}
      </div>
      <div className="flex gap-[0.5rem]">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="text-caption rounded-[0.4rem] border border-line px-[0.875rem] py-[0.4rem] font-medium text-ink"
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
            className="text-caption rounded-[0.4rem] border border-line px-[0.875rem] py-[0.4rem] font-medium text-red-600"
          >
            Remove
          </button>
        </form>
      </div>
    </div>
  );
}
