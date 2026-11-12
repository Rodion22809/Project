import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BellRing,
  CalendarDays,
  Check,
  Flame,
  MessageSquare,
  Send,
  ShieldAlert,
  Trophy,
  Users,
} from 'lucide-react';
import { COMMUNITY_CATEGORIES, COMMUNITY_POSTS, LEADERBOARD, UPCOMING_EVENTS } from '../data/community';
import { useApp } from '../context/AppContext';
import { PostCard } from '../components/community/PostCard';
import { Avatar } from '../components/ui/Avatar';
import { DemoBadge } from '../components/ui/Badge';
import { buttonStyles } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { cn } from '../lib/utils';

const postCategories = COMMUNITY_CATEGORIES.filter((category) => category !== 'All');

export function CommunityPage() {
  const {
    t,
    user,
    posts,
    addPost,
    reminders,
    toggleReminder,
    addToast,
  } = useApp();
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<'latest' | 'top'>('latest');
  const [content, setContent] = useState('');
  const [postCategory, setPostCategory] = useState('Study log');

  const feed = useMemo(() => {
    const combined = [...posts, ...COMMUNITY_POSTS];
    const filtered =
      category === 'All' ? combined : combined.filter((post) => post.category === category);
    if (sort === 'top') return [...filtered].sort((a, b) => b.likes - a.likes);
    return filtered;
  }, [category, posts, sort]);

  const publish = () => {
    if (content.trim().length < 8) return;
    addPost(content.trim(), postCategory);
    setContent('');
  };

  const handleReminder = (title: string) => {
    const set = toggleReminder(title);
    addToast({
      title: set ? t('community.reminderSet') : 'Reminder removed',
      description: title,
      tone: set ? 'success' : 'info',
    });
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(57,255,136,0.055),transparent)]" />

      <section className="container-page relative pb-8 pt-14 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <p className="eyebrow !mb-0">{t('community.eyebrow')}</p>
              <DemoBadge />
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              {t('community.title')}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              {t('community.subtitle')}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex items-center gap-6 rounded-xl border border-white/[0.07] bg-ink-800/40 px-5 py-4">
              <div>
                <p className="font-display text-xl font-semibold text-white">128</p>
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                  {t('community.online')}
                </p>
              </div>
              <div className="h-8 w-px bg-white/[0.08]" />
              <div>
                <p className="font-display text-xl font-semibold text-white">36</p>
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                  {t('community.topics')}
                </p>
              </div>
              <div className="h-8 w-px bg-white/[0.08]" />
              <div className="flex items-center gap-1.5 text-neon-300">
                <Users className="h-4 w-4" />
                <span className="font-mono text-[8px] uppercase tracking-wider text-slate-600">
                  DEMO
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-amber-400/15 bg-amber-400/[0.03] px-4 py-3.5">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            <p className="text-[11.5px] leading-relaxed text-amber-100/60">
              {t('community.demoBanner')}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="container-page">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
          <div className="min-w-0">
            {user ? (
              <Reveal>
                <div className="rounded-2xl border border-white/[0.08] bg-ink-800/55 p-4 sm:p-5">
                  <div className="flex gap-3">
                    <Avatar name={user.username} accent={user.accent} size="md" />
                    <div className="min-w-0 flex-1">
                      <textarea
                        value={content}
                        onChange={(event) => setContent(event.target.value.slice(0, 600))}
                        placeholder={t('community.composerPlaceholder')}
                        rows={3}
                        className="w-full resize-none rounded-xl border border-white/[0.07] bg-ink-900/60 px-3.5 py-3 text-[12.5px] leading-relaxed text-white placeholder:text-slate-600 focus:border-neon-400/30 focus:outline-none focus:ring-2 focus:ring-neon-400/10"
                      />
                      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <select
                            value={postCategory}
                            onChange={(event) => setPostCategory(event.target.value)}
                            className="rounded-lg border border-white/[0.08] bg-ink-900/70 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-400 focus:border-neon-400/30 focus:outline-none"
                            aria-label={t('community.category')}
                          >
                            {postCategories.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                          <span className="font-mono text-[9px] text-slate-700">
                            {content.length}/600
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={publish}
                          disabled={content.trim().length < 8}
                          className={buttonStyles('primary', 'sm')}
                        >
                          <Send className="h-3 w-3" />
                          {t('community.post')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <div className="rounded-2xl border border-neon-400/15 bg-gradient-to-br from-neon-400/[0.05] to-ink-800/40 p-5 sm:p-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neon-400/20 bg-neon-400/[0.07] text-neon-300">
                        <MessageSquare className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-display text-base font-medium text-white">
                          Join the conversation
                        </p>
                        <p className="mt-1 max-w-md text-[11.5px] leading-relaxed text-slate-500">
                          Create a local demo profile to publish posts and replies. No real
                          credentials are used.
                        </p>
                      </div>
                    </div>
                    <Link to="/register" className={buttonStyles('primary', 'sm', 'shrink-0')}>
                      Continue with Apple
                    </Link>
                  </div>
                </div>
              </Reveal>
            )}

            <div className="mb-4 mt-7 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-1.5 overflow-x-auto pb-1 hide-scrollbar">
                {COMMUNITY_CATEGORIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={cn(
                      'shrink-0 rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] transition',
                      category === item
                        ? 'border-neon-400/30 bg-neon-400/10 text-neon-300'
                        : 'border-white/[0.08] text-slate-500 hover:border-white/20 hover:text-slate-200',
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="flex items-center rounded-lg border border-white/[0.08] p-0.5">
                {(['latest', 'top'] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSort(item)}
                    className={cn(
                      'rounded-md px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider transition',
                      sort === item ? 'bg-white/[0.08] text-white' : 'text-slate-600',
                    )}
                  >
                    {item === 'latest' ? t('community.latest') : t('community.top')}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {feed.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center">
                  <MessageSquare className="mx-auto mb-3 h-7 w-7 text-slate-700" />
                  <p className="text-sm text-slate-400">{t('community.empty')}</p>
                </div>
              ) : (
                feed.map((post, index) => (
                  <Reveal key={post.id} delay={Math.min(index * 0.04, 0.16)}>
                    <PostCard post={post} />
                  </Reveal>
                ))
              )}
            </div>
          </div>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-28">
            <Reveal>
              <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                  <ShieldAlert className="h-3.5 w-3.5 text-neon-300/80" />
                  {t('community.rules')}
                </div>
                <ol className="mt-4 space-y-3">
                  {[t('community.rule1'), t('community.rule2'), t('community.rule3'), t('community.rule4')].map(
                    (rule, index) => (
                      <li key={rule} className="flex gap-2.5 text-[11.5px] leading-relaxed text-slate-500">
                        <span className="font-mono text-[9px] text-neon-400/50">0{index + 1}</span>
                        {rule}
                      </li>
                    ),
                  )}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                    <Trophy className="h-3.5 w-3.5 text-amber-300/80" />
                    {t('community.leaderboard')}
                  </div>
                  <Flame className="h-3.5 w-3.5 text-amber-400/50" />
                </div>
                <ul className="mt-4 space-y-3">
                  {LEADERBOARD.map((entry, index) => (
                    <li key={entry.name} className="flex items-center gap-2.5">
                      <span className="w-3 font-mono text-[9px] text-slate-700">{index + 1}</span>
                      <Avatar name={entry.name} accent={entry.color as never} size="xs" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] text-slate-300">{entry.name}</p>
                        <p className="truncate font-mono text-[8px] uppercase tracking-wider text-slate-700">
                          {entry.badge}
                        </p>
                      </div>
                      <span className="font-mono text-[9px] text-neon-400/70">{entry.points}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-white/[0.06] pt-3 font-mono text-[8px] uppercase tracking-wider text-slate-700">
                  {t('community.leaderboardNote')}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                  <CalendarDays className="h-3.5 w-3.5 text-violet-300/80" />
                  {t('community.events')}
                </div>
                <ul className="mt-4 space-y-4">
                  {UPCOMING_EVENTS.map((event) => {
                    const reminded = reminders.includes(event.title);
                    return (
                      <li key={event.title} className="border-b border-white/[0.05] pb-4 last:border-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <span className="w-9 shrink-0 text-center">
                            <span className="block font-mono text-[8px] uppercase tracking-wider text-slate-600">
                              {event.date.split(' ')[0]}
                            </span>
                            <span className="block font-display text-lg font-semibold text-slate-300">
                              {event.date.split(' ')[1]}
                            </span>
                          </span>
                          <div className="min-w-0">
                            <p className="text-[11.5px] font-medium leading-snug text-slate-300">
                              {event.title}
                            </p>
                            <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-wider text-slate-600">
                              {event.time} · {event.type}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleReminder(event.title)}
                          className={cn(
                            'mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-lg border py-1.5 font-mono text-[8.5px] uppercase tracking-wider transition',
                            reminded
                              ? 'border-neon-400/25 bg-neon-400/[0.06] text-neon-300'
                              : 'border-white/[0.08] text-slate-600 hover:border-white/20 hover:text-slate-300',
                          )}
                        >
                          {reminded ? <Check className="h-2.5 w-2.5" /> : <BellRing className="h-2.5 w-2.5" />}
                          {reminded ? 'Reminder set' : t('community.join')}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </div>
  );
}
