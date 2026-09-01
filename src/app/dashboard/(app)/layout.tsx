import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default async function DashboardAppLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) {
    redirect("/dashboard/login");
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin";

  return (
    <div className="flex min-h-[100svh] flex-col bg-background md:flex-row">
      <DashboardNav adminEmail={adminEmail} />
      <main className="flex-1 px-[1.25rem] py-[1.5rem] sm:px-[2rem] sm:py-[2rem]">
        <div className="mx-auto w-full max-w-[72rem]">{children}</div>
      </main>
    </div>
  );
}
