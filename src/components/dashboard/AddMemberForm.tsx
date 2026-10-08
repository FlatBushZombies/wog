"use client";

import { useRef, useState } from "react";
import { createMember } from "@/app/dashboard/(app)/members-actions";
import type { Category } from "@/lib/db/queries";
import { CATEGORY_LABELS } from "@/lib/db/schema";

const inputClass =
  "text-body rounded-[0.4rem] border border-line bg-white px-[0.75rem] py-[0.5rem] text-ink outline-none focus-visible:border-accent";

export function AddMemberForm({
  category,
  defaultChurch = "Word of Grace",
  defaultBranch = "Main Branch",
}: {
  category?: Category;
  defaultChurch?: string;
  defaultBranch?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-body flex items-center gap-[0.5rem] rounded-[0.4rem] bg-ink px-[1.25rem] py-[0.625rem] font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
      >
        <span className="text-[1.2rem] leading-none">+</span> Add Member
      </button>
    );
  }

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        setIsSubmitting(true);
        try {
          await createMember(formData);
          formRef.current?.reset();
          setOpen(false);
        } catch (err: unknown) {
          alert(err instanceof Error ? err.message : "Failed to add member");
        } finally {
          setIsSubmitting(false);
        }
      }}
      className="flex flex-col gap-[0.875rem] rounded-[0.5rem] border border-line bg-white p-[1.25rem] shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-line pb-[0.75rem]">
        <h3 className="text-h3 text-ink">Add New Member</h3>
        <p className="text-caption text-muted">Fill details to register a church member</p>
      </div>

      {category ? (
        <input type="hidden" name="category" value={category} />
      ) : (
        <div>
          <label className="text-caption mb-[0.25rem] block font-medium text-ink">Ministry Category *</label>
          <select name="category" required className={inputClass + " w-full"}>
            {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 gap-[0.75rem] sm:grid-cols-2">
        <div>
          <label className="text-caption mb-[0.25rem] block font-medium text-ink">Full Name *</label>
          <input name="fullName" required className={inputClass + " w-full"} placeholder="e.g. John Doe" />
        </div>
        <div>
          <label className="text-caption mb-[0.25rem] block font-medium text-ink">Phone</label>
          <input name="phone" className={inputClass + " w-full"} placeholder="+263 77 123 4567" />
        </div>
        <div>
          <label className="text-caption mb-[0.25rem] block font-medium text-ink">Email</label>
          <input name="email" type="email" className={inputClass + " w-full"} placeholder="john@example.com" />
        </div>
        <div>
          <label className="text-caption mb-[0.25rem] block font-medium text-ink">Church Name *</label>
          <input
            name="church"
            defaultValue={defaultChurch}
            required
            className={inputClass + " w-full"}
            placeholder="e.g. Word of Grace Harare"
          />
        </div>
        <div>
          <label className="text-caption mb-[0.25rem] block font-medium text-ink">Branch / Location *</label>
          <input
            name="branch"
            defaultValue={defaultBranch}
            required
            className={inputClass + " w-full"}
            placeholder="e.g. Central Branch / Highfield"
          />
        </div>
        <div>
          <label className="text-caption mb-[0.25rem] block font-medium text-ink">Notes / Details</label>
          <input name="notes" className={inputClass + " w-full"} placeholder="Optional notes or position" />
        </div>
      </div>

      <div className="flex gap-[0.625rem] pt-[0.25rem]">
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-caption rounded-[0.4rem] bg-ink px-[1.25rem] py-[0.625rem] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Member"}
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => setOpen(false)}
          className="text-caption rounded-[0.4rem] border border-line px-[1.25rem] py-[0.625rem] font-medium text-muted hover:bg-surface"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
