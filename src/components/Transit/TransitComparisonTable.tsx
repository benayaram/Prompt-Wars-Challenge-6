// ============================================================
// src/components/Transit/TransitComparisonTable.tsx
// Multi-Modal Transit Comparison Table (Dual Theme Support)
// ============================================================

import { memo } from 'react';
import type { TransitRouteComparison } from '@/types';

interface TransitComparisonTableProps {
  modalComparisons: TransitRouteComparison[];
}

export const TransitComparisonTable = memo(function TransitComparisonTable({
  modalComparisons,
}: TransitComparisonTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 shadow-inner">
      <table className="w-full text-left text-xs text-slate-800 dark:text-slate-200 border-collapse">
        <caption className="sr-only">
          Comparison of transit modes by duration, PM2.5 exposure dose, carbon emissions, and health risk
        </caption>
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 uppercase text-[10px] font-extrabold tracking-wider">
            <th scope="col" className="py-3.5 px-4">Transit Mode</th>
            <th scope="col" className="py-3.5 px-4">Duration</th>
            <th scope="col" className="py-3.5 px-4">PM2.5 Inhaled Dose</th>
            <th scope="col" className="py-3.5 px-4">CO₂ Footprint</th>
            <th scope="col" className="py-3.5 px-4">Health Risk</th>
            <th scope="col" className="py-3.5 px-4">Clinical Advisory</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800/70">
          {modalComparisons.map((item) => (
            <tr
              key={item.mode}
              className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors duration-150 ${
                item.isRecommended ? 'bg-emerald-50/70 dark:bg-emerald-950/30 font-semibold' : ''
              }`}
            >
              <td className="py-4 px-4 flex items-center gap-2.5">
                {item.isRecommended && (
                  <span
                    className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"
                    title="Recommended Option"
                    aria-hidden="true"
                  />
                )}
                <span className="text-slate-900 dark:text-white font-extrabold tracking-tight">{item.modeLabel}</span>
              </td>
              <td className="py-4 px-4 whitespace-nowrap font-mono text-slate-700 dark:text-slate-300">
                {item.durationMinutes} mins
              </td>
              <td className="py-4 px-4 font-mono font-extrabold">
                <span
                  className={
                    item.pm25ExposureDoseUg > 40
                      ? 'text-rose-600 dark:text-rose-400'
                      : item.pm25ExposureDoseUg > 20
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }
                >
                  {item.pm25ExposureDoseUg} µg
                </span>
              </td>
              <td className="py-4 px-4 whitespace-nowrap font-mono text-slate-700 dark:text-slate-300">
                {item.co2EmissionsKg} kg
              </td>
              <td className="py-4 px-4 whitespace-nowrap">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                    item.healthRiskRating === 'severe'
                      ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-500/40'
                      : item.healthRiskRating === 'moderate'
                      ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-500/40'
                      : item.healthRiskRating === 'low'
                      ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-500/40'
                      : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-500/40'
                  }`}
                >
                  {item.healthRiskRating}
                </span>
              </td>
              <td className="py-4 px-4 text-slate-600 dark:text-slate-300 max-w-xs leading-relaxed text-[11px]">
                {item.advisory}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
