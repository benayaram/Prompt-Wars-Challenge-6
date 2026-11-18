// ============================================================
// src/components/ui/Skeleton.tsx & EmptyState.tsx
// Loading States and Empty States
// ============================================================

import type { HTMLAttributes, ReactNode } from 'react';

export function Skeleton({
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={`skeleton-shimmer rounded-xl bg-slate-800/40 ${className}`}
      {...props}
    />
  );
}

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-slate-700/60 bg-slate-900/40 my-4">
      {icon && <div className="p-3 rounded-2xl bg-slate-800/60 text-emerald-400 mb-3">{icon}</div>}
      <h4 className="text-base font-bold text-white tracking-tight">{title}</h4>
      <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4 leading-relaxed">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
