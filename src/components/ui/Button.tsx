// ============================================================
// src/components/ui/Button.tsx
// Unified Design-System Button Component
// Per COMPONENT REDESIGN §7 & ACCESSIBILITY §19
// ============================================================

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'ai';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    className = '',
    children,
    ...props
  },
  ref
) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-bold tracking-tight rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const sizeStyles: Record<ButtonSize, string> = {
    xs: 'px-2.5 py-1 text-xs gap-1.5',
    sm: 'px-3.5 py-1.5 text-xs gap-2',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-400 hover:to-teal-500 shadow-md shadow-emerald-950/50 border border-emerald-400/30 hover:shadow-emerald-500/20 hover:shadow-lg',
    secondary:
      'bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700/60 shadow-sm',
    outline:
      'bg-transparent text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 hover:bg-slate-800/40',
    ghost:
      'bg-transparent text-slate-400 hover:text-white hover:bg-slate-800/50',
    danger:
      'bg-gradient-to-r from-rose-900/80 to-red-900/80 text-rose-100 hover:from-rose-800 hover:to-red-800 border border-rose-500/40 shadow-sm shadow-rose-950/40',
    ai:
      'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 shadow-lg shadow-teal-950/50 border border-cyan-400/30 hover:shadow-cyan-500/20',
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0"
          aria-hidden="true"
        />
      ) : (
        leftIcon && <span className="shrink-0 leading-none">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0 leading-none">{rightIcon}</span>}
    </button>
  );
});
