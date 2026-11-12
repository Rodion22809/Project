import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Compass,
  FileText,
  GraduationCap,
  Search,
  X,
} from 'lucide-react';
import { TOPICS } from '../../data/topics';
import { COURSES } from '../../data/courses';
import { LIBRARY_RESOURCES } from '../../data/library';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';

type Group = 'field-notes' | 'courses' | 'library' | 'pages';

interface Result {
  id: string;
  title: string;
  subtitle: string;
  to: string;
  group: Group;
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useApp();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  const pages = useMemo(
    () => [
      { title: 'FYP feed', subtitle: 'Field notes', to: '/fyp' },
      { title: 'Courses', subtitle: 'Free curriculum', to: '/courses' },
      { title: 'Cyber Library', subtitle: 'Glossary and guides', to: '/library' },
      { title: 'Community', subtitle: 'Demo discussions', to: '/community' },
      { title: 'Profile', subtitle: 'Your local record', to: '/profile' },
      { title: 'Licenses & certificates', subtitle: 'Demo documents', to: '/licenses' },
      { title: 'About', subtitle: 'Project principles', to: '/about' },
      { title: 'Contact', subtitle: 'Local demo form', to: '/contact' },
    ],
    [],
  );

  const allResults = useMemo<Result[]>(() => {
    const topics: Result[] = TOPICS.map((topic) => ({
      id: `topic-${topic.slug}`,
      title: topic.title,
      subtitle: `${topic.category} · ${topic.minutes} min`,
      to: `/fyp/${topic.slug}`,
      group: 'field-notes',
    }));
    const courses: Result[] = COURSES.map((course) => ({
      id: `course-${course.slug}`,
      title: course.title,
      subtitle: `${course.level} · ${course.lessons.length} lessons`,
      to: `/courses/${course.slug}`,
      group: 'courses',
    }));
    const library: Result[] = LIBRARY_RESOURCES.map((resource) => ({
      id: `library-${resource.id}`,
      title: resource.title,
      subtitle: `${resource.category} · ${resource.readTime} min`,
      to: `/library?open=${resource.id}`,
      group: 'library',
    }));
    const pageResults: Result[] = pages.map((page) => ({
      id: `page-${page.to}`,
      title: page.title,
      subtitle: page.subtitle,
      to: page.to,
      group: 'pages',
    }));
    return [...topics, ...courses, ...library, ...pageResults];
  }, [pages]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return allResults.filter(
        (item) => item.group === 'field-notes' || item.group === 'pages',
      ).slice(0, 11);
    }
    return allResults
      .filter((item) =>
        `${item.title} ${item.subtitle}`.toLowerCase().includes(normalized),
      )
      .slice(0, 16);
  }, [allResults, query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setSelected(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelected((current) => Math.min(current + 1, Math.max(results.length - 1, 0)));
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelected((current) => Math.max(current - 1, 0));
      }
      if (event.key === 'Enter') {
        const item = results[selected];
        if (item) {
          event.preventDefault();
          navigate(item.to);
          onClose();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, results, selected, navigate, onClose]);

  const openResult = (result: Result) => {
    navigate(result.to);
    onClose();
  };

  const groups: Array<{ key: Group; label: string; Icon: typeof FileText }> = [
    { key: 'field-notes', label: t('search.groups.fieldNotes'), Icon: FileText },
    { key: 'courses', label: t('search.groups.courses'), Icon: GraduationCap },
    { key: 'library', label: t('search.groups.library'), Icon: BookOpen },
    { key: 'pages', label: t('search.groups.pages'), Icon: Compass },
  ];

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[8vh] sm:pt-[12vh]">
          <motion.button
            type="button"
            aria-label="Close search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('search.title')}
            initial={{ opacity: 0, y: -14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-ink-850/95 shadow-panel backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
              <Search className="h-4 w-4 shrink-0 text-neon-300" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('common.searchPlaceholder')}
                className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 focus:outline-none"
                aria-label={t('common.searchSite')}
              />
              <span className="hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[9px] text-slate-600 sm:block">
                ESC
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-white/5 hover:text-white sm:hidden"
                aria-label={t('common.close')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[58vh] overflow-y-auto px-2 py-2">
              {results.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <Search className="mx-auto mb-3 h-6 w-6 text-slate-700" />
                  <p className="text-sm text-slate-400">{t('search.empty')}</p>
                </div>
              ) : (
                groups.map((group) => {
                  const groupResults = results.filter((item) => item.group === group.key);
                  if (groupResults.length === 0) return null;
                  return (
                    <div key={group.key} className="mb-2">
                      <p className="flex items-center gap-1.5 px-3 pb-1.5 pt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">
                        <group.Icon className="h-3 w-3" />
                        {group.label}
                      </p>
                      {groupResults.map((result) => {
                        const index = results.indexOf(result);
                        const active = index === selected;
                        return (
                          <button
                            key={result.id}
                            type="button"
                            onMouseEnter={() => setSelected(index)}
                            onClick={() => openResult(result)}
                            className={cn(
                              'flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left transition',
                              active ? 'bg-neon-400/[0.08]' : 'hover:bg-white/[0.03]',
                            )}
                          >
                            <span className="min-w-0">
                              <span
                                className={cn(
                                  'block truncate text-[13px]',
                                  active ? 'text-white' : 'text-slate-300',
                                )}
                              >
                                {result.title}
                              </span>
                              <span className="mt-0.5 block text-[10.5px] text-slate-600">
                                {result.subtitle}
                              </span>
                            </span>
                            <ArrowRight
                              className={cn(
                                'h-3.5 w-3.5 shrink-0',
                                active ? 'text-neon-300' : 'text-slate-700',
                              )}
                            />
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.06] px-4 py-2.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-600">
                {t('search.hint')}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-700">
                ↑↓ navigate · enter open
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
