import { useState } from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import type { LessonCheck } from '../../lib/types';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export function LessonQuiz({ check }: { check: LessonCheck }) {
  const { t } = useApp();
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const correct = selected === check.answer;

  const reset = () => {
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-violet-400/15 bg-violet-500/[0.025]">
      <div className="border-b border-violet-400/10 px-5 py-3.5">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-violet-300/80">
          {t('courses.quiz')}
        </p>
      </div>
      <div className="p-5">
        <p className="font-display text-base font-medium leading-relaxed text-white">
          {check.question}
        </p>
        <div className="mt-4 space-y-2">
          {check.options.map((option, index) => {
            const isSelected = selected === index;
            const isAnswer = index === check.answer;
            const showCorrect = submitted && isAnswer;
            const showWrong = submitted && isSelected && !isAnswer;
            return (
              <button
                key={option}
                type="button"
                disabled={submitted}
                onClick={() => setSelected(index)}
                className={cn(
                  'flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left text-[12.5px] leading-snug transition',
                  showCorrect
                    ? 'border-neon-400/30 bg-neon-400/[0.07] text-neon-100'
                    : showWrong
                      ? 'border-rose-400/30 bg-rose-400/[0.06] text-rose-100'
                      : isSelected
                        ? 'border-violet-400/35 bg-violet-400/[0.07] text-white'
                        : 'border-white/[0.08] text-slate-400 hover:border-white/20 hover:text-slate-200',
                  submitted && 'cursor-default',
                )}
              >
                <span
                  className={cn(
                    'mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[9px]',
                    showCorrect
                      ? 'border-neon-400/40 bg-neon-400/15 text-neon-300'
                      : showWrong
                        ? 'border-rose-400/40 bg-rose-400/10 text-rose-300'
                        : isSelected
                          ? 'border-violet-400/40 text-violet-200'
                          : 'border-white/15 text-slate-600',
                  )}
                >
                  {showCorrect ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : showWrong ? (
                    <XCircle className="h-3 w-3" />
                  ) : (
                    String.fromCharCode(65 + index)
                  )}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {submitted ? (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <p
              className={cn(
                'text-[12px] leading-relaxed',
                correct ? 'text-neon-300/90' : 'text-amber-200/80',
              )}
            >
              {t(correct ? 'courses.quizCorrect' : 'courses.quizWrong', {
                explanation: check.explanation,
              })}
            </p>
            <button
              type="button"
              onClick={reset}
              className="flex shrink-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-500 transition hover:text-neon-300"
            >
              <RotateCcw className="h-3 w-3" />
              {t('courses.quizReset')}
            </button>
          </div>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="violet"
            className="mt-4"
            disabled={selected === null}
            onClick={() => setSubmitted(true)}
          >
            Check answer
          </Button>
        )}
      </div>
    </div>
  );
}
