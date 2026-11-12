import { useState } from 'react';
import { Check, Copy, TerminalSquare } from 'lucide-react';
import { copyToClipboard } from '../../lib/utils';

export function CodeBlock({
  code,
  label,
  variant = 'dark',
}: {
  code: string;
  label?: string;
  variant?: 'dark' | 'light';
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await copyToClipboard(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const light = variant === 'light';

  return (
    <div
      className={
        light
          ? 'my-7 overflow-hidden rounded-xl border border-[#d2d2d7] bg-[#f5f5f7]'
          : 'my-7 overflow-hidden rounded-xl border border-white/[0.08] bg-[#06090D]'
      }
    >
      <div
        className={
          light
            ? 'flex items-center justify-between border-b border-[#d2d2d7] px-4 py-2'
            : 'flex items-center justify-between border-b border-white/[0.06] px-4 py-2'
        }
      >
        <span
          className={
            light
              ? 'flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#6e6e73]'
              : 'flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600'
          }
        >
          <TerminalSquare className="h-3 w-3" />
          {label ?? 'terminal'}
        </span>
        <button
          type="button"
          onClick={onCopy}
          className={
            light
              ? 'flex items-center gap-1 rounded px-1.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#6e6e73] transition hover:bg-black/5 hover:text-[#1d1d1f]'
              : 'flex items-center gap-1 rounded px-1.5 py-1 font-mono text-[9px] uppercase tracking-wider text-slate-600 transition hover:bg-white/5 hover:text-neon-300'
          }
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[11.5px] leading-[1.8] text-slate-300 sm:text-xs">
        <code>{code}</code>
      </pre>
    </div>
  );
}
