import { useState } from 'react';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import { cn } from '../../lib/utils';

export function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  autoComplete = 'current-password',
  theme = 'light',
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  theme?: 'light' | 'dark';
}) {
  const [visible, setVisible] = useState(false);
  const light = theme === 'light';

  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          'mb-1.5 block text-[13px] font-medium',
          light ? 'text-[#1d1d1f]' : 'text-slate-300',
        )}
      >
        {label}
      </label>
      <div className="relative">
        <LockKeyhole
          className={cn(
            'pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2',
            light ? 'text-[#86868b]' : 'text-slate-500',
          )}
        />
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'w-full rounded-xl border py-3.5 pl-10 pr-12 text-[15px] transition focus:outline-none focus:ring-4',
            light
              ? 'border-[#d2d2d7] bg-white text-[#1d1d1f] placeholder:text-[#86868b] focus:border-[#0071e3] focus:ring-[#0071e3]/10'
              : 'border-white/10 bg-ink-900/80 text-white placeholder:text-slate-600 focus:border-neon-400/40 focus:ring-neon-400/10',
            error &&
              (light
                ? 'border-[#e30000] focus:border-[#e30000] focus:ring-[#e30000]/10'
                : 'border-rose-400/50 focus:border-rose-400/60 focus:ring-rose-400/10'),
          )}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className={cn(
            'absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg transition',
            light
              ? 'text-[#86868b] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]'
              : 'text-slate-500 hover:bg-white/5 hover:text-white',
          )}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className={cn('mt-1.5 text-xs', light ? 'text-[#e30000]' : 'text-rose-400')}
        >
          {error}
        </p>
      )}
    </div>
  );
}
