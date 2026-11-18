// ============================================================
// src/components/Routine/RoutineTimeline.tsx
// Modernized Hour-by-Hour Exposure Schedule Timeline (Dual Theme)
// ============================================================

import { memo } from 'react';
import type { DailyRoutinePlan } from '@/types';
import { RoutineIcon } from '@/components/ui/Icons';

interface RoutineTimelineProps {
  routinePlan: DailyRoutinePlan;
  zoneName: string;
}

export const RoutineTimeline = memo(function RoutineTimeline({
  routinePlan,
  zoneName,
}: RoutineTimelineProps) {
  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <RoutineIcon size={20} className="text-emerald-600 dark:text-emerald-400" />
            Hour-by-Hour Exposure & Routine Timeline
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Tailored for {routinePlan.persona} in {zoneName}
          </p>
        </div>
        <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/80 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          24-Hour Predictive Window
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {routinePlan.hourlySchedule.map((slot) => {
          const isOutdoor = slot.recommendation === 'safe-outdoor';
          const isIndoorOnly = slot.recommendation === 'indoor-only';

          return (
            <div
              key={slot.hour}
              className={`p-4 rounded-2xl border transition-all duration-150 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isIndoorOnly
                  ? 'bg-rose-50/70 dark:bg-rose-950/20 border-rose-200 dark:border-rose-500/30 hover:border-rose-300'
                  : isOutdoor
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-500/40 hover:border-emerald-300'
                  : 'bg-slate-50/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {/* Time & Mode Pill */}
              <div className="flex items-center gap-3.5 min-w-[150px]">
                <span className="text-base font-black text-slate-900 dark:text-white font-mono tracking-tight">
                  {slot.timeLabel}
                </span>
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    isIndoorOnly
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-500/40'
                      : isOutdoor
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40'
                      : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40'
                  }`}
                >
                  {slot.recommendation.replace('-', ' ')}
                </span>
              </div>

              {/* Activity & Advisory */}
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm tracking-tight">{slot.activity}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{slot.healthImpactNotes}</p>
              </div>

              {/* Predicted AQI & Inversion Likelihood */}
              <div className="flex items-center gap-4 text-xs min-w-[180px] justify-end border-t md:border-t-0 pt-2 md:pt-0 border-slate-200 dark:border-slate-800">
                <div className="text-right">
                  <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                    Predicted AQI
                  </div>
                  <div className="font-extrabold text-slate-900 dark:text-white font-mono mt-0.5">{slot.predictedAQI}</div>
                </div>
                <div className="text-right pl-3 border-l border-slate-200 dark:border-slate-800">
                  <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                    Inversion Risk
                  </div>
                  <div
                    className={`font-black capitalize mt-0.5 ${
                      slot.inversionLikelihood === 'high' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {slot.inversionLikelihood}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
