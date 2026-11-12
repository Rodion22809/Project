import { Link, useSearchParams } from 'react-router-dom';
import { LogOut, ShieldCheck } from 'lucide-react';
import { AuthShell } from '../components/auth/AuthShell';
import { AppleLogo } from '../components/ui/AppleLogo';
import { Avatar } from '../components/ui/Avatar';
import { useApp } from '../context/AppContext';
import { safeInternalPath } from '../lib/utils';

export function LoginPage() {
  const { t, user, signOut, addToast } = useApp();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next');
  const destination = safeInternalPath(next);
  const nextQuery = next ? `&next=${encodeURIComponent(next)}` : '';
  const registerQuery = next ? `?next=${encodeURIComponent(next)}` : '';

  const handleSignOut = () => {
    signOut();
    addToast({ title: t('auth.signedOut'), tone: 'info' });
  };

  return (
    <AuthShell
      footer={
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[10.5px] text-[#86868b]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3" />
            Credentials never leave this browser
          </span>
        </div>
      }
    >
      <div className="text-center">
        <AppleLogo className="mx-auto h-10 w-10 text-[#1d1d1f]" />
        <h1 className="mt-7 font-display text-[32px] font-semibold leading-tight tracking-[-0.03em] text-[#1d1d1f] sm:text-[36px]">
          {t('auth.loginTitle')}
        </h1>
        <p className="mx-auto mt-3 max-w-[320px] text-[14px] leading-relaxed text-[#6e6e73]">
          {t('auth.loginSubtitle')}
        </p>
      </div>

      {user ? (
        <div className="mt-8 rounded-2xl border border-[#d2d2d7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3">
            <Avatar name={user.username} accent={user.accent} size="md" />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium text-[#1d1d1f]">{user.username}</p>
              <p className="truncate text-[11px] text-[#86868b]">{user.email}</p>
            </div>
            <span className="ml-auto rounded-full bg-[#f5f5f7] px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-[#86868b]">
              Demo
            </span>
          </div>
          <Link
            to={destination}
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-black py-3.5 text-[12px] font-semibold text-white transition hover:bg-[#1d1d1f]"
          >
            {next ? t('auth.continue') : t('auth.goProfile')}
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-[11px] text-[#6e6e73] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
          >
            <LogOut className="h-3 w-3" />
            {t('nav.signOut')}
          </button>
          <div className="mt-3 border-t border-[#e5e5ea] pt-3 text-center">
            <Link
              to={`/auth/apple?mode=login${nextQuery}`}
              className="text-[11.5px] font-medium text-[#0071e3] hover:underline"
            >
              Use a different Apple Account
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-8">
            <Link
              to={`/auth/apple?mode=login${nextQuery}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition hover:bg-[#1d1d1f] active:translate-y-[0.5px]"
            >
              <AppleLogo className="h-[17px] w-[17px]" />
              {t('auth.appleOnly')}
            </Link>
          </div>

          <p className="mt-4 text-center text-[12px] text-[#6e6e73]">
            {t('auth.noAccount')}{' '}
            <Link to={`/register${registerQuery}`} className="font-medium text-[#0071e3] hover:underline">
              {t('auth.createAccount')}
            </Link>
          </p>

          <div className="mt-7 rounded-2xl border border-[#e5e5ea] bg-[#f5f5f7]/80 p-4">
            <p className="text-[11.5px] font-semibold text-[#1d1d1f]">Demo sign-in</p>
            <p className="mt-1 text-[11px] leading-relaxed text-[#6e6e73]">
              This flow simulates Apple ID locally. Enter any test email and a password of 8+
              characters. No credentials are transmitted or stored.
            </p>
          </div>
        </>
      )}

      <p className="mt-5 text-center text-[10.5px] leading-relaxed text-[#a1a1a6]">
        {t('auth.terms')}
      </p>
    </AuthShell>
  );
}
