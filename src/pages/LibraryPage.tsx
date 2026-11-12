import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  BookA,
  BookOpen,
  ClipboardList,
  Clock3,
  FlaskConical,
  Library,
  Map,
  Search,
  Tag,
  X,
} from 'lucide-react';
import { LIBRARY_RESOURCES } from '../data/library';
import type { LibraryResource } from '../lib/types';
import { useApp } from '../context/AppContext';
import { Dialog } from '../components/ui/Dialog';
import { CodeBlock } from '../components/ui/CodeBlock';
import { Reveal } from '../components/ui/Reveal';
import { buttonStyles } from '../components/ui/Button';
import { cn } from '../lib/utils';

const typeIcons = {
  Glossary: BookA,
  'Cheat Sheet': ClipboardList,
  'Field Guide': Map,
  'Research Digest': FlaskConical,
} as const;

const types = ['All', 'Glossary', 'Cheat Sheet', 'Field Guide', 'Research Digest'] as const;

export function LibraryPage() {
  const { t } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [type, setType] = useState<(typeof types)[number]>('All');
  const [openId, setOpenId] = useState<string | null>(searchParams.get('open'));

  useEffect(() => {
    setOpenId(searchParams.get('open'));
  }, [searchParams]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return LIBRARY_RESOURCES.filter((resource) => {
      const matchesType = type === 'All' || resource.category === type;
      const matchesQuery =
        !normalized ||
        `${resource.title} ${resource.summary} ${resource.tags.join(' ')} ${resource.category}`
          .toLowerCase()
          .includes(normalized);
      return matchesType && matchesQuery;
    });
  }, [query, type]);

  const openResource = LIBRARY_RESOURCES.find((resource) => resource.id === openId);

  const open = (resource: LibraryResource) => {
    setOpenId(resource.id);
    const next = new URLSearchParams(searchParams);
    next.set('open', resource.id);
    setSearchParams(next, { replace: true });
  };

  const close = () => {
    setOpenId(null);
    const next = new URLSearchParams(searchParams);
    next.delete('open');
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(139,92,246,0.06),transparent)]" />

      <section className="container-page relative pb-10 pt-14 lg:pt-20">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-4">{t('library.eyebrow')}</p>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              {t('library.title')}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              {t('library.subtitle')}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-9 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('library.searchPlaceholder')}
                className="field-dark !py-3.5 !pl-11 !pr-11"
                aria-label={t('library.searchPlaceholder')}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-white/5 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-ink-800/40 px-4 py-3.5">
              <Library className="h-4 w-4 text-neon-300/70" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                {t('library.result', { count: String(filtered.length) })}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-5 flex flex-wrap gap-2">
            {types.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setType(item)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] transition',
                  type === item
                    ? 'border-neon-400/30 bg-neon-400/10 text-neon-300'
                    : 'border-white/[0.08] text-slate-500 hover:border-white/20 hover:text-slate-200',
                )}
              >
                {item === 'All' ? t('library.allTypes') : item}
              </button>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container-page">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 px-6 py-20 text-center">
            <Library className="mx-auto mb-4 h-8 w-8 text-slate-700" />
            <p className="font-display text-lg text-white">{t('library.empty')}</p>
            <p className="mt-2 text-xs text-slate-500">{t('library.emptyHint')}</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setType('All');
              }}
              className={buttonStyles('secondary', 'sm', 'mt-5')}
            >
              {t('fyp.reset')}
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((resource, index) => {
              const Icon = typeIcons[resource.category];
              return (
                <Reveal key={resource.id} delay={Math.min(index * 0.04, 0.2)}>
                  <article className="group flex h-full flex-col rounded-2xl border border-white/[0.07] bg-ink-800/50 p-5 transition duration-300 hover:border-white/[0.14] hover:bg-ink-750/60 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-violet-300">
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
                            {resource.category}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-700">
                            <Clock3 className="h-2.5 w-2.5" />
                            {t('library.readTime', { count: resource.readTime })}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] tracking-widest text-slate-800">
                        lib_{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h2 className="mt-5 font-display text-xl font-medium leading-snug text-white">
                      {resource.title}
                    </h2>
                    <p className="mt-2.5 text-[12.5px] leading-relaxed text-slate-500">
                      {resource.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="chip border-white/[0.07] bg-white/[0.02] normal-case tracking-normal text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                      <button
                        type="button"
                        onClick={() => open(resource)}
                        className="group/btn flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-neon-400/80 transition hover:text-neon-300"
                      >
                        {t('library.read')}
                        <ArrowRight className="h-3 w-3 transition group-hover/btn:translate-x-0.5" />
                      </button>
                      <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-slate-700">
                        <BookOpen className="h-3 w-3" />
                        {resource.type}
                      </span>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}

        <Reveal>
          <p className="mt-8 flex items-start justify-center gap-2 pb-4 text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-slate-700">
            <Tag className="mt-0.5 h-3 w-3 shrink-0" />
            {t('library.note')}
          </p>
        </Reveal>
      </section>

      <Dialog
        open={Boolean(openResource)}
        onClose={close}
        eyebrow={openResource?.category}
        title={openResource?.title ?? t('library.openReading')}
        size="lg"
        footer={
          openResource && (
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <p className="font-mono text-[9px] uppercase tracking-wider text-slate-600">
                {t('library.readTime', { count: openResource.readTime })} ·{' '}
                {openResource.category}
              </p>
              <button type="button" onClick={close} className={buttonStyles('secondary', 'sm')}>
                {t('library.closeReader')}
              </button>
            </div>
          )
        }
      >
        {openResource && (
          <div>
            <p className="mb-6 text-[13.5px] leading-relaxed text-slate-400">
              {openResource.summary}
            </p>
            <div className="space-y-8">
              {openResource.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-display text-lg font-medium text-white">{section.title}</h3>
                  <div className="prose-dark mt-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2.5 text-[12.5px] leading-relaxed text-slate-400"
                        >
                          <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-neon-400/70" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.code && (
                    <CodeBlock code={section.code.content} label={section.code.label} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-1.5">
              {openResource.tags.map((tag) => (
                <span key={tag} className="chip border-white/[0.07] text-slate-600">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
