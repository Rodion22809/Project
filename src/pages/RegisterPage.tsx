import { Link, useSearchParams } from 'react-router-dom';
import { LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';
import { AuthShell } from '../components/auth/AuthShell';
import { AppleContinueButton } from '../components/auth/AppleContinueButton';
import { AppleLogo } from '../components/ui/AppleLogo';
import { useApp } from '../context/AppContext';

export function RegisterPage() {
  const { t, user } = useApp();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next');
  const nextQuery = next ? `&next=${encodeURIComponent(next)}` : '';
  const loginQuery = next ? `?next=${encodeURIComponent(next)}` : '';

  return (
    <AuthShell
      footer={
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[10.5px] text-[#86868b]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3" />
            Local demo profile
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" />
            No password stored
          </span>
        </div>
      }
    >
      <div className="text-center">
        <AppleLogo className="mx-auto h-10 w-10 text-[#1d1d1f]" />
        <h1 className="mt-7 font-display text-[32px] font-semibold leading-tight tracking-[-0.03em] text-[#1d1d1f] sm:text-[36px]">
          {t('auth.registerTitle')}
        </h1>
        <p className="mx-auto mt-3 max-w-[340px] text-[14px] leading-relaxed text-[#6e6e73]">
          {t('auth.registerSubtitle')}
        </p>
      </div>

      {user && (
        <div className="mt-6 rounded-2xl border border-[#d2d2d7] bg-white/70 px-4 py-3 text-center">
          <p className="text-[12px] text-[#6e6e73]">
            {t('auth.alreadySignedIn')}{' '}
            <span className="font-medium text-[#1d1d1f]">{user.username}</span>
          </p>
          <Link
            to="/profile"
            className="mt-1 inline-block text-[12px] font-medium text-[#0071e3] hover:underline"
          >
            {t('auth.goProfile')} →
          </Link>
        </div>
      )}

      <div className="mt-7">
        <Link
          to={`/auth/apple?mode=register${nextQuery}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition hover:bg-[#1d1d1f] active:translate-y-[0.5px] text-center"
        >
          <AppleLogo className="h-[17px] w-[17px]" />
          {t('auth.appleOnly')}
        </Link>
      </div>

      <p className="mt-4 text-center text-[12px] text-[#6e6e73]">
        {t('auth.alreadyMember')}{' '}
        <Link to={`/login${loginQuery}`} className="font-medium text-[#0071e3] hover:underline">
          {t('nav.login')}
        </Link>
      </p>

      {next && (
        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[10.5px] leading-relaxed text-[#86868b]">
          <LockKeyhole className="h-3 w-3 shrink-0" />
          {t('auth.returnToCourse')}
        </p>
      )}

      <p className="mt-5 text-center text-[10.5px] leading-relaxed text-[#86868b]">
        {t('auth.appleOnlyHint')}
      </p>
      <p className="mt-3 text-center text-[10px] leading-relaxed text-[#a1a1a6]">
        {t('auth.terms')}
      </p>
    </AuthShell>
  );
}
