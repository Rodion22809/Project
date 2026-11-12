import { Link } from 'react-router-dom';
import { ArrowUpRight, Bookmark, Check, Clock3 } from 'lucide-react';
import type { Topic } from '../../lib/types';
import { CATEGORY_META } from '../../data/site';
import { useApp } from '../../context/AppContext';
import { CategoryBadge, LevelBadge } from '../ui/Badge';
import { cn } from '../../lib/utils';

export function TopicCard({ topic, index = 0 }: { topic: Topic; index?: number }) {
  const { favorites, toggleFavorite, readTopics, t } = useApp();
  const saved = favorites.includes(topic.slug);
  const read = readTopics.includes(topic.slug);
  const meta = CATEGORY_META[topic.category];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-800/50 transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-ink-750/70">
      <div className={`h-px w-full bg-gradient-to-r ${meta.dot === 'bg-neon-400' ? 'from-neon-400/50' : meta.dot === 'bg-violet-400' ? 'from-violet-400/50' : meta.dot === 'bg-sky-400' ? 'from-sky-400/50' : meta.dot === 'bg-rose-400' ? 'from-rose-400/50' : meta.dot === 'bg-amber-400' ? 'from-amber-400/50' : meta.dot === 'bg-teal-400' ? 'from-teal-400/50' : 'from-fuchsia-400/50'} via-white/10 to-transparent`} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <CategoryBadge category={topic.category} />
            <LevelBadge level={topic.level} />
          </div>
          <button
            type="button"
            onClick={() => toggleFavorite(topic.slug)}
            aria-pressed={saved}
            aria-label={saved ? t('common.favorited') : t('common.favorite')}
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition',
              saved
                ? 'border-neon-400/30 bg-neon-400/10 text-neon-300'
                : 'border-white/[0.08] text-slate-600 hover:border-white/20 hover:text-slate-300',
            )}
          >
            <Bookmark className={cn('h-3.5 w-3.5', saved && 'fill-neon-400/30')} />
          </button>
        </div>

        <Link to={`/fyp/${topic.slug}`} className="mt-5 block">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-700">
            note_{String(index + 1).padStart(2, '0')}
          </span>
          <h2 className="mt-1.5 font-display text-xl font-medium leading-snug tracking-tight text-white transition group-hover:text-neon-200">
            {topic.title}
          </h2>
          <p className="mt-2.5 line-clamp-3 text-[12.5px] leading-relaxed text-slate-500">
            {topic.excerpt}
          </p>
        </Link>

        <div className="mt-auto flex items-center justify-between gap-3 pt-6">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-slate-600">
              <Clock3 className="h-3 w-3" />
              {t('common.minRead', { count: topic.minutes })}
            </span>
            {read && (
              <span className="flex items-center gap-1 rounded-full bg-neon-400/[0.07] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wider text-neon-400/80">
                <Check className="h-2.5 w-2.5" />
                {t('fyp.finished')}
              </span>
            )}
          </div>
          <Link
            to={`/fyp/${topic.slug}`}
            className="flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-500 transition hover:text-neon-300"
          >
            {t('common.readMore')}
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
