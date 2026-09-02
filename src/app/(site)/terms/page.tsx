import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

export const metadata = {
  title: `Terms of Use — ${site.name}`,
};

export default function TermsPage() {
  return (
    <>
      <main className="shell pb-[5rem] pt-[9rem] sm:pt-[10rem]">
        <h1 className="text-[2rem] font-semibold tracking-tight text-ink sm:text-[2.75rem]">
          Terms of Use
        </h1>
        <div className="mt-[2rem] flex max-w-[42rem] flex-col gap-[1.25rem] text-[1rem] leading-relaxed text-muted">
          <p>
            This website is provided by {site.fullName} ({site.name}) as a resource for our
            church community in {site.address}.
          </p>
          <p>
            The content on this site — including messages, event details and ministry
            information — is shared in good faith to help you connect with our church. Details
            such as service times and events may change; please reach out to us directly to
            confirm before visiting.
          </p>
          <p>
            Please use this site respectfully. Any content submitted through our forms should be
            genuine and not intended to mislead or harm others.
          </p>
          <p>
            Questions about these terms can be directed to{" "}
            <a href={`mailto:${site.email}`} className="font-medium text-ink underline">
              {site.email}
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
