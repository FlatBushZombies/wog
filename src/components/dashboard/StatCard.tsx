export function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-[1.25rem] border border-line bg-white p-[1.25rem]">
      <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-muted">{label}</p>
      <p className="mt-[0.5rem] text-[1.75rem] font-semibold tracking-tight text-ink">{value}</p>
      {hint && <p className="mt-[0.25rem] text-[0.8rem] text-muted">{hint}</p>}
    </div>
  );
}
