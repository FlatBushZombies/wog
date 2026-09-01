import type { Member } from "@/lib/db/schema";
import type { Category } from "@/lib/db/queries";
import { AddMemberForm } from "./AddMemberForm";
import { MemberRow } from "./MemberRow";

export function MinistrySection({
  category,
  title,
  description,
  members,
}: {
  category: Category;
  title: string;
  description: string;
  members: Member[];
}) {
  return (
    <div>
      <div className="flex flex-col gap-[1rem] sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[1.75rem] font-semibold tracking-tight text-ink">{title}</h1>
          <p className="mt-[0.25rem] text-[0.9rem] text-muted">{description}</p>
        </div>
        <AddMemberForm category={category} />
      </div>

      <p className="mt-[1.5rem] text-[0.8rem] font-medium uppercase tracking-[0.08em] text-muted">
        {members.length} {members.length === 1 ? "person" : "people"}
      </p>

      <div className="mt-[0.75rem] flex flex-col gap-[0.75rem]">
        {members.length === 0 ? (
          <p className="rounded-[1rem] border border-dashed border-line p-[1.5rem] text-center text-[0.9rem] text-muted">
            No one added yet.
          </p>
        ) : (
          members.map((member) => <MemberRow key={member.id} member={member} />)
        )}
      </div>
    </div>
  );
}
