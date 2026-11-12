import { Braces, Globe2, Network, ShieldCheck, Terminal, TerminalSquare } from 'lucide-react';
import type { Course } from '../../lib/types';
import { cn } from '../../lib/utils';

export const COURSE_ICONS = {
  shield: ShieldCheck,
  terminal: TerminalSquare,
  linux: Terminal,
  network: Network,
  python: Braces,
  globe: Globe2,
} as const;

export function CourseCover({
  course,
  index,
  variant = 'card',
}: {
  course: Course;
  index: number;
  variant?: 'card' | 'hero';
}) {
  const Icon = COURSE_ICONS[course.icon];
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden border-white/[0.07] bg-ink-900',
        variant === 'hero'
          ? 'rounded-2xl border aspect-[16/7]'
          : 'border-b aspect-[16/7]',
      )}
    >
      <div className={cn('absolute inset-0 bg-gradient-to-br', course.gradient)} />
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
      <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full border border-white/[0.06]" />
      <div className="absolute -right-2 -top-4 h-24 w-24 rounded-full border border-white/[0.05]" />

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
            course_{String(index + 1).padStart(2, '0')}
          </span>
          <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-white/60 backdrop-blur-sm">
            {course.level}
          </span>
        </div>

        <div>
          <span
            className={cn(
              'flex items-center justify-center rounded-xl border border-white/15 bg-black/25 text-white/90 backdrop-blur-sm',
              variant === 'hero' ? 'h-16 w-16' : 'h-12 w-12',
            )}
          >
            <Icon className={variant === 'hero' ? 'h-7 w-7' : 'h-5 w-5'} />
          </span>
          <div className="mt-4 flex items-end justify-between gap-3">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-white/35">
              DARKNET / CURRICULUM
            </p>
            <p className={cn('font-display text-[10px] uppercase tracking-[0.2em]', course.accent)}>
              Free
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
