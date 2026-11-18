// ============================================================
// src/components/IAQ/DIYHackGrid.tsx
// Modern Low-Cost & DIY Air Purification Hack Cards (Dual Theme)
// ============================================================

import { memo } from 'react';
import { DIY_HACKS } from '@/lib/constants';
import { LightbulbIcon, SparklesIcon } from '@/components/ui/Icons';

export const DIYHackGrid = memo(function DIYHackGrid() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <LightbulbIcon size={20} className="text-amber-500" />
          Low-Cost & DIY Indoor Air Purification Hacks
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Peer-reviewed open-source solutions proven to deliver high CADR at minimal household expense.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {DIY_HACKS.map((hack) => (
          <div
            key={hack.id}
            className="glass-panel glass-panel-interactive rounded-3xl p-6 flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight leading-snug">
                  {hack.title}
                </h4>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 shrink-0">
                  {hack.costRating}
                </span>
              </div>

              <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Clean Air Output: {hack.cadrDelivery}</span>
              </div>

              <div className="text-xs text-slate-700 dark:text-slate-300 mt-3 p-3 bg-slate-50 dark:bg-slate-900/70 rounded-2xl border border-slate-200 dark:border-slate-800">
                <strong className="text-slate-900 dark:text-slate-100">Materials:</strong> {hack.materials}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                {hack.instructions}
              </p>
            </div>

            <div className="pt-3.5 border-t border-slate-200 dark:border-slate-800/80 text-xs text-sky-700 dark:text-cyan-300 font-medium flex items-center gap-2">
              <SparklesIcon size={14} className="text-sky-600 dark:text-cyan-400 shrink-0" />
              <span>{hack.efficiencyBonus}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
