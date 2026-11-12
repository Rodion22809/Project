import { AppleLogo } from '../ui/AppleLogo';
import { buttonStyles } from '../ui/Button';
import type { ButtonHTMLAttributes } from 'react';

export function AppleContinueButton({
  children = 'Continue with Apple',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children?: string }) {
  return (
    <button
      type="button"
      className={buttonStyles(
        'apple',
        'lg',
        `w-full py-4 text-[12px] font-semibold uppercase tracking-[0.16em] ${className ?? ''}`,
      )}
      {...props}
    >
      <AppleLogo className="h-[17px] w-[17px]" />
      {children}
    </button>
  );
}
