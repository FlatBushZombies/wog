export function ColumnChart({ data }: { data: Array<{ label: string; count: number }> }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="flex h-[9rem] items-end gap-[0.75rem]">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-[0.5rem]">
          <span className="text-caption font-semibold text-ink">{d.count}</span>
          <div className="flex h-[5.5rem] w-full items-end justify-center">
            <div
              className="w-full max-w-[1.5rem] bg-accent"
              style={{ height: d.count > 0 ? `${(d.count / max) * 100}%` : "2px" }}
            />
          </div>
          <span className="text-caption text-muted">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
