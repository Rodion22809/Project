import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  GraduationCap,
  LockOpen,
  Quote,
  Route,
  ShieldCheck,
  Sparkles,
  Star,
  TerminalSquare,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TOPICS } from '../data/topics';
import { COURSES, TOTAL_LESSONS } from '../data/courses';
import { FAQS, FEATURES, TESTIMONIALS, TRACKS, CATEGORY_META } from '../data/site';
import { ParticleField } from '../components/ui/ParticleField';
import { Terminal } from '../components/ui/Terminal';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Accordion } from '../components/ui/Accordion';
import { DemoBadge } from '../components/ui/Badge';
import { buttonStyles } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

const featureIcons = {
  unlock: LockOpen,
  route: Route,
  terminal: TerminalSquare,
  shield: ShieldCheck,
} as const;

const marqueeItems = [
  'OPEN ACCESS',
  'ETHICAL BY DESIGN',
  'NO GATEKEEPING',
  'LOCAL-FIRST DEMO',
  'FIELD NOTES',
  'FREE COURSES',
  'LEARN IN PUBLIC',
];

const TRACK_GLOW: Record<string, string> = {
  Fundamentals: 'from-neon-400/[0.10]',
  Networking: 'from-sky-400/[0.10]',
  Threats: 'from-rose-400/[0.10]',
  Cryptography: 'from-violet-400/[0.10]',
  Linux: 'from-amber-400/[0.10]',
  'Web Security': 'from-teal-400/[0.10]',
  Identity: 'from-fuchsia-400/[0.10]',
};

export function HomePage() {
  const { t, user, readTopics } = useApp();

  const terminalLines = [
    { text: t('home.terminalLine1'), tone: 'command' as const },
    { text: t('home.terminalLine2'), tone: 'success' as const },
    { text: t('home.terminalLine3'), tone: 'command' as const },
    { text: t('home.terminalLine4'), tone: 'output' as const },
    { text: t('home.terminalLine5'), tone: 'command' as const },
    { text: t('home.terminalLine6'), tone: 'success' as const },
  ];

  const stats = [
    { value: String(TOPICS.length), label: t('home.statLabel1') },
    { value: String(COURSES.length), label: t('home.statLabel2') },
    { value: `${TOTAL_LESSONS}+`, label: t('home.statLabel3') },
    { value: '100%', label: t('home.statLabel4') },
  ];

  const startTo = user ? '/fyp' : '/register';
  const startLabel = user ? t('common.continue') : t('home.startLearning');

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
        <ParticleField className="opacity-80" />
        <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-neon-500/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute -right-32 top-1/3 h-[380px] w-[380px] rounded-full bg-violet-500/[0.08] blur-[120px]" />

        <div className="container-page relative pb-16 pt-16 lg:pb-20 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-20">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-neon-400/20 bg-neon-400/[0.04] py-1.5 pl-2 pr-3.5">
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="absolute h-2 w-2 animate-ping rounded-full bg-neon-400/40" />
                    <span className="h-1.5 w-1.5 rounded-full bg-neon-400" />
                  </span>
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-neon-300/90">
                    {t('home.heroBadge')}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.06}>
                <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.4rem] xl:text-[5.1rem]">
                  <span className="block">{t('home.heroTitle1')}</span>
                  <span className="mt-1 block text-slate-500">{t('home.heroTitle2')}</span>
                </h1>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-slate-400 sm:text-base">
                  {t('home.heroSubtitle')}
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link to={startTo} className={buttonStyles('primary', 'lg', 'group')}>
                    {startLabel}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </Link>
                  <Link to="/courses" className={buttonStyles('secondary', 'lg')}>
                    <GraduationCap className="h-4 w-4 text-slate-500" />
                    {t('home.exploreCourses')}
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                  {['No credit card', 'No gatekeeping', 'Account optional to read'].map((item) => (
                    <span key={item} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Check className="h-3 w-3 text-neon-400/80" />
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-neon-400/[0.03] blur-2xl" />
              <div className="relative animate-float">
                <Terminal
                  title={t('home.terminalTitle')}
                  lines={terminalLines}
                  footer={t('home.terminalFooter')}
                />
              </div>
              <div className="absolute -left-3 -top-4 hidden rounded-xl border border-white/10 bg-ink-800/95 px-3.5 py-2.5 shadow-panel backdrop-blur sm:block">
                <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-slate-600">
                  Current path
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-200">
                  <Sparkles className="h-3 w-3 text-neon-400" />
                  Security foundations
                </p>
              </div>
              <div className="absolute -bottom-5 right-3 hidden w-[190px] rounded-xl border border-white/10 bg-ink-800/95 p-3.5 shadow-panel backdrop-blur sm:block">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">
                    Your progress
                  </span>
                  <span className="font-mono text-[9px] text-neon-300">
                    {readTopics.length}/{TOPICS.length}
                  </span>
                </div>
                <ProgressBar value={(readTopics.length / TOPICS.length) * 100} size="sm" className="mt-2.5" />
                <p className="mt-2 text-[10px] text-slate-500">
                  {readTopics.length > 0 ? 'Reading record active' : 'No account required'}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.28}>
            <div className="mt-20 grid grid-cols-2 gap-y-8 border-t border-white/[0.06] pt-8 sm:grid-cols-4 lg:mt-24">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={index !== 0 ? 'sm:border-l sm:border-white/[0.06] sm:pl-6' : ''}
                >
                  <p className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative border-t border-white/[0.05] bg-ink-950/40 py-3.5">
          <div className="mask-fade-x flex overflow-hidden">
            <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="flex shrink-0 items-center gap-8 font-mono text-[9px] uppercase tracking-[0.24em] text-slate-600"
                >
                  {item}
                  <span className="h-1 w-1 rounded-full bg-neon-400/40" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20 lg:py-28">
        <SectionHeading
          eyebrow={t('home.featuresEyebrow')}
          title={t('home.featuresTitle')}
          description={t('home.featuresBody')}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = featureIcons[feature.icon as keyof typeof featureIcons];
            return (
              <Reveal key={feature.title} delay={index * 0.06}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-800/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-neon-400/20 hover:bg-ink-750/60">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-neon-400/[0.04] blur-2xl transition group-hover:bg-neon-400/[0.09]" />
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-neon-300 transition group-hover:border-neon-400/25 group-hover:bg-neon-400/[0.06]">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-slate-700">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[17px] font-medium text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-slate-500">
                    {feature.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="relative border-y border-white/[0.05] bg-ink-850/40 py-20 lg:py-28">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
        <div className="container-page relative">
          <SectionHeading
            eyebrow={t('home.tracksEyebrow')}
            title={t('home.tracksTitle')}
            description={t('home.tracksBody')}
            action={
              <Link to="/fyp" className={buttonStyles('secondary', 'md')}>
                <BookOpen className="h-4 w-4" />
                {t('common.viewAll')}
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKS.map((track, index) => {
              const meta = CATEGORY_META[track.category];
              return (
                <Reveal key={track.title} delay={index * 0.05}>
                  <Link
                    to={`/fyp?category=${encodeURIComponent(track.category)}`}
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-800/60 p-6 transition duration-300 hover:border-white/15 hover:bg-ink-750/80"
                  >
                    <div className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${TRACK_GLOW[track.category] ?? 'from-neon-400/[0.10]'} to-transparent opacity-40`} />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className={`chip ${meta.color}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                          {track.category}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-300" />
                      </div>
                      <h3 className="mt-6 font-display text-xl font-medium text-white">
                        {track.title}
                      </h3>
                      <p className="mt-2.5 max-w-[30ch] text-[12.5px] leading-relaxed text-slate-500">
                        {track.blurb}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
                        {t('home.modules', { count: track.modules })}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-neon-400/70">
                        Explore →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-page py-20 lg:py-28">
        <SectionHeading
          eyebrow={t('home.testimonialsEyebrow')}
          title={t('home.testimonialsTitle')}
          description={t('home.testimonialsNote')}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.07}>
              <figure className="relative flex h-full flex-col justify-between rounded-2xl border border-white/[0.07] bg-ink-800/50 p-6">
                <div>
                  <div className="flex items-center justify-between">
                    <Quote className="h-5 w-5 text-neon-400/50" />
                    <DemoBadge label={item.tag} />
                  </div>
                  <blockquote className="mt-5 text-[13.5px] leading-relaxed text-slate-300">
                    “{item.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${item.color} font-display text-[10px] font-semibold text-white ring-1 ring-white/10`}
                  >
                    {item.initials}
                  </span>
                  <div>
                    <p className="text-xs font-medium text-slate-200">{item.name}</p>
                    <p className="mt-0.5 text-[10.5px] text-slate-500">{item.role}</p>
                  </div>
                  <span className="ml-auto flex gap-0.5" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-2.5 w-2.5 fill-neon-400/70 text-neon-400/70"
                      />
                    ))}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="faq" className="border-t border-white/[0.05] py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow mb-3">{t('home.faqEyebrow')}</p>
              <h2 className="display-title !text-4xl sm:!text-5xl">{t('home.faqTitle')}</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
                {t('home.faqBody')}
              </p>
              <div className="mt-8 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-ink-800/40 p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                  <Zap className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-200">Still unsure?</p>
                  <Link
                    to="/contact"
                    className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-slate-500 transition hover:text-neon-300"
                  >
                    {t('footer.contact')} <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Accordion items={FAQS} />
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-8 pt-4 lg:pb-14">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-850 px-6 py-14 text-center sm:px-12 lg:py-20">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent)]" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[600px] -translate-x-1/2 rounded-full bg-neon-400/[0.09] blur-[90px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-64 rounded-full bg-violet-500/[0.08] blur-[80px]" />
            <div className="relative">
              <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-neon-400/20 bg-neon-400/[0.06] text-neon-300 shadow-neon-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">
                {t('home.ctaTitle')}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
                {t('home.ctaBody')}
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to={startTo} className={buttonStyles('primary', 'lg')}>
                  {t('home.ctaButton')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/library" className={buttonStyles('secondary', 'lg')}>
                  <BookOpen className="h-4 w-4" />
                  {t('home.ctaSecondary')}
                </Link>
              </div>
              <p className="mt-6 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">
                No account required to read · progress saved locally
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
