import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Copy,
  Globe2,
  HelpCircle,
  Lock,
  Mail,
  MessageSquare,
  Send,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CONTACT_TOPICS, FAQS } from '../data/site';
import { Accordion } from '../components/ui/Accordion';
import { buttonStyles } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { cn, copyToClipboard, isEmailValid } from '../lib/utils';

const DEMO_EMAIL = 'hello@darknet-academy.example';

const inputClass =
  'w-full rounded-xl border border-white/[0.09] bg-ink-950/60 px-3.5 py-3 text-[13px] text-slate-200 outline-none transition placeholder:text-slate-700 focus:border-neon-400/40 focus:bg-ink-950 focus:ring-2 focus:ring-neon-400/10';

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  name: '',
  email: '',
  topic: CONTACT_TOPICS[0],
  message: '',
};

export function ContactPage() {
  const { t, user, addToast } = useApp();
  const [form, setForm] = useState<FormState>(() => ({
    ...emptyForm,
    name: user?.username ?? '',
    email: user?.email ?? '',
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [reference, setReference] = useState('');
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (form.name.trim().length < 2) next.name = t('contact.errorName');
    if (!isEmailValid(form.email)) next.email = t('contact.errorEmail');
    if (form.message.trim().length < 20) next.message = t('contact.errorMessage');
    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    timer.current = window.setTimeout(() => {
      setSending(false);
      setSent(true);
      setReference(`LOCAL-${Date.now().toString(36).toUpperCase()}`);
      addToast({ title: t('contact.successTitle'), tone: 'success' });
    }, 850);
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(DEMO_EMAIL);
      addToast({ title: t('contact.emailCopied'), description: DEMO_EMAIL, tone: 'success' });
    } catch {
      addToast({
        title: 'Copy unavailable',
        description: DEMO_EMAIL,
        tone: 'info',
      });
    }
  };

  const resetForm = () => {
    setForm({ ...emptyForm, name: user?.username ?? '', email: user?.email ?? '' });
    setErrors({});
    setSent(false);
    setReference('');
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(57,255,136,0.045),transparent)]" />

      <section className="container-page relative pt-14 lg:pt-20">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">{t('contact.eyebrow')}</p>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              {t('contact.title')}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              {t('contact.subtitle')}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page mt-10 pb-6">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-800/50">
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-neon-400/[0.07] text-neon-300">
                    <MessageSquare className="h-3.5 w-3.5" />
                  </span>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                    form://contact
                  </p>
                </div>
                <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-slate-600">
                  <Lock className="h-2.5 w-2.5" />
                  local only
                </span>
              </div>

              {sent ? (
                <div className="px-6 py-14 text-center sm:px-10">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-neon-400/25 bg-neon-400/[0.07] text-neon-300">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-semibold text-white">
                    {t('contact.successTitle')}
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-[13px] leading-relaxed text-slate-400">
                    {t('contact.successBody')}
                  </p>
                  <div className="mx-auto mt-6 max-w-sm rounded-xl border border-white/[0.07] bg-ink-950/50 px-4 py-3">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">
                        Reference
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">{reference}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-4">
                      <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">
                        Delivery
                      </span>
                      <span className="font-mono text-[9px] uppercase text-amber-300/70">
                        not transmitted
                      </span>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={resetForm}
                      className={buttonStyles('secondary', 'md')}
                    >
                      {t('contact.another')}
                    </button>
                    <Link to="/fyp" className={buttonStyles('ghost', 'md')}>
                      {t('notFound.fyp')}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="px-5 py-6 sm:px-7 sm:py-7">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500"
                      >
                        {t('contact.name')}
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        value={form.name}
                        onChange={(event) => update('name', event.target.value)}
                        placeholder={t('contact.namePlaceholder')}
                        aria-invalid={Boolean(errors.name)}
                        className={cn(inputClass, errors.name && 'border-rose-400/40')}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-[11px] text-rose-300/90">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500"
                      >
                        {t('contact.email')}
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={(event) => update('email', event.target.value)}
                        placeholder={t('contact.emailPlaceholder')}
                        aria-invalid={Boolean(errors.email)}
                        className={cn(inputClass, errors.email && 'border-rose-400/40')}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-[11px] text-rose-300/90">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="contact-topic"
                      className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500"
                    >
                      {t('contact.topic')}
                    </label>
                    <div className="relative">
                      <select
                        id="contact-topic"
                        name="topic"
                        value={form.topic}
                        onChange={(event) => update('topic', event.target.value)}
                        className={cn(inputClass, 'appearance-none pr-10')}
                      >
                        {CONTACT_TOPICS.map((topic) => (
                          <option key={topic} value={topic} className="bg-ink-900 text-slate-200">
                            {topic}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600" />
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="contact-message"
                        className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500"
                      >
                        {t('contact.message')}
                      </label>
                      <span
                        className={cn(
                          'font-mono text-[9px]',
                          form.message.trim().length < 20 ? 'text-slate-700' : 'text-neon-400/70',
                        )}
                      >
                        {form.message.trim().length}/20+
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={(event) => update('message', event.target.value)}
                      placeholder={t('contact.messagePlaceholder')}
                      aria-invalid={Boolean(errors.message)}
                      className={cn(inputClass, 'resize-none leading-relaxed', errors.message && 'border-rose-400/40')}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-[11px] text-rose-300/90">{errors.message}</p>
                    )}
                  </div>

                  <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-400/15 bg-amber-400/[0.03] px-3.5 py-3">
                    <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300/70" />
                    <p className="text-[10.5px] leading-relaxed text-amber-100/50">
                      {t('contact.safety')}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-wider text-slate-600">
                      <Lock className="h-2.5 w-2.5" />
                      {t('contact.demoNote')}
                    </p>
                    <button
                      type="submit"
                      disabled={sending}
                      className={buttonStyles('primary', 'md', 'shrink-0')}
                    >
                      {sending ? t('contact.sending') : t('contact.send')}
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={0.06}>
              <div className="rounded-2xl border border-white/[0.08] bg-ink-800/50 p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">
                  {t('contact.direct')}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neon-400/15 bg-neon-400/[0.05] text-neon-300">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-[11px] text-slate-300">{DEMO_EMAIL}</p>
                    <p className="mt-0.5 font-mono text-[8px] uppercase tracking-wider text-amber-300/50">
                      demo address · not monitored
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-slate-500 transition hover:border-neon-400/25 hover:text-neon-300"
                    aria-label={t('contact.copyEmail')}
                    title={t('contact.copyEmail')}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-5 space-y-3 border-t border-white/[0.06] pt-4">
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-600" />
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                        {t('contact.responseTime')}
                      </p>
                      <p className="mt-0.5 text-[11.5px] text-slate-400">
                        {t('contact.responseValue')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-600" />
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                        {t('contact.office')}
                      </p>
                      <p className="mt-0.5 text-[11.5px] text-slate-400">
                        {t('contact.officeValue')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-600" />
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                        Best for
                      </p>
                      <p className="mt-0.5 text-[11.5px] text-slate-400">
                        Corrections, accessibility reports and course feedback.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-white/[0.08] bg-ink-800/50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="h-4 w-4 text-violet-300/80" />
                    <p className="font-display text-sm font-medium text-white">
                      {t('contact.faq')}
                    </p>
                  </div>
                  <Link
                    to="/#faq"
                    className="shrink-0 font-mono text-[8px] uppercase tracking-wider text-neon-400/70 transition hover:text-neon-300"
                  >
                    {t('contact.readFaq')} ↗
                  </Link>
                </div>
                <Accordion items={FAQS.slice(0, 3)} className="mt-3 border-b-0 [&_button]:py-3.5" />
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="rounded-2xl border border-white/[0.07] bg-ink-850/60 p-5">
                <p className="font-mono text-[9px] leading-relaxed tracking-wide text-slate-600">
                  DARKNET ACADEMY is an independent educational demo. We are not a school,
                  certification body or security vendor. Nothing on this page creates a
                  professional relationship.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    to="/licenses"
                    className="rounded-md border border-white/[0.07] px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-slate-500 transition hover:border-amber-400/25 hover:text-amber-300/80"
                  >
                    Demo documents
                  </Link>
                  <Link
                    to="/about#disclaimer"
                    className="rounded-md border border-white/[0.07] px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-slate-500 transition hover:border-white/20 hover:text-slate-300"
                  >
                    Disclaimer
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
