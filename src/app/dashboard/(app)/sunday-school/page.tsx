import { getMembersByCategory } from "@/lib/db/queries";
import { MinistrySection } from "@/components/dashboard/MinistrySection";

export default async function SundaySchoolPage() {
  const members = await getMembersByCategory("sunday_school");
  return (
    <MinistrySection
      category="sunday_school"
      title="Sunday School"
      description="Children and teachers in Sunday School."
      members={members}
    />
  );
}
