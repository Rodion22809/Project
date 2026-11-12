import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Bookmark,
  Brain,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  GraduationCap,
  LogOut,
  Mail,
  MessageSquare,
  Pencil,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRound,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ACHIEVEMENTS } from '../data/site';
import { COURSES } from '../data/courses';
import { TOPICS, getTopic } from '../data/topics';
import type { DemoUser } from '../lib/types';
import { formatDate, percent } from '../lib/utils';
import { Avatar } from '../components/ui/Avatar';
import { DemoBadge, CategoryBadge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Reveal } from '../components/ui/Reveal';
import { Dialog } from '../components/ui/Dialog';
import { buttonStyles } from '../components/ui/Button';
import { cn } from '../lib/utils';

const achievementIcons = {
  book: BookOpen,
  brain: Brain,
  bookmark: Bookmark,
  graduation: GraduationCap,
  trending: TrendingUp,
  award: Award,
  user: UserRound,
  message: MessageSquare,
} as const;

const accentOptions: Array<{ key: DemoUser['accent']; label: string; swatch: string }> = [
  { key: 'neon', label: 'Neon', swatch: 'bg-gradient-to-br from-neon-400 to-emerald-600' },
  { key: 'violet', label: 'Violet', swatch: 'bg-gradient-to-br from-violet-400 to-indigo-600' },
  { key: 'cyan', label: 'Cyan', swatch: 'bg-gradient-to-br from-cyan-300 to-sky-600' },
  { key: 'amber', label: 'Amber', swatch: 'bg-gradient-to-br from-amber-300 to-orange-600' },
];

export function ProfilePage() {
  const {
    t,
    user,
    signOut,
    updateProfile,
    favorites,
    readTopics,
    enrollments,
    courseProgress,
    posts,
    activity,
    resetDemoData,
    toggleFavorite,
    addToast,
  } = useApp();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [username, setUsername] = useState(user?.username ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [accent, setAccent] = useState<DemoUser['accent']>(user?.accent ?? 'neon');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setBio(user.bio);
      setAccent(user.accent);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="container-page py-16 lg:py-24">
        <Reveal>
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-850 p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-neon-400/20 bg-neon-400/[0.06] text-neon-300 shadow-neon-sm">
                <UserRound className="h-6 w-6" />
              </div>
              <p className="eyebrow mt-6">{t('profile.title')}</p>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {t('profile.guestTitle')}
              </h1>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400">
                {t('profile.guestBody')}
              </p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/register" className={buttonStyles('primary', 'lg')}>
                  Continue with Apple
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link to="/login" className={buttonStyles('secondary', 'lg')}>
                  {t('nav.login')}
                </Link>
              </div>
              <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-3 border-t border-white/[0.06] pt-6">
                {[
                  { icon: BookOpen, label: 'Field notes' },
                  { icon: GraduationCap, label: 'Courses' },
                  { icon: Award, label: 'Achievements' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <item.icon className="mx-auto h-4 w-4 text-slate-600" />
                    <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-700">
                {t('common.demoNotice')}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    );
  }

  const enrolledCourses = COURSES.filter((course) => enrollments[course.slug]);
  const savedTopics = favorites.map((slug) => getTopic(slug)).filter((topic): topic is NonNullable<typeof topic> => Boolean(topic));
  const anyHalfway = enrolledCourses.some((course) => courseProgress(course.slug) >= 50);
  const anyComplete = enrolledCourses.some((course) => courseProgress(course.slug) === 100);

  const earnedIds = new Set<string>();
  if (readTopics.length >= 1) earnedIds.add('first-topic');
  if (readTopics.length >= 3) earnedIds.add('curious');
  if (favorites.length >= 1) earnedIds.add('collector');
  if (enrolledCourses.length >= 1) earnedIds.add('enrolled');
  if (anyHalfway) earnedIds.add('halfway');
  if (anyComplete) earnedIds.add('graduate');
  if (user) earnedIds.add('member');
  if (posts.length >= 1) earnedIds.add('voice');

  const averageProgress = enrolledCourses.length
    ? Math.round(
        enrolledCourses.reduce((total, course) => total + courseProgress(course.slug), 0) /
          enrolledCourses.length,
      )
    : 0;

  const saveProfile = () => {
    if (username.trim().length < 2) {
      setError('Username must be at least 2 characters.');
      return;
    }
    updateProfile({
      username: username.trim(),
      bio: bio.trim().slice(0, 180),
      accent,
    });
    setEditing(false);
    setError('');
    addToast({ title: t('profile.saved'), tone: 'success' });
  };

  const describeActivity = (type: string, ref?: string) => {
    if (type === 'auth') return t('profile.activityAuth');
    if (type === 'post') return 'Published a post in the community feed';
    if (type === 'read') {
      const topic = ref ? getTopic(ref) : undefined;
      return t('profile.activityRead', { title: topic?.title ?? ref ?? '' });
    }
    if (type === 'favorite') {
      const topic = ref ? getTopic(ref) : undefined;
      return t('profile.activityFavorite', { title: topic?.title ?? ref ?? '' });
    }
    const course = ref ? COURSES.find((item) => item.slug === ref) : undefined;
    if (type === 'enrolled') {
      return t('profile.activityEnrolled', { title: course?.title ?? ref ?? '' });
    }
    return t('profile.activityCompleted', { title: course?.title ?? ref ?? '' });
  };

  return (
    <div className="container-page py-10 lg:py-14">
      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-850">
          <div className="relative h-28 bg-gradient-to-r from-neon-400/[0.12] via-emerald-500/[0.05] to-violet-500/[0.12] sm:h-32">
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-850 to-transparent" />
            <div className="absolute right-5 top-5 flex items-center gap-2">
              <DemoBadge label={t('profile.demoAccount')} />
            </div>
          </div>

          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-10 flex flex-col justify-between gap-5 sm:-mt-12 sm:flex-row sm:items-end">
              <div className="flex items-end gap-4">
                <div className="rounded-full border-4 border-ink-850">
                  <Avatar name={user.username} accent={user.accent} size="xl" status />
                </div>
                <div className="pb-1">
                  <h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {user.username}
                  </h1>
                  <p className="mt-1 flex items-center gap-1.5 text-[11.5px] text-slate-500">
                    <Mail className="h-3 w-3" />
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 pb-1">
                <button
                  type="button"
                  onClick={() => setEditing((current) => !current)}
                  className={buttonStyles('secondary', 'sm')}
                >
                  <Pencil className="h-3 w-3" />
                  {t('profile.edit')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    addToast({ title: t('auth.signedOut'), tone: 'info' });
                    navigate('/');
                  }}
                  className={buttonStyles('ghost', 'sm')}
                >
                  <LogOut className="h-3 w-3" />
                  {t('nav.signOut')}
                </button>
              </div>
            </div>

            {editing ? (
              <div className="mt-6 rounded-2xl border border-white/[0.08] bg-ink-900/60 p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-sm font-medium text-white">{t('profile.edit')}</h2>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-white/5 hover:text-white"
                    aria-label={t('common.close')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="profile-username"
                      className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500"
                    >
                      {t('common.username')}
                    </label>
                    <input
                      id="profile-username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value.slice(0, 30))}
                      className="field-dark"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
                      {t('profile.accent')}
                    </label>
                    <div className="flex items-center gap-2 pt-1">
                      {accentOptions.map((option) => (
                        <button
                          key={option.key}
                          type="button"
                          onClick={() => setAccent(option.key)}
                          aria-label={option.label}
                          aria-pressed={accent === option.key}
                          className={cn(
                            'h-9 w-9 rounded-full ring-2 ring-offset-2 ring-offset-ink-900 transition',
                            option.swatch,
                            accent === option.key ? 'ring-neon-400' : 'ring-transparent',
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="profile-bio"
                    className="mb-1.5 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500"
                  >
                    <span>{t('profile.bio')}</span>
                    <span className="text-slate-700">{bio.length}/180</span>
                  </label>
                  <textarea
                    id="profile-bio"
                    value={bio}
                    onChange={(event) => setBio(event.target.value.slice(0, 180))}
                    rows={3}
                    placeholder={t('profile.bioPlaceholder')}
                    className="field-dark resize-none"
                  />
                </div>
                {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}
                <div className="mt-4 flex items-center gap-2">
                  <button type="button" onClick={saveProfile} className={buttonStyles('primary', 'sm')}>
                    <Check className="h-3 w-3" />
                    {t('profile.saveChanges')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className={buttonStyles('ghost', 'sm')}
                  >
                    {t('common.cancel')}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <p className="max-w-xl text-[12.5px] leading-relaxed text-slate-400">
                  {user.bio || t('profile.subtitle')}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-wider text-slate-600">
                  <span>
                    {t('profile.joined')}: {formatDate(user.joinedAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3 text-neon-400/60" />
                    {t('profile.provider')}: Apple demo
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: t('profile.statsCourses'), value: enrolledCourses.length, icon: GraduationCap },
          { label: t('profile.statsNotes'), value: readTopics.length, icon: BookOpen },
          { label: t('profile.statsSaved'), value: favorites.length, icon: Bookmark },
          { label: t('profile.statsAchievements'), value: earnedIds.size, icon: Award },
        ].map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.04}>
            <div className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
              <div>
                <p className="font-display text-2xl font-semibold text-white">{stat.value}</p>
                <p className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-slate-600">
                  {stat.label}
                </p>
              </div>
              <stat.icon className="h-5 w-5 text-slate-700" />
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:items-start">
        <div className="space-y-8">
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-medium text-white">{t('profile.enrolled')}</h2>
              <Link
                to="/courses"
                className="font-mono text-[9px] uppercase tracking-wider text-slate-500 transition hover:text-neon-300"
              >
                {t('profile.browseCourses')} →
              </Link>
            </div>
            {enrolledCourses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 px-6 py-10 text-center">
                <GraduationCap className="mx-auto mb-3 h-6 w-6 text-slate-700" />
                <p className="text-xs text-slate-500">{t('profile.noCourses')}</p>
                <Link to="/courses" className={buttonStyles('secondary', 'sm', 'mt-4')}>
                  {t('profile.browseCourses')}
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {enrolledCourses.map((course) => {
                  const progress = courseProgress(course.slug);
                  return (
                    <div
                      key={course.slug}
                      className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-ink-800/40 p-4 sm:flex-row sm:items-center"
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br ${course.gradient}`}
                      >
                        <GraduationCap className={`h-5 w-5 ${course.accent}`} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <Link
                            to={`/courses/${course.slug}`}
                            className="truncate text-[13px] font-medium text-slate-200 transition hover:text-neon-300"
                          >
                            {course.title}
                          </Link>
                          <span className="shrink-0 font-mono text-[10px] text-neon-300">{progress}%</span>
                        </div>
                        <ProgressBar value={progress} size="sm" className="mt-2" />
                        <p className="mt-1.5 font-mono text-[8.5px] uppercase tracking-wider text-slate-700">
                          {enrollments[course.slug]?.completedLessons.length ?? 0}/{course.lessons.length}{' '}
                          lessons
                        </p>
                      </div>
                      <Link
                        to={`/courses/${course.slug}`}
                        className={buttonStyles('secondary', 'sm', 'shrink-0')}
                      >
                        {t('common.continue')}
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-medium text-white">{t('profile.favorites')}</h2>
              <span className="font-mono text-[9px] uppercase tracking-wider text-slate-600">
                {savedTopics.length} saved
              </span>
            </div>
            {savedTopics.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 px-6 py-10 text-center">
                <Bookmark className="mx-auto mb-3 h-6 w-6 text-slate-700" />
                <p className="text-xs text-slate-500">{t('profile.noFavorites')}</p>
                <Link to="/fyp" className={buttonStyles('secondary', 'sm', 'mt-4')}>
                  {t('nav.fyp')}
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {savedTopics.map((topic) => (
                  <div
                    key={topic.slug}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-ink-800/30 px-4 py-3"
                  >
                    <Bookmark className="h-3.5 w-3.5 shrink-0 text-neon-400/70" />
                    <Link
                      to={`/fyp/${topic.slug}`}
                      className="min-w-0 flex-1 truncate text-[12.5px] text-slate-300 transition hover:text-neon-300"
                    >
                      {topic.title}
                    </Link>
                    <span className="hidden font-mono text-[9px] uppercase tracking-wider text-slate-600 sm:block">
                      {topic.minutes} min
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleFavorite(topic.slug)}
                      className="text-slate-600 transition hover:text-rose-300"
                      aria-label={`Remove ${topic.title} from favorites`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-4 font-display text-xl font-medium text-white">{t('profile.achievements')}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {ACHIEVEMENTS.map((achievement) => {
                const Icon = achievementIcons[achievement.icon as keyof typeof achievementIcons];
                const earned = earnedIds.has(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={cn(
                      'flex items-start gap-3 rounded-xl border p-4 transition',
                      earned
                        ? 'border-neon-400/20 bg-neon-400/[0.035]'
                        : 'border-white/[0.05] bg-ink-800/20 opacity-60',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border',
                        earned
                          ? 'border-neon-400/25 bg-neon-400/[0.08] text-neon-300'
                          : 'border-white/[0.07] text-slate-600',
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[12px] font-medium text-slate-200">{achievement.title}</p>
                        {earned ? (
                          <CheckCircle2 className="h-3 w-3 text-neon-400" />
                        ) : (
                          <span className="font-mono text-[8px] uppercase tracking-wider text-slate-700">
                            {t('profile.locked')}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-[10.5px] leading-relaxed text-slate-500">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-28">
          <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
              <Clock3 className="h-3.5 w-3.5 text-violet-300/80" />
              {t('profile.recent')}
            </div>
            {activity.length === 0 ? (
              <p className="mt-4 text-[11.5px] leading-relaxed text-slate-600">
                {t('profile.noActivity')}
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {activity.slice(0, 6).map((entry) => (
                  <li key={entry.id} className="flex gap-2.5">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neon-400/60" />
                    <div className="min-w-0">
                      <p className="text-[11px] leading-snug text-slate-400">
                        {describeActivity(entry.type, entry.ref)}
                      </p>
                      <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-slate-700">
                        {formatDate(entry.at)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                <TrendingUp className="h-3.5 w-3.5 text-neon-300/80" />
                Learning momentum
              </div>
              <span className="font-mono text-[10px] text-neon-300">{averageProgress}%</span>
            </div>
            <ProgressBar value={averageProgress} className="mt-4" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/[0.05] bg-white/[0.015] p-3">
                <p className="font-display text-lg font-semibold text-white">
                  {readTopics.length}/{TOPICS.length}
                </p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-slate-600">
                  Notes read
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.05] bg-white/[0.015] p-3">
                <p className="font-display text-lg font-semibold text-white">
                  {earnedIds.size}/{ACHIEVEMENTS.length}
                </p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-slate-600">
                  Achievements
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-b from-violet-500/[0.05] to-ink-800/40 p-5">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-violet-300/80">
              <ShieldCheck className="h-3.5 w-3.5" />
              {t('profile.certificates')}
            </div>
            <p className="mt-2.5 text-[11.5px] leading-relaxed text-slate-500">
              {t('profile.certificatesBody')}
            </p>
            <Link to="/licenses" className={buttonStyles('violet', 'sm', 'mt-4 w-full')}>
              {t('profile.viewDocuments')}
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="rounded-2xl border border-rose-400/10 bg-rose-400/[0.015] p-5">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-rose-300/70">
              <ShieldAlert className="h-3.5 w-3.5" />
              {t('profile.dangerZone')}
            </div>
            <p className="mt-2.5 text-[11px] leading-relaxed text-slate-500">
              {t('profile.resetBody')}
            </p>
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className={buttonStyles('danger', 'sm', 'mt-4 w-full')}
            >
              <RotateCcw className="h-3 w-3" />
              {t('profile.reset')}
            </button>
          </div>

          <p className="flex items-center justify-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-700">
            <Sparkles className="h-2.5 w-2.5" />
            {t('profile.activeSessions')}
          </p>
        </aside>
      </div>

      <Dialog
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        eyebrow={t('profile.dangerZone')}
        title={t('profile.resetConfirm')}
        footer={
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className={buttonStyles('ghost', 'sm')}
            >
              {t('common.cancel')}
            </button>
            <button
              type="button"
              onClick={() => {
                resetDemoData();
                setConfirmReset(false);
                addToast({ title: 'Demo data reset', tone: 'info' });
                navigate('/');
              }}
              className={buttonStyles('danger', 'sm')}
            >
              {t('profile.resetYes')}
            </button>
          </div>
        }
      >
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
          <p className="text-sm leading-relaxed text-slate-400">{t('profile.resetBody')}</p>
        </div>
      </Dialog>
    </div>
  );
}
