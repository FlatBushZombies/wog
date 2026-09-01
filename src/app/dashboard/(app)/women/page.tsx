import { getMembersByCategory } from "@/lib/db/queries";
import { MinistrySection } from "@/components/dashboard/MinistrySection";

export default async function WomenPage() {
  const members = await getMembersByCategory("women");
  return (
    <MinistrySection
      category="women"
      title="Women's Ministry"
      description="Members of the women's ministry."
      members={members}
    />
  );
}
