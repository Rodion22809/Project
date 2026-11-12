import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Search,
  SearchX,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react';
import { TOPICS } from '../data/topics';
import { CATEGORY_META } from '../data/site';
import type { Category, Level } from '../lib/types';
import { useApp } from '../context/AppContext';
import { TopicCard } from '../components/topics/TopicCard';
import { Reveal } from '../components/ui/Reveal';
import { buttonStyles } from '../components/ui/Button';
import { cn } from '../lib/utils';

const categories = Object.keys(CATEGORY_META) as Category[];
const levels: Level[] = ['Beginner', 'Intermediate', 'Advanced'];

export function FypPage() {
  const { t, readTopics, favorites } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  const category = searchParams.get('category') ?? 'All';
  const level = searchParams.get('level') ?? 'All';
  const sort = searchParams.get('sort') ?? 'newest';

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (!value || value === 'All') next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  useEffect(() => {
    setQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const onQueryChange = (value: string) => {
    setQuery(value);
    const next = new URLSearchParams(searchParams);
    if (value.trim()) next.set('q', value);
    else next.delete('q');
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const items = TOPICS.filter((topic) => {
      const matchesCategory = category === 'All' || topic.category === category;
      const matchesLevel = level === 'All' || topic.level === level;
      const matchesQuery =
        !normalized ||
        `${topic.title} ${topic.excerpt} ${topic.category} ${topic.level}`
          .toLowerCase()
          .includes(normalized);
      return matchesCategory && matchesLevel && matchesQuery;
    });
    const levelOrder: Record<Level, number> = { Beginner: 0, Intermediate: 1, Advanced: 2 };
    if (sort === 'shortest') return [...items].sort((a, b) => a.minutes - b.minutes);
    if (sort === 'level') return [...items].sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
    return [...items].sort((a, b) => b.updated.localeCompare(a.updated));
  }, [category, level, query, sort]);

  const hasFilters = Boolean(query) || category !== 'All' || level !== 'All' || sort !== 'newest';

  const reset = () => {
    setQuery('');
    setSearchParams({}, { replace: true });
  };

  const progress = Math.round((readTopics.length / TOPICS.length) * 100);
  const trending = TOPICS.filter((topic) => topic.featured).slice(0, 3);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(57,255,136,0.055),transparent)]" />

      <section className="container-page relative pb-10 pt-14 lg:pt-20">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">{t('fyp.eyebrow')}</p>
              <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                {t('fyp.title')}
              </h1>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-400">
                {t('fyp.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-6 rounded-xl border border-white/[0.07] bg-ink-800/40 px-5 py-4">
              <div>
                <p className="font-display text-2xl font-semibold text-white">{progress}%</p>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-slate-600">
                  Read
                </p>
              </div>
              <div className="h-8 w-px bg-white/[0.08]" />
              <div>
                <p className="font-display text-2xl font-semibold text-white">{readTopics.length}</p>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-slate-600">
                  Notes
                </p>
              </div>
              <div className="h-8 w-px bg-white/[0.08]" />
              <div>
                <p className="font-display text-2xl font-semibold text-white">{favorites.length}</p>
                <p className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-slate-600">
                  Saved
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-page relative">
        <Reveal delay={0.05}>
          <div className="rounded-2xl border border-white/[0.07] bg-ink-850/70 p-4 backdrop-blur-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                <input
                  value={query}
                  onChange={(event) => onQueryChange(event.target.value)}
                  placeholder={t('fyp.searchPlaceholder')}
                  className="field-dark !py-2.5 !pl-10 !pr-10"
                  aria-label={t('fyp.searchPlaceholder')}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => onQueryChange('')}
                    className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-white/5 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={level}
                  onChange={(event) => updateParam('level', event.target.value)}
                  aria-label={t('fyp.level')}
                  className="field-dark w-auto min-w-[130px] !py-2.5 font-mono text-[10px] uppercase tracking-wider"
                >
                  <option value="All">{t('fyp.level')}: {t('common.all')}</option>
                  {levels.map((item) => (
                    <option key={item} value={item}>
                      {item === 'Beginner'
                        ? t('common.beginner')
                        : item === 'Intermediate'
                          ? t('common.intermediate')
                          : t('common.advanced')}
                    </option>
                  ))}
                </select>
                <select
                  value={sort}
                  onChange={(event) => updateParam('sort', event.target.value)}
                  aria-label={t('fyp.sort')}
                  className="field-dark w-auto min-w-[130px] !py-2.5 font-mono text-[10px] uppercase tracking-wider"
                >
                  <option value="newest">{t('fyp.sortNewest')}</option>
                  <option value="shortest">{t('fyp.sortShortest')}</option>
                  <option value="level">{t('fyp.sortLevel')}</option>
                </select>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={reset}
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 font-mono text-[9.5px] uppercase tracking-wider text-slate-500 transition hover:text-neon-300"
                  >
                    <RotateCcw className="h-3 w-3" />
                    {t('fyp.reset')}
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              <button
                type="button"
                onClick={() => updateParam('category', 'All')}
                className={cn(
                  'shrink-0 rounded-full border px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] transition',
                  category === 'All'
                    ? 'border-neon-400/30 bg-neon-400/10 text-neon-300'
                    : 'border-white/[0.08] text-slate-500 hover:border-white/20 hover:text-slate-200',
                )}
              >
                {t('common.all')}
              </button>
              {categories.map((item) => {
                const meta = CATEGORY_META[item];
                const active = category === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => updateParam('category', item)}
                    className={cn(
                      'flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] transition',
                      active
                        ? meta.color
                        : 'border-white/[0.08] text-slate-500 hover:border-white/20 hover:text-slate-200',
                    )}
                  >
                    <span className={cn('h-1 w-1 rounded-full', meta.dot, !active && 'opacity-50')} />
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-start">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-slate-600">
                {t('fyp.results', { count: String(filtered.length) })}
              </p>
              <span className="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-700 sm:flex">
                <span className="h-1 w-1 rounded-full bg-neon-400/60" />
                local feed
              </span>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-ink-800/30 px-6 py-20 text-center">
                <SearchX className="mb-4 h-8 w-8 text-slate-700" />
                <h2 className="font-display text-lg text-white">{t('fyp.empty')}</h2>
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-slate-500">
                  {t('fyp.emptyHint')}
                </p>
                <button type="button" onClick={reset} className={buttonStyles('secondary', 'sm', 'mt-5')}>
                  {t('fyp.reset')}
                </button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {filtered.map((topic, index) => (
                  <Reveal key={topic.slug} delay={Math.min(index * 0.03, 0.2)}>
                    <TopicCard topic={topic} index={TOPICS.indexOf(topic)} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-neon-400/15 bg-gradient-to-b from-neon-400/[0.05] to-ink-800/40 p-5">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-neon-400/80">
                <Sparkles className="h-3 w-3" />
                {t('fyp.startHere')}
              </div>
              <h2 className="mt-3 font-display text-lg leading-snug text-white">
                {t('fyp.startHereTitle')}
              </h2>
              <p className="mt-2 text-[11.5px] leading-relaxed text-slate-500">
                {t('fyp.startHereBody')}
              </p>
              <Link
                to="/fyp/what-is-cybersecurity"
                className={buttonStyles('primary', 'sm', 'mt-4 w-full')}
              >
                {t('fyp.openNote')}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                <TrendingUp className="h-3 w-3 text-violet-300" />
                Trending
              </div>
              <ul className="mt-4 space-y-3">
                {trending.map((topic, index) => (
                  <li key={topic.slug}>
                    <Link to={`/fyp/${topic.slug}`} className="group flex gap-3">
                      <span className="font-mono text-[10px] text-slate-700">0{index + 1}</span>
                      <span className="text-[12px] leading-snug text-slate-400 transition group-hover:text-neon-300">
                        {topic.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                  <Bookmark className="h-3 w-3" />
                  Your record
                </div>
                <span className="font-mono text-[9px] text-neon-300">{progress}%</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <CheckCircle2 className="h-3 w-3 text-neon-400/70" />
                    Finished
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {readTopics.length}/{TOPICS.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Bookmark className="h-3 w-3 text-violet-400/70" />
                    Saved
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">{favorites.length}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Clock3 className="h-3 w-3 text-sky-400/70" />
                    Total reading
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {TOPICS.reduce((total, topic) => total + topic.minutes, 0)} min
                  </span>
                </div>
              </div>
              <Link
                to="/profile"
                className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600 transition hover:text-neon-300"
              >
                Open profile
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
