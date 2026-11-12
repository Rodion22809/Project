import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Lock,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { COURSES, TOTAL_LESSONS } from '../data/courses';
import type { Level } from '../lib/types';
import { useApp } from '../context/AppContext';
import { CourseCard } from '../components/courses/CourseCard';
import { Reveal } from '../components/ui/Reveal';
import { buttonStyles } from '../components/ui/Button';
import { cn } from '../lib/utils';

const levels: Array<Level | 'All'> = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export function CoursesPage() {
  const { t, user, isEnrolled, courseProgress } = useApp();
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<Level | 'All'>('All');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return COURSES.filter((course) => {
      const matchesLevel = level === 'All' || course.level === level;
      const matchesQuery =
        !normalized ||
        `${course.title} ${course.description} ${course.tags.join(' ')}`
          .toLowerCase()
          .includes(normalized);
      return matchesLevel && matchesQuery;
    });
  }, [query, level]);

  const enrolledCount = COURSES.filter((course) => isEnrolled(course.slug)).length;
  const avgProgress = enrolledCount
    ? Math.round(
        COURSES.filter((course) => isEnrolled(course.slug)).reduce(
          (total, course) => total + courseProgress(course.slug),
          0,
        ) / enrolledCount,
      )
    : 0;

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(139,92,246,0.07),transparent)]" />

      <section className="container-page relative pb-10 pt-14 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:items-end">
          <Reveal>
            <p className="eyebrow mb-4">{t('courses.eyebrow')}</p>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              {t('courses.title')}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              {t('courses.subtitle')}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid grid-cols-3 divide-x divide-white/[0.07] rounded-xl border border-white/[0.07] bg-ink-800/40 py-4">
              <div className="px-4">
                <p className="font-display text-xl font-semibold text-white">{COURSES.length}</p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                  Courses
                </p>
              </div>
              <div className="px-4">
                <p className="font-display text-xl font-semibold text-white">{TOTAL_LESSONS}</p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                  Lessons
                </p>
              </div>
              <div className="px-4">
                <p className="font-display text-xl font-semibold text-white">
                  {enrolledCount ? `${avgProgress}%` : 'Free'}
                </p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                  {enrolledCount ? 'Avg. progress' : 'Access'}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page">
        {!user && (
          <Reveal>
            <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-amber-400/15 bg-amber-400/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/[0.06] text-amber-300">
                  <Lock className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-[15px] font-medium text-white">
                    {t('courses.guestTitle')}
                  </p>
                  <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-slate-500">
                    {t('courses.guestBody')}
                  </p>
                </div>
              </div>
              <Link
                to="/register?next=%2Fcourses"
                className={buttonStyles('primary', 'sm', 'shrink-0')}
              >
                {t('courses.gateRegister')}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-ink-850/70 p-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('courses.searchPlaceholder')}
                className="field-dark !py-2.5 !pl-10 !pr-10"
                aria-label={t('courses.searchPlaceholder')}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-white/5 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {levels.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLevel(item)}
                  className={cn(
                    'rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] transition',
                    level === item
                      ? 'border-neon-400/30 bg-neon-400/10 text-neon-300'
                      : 'border-white/[0.08] text-slate-500 hover:border-white/20 hover:text-slate-200',
                  )}
                >
                  {item === 'All'
                    ? t('courses.allLevels')
                    : item === 'Beginner'
                      ? t('common.beginner')
                      : item === 'Intermediate'
                        ? t('common.intermediate')
                        : t('common.advanced')}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mb-5 mt-8 flex items-center justify-between">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-slate-600">
            {t('courses.result', { count: String(filtered.length) })}
          </p>
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-700">
            <ShieldCheck className="h-3 w-3" />
            {t('courses.demoNote')}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 px-6 py-20 text-center">
            <GraduationCap className="mx-auto mb-4 h-8 w-8 text-slate-700" />
            <p className="text-sm text-slate-400">{t('common.noResults')}</p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setLevel('All');
              }}
              className={buttonStyles('secondary', 'sm', 'mt-5')}
            >
              {t('fyp.reset')}
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((course, index) => (
              <Reveal key={course.slug} delay={Math.min(index * 0.04, 0.2)}>
                <CourseCard course={course} index={COURSES.indexOf(course)} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <div className="mt-14 grid gap-6 rounded-2xl border border-white/[0.07] bg-ink-800/40 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-lg text-white">Not sure where to start?</h2>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
                  Read the foundational field note first. It takes seven minutes and makes every
                  other course easier.
                </p>
              </div>
            </div>
            <Link
              to="/fyp/what-is-cybersecurity"
              className={buttonStyles('secondary', 'md', 'shrink-0')}
            >
              <BookOpen className="h-4 w-4" />
              Read the note
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>

        <p className="mt-6 flex items-center justify-center gap-2 pb-4 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-700">
          <CheckCircle2 className="h-3 w-3" />
          {t('courses.demoNote')} · progress stored locally
        </p>
      </section>
    </div>
  );
}
