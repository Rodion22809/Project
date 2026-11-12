import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  Fingerprint,
  GitBranch,
  Globe2,
  HeartHandshake,
  Layers,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { buttonStyles } from '../components/ui/Button';

const principles = [
  { key: 'p1', body: 'p1Body', icon: Globe2 },
  { key: 'p2', body: 'p2Body', icon: ShieldCheck },
  { key: 'p3', body: 'p3Body', icon: Sparkles },
  { key: 'p4', body: 'p4Body', icon: Fingerprint },
] as const;

const stack = [
  { name: 'React 18', icon: Code2 },
  { name: 'TypeScript', icon: Layers },
  { name: 'Tailwind CSS', icon: Sparkles },
  { name: 'React Router', icon: GitBranch },
  { name: 'Framer Motion', icon: Cpu },
  { name: 'Lucide Icons', icon: Terminal },
  { name: 'LocalStorage', icon: Database },
];

const roadmap = [
  { key: 'roadmap1', body: 'roadmap1Body', status: 'Shipped' },
  { key: 'roadmap2', body: 'roadmap2Body', status: 'Shipped' },
  { key: 'roadmap3', body: 'roadmap3Body', status: 'Not included' },
] as const;

export function AboutPage() {
  const { t } = useApp();

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(57,255,136,0.055),transparent)]" />

      <section className="container-page relative pb-16 pt-14 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <Reveal>
            <p className="eyebrow mb-4">{t('about.eyebrow')}</p>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
              {t('about.title')}
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              {t('about.lead')}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-white/[0.08] bg-ink-800/50 p-5">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">
                  project_file.yaml
                </p>
                <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-neon-400/80">
                  <span className="h-1 w-1 rounded-full bg-neon-400" />
                  demo
                </span>
              </div>
              <dl className="mt-4 space-y-2.5 font-mono text-[10px]">
                {[
                  ['project', 'darknet_academy'],
                  ['type', 'educational_demo'],
                  ['status', 'open_access'],
                  ['affiliation', 'none'],
                  ['data', 'browser_local'],
                  ['credentials', 'not_official'],
                  ['backend', 'not_connected'],
                ].map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <dt className="text-slate-600">{key}:</dt>
                    <dd className={value === 'not_official' ? 'text-amber-300/80' : 'text-slate-400'}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-400/10 bg-amber-400/[0.02] px-3 py-2">
                <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-amber-300/70" />
                <p className="font-mono text-[8px] uppercase leading-relaxed tracking-wider text-amber-200/50">
                  No real institution or certification
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-ink-850/30 py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-neon-400/20 bg-neon-400/[0.06] text-neon-300">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white">
                {t('about.missionTitle')}
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-400">{t('about.missionBody1')}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">{t('about.missionBody2')}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-4 sm:grid-cols-2">
              {principles.map((principle, index) => (
                <div
                  key={principle.key}
                  className="rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5"
                >
                  <div className="flex items-center justify-between">
                    <principle.icon className="h-4 w-4 text-neon-300/80" />
                    <span className="font-mono text-[9px] text-slate-700">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 font-display text-base font-medium text-white">
                    {t(`about.${principle.key}`)}
                  </h3>
                  <p className="mt-2 text-[11.5px] leading-relaxed text-slate-500">
                    {t(`about.${principle.body}`)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16 lg:py-24">
        <SectionHeading
          eyebrow="STACK & SCOPE"
          title={t('about.stackTitle')}
          description={t('about.stackBody')}
        />
        <div className="mt-10 flex flex-wrap gap-2.5">
          {stack.map((item) => (
            <span
              key={item.name}
              className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-ink-800/40 px-3.5 py-2 text-[11.5px] text-slate-400 transition hover:border-neon-400/20 hover:text-slate-200"
            >
              <item.icon className="h-3.5 w-3.5 text-slate-600" />
              {item.name}
            </span>
          ))}
          <span className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-ink-800/40 px-3.5 py-2 text-[11.5px] text-slate-400">
            <GitBranch className="h-3.5 w-3.5 text-slate-600" />
            Vite
          </span>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <h3 className="font-display text-xl font-medium text-white">{t('about.roadmapTitle')}</h3>
            <div className="mt-6 space-y-0">
              {roadmap.map((item, index) => (
                <div key={item.key} className="relative flex gap-4 pb-8 last:pb-0">
                  {index < roadmap.length - 1 && (
                    <span className="absolute left-[11px] top-6 h-full w-px bg-white/[0.08]" />
                  )}
                  <span className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neon-400/25 bg-ink-900 text-neon-300">
                    {item.status === 'Shipped' ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                    )}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[13px] font-medium text-slate-200">
                        {t(`about.${item.key}`)}
                      </p>
                      <span
                        className={
                          item.status === 'Shipped'
                            ? 'rounded-full bg-neon-400/[0.07] px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-neon-400/80'
                            : 'rounded-full bg-white/[0.04] px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-slate-600'
                        }
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-slate-500">
                      {t(`about.${item.body}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="disclaimer" className="scroll-mt-28">
            <div className="overflow-hidden rounded-2xl border border-amber-400/20 bg-amber-400/[0.03]">
              <div className="flex items-center gap-2.5 border-b border-amber-400/10 px-5 py-4">
                <ShieldAlert className="h-4 w-4 text-amber-300" />
                <h3 className="font-display text-sm font-semibold text-amber-100">
                  {t('about.disclaimerTitle')}
                </h3>
              </div>
              <div className="p-5">
                <p className="text-[12px] leading-relaxed text-amber-100/60">
                  {t('about.disclaimerBody')}
                </p>
                <div className="mt-4 grid gap-2">
                  {[
                    'Not affiliated with Apple, Inc.',
                    'No real certificates or licenses issued',
                    'No passwords sent to any server',
                    'Community profiles are fictional',
                  ].map((item) => (
                    <span
                      key={item}
                      className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-amber-200/45"
                    >
                      <span className="h-1 w-1 rounded-full bg-amber-400/50" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-ink-800/40 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-300">
                  <Users className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[12.5px] text-slate-200">A project, not a company.</p>
                  <p className="mt-0.5 text-[10.5px] text-slate-600">
                    Questions and corrections are welcome.
                  </p>
                </div>
              </div>
              <Link to="/contact" className={buttonStyles('secondary', 'sm', 'shrink-0')}>
                <Mail className="h-3.5 w-3.5" />
                {t('about.contactCta')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-850 px-6 py-14 text-center">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent)]" />
            <div className="relative">
              <ShieldCheck className="mx-auto mb-5 h-8 w-8 text-neon-300" />
              <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Learn deliberately. Stay lawful. Stay curious.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400">
                The academy is open. Pick a field note, follow a course, and build the judgment
                that no certificate can replace.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/fyp" className={buttonStyles('primary', 'lg')}>
                  {t('about.joinCta')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/courses" className={buttonStyles('secondary', 'lg')}>
                  {t('nav.courses')}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
