import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

export const metadata = {
  title: `Privacy Policy — ${site.name}`,
};

export default function PrivacyPage() {
  return (
    <>
      <main className="shell pb-[5rem] pt-[9rem] sm:pt-[10rem]">
        <h1 className="text-[2rem] font-semibold tracking-tight text-ink sm:text-[2.75rem]">
          Privacy Policy
        </h1>
        <div className="mt-[2rem] flex max-w-[42rem] flex-col gap-[1.25rem] text-[1rem] leading-relaxed text-muted">
          <p>
            {site.fullName} ({site.name}) respects your privacy. This page explains, in plain
            terms, how we handle information shared with us.
          </p>
          <p>
            When you reach out through our prayer or contact forms, we use the details you
            provide — such as your name and how to reach you — only to respond to your request
            and to connect you with the right person in our church community. We do not sell or
            share your information with third parties for marketing purposes.
          </p>
          <p>
            If you have any questions about how your information is handled, or would like it
            removed from our records, please contact us at{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-ink underline">
              {site.email}
            </a>
            .
          </p>
          <p>This policy may be updated from time to time as {site.name} grows.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
