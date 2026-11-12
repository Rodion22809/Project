import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bell,
  BookMarked,
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Avatar } from '../ui/Avatar';
import { buttonStyles } from '../ui/Button';
import { NotificationsPanel } from './NotificationsPanel';
import { SearchOverlay } from './SearchOverlay';
import { useApp } from '../../context/AppContext';
import { NAV_ITEMS } from '../../data/site';
import { cn } from '../../lib/utils';

export function Header() {
  const {
    user,
    unreadCount,
    language,
    setLanguage,
    signOut,
    addToast,
    t,
  } = useApp();
  const location = useLocation();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setNotificationsOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((current) => !current);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const handleSignOut = () => {
    signOut();
    addToast({ title: t('auth.signedOut'), tone: 'info' });
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50">
        <div className="hidden border-b border-white/[0.04] bg-ink-950/80 md:block">
          <div className="container-page flex h-7 items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">
            <span className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-neon-400 shadow-[0_0_6px_rgba(57,255,136,0.8)]" />
              Demo educational project — no real credentials
            </span>
            <span className="hidden items-center gap-4 lg:flex">
              <span>Open access · 100% free</span>
              <span className="text-neon-400/60">Status: online</span>
            </span>
          </div>
        </div>
        <div className="border-b border-white/[0.06] bg-ink-900/85 backdrop-blur-xl">
          <div className="container-page flex h-[64px] items-center justify-between gap-3">
            <div className="flex items-center gap-6">
              <Logo />
              <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'relative rounded-lg px-3 py-2 text-[13px] transition',
                        isActive
                          ? 'text-white'
                          : 'text-slate-400 hover:bg-white/[0.03] hover:text-white',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {t(item.key)}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-x-3 -bottom-[1px] h-px bg-neon-400 shadow-[0_0_8px_rgba(57,255,136,0.8)]"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex h-9 items-center gap-2 rounded-lg px-2.5 text-slate-400 transition hover:bg-white/[0.05] hover:text-white sm:border sm:border-white/[0.07] sm:bg-white/[0.02]"
                aria-label={t('common.searchSite')}
              >
                <Search className="h-4 w-4" />
                <span className="hidden font-mono text-[9px] uppercase tracking-widest text-slate-600 md:inline">
                  Ctrl K
                </span>
              </button>

              <div className="hidden items-center rounded-lg border border-white/[0.07] bg-white/[0.02] p-0.5 md:flex">
                {(['en', 'ru'] as const).map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLanguage(code)}
                    aria-pressed={language === code}
                    className={cn(
                      'rounded-md px-2 py-1 font-mono text-[9px] uppercase tracking-wider transition',
                      language === code
                        ? 'bg-white/[0.08] text-white'
                        : 'text-slate-600 hover:text-slate-300',
                    )}
                  >
                    {code}
                  </button>
                ))}
              </div>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setNotificationsOpen((current) => !current)}
                  className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
                  aria-label={t('notif.title')}
                  aria-expanded={notificationsOpen}
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-neon-400 shadow-[0_0_8px_rgba(57,255,136,0.9)]" />
                  )}
                </button>
                <NotificationsPanel
                  open={notificationsOpen}
                  onClose={() => setNotificationsOpen(false)}
                />
              </div>

              {user ? (
                <Link
                  to="/profile"
                  className="ml-1 flex items-center gap-2 rounded-full border border-white/10 py-0.5 pl-0.5 pr-2.5 transition hover:border-neon-400/30"
                  aria-label={t('nav.profile')}
                >
                  <Avatar name={user.username} accent={user.accent} size="sm" />
                  <span className="hidden max-w-[90px] truncate text-xs text-slate-300 xl:inline">
                    {user.username}
                  </span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hidden rounded-lg px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/[0.04] hover:text-white sm:block"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className={buttonStyles('primary', 'sm', 'hidden sm:inline-flex')}
                  >
                    Join free
                  </Link>
                </>
              )}

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="ml-0.5 flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-white/[0.05] hover:text-white lg:hidden"
                aria-label="Open menu"
                aria-expanded={menuOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[80] lg:hidden">
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute inset-y-0 right-0 flex w-[min(360px,88vw)] flex-col border-l border-white/10 bg-ink-900 shadow-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
                {[{ to: '/', key: 'nav.home' as const }, ...NAV_ITEMS].map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg transition',
                        isActive
                          ? 'bg-neon-400/[0.07] text-neon-300'
                          : 'text-slate-300 hover:bg-white/[0.03] hover:text-white',
                      )
                    }
                  >
                    {t(item.key)}
                    <span className="font-mono text-[10px] text-slate-700">↗</span>
                  </NavLink>
                ))}
                <div className="my-3 h-px bg-white/[0.06]" />
                {[
                  { to: '/profile', label: t('nav.profile'), Icon: UserRound },
                  { to: '/licenses', label: t('nav.licenses'), Icon: ShieldCheck },
                  { to: '/contact', label: t('nav.contact'), Icon: BookMarked },
                ].map(({ to, label, Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/[0.03] hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-white/[0.07] p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">
                    Language
                  </span>
                  <div className="flex items-center rounded-lg border border-white/[0.08] p-0.5">
                    {(['en', 'ru'] as const).map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setLanguage(code)}
                        className={cn(
                          'rounded-md px-3 py-1 font-mono text-[10px] uppercase transition',
                          language === code
                            ? 'bg-white/[0.08] text-white'
                            : 'text-slate-600',
                        )}
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.07] p-3 transition hover:border-neon-400/25"
                    >
                      <Avatar name={user.username} accent={user.accent} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-sm text-white">{user.username}</p>
                        <p className="truncate font-mono text-[9px] uppercase tracking-wider text-neon-400/70">
                          Demo account
                        </p>
                      </div>
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.07] py-2.5 text-xs text-slate-400 transition hover:border-rose-400/25 hover:text-rose-300"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      {t('nav.signOut')}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className={buttonStyles('primary', 'md', 'w-full')}
                    >
                      Continue with Apple
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className={buttonStyles('secondary', 'md', 'w-full')}
                    >
                      {t('nav.login')}
                    </Link>
                  </div>
                )}
                <p className="mt-4 font-mono text-[9px] leading-relaxed text-slate-700">
                  Demo project · not affiliated with Apple or any institution.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
