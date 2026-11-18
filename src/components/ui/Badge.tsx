// ============================================================
// src/components/ui/Badge.tsx
// Status Pill & Metric Badge Component
// ============================================================

import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant =
  | 'emerald'
  | 'cyan'
  | 'amber'
  | 'rose'
  | 'violet'
  | 'slate'
  | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  hasDot?: boolean;
  isPulsing?: boolean;
  children: ReactNode;
}

export function Badge({
  variant = 'emerald',
  hasDot = false,
  isPulsing = false,
  className = '',
  children,
  ...props
}: BadgeProps) {
  const variantStyles: Record<BadgeVariant, { bg: string; text: string; border: string; dot: string }> = {
    emerald: {
      bg: 'bg-emerald-950/70',
      text: 'text-emerald-300',
      border: 'border-emerald-500/40',
      dot: 'bg-emerald-400',
    },
    cyan: {
      bg: 'bg-cyan-950/70',
      text: 'text-cyan-300',
      border: 'border-cyan-500/40',
      dot: 'bg-cyan-400',
    },
    amber: {
      bg: 'bg-amber-950/70',
      text: 'text-amber-300',
      border: 'border-amber-500/40',
      dot: 'bg-amber-400',
    },
    rose: {
      bg: 'bg-rose-950/70',
      text: 'text-rose-300',
      border: 'border-rose-500/40',
      dot: 'bg-rose-400',
    },
    violet: {
      bg: 'bg-violet-950/70',
      text: 'text-violet-300',
      border: 'border-violet-500/40',
      dot: 'bg-violet-400',
    },
    slate: {
      bg: 'bg-slate-800/80',
      text: 'text-slate-300',
      border: 'border-slate-700/60',
      dot: 'bg-slate-400',
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-slate-300',
      border: 'border-slate-700',
      dot: 'bg-slate-400',
    },
  };

  const current = variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-tight border ${current.bg} ${current.text} ${current.border} ${className}`}
      {...props}
    >
      {hasDot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${current.dot} ${
            isPulsing ? 'animate-pulse' : ''
          }`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
