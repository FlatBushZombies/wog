import { getMembersByCategory } from "@/lib/db/queries";
import { MinistrySection } from "@/components/dashboard/MinistrySection";

export default async function MenPage() {
  const members = await getMembersByCategory("men");
  return (
    <MinistrySection
      category="men"
      title="Men's Ministry"
      description="Members of the men's ministry."
      members={members}
    />
  );
}
