import type { ReactNode } from 'react';
import type { Category, Level } from '../../lib/types';
import { CATEGORY_META, LEVEL_META } from '../../data/site';
import { cn } from '../../lib/utils';
import { useApp } from '../../context/AppContext';

export function Chip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn('chip', className)}>{children}</span>;
}

export function CategoryBadge({ category, className }: { category: Category; className?: string }) {
  const meta = CATEGORY_META[category];
  return (
    <span className={cn('chip', meta.color, className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full', meta.dot)} />
      {category}
    </span>
  );
}

export function LevelBadge({ level, className }: { level: Level; className?: string }) {
  const { t } = useApp();
  const label =
    level === 'Beginner'
      ? t('common.beginner')
      : level === 'Intermediate'
        ? t('common.intermediate')
        : t('common.advanced');
  return <span className={cn('chip', LEVEL_META[level], className)}>{label}</span>;
}

export function DemoBadge({ label, className }: { label?: string; className?: string }) {
  const { t } = useApp();
  return (
    <span
      className={cn(
        'chip border-amber-400/25 bg-amber-400/[0.07] text-amber-300',
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      {label ?? t('common.demo')}
    </span>
  );
}
