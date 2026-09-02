import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getDashboardStats } from "@/lib/db/queries";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";

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
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar adminEmail={adminEmail} />
        <main className="flex-1 px-[1.25rem] py-[1.75rem] pb-[5.5rem] sm:px-[2rem] sm:py-[2.25rem] md:pb-[2.25rem]">
          <div className="mx-auto w-full max-w-[76rem]">{children}</div>
        </main>
      </div>
    </div>
  );
}
