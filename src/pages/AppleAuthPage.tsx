import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { AuthShell } from '../components/auth/AuthShell';
import { AppleLogo } from '../components/ui/AppleLogo';
import { Logo } from '../components/ui/Logo';
import { PasswordField } from '../components/ui/PasswordField';
import { useApp } from '../context/AppContext';
import { isEmailValid, safeInternalPath } from '../lib/utils';

type Step = 'credentials' | 'code' | 'consent' | 'processing' | 'success';

function DemoPill() {
  return (
    <div className="mx-auto flex w-fit items-center gap-1.5 rounded-full border border-[#e5e5ea] bg-[#f5f5f7] px-3 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-[#ff9f0a]" />
      <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-[#6e6e73]">
        Demo · local simulation
      </span>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-xl border border-[#e5e5ea] bg-white px-4 py-3 text-left transition hover:border-[#d2d2d7]"
    >
      <span>
        <span className="block text-[12.5px] font-medium text-[#1d1d1f]">{label}</span>
        {description && (
          <span className="mt-0.5 block text-[10.5px] leading-relaxed text-[#86868b]">
            {description}
          </span>
        )}
      </span>
      <span
        className={`relative h-6 w-10 shrink-0 rounded-full transition ${
          checked ? 'bg-[#34c759]' : 'bg-[#d2d2d7]'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
            checked ? 'left-[18px]' : 'left-0.5'
          }`}
        />
      </span>
    </button>
  );
}

export function AppleAuthPage() {
  const { t, signInDemo, addToast } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const destination = safeInternalPath(searchParams.get('next'));

  const [step, setStep] = useState<Step>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; code?: string }>({});
  const [shareName, setShareName] = useState(true);
  const [hideEmail, setHideEmail] = useState(false);
  const [resendNote, setResendNote] = useState(false);
  const timers = useRef<number[]>([]);
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    if (step === 'code') {
      const timer = window.setTimeout(() => codeRef.current?.focus(), 250);
      timers.current.push(timer);
    }
  }, [step]);

  const stepNumber = step === 'credentials' ? 1 : step === 'code' ? 2 : 3;
  const totalSteps = 3;

  const submitCredentials = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!isEmailValid(email)) nextErrors.email = t('auth.errorEmail');
    if (password.length < 8) nextErrors.password = t('auth.errorPassword');
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setStep('code');
    setCode('');
  };

  const submitCode = (event: React.FormEvent) => {
    event.preventDefault();
    if (code.trim() !== '123456') {
      setErrors({ code: t('auth.errorCode') });
      return;
    }
    setErrors({});
    setStep('consent');
  };

  const finish = () => {
    setStep('processing');
    const signInTimer = window.setTimeout(() => {
      try {
        signInDemo(email.trim());
        setStep('success');
        addToast({
          title: mode === 'register' ? 'Demo profile created' : 'Welcome back',
          description: 'Everything is stored locally in this browser.',
          tone: 'success',
        });
        const redirect = window.setTimeout(() => navigate(destination, { replace: true }), 1400);
        timers.current.push(redirect);
      } catch {
        setStep('credentials');
        setErrors({ email: t('auth.errorGeneric') });
      }
    }, 1300);
    timers.current.push(signInTimer);
  };

  const resend = () => {
    setResendNote(true);
    const timer = window.setTimeout(() => setResendNote(false), 2600);
    timers.current.push(timer);
  };

  return (
    <AuthShell
      footer={
        <div className="mb-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <span className="flex items-center gap-1.5 text-[10.5px] text-[#86868b]">
            <LockKeyhole className="h-3 w-3" />
            {t('auth.privacyNote')}
          </span>
          <span className="flex items-center gap-1.5 text-[10.5px] text-[#86868b]">
            <ShieldCheck className="h-3 w-3" />
            {t('auth.appleIdFootnote')}
          </span>
        </div>
      }
    >
      <div className="rounded-[22px] border border-[#e5e5ea] bg-white/90 px-5 py-7 shadow-[0_2px_24px_rgba(0,0,0,0.045)] backdrop-blur-sm sm:px-8 sm:py-9">
        <DemoPill />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 'credentials' && (
              <form onSubmit={submitCredentials}>
                <div className="mt-5 text-center">
                  <AppleLogo className="mx-auto h-9 w-9 text-[#1d1d1f]" />
                  <h1 className="mt-5 font-display text-[25px] font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f]">
                    {mode === 'register' ? t('auth.appleCreate') : t('auth.appleSignIn')}
                  </h1>
                  <p className="mt-2 text-[12.5px] text-[#6e6e73]">
                    to continue to <span className="font-medium text-[#1d1d1f]">DARKNET ACADEMY</span>
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  <div>
                    <label
                      htmlFor="apple-email"
                      className="mb-1.5 block text-[12px] font-medium text-[#1d1d1f]"
                    >
                      {t('auth.emailLabel')}
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
                      <input
                        id="apple-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={t('auth.emailPlaceholder')}
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'apple-email-error' : undefined}
                        className={`w-full rounded-xl border bg-white py-3.5 pl-10 pr-4 text-[15px] text-[#1d1d1f] placeholder:text-[#86868b] transition focus:outline-none focus:ring-4 ${
                          errors.email
                            ? 'border-[#e30000] focus:border-[#e30000] focus:ring-[#e30000]/10'
                            : 'border-[#d2d2d7] focus:border-[#0071e3] focus:ring-[#0071e3]/10'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p id="apple-email-error" role="alert" className="mt-1.5 text-[11px] text-[#e30000]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <PasswordField
                    id="apple-password"
                    label={t('auth.passwordLabel')}
                    value={password}
                    onChange={setPassword}
                    error={errors.password}
                    placeholder={t('auth.passwordPlaceholder')}
                    autoComplete="current-password"
                    theme="light"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0071e3] py-3.5 text-[13px] font-medium text-white transition hover:bg-[#0077ed] active:translate-y-[0.5px]"
                >
                  {t('auth.continue')}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <div className="mt-4 text-center">
                  <Link
                    to="/"
                    className="text-[11.5px] font-medium text-[#0071e3] transition hover:underline"
                  >
                    {t('auth.cancel')}
                  </Link>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 border-t border-[#e5e5ea] pt-4">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-[#a1a1a6]">
                    {t('auth.step', { current: 1, total: totalSteps })}
                  </span>
                  <span className="flex gap-1">
                    {[1, 2, 3].map((item) => (
                      <span
                        key={item}
                        className={`h-1 w-3 rounded-full ${item <= 1 ? 'bg-[#1d1d1f]' : 'bg-[#d2d2d7]'}`}
                      />
                    ))}
                  </span>
                </div>
              </form>
            )}

            {step === 'code' && (
              <form onSubmit={submitCode}>
                <button
                  type="button"
                  onClick={() => {
                    setStep('credentials');
                    setErrors({});
                  }}
                  className="mt-5 flex items-center gap-1.5 text-[11.5px] text-[#6e6e73] transition hover:text-[#1d1d1f]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {t('auth.backToCredentials')}
                </button>

                <div className="mt-4 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#d2d2d7] bg-[#f5f5f7]">
                    <ShieldCheck className="h-5 w-5 text-[#1d1d1f]" />
                  </div>
                  <h1 className="mt-5 font-display text-[24px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                    {t('auth.twoFactorTitle')}
                  </h1>
                  <p className="mx-auto mt-2 max-w-[300px] text-[12.5px] leading-relaxed text-[#6e6e73]">
                    {t('auth.twoFactorBody')}
                  </p>
                  <p className="mt-2 text-[11px] text-[#86868b]">{email}</p>
                </div>

                <div className="mt-6">
                  <input
                    ref={codeRef}
                    value={code}
                    onChange={(event) => {
                      setCode(event.target.value.replace(/\D/g, '').slice(0, 6));
                      setErrors({});
                    }}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    placeholder="000000"
                    aria-label={t('auth.twoFactorTitle')}
                    aria-invalid={Boolean(errors.code)}
                    className={`w-full rounded-xl border bg-white py-3.5 text-center font-mono text-2xl tracking-[0.45em] text-[#1d1d1f] placeholder:text-[#d2d2d7] transition focus:outline-none focus:ring-4 ${
                      errors.code
                        ? 'border-[#e30000] focus:border-[#e30000] focus:ring-[#e30000]/10'
                        : 'border-[#d2d2d7] focus:border-[#0071e3] focus:ring-[#0071e3]/10'
                    }`}
                  />
                  {errors.code && (
                    <p role="alert" className="mt-1.5 text-center text-[11px] text-[#e30000]">
                      {errors.code}
                    </p>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setCode('123456')}
                    className="rounded-lg border border-[#e5e5ea] bg-[#f5f5f7] px-2.5 py-1.5 font-mono text-[9.5px] uppercase tracking-wider text-[#6e6e73] transition hover:text-[#1d1d1f]"
                  >
                    Use demo code
                  </button>
                  <button
                    type="button"
                    onClick={resend}
                    className="text-[10.5px] font-medium text-[#0071e3] transition hover:underline"
                  >
                    {resendNote ? t('auth.codeSent') : t('auth.resend')}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={code.length !== 6}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0071e3] py-3.5 text-[13px] font-medium text-white transition hover:bg-[#0077ed] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t('auth.verify')}
                  <Check className="h-3.5 w-3.5" />
                </button>

                <p className="mt-4 text-center font-mono text-[9.5px] uppercase tracking-wider text-[#a1a1a6]">
                  {t('auth.twoFactorHint')}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 border-t border-[#e5e5ea] pt-4">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-[#a1a1a6]">
                    {t('auth.step', { current: 2, total: totalSteps })}
                  </span>
                  <span className="flex gap-1">
                    {[1, 2, 3].map((item) => (
                      <span
                        key={item}
                        className={`h-1 w-3 rounded-full ${item <= 2 ? 'bg-[#1d1d1f]' : 'bg-[#d2d2d7]'}`}
                      />
                    ))}
                  </span>
                </div>
              </form>
            )}

            {step === 'consent' && (
              <div>
                <div className="mt-5 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d2d2d7] bg-white">
                      <AppleLogo className="h-5 w-5 text-[#1d1d1f]" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-[#a1a1a6]" />
                    <Logo asLink={false} theme="light" compact />
                  </div>
                  <h1 className="mt-5 font-display text-[23px] font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f]">
                    {t('auth.consentTitle')}
                  </h1>
                  <p className="mx-auto mt-2 max-w-[320px] text-[12.5px] leading-relaxed text-[#6e6e73]">
                    {t('auth.consentSubtitle')}
                  </p>
                </div>

                <div className="mt-5 rounded-xl border border-[#e5e5ea] bg-[#f5f5f7]/70 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#86868b]">
                        Apple Account
                      </p>
                      <p className="mt-0.5 truncate text-[12px] text-[#1d1d1f]">
                        {hideEmail ? 'Hidden demo address' : email}
                      </p>
                    </div>
                    <Link
                      to="/auth/apple?mode=credentials"
                      onClick={(event) => {
                        event.preventDefault();
                        setStep('credentials');
                      }}
                      className="shrink-0 text-[10.5px] font-medium text-[#0071e3] hover:underline"
                    >
                      Change
                    </Link>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <Toggle
                    checked={shareName}
                    onChange={setShareName}
                    label={t('auth.shareName')}
                    description="Share a display name with this demo application."
                  />
                  <Toggle
                    checked={hideEmail}
                    onChange={setHideEmail}
                    label={t('auth.hideEmail')}
                    description="Use a private demo address instead."
                  />
                </div>

                <button
                  type="button"
                  onClick={finish}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1d1d1f] py-3.5 text-[13px] font-medium text-white transition hover:bg-black"
                >
                  {t('auth.consentContinue')}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <Link
                  to="/"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-[#e5e5ea] py-3 text-[12px] font-medium text-[#6e6e73] transition hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                >
                  {t('auth.cancel')}
                </Link>

                <p className="mt-4 text-center text-[10px] leading-relaxed text-[#a1a1a6]">
                  {t('auth.consentNote')}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 border-t border-[#e5e5ea] pt-4">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-[#a1a1a6]">
                    {t('auth.step', { current: 3, total: totalSteps })}
                  </span>
                  <span className="flex gap-1">
                    {[1, 2, 3].map((item) => (
                      <span key={item} className="h-1 w-3 rounded-full bg-[#1d1d1f]" />
                    ))}
                  </span>
                </div>
              </div>
            )}

            {step === 'processing' && (
              <div className="py-12 text-center">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-[#1d1d1f]" />
                <h1 className="mt-6 font-display text-[22px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                  {t('auth.signingIn')}
                </h1>
                <p className="mt-2 text-[12px] text-[#6e6e73]">
                  {t('auth.creating')}
                </p>
                <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-[#e5e5ea] bg-[#f5f5f7] px-3 py-1.5">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-[#34c759]" />
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-[#86868b]">
                    Local sandbox · no network request
                  </span>
                </div>
              </div>
            )}

            {step === 'success' && (
              <div className="py-12 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#34c759]/10"
                >
                  <CheckCircle2 className="h-8 w-8 text-[#34c759]" />
                </motion.div>
                <h1 className="mt-5 font-display text-[24px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                  {t('auth.successTitle')}
                </h1>
                <p className="mt-2 text-[12.5px] text-[#6e6e73]">{t('auth.successBody')}</p>
                <div className="mx-auto mt-5 h-1 w-40 overflow-hidden rounded-full bg-[#e5e5ea]">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2 }}
                    className="h-full rounded-full bg-[#34c759]"
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[11.5px] text-[#6e6e73] transition hover:text-[#1d1d1f]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t('auth.returnHome')}
        </Link>
      </div>
    </AuthShell>
  );
}
