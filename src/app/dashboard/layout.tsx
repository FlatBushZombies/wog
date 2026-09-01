import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "../globals.css";
import { site } from "@/content/site";

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: `${site.name} Admin`,
  description: "Admin dashboard for managing members, events and attendance.",
  robots: { index: false, follow: false },
};

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${onest.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
