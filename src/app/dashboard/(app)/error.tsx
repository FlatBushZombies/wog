"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-[1rem] text-center">
      <p className="text-[1.1rem] font-semibold text-ink">Something went wrong.</p>
      <p className="max-w-[24rem] text-[0.9rem] text-muted">
        {error.message.includes("fetch failed") || error.message.includes("connecting to database")
          ? "Couldn't reach the database. This is usually temporary — try again."
          : "An unexpected error occurred."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-ink px-[1.25rem] py-[0.625rem] text-[0.85rem] font-medium text-white"
      >
        Try Again
      </button>
    </div>
  );
}
