import { useEffect, useState } from 'react';
import { RotateCcw, TerminalSquare } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface TerminalLine {
  text: string;
  tone?: 'command' | 'output' | 'success' | 'muted';
}

export function Terminal({
  title,
  lines,
  footer,
  className,
}: {
  title: string;
  lines: TerminalLine[];
  footer?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(reduce ? lines.length : 0);

  useEffect(() => {
    if (reduce) {
      setVisible(lines.length);
      return;
    }
    setVisible(0);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisible(index);
      if (index >= lines.length) window.clearInterval(timer);
    }, 460);
    return () => window.clearInterval(timer);
  }, [lines, reduce]);

  const replay = () => {
    setVisible(0);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setVisible(index);
      if (index >= lines.length) window.clearInterval(timer);
    }, 460);
  };

  return (
    <div
      className={cn(
        'scanline overflow-hidden rounded-2xl border border-white/[0.08] bg-[#06090D]/95 terminal-shadow',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-rose-400/70" />
            <span className="h-2 w-2 rounded-full bg-amber-400/70" />
            <span className="h-2 w-2 rounded-full bg-neon-400/70" />
          </span>
          <span className="ml-2 flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
            <TerminalSquare className="h-3 w-3" />
            {title}
          </span>
        </div>
        <button
          type="button"
          onClick={replay}
          className="flex h-6 w-6 items-center justify-center rounded-md text-slate-600 transition hover:bg-white/5 hover:text-neon-300"
          aria-label="Replay terminal animation"
        >
          <RotateCcw className="h-3 w-3" />
        </button>
      </div>
      <div className="relative min-h-[268px] px-5 py-5 font-mono text-[11.5px] leading-relaxed sm:text-xs">
        <div className="space-y-2.5">
          {lines.map((line, index) => {
            const shown = index < visible;
            const tone =
              line.tone === 'command'
                ? 'text-slate-100'
                : line.tone === 'success'
                  ? 'text-neon-300'
                  : line.tone === 'muted'
                    ? 'text-slate-600'
                    : 'text-slate-400';
            return (
              <div
                key={`${line.text}-${index}`}
                className={cn(
                  'transition-all duration-300',
                  shown ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
                  tone,
                )}
              >
                {line.text || '\u00A0'}
                {shown && index === Math.min(visible, lines.length) - 1 && (
                  <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-neon-400/80 animate-blink" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      {footer && (
        <div className="border-t border-white/[0.06] px-5 py-3 font-mono text-[9.5px] uppercase tracking-[0.14em] text-slate-600">
          {footer}
        </div>
      )}
    </div>
  );
}
