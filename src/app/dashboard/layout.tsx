import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "../globals.css";
import { site } from "@/content/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: `${site.name} Admin`,
  description: "Admin dashboard for managing members, events and attendance.",
  robots: { index: false, follow: false },
};

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
