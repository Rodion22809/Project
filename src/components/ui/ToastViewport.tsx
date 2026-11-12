import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';

const tones = {
  success: { border: 'border-neon-400/25', icon: 'text-neon-300', Icon: CheckCircle2 },
  error: { border: 'border-rose-400/25', icon: 'text-rose-300', Icon: TriangleAlert },
  info: { border: 'border-violet-400/25', icon: 'text-violet-300', Icon: Info },
};

export function ToastViewport() {
  const { toasts, removeToast } = useApp();
  return (
    <div
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[120] flex flex-col items-center gap-2 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:items-end"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const tone = tones[toast.tone];
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className={cn(
                'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border bg-ink-800/95 px-4 py-3.5 shadow-panel backdrop-blur-md',
                tone.border,
              )}
            >
              <tone.Icon className={cn('mt-0.5 h-4 w-4 shrink-0', tone.icon)} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">{toast.title}</p>
                {toast.description && (
                  <p className="mt-0.5 truncate text-xs text-slate-400">{toast.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="mt-0.5 text-slate-500 transition hover:text-white"
                aria-label="Dismiss notification"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
