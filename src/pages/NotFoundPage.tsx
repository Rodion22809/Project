import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Home,
  LifeBuoy,
  RadioTower,
  SearchX,
  Terminal,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { buttonStyles } from '../components/ui/Button';
import { ParticleField } from '../components/ui/ParticleField';
import { Reveal } from '../components/ui/Reveal';

const suggestions = [
  { to: '/fyp', label: 'FYP feed', hint: '12 field notes' },
  { to: '/courses', label: 'Courses', hint: '6 learning paths' },
  { to: '/library', label: 'Cyber Library', hint: 'Cheat sheets & guides' },
  { to: '/community', label: 'Community', hint: 'Open discussions' },
];

export function NotFoundPage() {
  const { t } = useApp();
  const location = useLocation();

  return (
    <div className="relative overflow-hidden">
      <ParticleField className="opacity-60" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-25 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_45%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_55%_100%_at_50%_0%,rgba(57,255,136,0.06),transparent)]" />

      <section className="container-page relative flex min-h-[74vh] flex-col items-center justify-center py-20 text-center">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/[0.05] px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-amber-300/90">
              <RadioTower className="h-3 w-3" />
              {t('notFound.code')}
            </span>

            <h1 className="relative mt-8 select-none font-display text-[104px] font-semibold leading-none tracking-[-0.06em] text-transparent sm:text-[150px] lg:text-[184px]">
              <span className="bg-gradient-to-b from-white via-slate-300 to-slate-700 bg-clip-text">
                404
              </span>
              <span className="pointer-events-none absolute inset-0 -z-10 bg-ink-950/0 blur-2xl" />
            </h1>

            <div className="relative -mt-4 w-full max-w-md">
              <div className="absolute -inset-2 -z-10 rounded-2xl bg-neon-400/[0.05] blur-2xl" />
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-850/90 backdrop-blur">
                <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-400/60" />
                    <span className="h-2 w-2 rounded-full bg-amber-400/60" />
                    <span className="h-2 w-2 rounded-full bg-neon-400/60" />
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">
                    resolver.log
                  </span>
                </div>
                <div className="space-y-1.5 px-4 py-4 text-left font-mono text-[10px] leading-relaxed">
                  <p className="text-slate-600">
                    <span className="text-neon-400/70">$</span> resolve --path
                  </p>
                  <p className="truncate text-slate-400">{location.pathname}</p>
                  <p className="flex items-center gap-1.5 text-rose-300/80">
                    <SearchX className="h-3 w-3 shrink-0" />
                    status: no route in academy index
                  </p>
                  <p className="text-slate-700">hint: check spelling or return to a known path</p>
                </div>
              </div>
            </div>

            <h2 className="mt-9 max-w-xl font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {t('notFound.title')}
            </h2>
            <p className="mt-3 max-w-lg text-[13.5px] leading-relaxed text-slate-400">
              {t('notFound.body')}
            </p>

            <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Link to="/" className={buttonStyles('primary', 'lg')}>
                <Home className="h-4 w-4" />
                {t('notFound.home')}
              </Link>
              <Link to="/fyp" className={buttonStyles('secondary', 'lg')}>
                <Compass className="h-4 w-4" />
                {t('notFound.fyp')}
              </Link>
            </div>

            <div className="mt-12 w-full max-w-2xl border-t border-white/[0.06] pt-8">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-600">
                Known paths
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {suggestions.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-ink-800/40 px-4 py-3 text-left transition hover:border-neon-400/25 hover:bg-neon-400/[0.03]"
                  >
                    <div className="min-w-0">
                      <p className="text-[12.5px] text-slate-300 transition group-hover:text-white">
                        {item.label}
                      </p>
                      <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-slate-600">
                        {item.hint}
                      </p>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-700 transition group-hover:translate-x-0.5 group-hover:text-neon-300" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[9px] uppercase tracking-wider text-slate-700">
              <Link
                to="/contact"
                className="flex items-center gap-1.5 transition hover:text-slate-400"
              >
                <LifeBuoy className="h-3 w-3" />
                Report a broken route
              </Link>
              <Link
                to="/courses"
                className="flex items-center gap-1.5 transition hover:text-slate-400"
              >
                <Terminal className="h-3 w-3" />
                Start with fundamentals
              </Link>
              <Link
                to="/"
                className="flex items-center gap-1.5 transition hover:text-slate-400"
              >
                <ArrowLeft className="h-3 w-3" />
                {t('common.backHome')}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
