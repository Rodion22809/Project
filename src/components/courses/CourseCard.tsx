import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Clock3, Lock, Play } from 'lucide-react';
import type { Course } from '../../lib/types';
import { useApp } from '../../context/AppContext';
import { CourseCover } from './CourseCover';
import { ProgressBar } from '../ui/ProgressBar';
import { buttonStyles } from '../ui/Button';
import { LevelBadge } from '../ui/Badge';

export function CourseCard({ course, index }: { course: Course; index: number }) {
  const { t, user, isEnrolled, courseProgress, enroll } = useApp();
  const navigate = useNavigate();
  const enrolled = isEnrolled(course.slug);
  const progress = courseProgress(course.slug);

  const handleEnroll = () => {
    if (!user) {
      navigate(`/register?next=${encodeURIComponent(`/courses/${course.slug}`)}`);
      return;
    }
    if (!enrolled) enroll(course.slug);
    navigate(`/courses/${course.slug}`);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-800/50 transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-panel">
      <Link to={`/courses/${course.slug}`} aria-label={course.title}>
        <CourseCover course={course} index={index} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
            {course.tags[0]}
          </span>
          {!user ? (
            <span className="flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/[0.05] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wider text-amber-300/80">
              <Lock className="h-2.5 w-2.5" />
              {t('courses.membersOnly')}
            </span>
          ) : (
            enrolled && (
              <span className="flex items-center gap-1 rounded-full bg-neon-400/[0.08] px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-wider text-neon-400">
                <Check className="h-2.5 w-2.5" />
                {t('courses.enrolled')}
              </span>
            )
          )}
        </div>
        <Link to={`/courses/${course.slug}`}>
          <h2 className="mt-2 font-display text-lg font-medium leading-snug text-white transition group-hover:text-neon-200">
            {course.title}
          </h2>
        </Link>
        <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-slate-500">
          {course.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <LevelBadge level={course.level} />
          <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-slate-600">
            <Play className="h-3 w-3" />
            {t('common.lessons', { count: course.lessons.length })}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-slate-600">
            <Clock3 className="h-3 w-3" />
            {course.hours}h
          </span>
        </div>

        {enrolled && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between font-mono text-[8.5px] uppercase tracking-wider text-slate-600">
              <span>{t('courses.progress')}</span>
              <span className="text-neon-300">{progress}%</span>
            </div>
            <ProgressBar value={progress} size="sm" />
          </div>
        )}

        <div className="mt-auto pt-5">
          {enrolled ? (
            <Link
              to={`/courses/${course.slug}`}
              className={buttonStyles('secondary', 'sm', 'w-full')}
            >
              {t('common.continue')}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleEnroll}
              className={buttonStyles('primary', 'sm', 'w-full')}
            >
              {!user && <Lock className="h-3 w-3" />}
              {user ? t('common.enroll') : t('courses.lockedCta')}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
