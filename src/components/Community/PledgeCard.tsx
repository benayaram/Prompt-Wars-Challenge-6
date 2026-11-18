// ============================================================
// src/components/Community/PledgeCard.tsx
// Community Action Pledge Card (Dual Theme Support)
// ============================================================

import { memo } from 'react';
import type { CommunityPledge } from '@/types';
import { CheckCircleIcon, SparklesIcon } from '@/components/ui/Icons';

interface PledgeCardProps {
  pledge: CommunityPledge;
  onToggle: (id: string) => void;
  pledgedLabel: string;
  pledgeNowLabel: string;
}

export const PledgeCard = memo(function PledgeCard({
  pledge,
  onToggle,
  pledgedLabel,
  pledgeNowLabel,
}: PledgeCardProps) {
  const progress = Math.min(
    100,
    Math.round((pledge.currentParticipants / pledge.targetParticipants) * 100)
  );

  return (
    <div
      className={`p-6 rounded-3xl border flex flex-col justify-between gap-5 transition-all duration-200 relative overflow-hidden ${
        pledge.userPledged
          ? 'glass-panel-elevated border-emerald-400 dark:border-emerald-400/80 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/40'
          : 'glass-panel hover:border-slate-300 dark:hover:border-slate-600/80'
      }`}
    >
      {/* Subtle ambient glow when user pledged */}
      {pledge.userPledged && (
        <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
      )}

      <div>
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight leading-snug">
            {pledge.title}
          </h4>
          {pledge.userPledged && (
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/50 flex items-center gap-1 shrink-0">
              <CheckCircleIcon size={12} className="text-emerald-600 dark:text-emerald-400" />
              <span>{pledgedLabel}</span>
            </span>
          )}
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
          {pledge.impactDescription}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Participation: <strong className="text-slate-900 dark:text-white font-mono">{pledge.currentParticipants}</strong> /{' '}
            {pledge.targetParticipants} households
          </span>
          <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{progress}%</span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-300 dark:border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={pledge.currentParticipants}
            aria-valuemin={0}
            aria-valuemax={pledge.targetParticipants}
            aria-label={`${pledge.title} progress`}
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800/80 mt-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <SparklesIcon size={12} className="text-emerald-600 dark:text-emerald-400" />
            <span>
              Est. Relief: <strong className="text-slate-700 dark:text-slate-200 font-mono">~{pledge.estimatedEmissionReductionKg} kg CO₂ / wk</strong>
            </span>
          </span>

          <button
            type="button"
            onClick={() => onToggle(pledge.id)}
            aria-pressed={pledge.userPledged}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
              pledge.userPledged
                ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-500/20 border border-emerald-400/40'
            }`}
          >
            {pledge.userPledged ? 'Cancel Pledge' : pledgeNowLabel}
          </button>
        </div>
      </div>
    </div>
  );
});
