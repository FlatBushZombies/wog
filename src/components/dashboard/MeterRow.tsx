export function MeterRow({
  label,
  value,
  total,
  valueLabel,
}: {
  label: string;
  value: number;
  total: number;
  valueLabel?: string;
}) {
  const pct = total > 0 ? Math.min((value / total) * 100, 100) : 0;

  return (
    <div className="flex flex-col gap-[0.375rem] sm:flex-row sm:items-center sm:gap-[0.875rem]">
      <span className="text-body min-w-0 flex-1 truncate text-muted sm:flex-none sm:basis-[11rem]">
        {label}
      </span>
      <div className="h-[0.625rem] flex-1 overflow-hidden rounded-[0.2rem] bg-surface">
        <div
          className="h-full rounded-[0.2rem] bg-accent transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-body shrink-0 text-right font-semibold text-ink sm:w-[3.5rem]">
        {valueLabel ?? `${value}/${total}`}
      </span>
    </div>
  );
}
