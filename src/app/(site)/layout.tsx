import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import "../globals.css";

import { AppReadyProvider } from "@/lib/app-ready";
import { UiStateProvider } from "@/lib/ui-state";
import { SmoothScrollProvider } from "@/lib/smooth-scroll";
import { PageLoader } from "@/components/overlays/PageLoader";
import { PrayerModal } from "@/components/overlays/PrayerModal";
import { Header } from "@/components/layout/Header";
import { NavigationMenu } from "@/components/layout/NavigationMenu";
import { site } from "@/content/site";

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-onest",
});

const title = `${site.name} — ${site.tagline}`;
const description = `${site.fullName} is a Christian church community in ${site.address}, centered on worship, the Word, fellowship and serving others.`;

export const metadata: Metadata = {
  title,
  description,
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title,
    description,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${onest.variable} antialiased`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AppReadyProvider>
          <UiStateProvider>
            <SmoothScrollProvider>
              <PageLoader />
              <Header />
              <NavigationMenu />
              <PrayerModal />
              <main id="main-content">{children}</main>
            </SmoothScrollProvider>
          </UiStateProvider>
        </AppReadyProvider>
      </body>
    </html>
  );
}
