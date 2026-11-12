import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Download,
  FileBadge2,
  Fingerprint,
  Info,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  XCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CERTIFICATES } from '../data/site';
import type { Certificate } from '../lib/types';
import { formatDate } from '../lib/utils';
import { Dialog } from '../components/ui/Dialog';
import { Logo } from '../components/ui/Logo';
import { Reveal } from '../components/ui/Reveal';
import { buttonStyles } from '../components/ui/Button';
import { cn } from '../lib/utils';

const tints = [
  'border-[#127a4c]/25',
  'border-[#6d4aff]/25',
  'border-[#0b6f8a]/25',
  'border-[#9a6a0a]/25',
];

const accents = ['#0f7a4b', '#6d4aff', '#0b6f8a', '#9a6a0a'];

export function LicensesPage() {
  const { t, user, addToast } = useApp();
  const [verify, setVerify] = useState<Certificate | null>(null);
  const holder = user?.username ?? t('licenses.guest');

  const download = (certificate: Certificate) => {
    const content = `DARKNET ACADEMY — DEMO DOCUMENT
================================

STATUS: DEMO — NOT OFFICIAL
This document is a fictional sample created for a web design demonstration.
It is not a license, certificate, accreditation or professional credential.
It confers no rights, qualifications or official status.

Document title : ${certificate.title}
Document no.   : ${certificate.number}
Issued to      : ${holder}
Issued         : ${certificate.issued}
Issued by      : DARKNET ACADEMY · DEMO PROJECT
Subject        : ${certificate.subtitle}

${certificate.description}

No registry or issuing authority exists for this document.
Do not present it as a real credential.

Generated locally in the browser on ${new Date().toISOString()}.
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `darknet-demo-${certificate.id}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    addToast({ title: t('licenses.downloaded'), tone: 'success' });
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(57,255,136,0.045),transparent)]" />

      <section className="container-page relative pt-14 lg:pt-20">
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <p className="eyebrow !mb-0">{t('licenses.eyebrow')}</p>
              <span className="chip border-amber-400/25 bg-amber-400/[0.06] text-amber-300">
                DEMO ONLY
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              {t('licenses.title')}
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-400">
              {t('licenses.subtitle')}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-amber-400/25 bg-amber-400/[0.04]">
            <div className="flex flex-col gap-3 border-b border-amber-400/15 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300">
                  <ShieldAlert className="h-4 w-4" />
                </span>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-amber-200">
                  {t('licenses.warningTitle')}
                </p>
              </div>
              <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-amber-300/60">
                Fictional · sample · no registry
              </span>
            </div>
            <p className="px-5 py-4 text-[12px] leading-relaxed text-amber-100/60">
              {t('licenses.warningBody')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-4 grid gap-3 rounded-2xl border border-white/[0.07] bg-ink-800/40 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 px-1">
              <UserRound className="h-4 w-4 shrink-0 text-slate-600" />
              <div className="min-w-0">
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                  Holder
                </p>
                <p className="mt-0.5 truncate text-[12px] text-slate-300">{holder}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-1">
              <Fingerprint className="h-4 w-4 shrink-0 text-slate-600" />
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                  Account
                </p>
                <p className="mt-0.5 text-[12px] text-slate-300">
                  {user ? 'Local demo profile' : 'Guest'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-1">
              <FileBadge2 className="h-4 w-4 shrink-0 text-slate-600" />
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                  Documents
                </p>
                <p className="mt-0.5 text-[12px] text-slate-300">4 samples</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-1">
              <ShieldCheck className="h-4 w-4 shrink-0 text-slate-600" />
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-600">
                  Registry
                </p>
                <p className="mt-0.5 text-[12px] text-amber-300/80">None · demo</p>
              </div>
            </div>
          </div>
          {!user && (
            <p className="mt-3 text-center text-[11px] text-slate-500 sm:text-left">
              {t('licenses.signInHint')}{' '}
              <Link to="/register" className="font-medium text-neon-400/80 hover:underline">
                Continue with Apple →
              </Link>
            </p>
          )}
        </Reveal>
      </section>

      <section className="container-page mt-10">
        <div className="grid gap-5 xl:grid-cols-2">
          {CERTIFICATES.map((certificate, index) => (
            <Reveal key={certificate.id} delay={Math.min(index * 0.05, 0.2)}>
              <article className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-800/50 p-2.5 transition hover:border-white/[0.14]">
                <div
                  className={cn(
                    'certificate-guilloche relative overflow-hidden rounded-xl border-2 bg-[#f7f5ef] p-5 text-[#1d1d1f] sm:p-7',
                    tints[index % tints.length],
                  )}
                >
                  <div className="pointer-events-none absolute inset-2 rounded-lg border border-black/[0.08]" />
                  <div className="pointer-events-none absolute inset-0 demo-watermark">
                    <span>DEMO — NOT OFFICIAL</span>
                  </div>
                  <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rotate-45 border border-black/[0.06]" />
                  <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full border border-black/[0.05]" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <Logo asLink={false} theme="light" compact />
                      <div>
                        <p className="font-display text-[10px] font-bold uppercase tracking-[0.18em] text-[#1d1d1f]">
                          Darknet Academy
                        </p>
                        <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.18em] text-[#6e6e73]">
                          {t('licenses.issuedByValue').split('·')[0].trim()} · demo project
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block rounded-sm border border-[#b42318]/30 bg-[#b42318]/[0.06] px-1.5 py-0.5 font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-[#b42318]">
                        Demo — not official
                      </span>
                      <p className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.14em] text-[#86868b]">
                        Sample document
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-7 text-center">
                    <p className="font-mono text-[7.5px] uppercase tracking-[0.3em] text-[#86868b]">
                      {certificate.kind}
                    </p>
                    <h2 className="mx-auto mt-2 max-w-[22ch] font-display text-[22px] font-semibold leading-tight tracking-[-0.02em] text-[#1d1d1f] sm:text-[26px]">
                      {certificate.title}
                    </h2>
                    <p className="mt-1.5 text-[10px] uppercase tracking-[0.14em] text-[#6e6e73]">
                      {certificate.subtitle}
                    </p>
                  </div>

                  <div className="relative mt-6 flex items-end justify-between gap-4 border-t border-[#1d1d1f]/10 pt-4">
                    <div className="min-w-0">
                      <p className="font-mono text-[6.5px] uppercase tracking-[0.18em] text-[#86868b]">
                        {t('licenses.holder')}
                      </p>
                      <p className="mt-1 truncate font-display text-base font-semibold text-[#1d1d1f]">
                        {holder}
                      </p>
                      <p className="mt-2 font-mono text-[7.5px] tracking-wide text-[#6e6e73]">
                        {certificate.number}
                      </p>
                    </div>
                    <div className="shrink-0 text-center">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-full border-2"
                        style={{ borderColor: `${accents[index % accents.length]}55` }}
                      >
                        <div
                          className="flex h-11 w-11 flex-col items-center justify-center rounded-full border"
                          style={{ borderColor: `${accents[index % accents.length]}33` }}
                        >
                          <ShieldCheck
                            className="h-4 w-4"
                            style={{ color: accents[index % accents.length] }}
                          />
                          <span className="mt-0.5 font-mono text-[5px] font-bold uppercase leading-none tracking-wider text-[#6e6e73]">
                            demo
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 font-mono text-[6px] uppercase tracking-wider text-[#86868b]">
                        not a seal
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-5 flex items-end justify-between gap-4 border-t border-[#1d1d1f]/10 pt-3">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-mono text-[6px] uppercase tracking-[0.16em] text-[#86868b]">
                          {t('licenses.issued')}
                        </p>
                        <p className="mt-0.5 font-mono text-[8px] text-[#1d1d1f]">
                          {formatDate(certificate.issued)}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[6px] uppercase tracking-[0.16em] text-[#86868b]">
                          {t('licenses.status')}
                        </p>
                        <p className="mt-0.5 font-mono text-[7px] font-semibold uppercase text-[#b42318]">
                          DEMO / NOT OFFICIAL
                        </p>
                      </div>
                    </div>
                    <p className="max-w-[160px] text-right font-mono text-[6px] uppercase leading-relaxed tracking-wider text-[#a1a1a6]">
                      {t('licenses.footer')}
                    </p>
                  </div>

                  <p className="relative mt-3 border-t border-[#1d1d1f]/10 pt-2 text-[8.5px] leading-relaxed text-[#6e6e73]">
                    {certificate.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2 px-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em] text-amber-300/60">
                    <Info className="h-3 w-3" />
                    {t('licenses.warningTitle')}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setVerify(certificate)}
                      className={buttonStyles('ghost', 'sm')}
                    >
                      <ScanLine className="h-3 w-3" />
                      {t('licenses.verify')}
                    </button>
                    <button
                      type="button"
                      onClick={() => download(certificate)}
                      className={buttonStyles('secondary', 'sm')}
                    >
                      <Download className="h-3 w-3" />
                      {t('licenses.download')}
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 grid gap-4 rounded-2xl border border-white/[0.07] bg-ink-800/40 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-slate-600" />
              <div>
                <p className="text-[12.5px] text-slate-300">
                  There is no registry, issuer or accreditation for these documents.
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                  Certificates are generated locally for visual demonstration only. Do not use
                  them in applications, portfolios or professional claims.
                </p>
              </div>
            </div>
            <Link to="/profile" className={buttonStyles('secondary', 'sm', 'shrink-0')}>
              <ArrowLeft className="h-3 w-3" />
              {t('nav.profile')}
            </Link>
          </div>
        </Reveal>
      </section>

      <Dialog
        open={Boolean(verify)}
        onClose={() => setVerify(null)}
        eyebrow="Verification"
        title={t('licenses.verifyTitle')}
        footer={
          <div className="flex justify-end">
            <button type="button" onClick={() => setVerify(null)} className={buttonStyles('secondary', 'sm')}>
              {t('common.close')}
            </button>
          </div>
        }
      >
        {verify && (
          <div>
            <div className="flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4">
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
              <div>
                <p className="font-display text-sm font-medium text-amber-100">
                  DEMO — NOT OFFICIAL
                </p>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-amber-100/60">
                  {t('licenses.verifyBody')}
                </p>
              </div>
            </div>
            <dl className="mt-5 space-y-2.5 text-[12px]">
              <div className="flex justify-between gap-6 border-b border-white/[0.06] pb-2.5">
                <dt className="text-slate-600">Document</dt>
                <dd className="text-right text-slate-300">{verify.title}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-white/[0.06] pb-2.5">
                <dt className="text-slate-600">{t('licenses.number')}</dt>
                <dd className="font-mono text-right text-slate-400">{verify.number}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-white/[0.06] pb-2.5">
                <dt className="text-slate-600">{t('licenses.holder')}</dt>
                <dd className="text-right text-slate-300">{holder}</dd>
              </div>
              <div className="flex justify-between gap-6 border-b border-white/[0.06] pb-2.5">
                <dt className="text-slate-600">{t('licenses.issuedBy')}</dt>
                <dd className="text-right text-slate-400">DARKNET ACADEMY · DEMO PROJECT</dd>
              </div>
              <div className="flex justify-between gap-6">
                <dt className="text-slate-600">{t('licenses.status')}</dt>
                <dd className="font-mono text-right text-[10px] font-semibold uppercase text-amber-300">
                  DEMO / NOT OFFICIAL
                </dd>
              </div>
            </dl>
            <div className="mt-5 flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
              <CalendarDays className="h-3.5 w-3.5 shrink-0 text-slate-600" />
              <p className="font-mono text-[9px] uppercase tracking-wider text-slate-600">
                Issued {formatDate(verify.issued)} · no verification registry
              </p>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
