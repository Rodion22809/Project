import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  GraduationCap,
  Lightbulb,
  ListTree,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { getTopic, relatedTopics, TOPICS } from '../data/topics';
import { getCourse } from '../data/courses';
import { CATEGORY_META } from '../data/site';
import { useApp } from '../context/AppContext';
import { CategoryBadge, LevelBadge } from '../components/ui/Badge';
import { CodeBlock } from '../components/ui/CodeBlock';
import { buttonStyles } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { ProgressBar } from '../components/ui/ProgressBar';
import { copyToClipboard, formatDate } from '../lib/utils';

export function TopicPage() {
  const { slug = '' } = useParams();
  const topic = getTopic(slug);
  const {
    t,
    language,
    favorites,
    toggleFavorite,
    readTopics,
    markTopicRead,
    addToast,
  } = useApp();
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (topic && readingProgress >= 92) markTopicRead(topic.slug);
  }, [readingProgress, topic, markTopicRead]);

  useEffect(() => {
    const onScroll = () => {
      const article = document.getElementById('topic-article');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.5;
      const scrolled = Math.min(Math.max(-rect.top + 120, 0), Math.max(total, 1));
      setReadingProgress(Math.round((scrolled / Math.max(total, 1)) * 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  const related = useMemo(() => (topic ? relatedTopics(topic, 3) : []), [topic]);

  if (!topic) {
    return <Navigate to="/fyp" replace />;
  }

  const saved = favorites.includes(topic.slug);
  const read = readTopics.includes(topic.slug);
  const course = getCourse(topic.relatedCourse);
  const meta = CATEGORY_META[topic.category];
  const index = TOPICS.findIndex((item) => item.slug === topic.slug);
  const previous = index > 0 ? TOPICS[index - 1] : null;
  const next = index < TOPICS.length - 1 ? TOPICS[index + 1] : null;

  const onCopy = async () => {
    try {
      await copyToClipboard(window.location.href);
      addToast({ title: t('common.copied'), tone: 'success' });
    } catch {
      addToast({ title: 'Copy failed', description: 'Copy the URL from your address bar.', tone: 'error' });
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_55%_100%_at_50%_0%,rgba(57,255,136,0.06),transparent)]" />
      <div className="fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-neon-500 to-emerald-300 shadow-[0_0_10px_rgba(57,255,136,0.6)] transition-[width] duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <section className="container-page relative pt-8">
        <nav className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-600">
          <Link to="/fyp" className="transition hover:text-neon-300">
            {t('topic.breadcrumb')}
          </Link>
          <span className="text-slate-800">/</span>
          <span className="truncate text-slate-500">{topic.category}</span>
        </nav>

        <div className="mt-8 grid gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <article id="topic-article">
            <Reveal>
              <header className="border-b border-white/[0.07] pb-8">
                <div className="flex flex-wrap items-center gap-2">
                  <CategoryBadge category={topic.category} />
                  <LevelBadge level={topic.level} />
                  {read && (
                    <span className="chip border-neon-400/25 bg-neon-400/[0.07] text-neon-300">
                      <CheckCircle2 className="h-3 w-3" />
                      {t('topic.finished')}
                    </span>
                  )}
                </div>
                <h1 className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-4xl lg:text-[3.2rem]">
                  {topic.title}
                </h1>
                <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
                  {topic.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <span className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-slate-500">
                    <Clock3 className="h-3.5 w-3.5" />
                    {t('common.minRead', { count: topic.minutes })}
                  </span>
                  <span className="font-mono text-[9.5px] uppercase tracking-wider text-slate-600">
                    {t('topic.updated')} {formatDate(topic.updated, language === 'ru' ? 'ru-RU' : 'en-US')}
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(topic.slug)}
                      aria-pressed={saved}
                      className={
                        saved
                          ? 'flex items-center gap-1.5 rounded-lg border border-neon-400/30 bg-neon-400/10 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-neon-300'
                          : 'flex items-center gap-1.5 rounded-lg border border-white/10 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-500 transition hover:border-white/20 hover:text-white'
                      }
                    >
                      <Bookmark className={saved ? 'h-3 w-3 fill-neon-400/30' : 'h-3 w-3'} />
                      {saved ? t('common.favorited') : t('common.favorite')}
                    </button>
                    <button
                      type="button"
                      onClick={onCopy}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-500 transition hover:border-white/20 hover:text-white"
                      aria-label={t('common.copyLink')}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </header>
            </Reveal>

            <div className="mt-10 space-y-12">
              {topic.sections.map((section, sectionIndex) => (
                <section key={section.title} id={`section-${sectionIndex}`} className="scroll-mt-28">
                  <Reveal>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-neon-400/50">
                        {String(sectionIndex + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                    </div>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-[1.7rem]">
                      {section.title}
                    </h2>
                    <div className="prose-dark mt-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets && (
                      <ul className="mt-5 space-y-2.5">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-[13.5px] leading-relaxed text-slate-400">
                            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-neon-400/70" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.code && (
                      <CodeBlock code={section.code.content} label={section.code.label} />
                    )}
                  </Reveal>
                </section>
              ))}
            </div>

            <Reveal>
              <div className="mt-12 overflow-hidden rounded-2xl border border-neon-400/15 bg-neon-400/[0.03]">
                <div className="flex items-center gap-2.5 border-b border-neon-400/10 px-5 py-3.5">
                  <Lightbulb className="h-4 w-4 text-neon-300" />
                  <h2 className="font-display text-sm font-semibold text-white">
                    {t('topic.takeaways')}
                  </h2>
                </div>
                <ul className="grid gap-3 p-5 sm:grid-cols-2">
                  {topic.takeaways.map((takeaway) => (
                    <li key={takeaway} className="flex gap-2.5 text-[12.5px] leading-relaxed text-slate-400">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neon-400" />
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
                    Reading record
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {read ? 'This note is marked as finished.' : 'Finished this note?'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => markTopicRead(topic.slug)}
                  className={buttonStyles(read ? 'secondary' : 'primary', 'md', 'shrink-0')}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  {read ? t('topic.finished') : t('topic.markRead')}
                </button>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {previous ? (
                  <Link
                    to={`/fyp/${previous.slug}`}
                    className="group rounded-xl border border-white/[0.07] bg-ink-800/30 p-4 transition hover:border-white/15"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-600">
                      <ArrowLeft className="h-3 w-3" />
                      {t('topic.prev')}
                    </span>
                    <span className="mt-2 block text-sm text-slate-300 transition group-hover:text-neon-300">
                      {previous.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                {next && (
                  <Link
                    to={`/fyp/${next.slug}`}
                    className="group rounded-xl border border-white/[0.07] bg-ink-800/30 p-4 text-right transition hover:border-white/15"
                  >
                    <span className="flex items-center justify-end gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-600">
                      {t('topic.next')}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    <span className="mt-2 block text-sm text-slate-300 transition group-hover:text-neon-300">
                      {next.title}
                    </span>
                  </Link>
                )}
              </div>
            </Reveal>

            <Reveal>
              <p className="mt-8 flex items-start gap-2 rounded-lg border border-amber-400/10 bg-amber-400/[0.02] px-3.5 py-3 text-[11px] leading-relaxed text-amber-200/50">
                <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {t('topic.ethics')}
              </p>
            </Reveal>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                <ListTree className="h-3.5 w-3.5 text-neon-300" />
                {t('topic.onThisPage')}
              </div>
              <ol className="mt-4 space-y-2.5">
                {topic.sections.map((section, sectionIndex) => (
                  <li key={section.title}>
                    <a
                      href={`#section-${sectionIndex}`}
                      className="flex gap-2 text-[11.5px] leading-snug text-slate-500 transition hover:text-neon-300"
                    >
                      <span className="font-mono text-[9px] text-slate-700">
                        {String(sectionIndex + 1).padStart(2, '0')}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-5 border-t border-white/[0.06] pt-4">
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-slate-600">
                  <span>Reading</span>
                  <span className="text-neon-300">{readingProgress}%</span>
                </div>
                <ProgressBar value={readingProgress} size="sm" className="mt-2" />
              </div>
            </div>

            {course && (
              <div className="overflow-hidden rounded-2xl border border-violet-400/15 bg-gradient-to-b from-violet-500/[0.06] to-ink-800/40 p-5">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-violet-300/80">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {t('topic.relatedCourse')}
                </div>
                <h2 className="mt-3 font-display text-base leading-snug text-white">
                  {course.title}
                </h2>
                <p className="mt-2 text-[11.5px] leading-relaxed text-slate-500">
                  {course.tagline}
                </p>
                <div className="mt-3 flex items-center gap-3 font-mono text-[9px] uppercase tracking-wider text-slate-600">
                  <span>{course.level}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-700" />
                  <span>{t('common.lessons', { count: course.lessons.length })}</span>
                </div>
                <Link
                  to={`/courses/${course.slug}`}
                  className={buttonStyles('violet', 'sm', 'mt-4 w-full')}
                >
                  {t('common.viewAll')}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}

            <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                <Sparkles className="h-3 w-3 text-neon-400/70" />
                {t('topic.relatedTopics')}
              </div>
              <ul className="mt-4 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/fyp/${item.slug}`} className="group block">
                      <span className={`block text-[9px] uppercase tracking-wider ${meta.color.split(' ')[0]}`}>
                        {item.category}
                      </span>
                      <span className="mt-1 block text-[12px] leading-snug text-slate-400 transition group-hover:text-neon-300">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
                Note metadata
              </p>
              <dl className="mt-3 space-y-2 text-[11px]">
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-600">Category</dt>
                  <dd className="text-right text-slate-400">{topic.category}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-600">Level</dt>
                  <dd className="text-right text-slate-400">{topic.level}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-600">{t('topic.updatedLabel')}</dt>
                  <dd className="text-right text-slate-400">
                    {formatDate(topic.updated, language === 'ru' ? 'ru-RU' : 'en-US')}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-600">Status</dt>
                  <dd className="text-right text-neon-400/80">
                    {read ? 'Finished' : 'Open'}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
