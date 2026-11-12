import { Link } from 'react-router-dom';
import { ArrowUp, CircleDot, Mail, ShieldAlert } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { useApp } from '../../context/AppContext';

const platform = [
  { to: '/fyp', labelKey: 'nav.fyp' },
  { to: '/courses', labelKey: 'nav.courses' },
  { to: '/library', labelKey: 'nav.library' },
  { to: '/community', labelKey: 'nav.community' },
] as const;

const resources = [
  { to: '/profile', labelKey: 'nav.profile' },
  { to: '/licenses', labelKey: 'nav.licenses' },
  { to: '/contact', labelKey: 'nav.contact' },
  { to: '/about', labelKey: 'nav.about' },
] as const;

export function Footer() {
  const { t } = useApp();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/[0.06] bg-ink-950/60">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      <div className="container-page relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-slate-500">
              {t('footer.tagline')}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-neon-400/15 bg-neon-400/[0.04] px-3 py-1.5">
              <CircleDot className="h-3 w-3 animate-pulse-soft text-neon-400" />
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-neon-300/80">
                {t('footer.status')}
              </span>
            </div>
            <p className="mt-6 font-display text-sm text-slate-300">{t('footer.cta')}</p>
          </div>

          <div>
            <h3 className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-600">
              {t('footer.platform')}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {platform.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[13px] text-slate-400 transition hover:text-neon-300"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-600">
              {t('footer.resources')}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {resources.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[13px] text-slate-400 transition hover:text-neon-300"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/about#disclaimer"
                  className="text-[13px] text-slate-400 transition hover:text-neon-300"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-600">
              Demo notice
            </h3>
            <div className="mt-4 rounded-xl border border-amber-400/15 bg-amber-400/[0.03] p-4">
              <div className="flex items-center gap-2 text-amber-300">
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span className="font-mono text-[9px] uppercase tracking-[0.14em]">
                  Not official
                </span>
              </div>
              <p className="mt-2.5 text-[11.5px] leading-relaxed text-slate-500">
                {t('footer.disclaimer')}
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 text-[12px] text-slate-400 transition hover:text-white"
            >
              <Mail className="h-3.5 w-3.5" />
              {t('footer.contact')}
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-slate-600">
            {t('footer.rights')} <span className="mx-2 text-slate-700">/</span> {t('footer.made')}
          </p>
          <button
            type="button"
            onClick={scrollTop}
            className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 transition hover:text-neon-300"
          >
            Back to top
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 transition group-hover:border-neon-400/30">
              <ArrowUp className="h-3 w-3" />
            </span>
          </button>
        </div>
      </div>

      <div
        className="pointer-events-none select-none overflow-hidden px-4 pb-2 text-center font-display text-[14vw] font-bold leading-[0.75] tracking-[-0.04em] text-white/[0.018]"
        aria-hidden="true"
      >
        DARKNET
      </div>
    </footer>
  );
}
