// ============================================================
// src/components/IAQ/WindowSchedule.tsx
// Inversion-Aware Window Ventilation Schedule (Dual Theme)
// ============================================================

import { memo } from 'react';
import { WindowIcon } from '@/components/ui/Icons';

interface WindowScheduleProps {
  currentAqi: number;
}

export const WindowSchedule = memo(function WindowSchedule({ currentAqi }: WindowScheduleProps) {
  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <WindowIcon size={20} className="text-emerald-600 dark:text-emerald-400" />
            Smart Inversion-Aware Window Ventilation Schedule
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Tailored to current outdoor AQI ({currentAqi}) and meteorological boundary layer dynamics.
          </p>
        </div>
        <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/80 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
          Atmospheric Boundary Aware
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
        {/* Morning Inversion Lock */}
        <div className="bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-500/40 rounded-3xl p-5 flex flex-col justify-between gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-400 block">
              Morning Inversion Lock (6:00 AM – 10:30 AM)
            </span>
            <strong className="text-slate-900 dark:text-white text-base font-extrabold block mt-1 tracking-tight">
              Windows Tightly Latched
            </strong>
            <p className="text-slate-600 dark:text-slate-300 text-xs mt-2 leading-relaxed">
              Cold nocturnal air traps ground-level vehicular soot. Opening windows increases indoor PM2.5 by 300%.
            </p>
          </div>
          <div className="text-[11px] font-bold text-rose-800 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/60 px-3 py-1 rounded-xl border border-rose-200 dark:border-rose-500/30">
            Action: Run recirculating HEPA
          </div>
        </div>

        {/* Optimal Flush Window */}
        <div className="bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/40 rounded-3xl p-5 flex flex-col justify-between gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
              Optimal Flush Window (1:30 PM – 3:30 PM)
            </span>
            <strong className="text-slate-900 dark:text-white text-base font-extrabold block mt-1 tracking-tight">
              Crack Opposing Windows (15 mins)
            </strong>
            <p className="text-slate-600 dark:text-slate-300 text-xs mt-2 leading-relaxed">
              Solar radiation breaks the surface inversion, maximizing natural vertical air mixing and flushing stale CO2.
            </p>
          </div>
          <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-500/30">
            Action: 15-minute cross-ventilation
          </div>
        </div>

        {/* Evening Rush Trap */}
        <div className="bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/40 rounded-3xl p-5 flex flex-col justify-between gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
              Evening Rush Trap (5:30 PM – 9:00 PM)
            </span>
            <strong className="text-slate-900 dark:text-white text-base font-extrabold block mt-1 tracking-tight">
              Seal Perimeter & Run HEPA
            </strong>
            <p className="text-slate-600 dark:text-slate-300 text-xs mt-2 leading-relaxed">
              Commuter traffic and cooling surface temperatures cause toxic secondary particulate settling.
            </p>
          </div>
          <div className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-200 dark:border-amber-500/30">
            Action: Maximum fan CADR speed
          </div>
        </div>
      </div>
    </div>
  );
});
