import { getMembersByCategory } from "@/lib/db/queries";
import { MinistrySection } from "@/components/dashboard/MinistrySection";

export default async function YouthPage() {
  const members = await getMembersByCategory("youth");
  return (
    <MinistrySection
      category="youth"
      title="Youth Service"
      description="Members of the youth service."
      members={members}
    />
  );
}
