import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'violet' | 'danger' | 'apple';
type Size = 'sm' | 'md' | 'lg' | 'icon';

const base =
  'inline-flex select-none items-center justify-center gap-2 rounded-xl font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-45 active:translate-y-[0.5px]';

const variants: Record<Variant, string> = {
  primary:
    'bg-neon-400 text-ink-950 shadow-neon-sm hover:bg-neon-300 hover:shadow-neon focus-visible:outline-neon-300',
  secondary:
    'border border-white/10 bg-white/[0.03] text-slate-100 hover:border-neon-400/30 hover:bg-neon-400/[0.06] hover:text-white',
  ghost: 'text-slate-400 hover:bg-white/[0.05] hover:text-white',
  violet:
    'border border-violet-400/30 bg-violet-500/15 text-violet-200 hover:bg-violet-500/25 hover:text-white',
  danger:
    'border border-rose-400/25 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:text-rose-100',
  apple:
    'rounded-xl bg-black text-white shadow-[0_1px_3px_rgba(0,0,0,0.18)] hover:bg-[#1d1d1f] active:bg-[#000]',
};

const sizes: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-[15px]',
  icon: 'h-9 w-9 p-0',
};

export function buttonStyles(variant: Variant = 'primary', size: Size = 'md', extra = ''): string {
  return cn(base, variants[variant], sizes[size], extra);
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonStyles(variant, size, className)}
      {...props}
    />
  );
});
