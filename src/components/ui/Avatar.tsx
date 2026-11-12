import { cn, initials as toInitials } from '../../lib/utils';
import type { AccentKey } from '../../lib/types';

const accents: Record<AccentKey, string> = {
  neon: 'from-neon-400/90 to-emerald-600/80 text-ink-950',
  violet: 'from-violet-400/90 to-indigo-600/80 text-white',
  cyan: 'from-cyan-300/90 to-sky-600/80 text-ink-950',
  amber: 'from-amber-300/90 to-orange-600/80 text-ink-950',
  sky: 'from-sky-400/90 to-blue-600/80 text-ink-950',
  rose: 'from-rose-400/90 to-pink-600/80 text-white',
};

export function Avatar({
  name,
  accent = 'neon',
  size = 'md',
  className,
  status = false,
}: {
  name: string;
  accent?: AccentKey;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: boolean;
}) {
  const dims = {
    xs: 'h-7 w-7 text-[9px]',
    sm: 'h-9 w-9 text-[10px]',
    md: 'h-11 w-11 text-xs',
    lg: 'h-16 w-16 text-lg',
    xl: 'h-24 w-24 text-2xl',
  };
  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-gradient-to-br font-display font-bold uppercase tracking-wider ring-1 ring-white/15',
          accents[accent],
          dims[size],
        )}
        aria-hidden="true"
      >
        {toInitials(name)}
      </span>
      {status && (
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-900 bg-neon-400" />
      )}
    </span>
  );
}
