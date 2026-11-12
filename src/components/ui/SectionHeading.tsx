import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Reveal } from './Reveal';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  action?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal>
      <div
        className={cn(
          'flex flex-col gap-6',
          align === 'center' ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between',
          className,
        )}
      >
        <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
          {eyebrow && (
            <p className={cn('eyebrow mb-3', align === 'center' && 'justify-center')}>{eyebrow}</p>
          )}
          <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h2>
          {description && <p className="mt-4 text-[15px] leading-relaxed text-slate-400">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </Reveal>
  );
}
