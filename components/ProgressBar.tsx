type Props = {
  current: number;
  total: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
  label?: string;
};

export default function ProgressBar({
  current,
  total,
  color = "#8b5cf6",
  height = 10,
  showLabel = true,
  label,
}: Props) {
  const percent =
    total > 0 ? Math.max(0, Math.min(100, (current / total) * 100)) : 0;

  return (
    <div className="w-full">
      <div
        className="w-full overflow-hidden rounded-full bg-slate-200"
        style={{ height }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={current}
      >
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <p className="mt-2 text-xs font-semibold text-slate-500">
          {label ?? `${current} / ${total} completed`}
        </p>
      )}
    </div>
  );
}
