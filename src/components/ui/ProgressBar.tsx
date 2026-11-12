import { cn } from '../../lib/utils';

export function ProgressBar({
  value,
  className,
  size = 'md',
  showLabel = false,
}: {
  value: number;
  className?: string;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}) {
  const safe = Math.min(100, Math.max(0, Math.round(value)));
  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-slate-500">
          <span>Progress</span>
          <span className="text-neon-300">{safe}%</span>
        </div>
      )}
      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-white/[0.06]',
          size === 'sm' ? 'h-1.5' : 'h-2',
        )}
        role="progressbar"
        aria-valuenow={safe}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-neon-500 via-neon-400 to-emerald-300 shadow-[0_0_12px_rgba(57,255,136,0.45)] transition-[width] duration-700 ease-out"
          style={{ width: `${safe}%` }}
        />
      </div>
    </div>
  );
}
