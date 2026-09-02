import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getDashboardStats } from "@/lib/db/queries";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default async function DashboardAppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/dashboard/login");
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin";
  const stats = await getDashboardStats().catch(() => null);

  return (
    <div className="flex min-h-[100svh] flex-col bg-background md:flex-row">
      <DashboardNav adminEmail={adminEmail} counts={stats?.counts ?? null} />
      <main className="flex-1 px-[1.25rem] py-[1.75rem] sm:px-[2rem] sm:py-[2.25rem]">
        <div className="mx-auto w-full max-w-[76rem]">{children}</div>
      </main>
    </div>
  );
}
