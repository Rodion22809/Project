import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { Logo } from '../ui/Logo';

export function AuthShell({
  children,
  footer,
  wide = false,
}: {
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="apple-shell relative flex min-h-[100dvh] flex-col">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[320px] opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(0,0,0,0.035), transparent 65%)',
        }}
      />
      <header className="relative z-10">
        <div className="mx-auto flex h-[64px] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Logo theme="light" />
          <Link
            to="/"
            className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[12px] text-[#6e6e73] transition hover:bg-black/[0.04] hover:text-[#1d1d1f]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Return to academy</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-10 sm:py-14">
        <div className={wide ? 'w-full max-w-[520px]' : 'w-full max-w-[420px]'}>{children}</div>
      </main>

      <footer className="relative z-10 px-5 pb-7">
        <div className="mx-auto max-w-6xl">
          {footer}
          <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-black/[0.07] pt-5 text-center sm:flex-row sm:text-left">
            <p className="text-[10.5px] text-[#86868b]">
              Demo project · not affiliated with Apple, Inc.
            </p>
            <div className="flex items-center gap-4 text-[10.5px] text-[#86868b]">
              <Link to="/about" className="transition hover:text-[#1d1d1f]">
                About
              </Link>
              <Link to="/about#disclaimer" className="transition hover:text-[#1d1d1f]">
                Disclaimer
              </Link>
              <Link to="/contact" className="transition hover:text-[#1d1d1f]">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
