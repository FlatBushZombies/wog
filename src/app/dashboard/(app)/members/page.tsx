import { getAllMembers, getChurchAndBranchLists } from "@/lib/db/queries";
import { AllMembersClient } from "./AllMembersClient";

export default async function AllMembersPage() {
  const [membersResult, churchBranchListsResult] = await Promise.allSettled([
    getAllMembers(),
    getChurchAndBranchLists(),
  ]);

  const members = membersResult.status === "fulfilled" ? membersResult.value : [];
  const churchBranchLists =
    churchBranchListsResult.status === "fulfilled"
      ? churchBranchListsResult.value
      : { churches: [], branches: [] };

  return (
    <AllMembersClient
      initialMembers={members}
      churches={churchBranchLists.churches}
      branches={churchBranchLists.branches}
    />
  );
}
