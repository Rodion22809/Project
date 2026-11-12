import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AccordionItem {
  q: string;
  a: string;
}

export function Accordion({
  items,
  className,
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn('divide-y divide-white/[0.07] border-y border-white/[0.07]', className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="group flex w-full items-start justify-between gap-6 py-5 text-left"
            >
              <span
                className={cn(
                  'font-display text-[15px] font-medium transition sm:text-base',
                  isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white',
                )}
              >
                {item.q}
              </span>
              <span
                className={cn(
                  'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition',
                  isOpen
                    ? 'border-neon-400/40 bg-neon-400/10 text-neon-300'
                    : 'border-white/10 text-slate-500 group-hover:border-white/20 group-hover:text-slate-300',
                )}
              >
                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 pr-10 text-sm leading-relaxed text-slate-400">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
