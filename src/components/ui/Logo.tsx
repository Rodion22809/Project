import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export function Logo({
  compact = false,
  className,
  asLink = true,
  theme = 'dark',
}: {
  compact?: boolean;
  className?: string;
  asLink?: boolean;
  theme?: 'dark' | 'light';
}) {
  const light = theme === 'light';
  const content = (
    <span className={cn('group inline-flex items-center gap-3', className)}>
      <span
        className={cn(
          'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-neon-sm transition',
          light
            ? 'border-black/10 bg-[#1d1d1f] group-hover:border-black/20'
            : 'border-neon-400/25 bg-ink-800 group-hover:border-neon-400/50',
        )}
      >
        <span className="absolute inset-0 rounded-xl bg-neon-400/[0.06]" />
        <svg viewBox="0 0 40 40" className="relative h-5 w-5" aria-hidden="true">
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#39FF88" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
          <path
            d="M10 12.5 18.5 20 10 27.5"
            fill="none"
            stroke="url(#logo-grad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.5 27.5h9"
            fill="none"
            stroke="url(#logo-grad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="30.5" cy="12.5" r="2" fill="#39FF88" />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              'font-display text-[15px] font-semibold tracking-[0.16em]',
              light ? 'text-[#1d1d1f]' : 'text-white',
            )}
          >
            DARKNET
          </span>
          <span
            className={cn(
              'mt-1 font-mono text-[8.5px] uppercase tracking-[0.38em]',
              light ? 'text-[#86868b]' : 'text-neon-400/80',
            )}
          >
            Academy
          </span>
        </span>
      )}
    </span>
  );

  if (!asLink) return content;
  return (
    <Link to="/" aria-label="DARKNET ACADEMY home" className="rounded-lg">
      {content}
    </Link>
  );
}
