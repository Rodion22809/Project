import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  GraduationCap,
  Info,
  Lock,
  Play,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { COURSES, getCourse } from '../data/courses';
import { useApp } from '../context/AppContext';
import { CourseCover } from '../components/courses/CourseCover';
import { LessonQuiz } from '../components/courses/LessonQuiz';
import { CodeBlock } from '../components/ui/CodeBlock';
import { ProgressBar } from '../components/ui/ProgressBar';
import { LevelBadge, DemoBadge } from '../components/ui/Badge';
import { buttonStyles } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { cn, percent } from '../lib/utils';

export function CourseDetailPage() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    t,
    user,
    isEnrolled,
    enroll,
    courseProgress,
    enrollments,
    toggleLessonComplete,
  } = useApp();

  const course = getCourse(slug);
  const requestedLesson = searchParams.get('lesson');
  const defaultLesson =
    course?.lessons.find((lesson) => lesson.id === requestedLesson) ?? course?.lessons[0];
  const [selectedId, setSelectedId] = useState(defaultLesson?.id ?? '');

  useEffect(() => {
    if (!course) return;
    const requested = course.lessons.find((lesson) => lesson.id === searchParams.get('lesson'));
    if (requested) setSelectedId(requested.id);
  }, [course, searchParams]);

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  const lesson = course.lessons.find((item) => item.id === selectedId) ?? course.lessons[0];
  const lessonIndex = course.lessons.findIndex((item) => item.id === lesson.id);
  const previous = course.lessons[lessonIndex - 1];
  const next = course.lessons[lessonIndex + 1];
  const enrolled = isEnrolled(course.slug);
  const enrollment = enrollments[course.slug];
  const completed = enrollment?.completedLessons ?? [];
  const isLessonDone = completed.includes(lesson.id);
  const progress = courseProgress(course.slug);
  const courseIndex = COURSES.findIndex((item) => item.slug === course.slug);
  const nextIncomplete = course.lessons.find((item) => !completed.includes(item.id)) ?? course.lessons[0];

  if (!user) {
    const nextPath = `/courses/${course.slug}`;
    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(139,92,246,0.07),transparent)]" />

        <section className="container-page relative pb-16 pt-8">
          <nav className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-600">
            <Link to="/courses" className="transition hover:text-neon-300">
              {t('nav.courses')}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="truncate text-slate-500">{course.title}</span>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:items-start">
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-800/60">
              <CourseCover course={course} index={courseIndex} />
              <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06]">
                <div className="px-3 py-3.5">
                  <p className="font-display text-base font-semibold text-white">
                    {course.lessons.length}
                  </p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-slate-600">
                    Lessons
                  </p>
                </div>
                <div className="px-3 py-3.5">
                  <p className="font-display text-base font-semibold text-white">{course.hours}h</p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-slate-600">
                    Content
                  </p>
                </div>
                <div className="px-3 py-3.5">
                  <p className="font-display text-base font-semibold text-white">{course.level}</p>
                  <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-slate-600">
                    Level
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="chip border-amber-400/25 bg-amber-400/[0.06] text-amber-300">
                  <Lock className="h-3 w-3" />
                  {t('courses.membersOnly')}
                </span>
                <LevelBadge level={course.level} />
                <DemoBadge label="Free course" />
              </div>

              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
                {course.title}
              </h1>
              <p className={`mt-4 font-display text-lg ${course.accent}`}>{course.tagline}</p>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-400">
                {course.description}
              </p>

              <div className="mt-7 rounded-2xl border border-neon-400/15 bg-neon-400/[0.035] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neon-400/20 bg-neon-400/[0.07] text-neon-300">
                    <Lock className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-display text-lg font-medium text-white">
                      {t('courses.gateTitle')}
                    </h2>
                    <p className="mt-2 max-w-xl text-[12.5px] leading-relaxed text-slate-400">
                      {t('courses.gateBody')}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {[
                        t('courses.gateBullet1'),
                        t('courses.gateBullet2'),
                        t('courses.gateBullet3'),
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex gap-2 text-[12px] leading-relaxed text-slate-400"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-400/80" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                      <Link
                        to={`/register?next=${encodeURIComponent(nextPath)}`}
                        className={buttonStyles('primary', 'md')}
                      >
                        {t('courses.gateRegister')}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        to={`/login?next=${encodeURIComponent(nextPath)}`}
                        className={buttonStyles('secondary', 'md')}
                      >
                        {t('courses.gateLogin')}
                      </Link>
                    </div>

                    <p className="mt-4 flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-wider text-slate-600">
                      <Lock className="h-2.5 w-2.5" />
                      {t('courses.gateNote')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const selectLesson = (id: string, scroll = true) => {
    setSelectedId(id);
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('lesson', id);
    setSearchParams(nextParams, { replace: true });
    if (scroll) {
      window.setTimeout(() => {
        document.getElementById('lesson-content')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 50);
    }
  };

  const handleEnroll = () => {
    enroll(course.slug);
    selectLesson(nextIncomplete.id, true);
  };

  const handleContinue = () => {
    selectLesson(nextIncomplete.id, true);
  };

  const handleComplete = () => {
    if (!enrolled) enroll(course.slug);
    toggleLessonComplete(course.slug, lesson.id);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(139,92,246,0.07),transparent)]" />

      <section className="container-page relative pt-8">
        <nav className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-600">
          <Link to="/courses" className="transition hover:text-neon-300">
            {t('nav.courses')}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="truncate text-slate-500">{course.title}</span>
        </nav>

        <div className="mt-8 grid gap-10 pb-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <Reveal>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <DemoBadge label="Free course" />
                <LevelBadge level={course.level} />
                <span className="chip border-white/10 text-slate-500">
                  <Sparkles className="h-3 w-3" />
                  {course.tags[0]}
                </span>
              </div>
              <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl">
                {course.title}
              </h1>
              <p className={`mt-4 font-display text-lg ${course.accent}`}>{course.tagline}</p>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
                {course.description}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-white/[0.07] py-4">
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  <Play className="h-3.5 w-3.5 text-neon-400/70" />
                  {t('common.lessons', { count: course.lessons.length })}
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  <Clock3 className="h-3.5 w-3.5 text-sky-400/70" />
                  {t('common.hours', { count: course.hours })}
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-violet-400/70" />
                  {t('common.free')}
                </span>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                  <GraduationCap className="h-3.5 w-3.5 text-amber-400/70" />
                  Self-paced
                </span>
              </div>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h2 className="font-display text-lg font-medium text-white">
                    {t('courses.outcomes')}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {course.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex gap-2.5 text-[12.5px] leading-relaxed text-slate-400"
                      >
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-400/80" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-display text-lg font-medium text-white">
                    {t('courses.prerequisites')}
                  </h2>
                  <ul className="mt-4 space-y-2.5">
                    {course.prerequisites.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-[12.5px] leading-relaxed text-slate-400"
                      >
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-violet-400/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-xl border border-amber-400/10 bg-amber-400/[0.02] p-3">
                    <p className="flex gap-2 text-[10.5px] leading-relaxed text-amber-200/50">
                      <Info className="mt-0.5 h-3 w-3 shrink-0" />
                      {t('courses.demoNote')}. This is not a professional certification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-800/60 lg:sticky lg:top-28">
              <CourseCover course={course} index={courseIndex} />
              <div className="p-5">
                {enrolled ? (
                  <>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-neon-300">
                        {t('courses.enrolledTitle')}
                      </p>
                      <span className="font-display text-lg font-semibold text-white">
                        {progress}%
                      </span>
                    </div>
                    <ProgressBar value={progress} className="mt-3" />
                    <p className="mt-2 font-mono text-[9px] uppercase tracking-wider text-slate-600">
                      {completed.length}/{course.lessons.length} lessons complete
                    </p>
                    <button
                      type="button"
                      onClick={handleContinue}
                      className={buttonStyles('primary', 'md', 'mt-5 w-full')}
                    >
                      <Play className="h-3.5 w-3.5" />
                      {t('courses.continueLesson')}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                      {t('courses.enrollTitle')}
                    </p>
                    <p className="mt-2 text-[12px] leading-relaxed text-slate-500">
                      {t('courses.enrollBody')}
                    </p>
                    <button
                      type="button"
                      onClick={handleEnroll}
                      className={buttonStyles('primary', 'md', 'mt-5 w-full')}
                    >
                      {t('common.enroll')}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </>
                )}

                <div className="mt-5 space-y-2 border-t border-white/[0.06] pt-4">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600">Level</span>
                    <span className="text-slate-400">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600">Lessons</span>
                    <span className="text-slate-400">{course.lessons.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600">Estimated time</span>
                    <span className="text-slate-400">{course.hours} hours</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-600">Access</span>
                    <span className="text-neon-400">Open · free</span>
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-wider text-slate-700">
                  <Lock className="h-2.5 w-2.5" />
                  progress saved in this browser
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-ink-850/30 py-12">
        <div className="container-page grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-800/60">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3.5">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                  {t('courses.syllabus')}
                </p>
                <span className="font-mono text-[9px] text-neon-300">{progress}%</span>
              </div>
              <div className="p-3">
                <ProgressBar value={progress} size="sm" className="mb-3 px-1" />
                <ol className="max-h-[50vh] space-y-1 overflow-y-auto pr-1">
                  {course.lessons.map((item, index) => {
                    const active = item.id === lesson.id;
                    const done = completed.includes(item.id);
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => selectLesson(item.id)}
                          className={cn(
                            'flex w-full items-start gap-3 rounded-lg px-2.5 py-2.5 text-left transition',
                            active ? 'bg-neon-400/[0.07]' : 'hover:bg-white/[0.03]',
                          )}
                        >
                          <span
                            className={cn(
                              'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[8px]',
                              done
                                ? 'border-neon-400/30 bg-neon-400/10 text-neon-300'
                                : active
                                  ? 'border-neon-400/30 text-neon-300'
                                  : 'border-white/10 text-slate-600',
                            )}
                          >
                            {done ? <Check className="h-2.5 w-2.5" /> : String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="min-w-0">
                            <span
                              className={cn(
                                'block text-[11.5px] leading-snug',
                                active ? 'text-white' : 'text-slate-400',
                              )}
                            >
                              {item.title}
                            </span>
                            <span className="mt-1 flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-wider text-slate-700">
                              <Clock3 className="h-2.5 w-2.5" />
                              {item.duration} min
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div className="border-t border-white/[0.06] px-4 py-3">
                <Link
                  to="/courses"
                  className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-slate-600 transition hover:text-neon-300"
                >
                  <ArrowLeft className="h-3 w-3" />
                  {t('courses.backToCourses')}
                </Link>
              </div>
            </div>
          </aside>

          <div id="lesson-content" className="scroll-mt-28">
            <Reveal key={lesson.id}>
              <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40">
                <div className="border-b border-white/[0.06] px-5 py-5 sm:px-7 sm:py-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-neon-400/70">
                      Lesson {String(lessonIndex + 1).padStart(2, '0')} /{' '}
                      {String(course.lessons.length).padStart(2, '0')}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-600">
                        <Clock3 className="h-3 w-3" />
                        {lesson.duration} min
                      </span>
                      {isLessonDone && (
                        <span className="flex items-center gap-1 rounded-full bg-neon-400/[0.08] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wider text-neon-300">
                          <Check className="h-2.5 w-2.5" />
                          {t('courses.lessonDone')}
                        </span>
                      )}
                    </div>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                    {lesson.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-slate-500">
                    {lesson.summary}
                  </p>
                </div>

                <div className="px-5 py-7 sm:px-7">
                  {!enrolled && (
                    <div className="mb-7 flex flex-col items-start justify-between gap-3 rounded-xl border border-violet-400/15 bg-violet-500/[0.04] px-4 py-3.5 sm:flex-row sm:items-center">
                      <p className="flex gap-2 text-[11.5px] leading-relaxed text-violet-200/70">
                        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        Preview mode. Enroll for free to record your progress.
                      </p>
                      <button
                        type="button"
                        onClick={handleEnroll}
                        className={buttonStyles('violet', 'sm', 'shrink-0')}
                      >
                        {t('common.enroll')}
                      </button>
                    </div>
                  )}

                  <div className="space-y-9">
                    {lesson.sections.map((section) => (
                      <div key={section.title}>
                        <h3 className="font-display text-lg font-medium text-white">
                          {section.title}
                        </h3>
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
                                className="flex gap-2.5 text-[13px] leading-relaxed text-slate-400"
                              >
                                <span className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-violet-400/70" />
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

                  {lesson.check && <LessonQuiz key={lesson.id} check={lesson.check} />}

                  <div className="mt-9 flex flex-col gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={handleComplete}
                      className={buttonStyles(isLessonDone ? 'secondary' : 'primary', 'md')}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isLessonDone ? t('courses.lessonDone') : t('courses.markDone')}
                    </button>
                    <div className="flex items-center gap-2">
                      {previous && (
                        <button
                          type="button"
                          onClick={() => selectLesson(previous.id)}
                          className={buttonStyles('ghost', 'sm')}
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                          {t('courses.prevLesson')}
                        </button>
                      )}
                      {next && (
                        <button
                          type="button"
                          onClick={() => selectLesson(next.id)}
                          className={buttonStyles('secondary', 'sm')}
                        >
                          {t('courses.nextLesson')}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {progress === 100 && (
                <div className="mt-4 flex items-start gap-3 rounded-2xl border border-neon-400/20 bg-neon-400/[0.04] p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-neon-300" />
                  <div>
                    <p className="font-display text-base font-medium text-white">
                      {t('courses.completeTitle')}
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed text-slate-400">
                      {t('courses.completeBody')}
                    </p>
                    <Link
                      to="/courses"
                      className="mt-3 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-neon-300 transition hover:text-neon-200"
                    >
                      Browse another course <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
