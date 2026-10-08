"use client";

import { useState } from "react";
import type { Member } from "@/lib/db/schema";
import { CATEGORY_LABELS } from "@/lib/db/schema";
import type { Category } from "@/lib/db/queries";
import { updateMember, deleteMember } from "@/app/dashboard/(app)/members-actions";
import { Building2, MapPin, UserCheck } from "lucide-react";

const inputClass =
  "text-[16px] sm:text-body rounded-[0.4rem] border border-line bg-white px-[0.75rem] py-[0.625rem] text-ink outline-none focus-visible:border-accent";

export function MemberRow({ member }: { member: Member }) {
  const [editing, setEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (editing) {
    return (
      <form
        action={async (formData) => {
          setErrorMessage(null);
          const res = await updateMember(formData);
          if (!res.success) {
            setErrorMessage(res.error || "Failed to update member");
          } else {
            setEditing(false);
          }
        }}
        className="flex flex-col gap-[0.75rem] rounded-[0.5rem] border border-line bg-surface p-[1rem] sm:p-[1.25rem]"
      >
        <input type="hidden" name="id" value={member.id} />
        {errorMessage && (
          <div className="rounded-[0.375rem] border border-red-200 bg-red-50 p-[0.75rem] text-caption font-medium text-red-700">
            {errorMessage}
          </div>
        )}
        <div className="grid grid-cols-1 gap-[0.625rem] sm:grid-cols-2">
          <div>
            <label className="text-caption mb-[0.25rem] block font-medium text-ink">Full Name</label>
            <input name="fullName" defaultValue={member.fullName} required className={inputClass + " w-full"} placeholder="Full name" />
          </div>
          <div>
            <label className="text-caption mb-[0.25rem] block font-medium text-ink">Ministry Category</label>
            <select name="category" defaultValue={member.category} required className={inputClass + " w-full"}>
              {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-caption mb-[0.25rem] block font-medium text-ink">Church Name</label>
            <input name="church" defaultValue={member.church ?? "Word of Grace"} required className={inputClass + " w-full"} placeholder="Church" />
          </div>
          <div>
            <label className="text-caption mb-[0.25rem] block font-medium text-ink">Branch / Location</label>
            <input name="branch" defaultValue={member.branch ?? "Main Branch"} required className={inputClass + " w-full"} placeholder="Branch" />
          </div>
          <div>
            <label className="text-caption mb-[0.25rem] block font-medium text-ink">Email</label>
            <input name="email" defaultValue={member.email ?? ""} type="email" className={inputClass + " w-full"} placeholder="Email" />
          </div>
          <div>
            <label className="text-caption mb-[0.25rem] block font-medium text-ink">Phone</label>
            <input name="phone" defaultValue={member.phone ?? ""} className={inputClass + " w-full"} placeholder="Phone" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-caption mb-[0.25rem] block font-medium text-ink">Notes</label>
            <input name="notes" defaultValue={member.notes ?? ""} className={inputClass + " w-full"} placeholder="Notes" />
          </div>
        </div>
        <div className="flex flex-wrap gap-[0.5rem] pt-[0.25rem]">
          <button type="submit" className="text-body min-h-[44px] flex-1 rounded-[0.4rem] bg-ink px-[1rem] py-[0.5rem] font-medium text-white sm:flex-initial">
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="text-body min-h-[44px] flex-1 rounded-[0.4rem] border border-line px-[1rem] py-[0.5rem] font-medium text-muted sm:flex-initial"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-[0.75rem] rounded-[0.5rem] border border-line bg-white p-[0.875rem] sm:p-[1rem] transition-colors hover:border-subtle sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-[0.625rem] gap-y-[0.375rem]">
          <p className="text-body font-semibold text-ink">{member.fullName}</p>

          <span className="inline-flex items-center gap-[0.25rem] rounded-full bg-accent/10 px-[0.625rem] py-[0.125rem] text-[0.75rem] font-medium text-accent-dark">
            <Building2 size={12} aria-hidden="true" />
            {member.church || "Word of Grace"}
          </span>

          <span className="inline-flex items-center gap-[0.25rem] rounded-full bg-surface px-[0.625rem] py-[0.125rem] text-[0.75rem] font-medium text-muted">
            <MapPin size={12} aria-hidden="true" />
            {member.branch || "Main Branch"}
          </span>

          <span className="rounded-[0.25rem] bg-surface px-[0.5rem] py-[0.125rem] text-[0.725rem] font-medium uppercase tracking-[0.03em] text-ink/70">
            {CATEGORY_LABELS[member.category]}
          </span>
        </div>

        <div className="mt-[0.375rem] flex flex-wrap items-center gap-x-[1rem] gap-y-[0.25rem] text-caption text-muted">
          {[member.email, member.phone].filter(Boolean).map((info, idx) => (
            <span key={idx}>{info}</span>
          ))}
          {member.addedBy && (
            <span className="inline-flex items-center gap-[0.25rem] text-muted/80">
              <UserCheck size={12} /> Added by {member.addedBy}
            </span>
          )}
        </div>

        {member.notes && <p className="text-caption mt-[0.375rem] italic text-muted">{member.notes}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-[0.5rem] border-t border-line/50 pt-[0.625rem] sm:border-t-0 sm:pt-0">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="text-body min-h-[40px] flex-1 sm:flex-initial rounded-[0.4rem] border border-line px-[0.875rem] py-[0.4rem] font-medium text-ink hover:bg-surface"
        >
          Edit
        </button>
        <form
          action={async (formData) => {
            if (!window.confirm(`Remove ${member.fullName}?`)) return;
            setIsDeleting(true);
            try {
              const res = await deleteMember(formData);
              if (!res.success) {
                alert(res.error || "Failed to remove member");
                setIsDeleting(false);
              }
            } catch (err: unknown) {
              alert(err instanceof Error ? err.message : "Failed to delete");
              setIsDeleting(false);
            }
          }}
          className="flex-1 sm:flex-initial"
        >
          <input type="hidden" name="id" value={member.id} />
          <input type="hidden" name="category" value={member.category} />
          <button
            type="submit"
            disabled={isDeleting}
            className="text-body min-h-[40px] w-full rounded-[0.4rem] border border-line px-[0.875rem] py-[0.4rem] font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {isDeleting ? "Removing..." : "Remove"}
          </button>
        </form>
      </div>
    </div>
  );
}
