// ============================================================
// src/components/Transit/TransitPlanner.tsx
// Multi-Modal Clean-Corridor Pathfinder (Dual Theme Support)
// Per PROBLEM_ALIGNMENT.md §1.3 & CODING_CONVENTIONS.md §4
// ============================================================

import { memo } from 'react';
import { useExposureRouting } from '@/hooks/useExposureRouting';
import { useAppContext } from '@/context/AppContext';
import { TransitComparisonTable } from './TransitComparisonTable';
import { TransitIcon, SparklesIcon } from '@/components/ui/Icons';

export const TransitPlanner = memo(function TransitPlanner() {
  const { selectedZone } = useAppContext();
  const {
    nodes,
    originId,
    destinationId,
    setOrigin,
    setDestination,
    lowestExposureResult,
    pathNodes,
    routeDistanceKm,
    modalComparisons,
  } = useExposureRouting();

  return (
    <section aria-label="Low-Emission Commute & Transit Planner" className="flex flex-col gap-8 fade-in">
      {/* Route Pathfinder Selector */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-100 dark:bg-cyan-950/80 text-sky-800 dark:text-cyan-300 border border-sky-300 dark:border-cyan-500/40 flex items-center gap-1">
              <SparklesIcon size={12} className="text-sky-600 dark:text-cyan-400" />
              DIJKSTRA CLEAN-AIR PATHFINDER
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Low-Exposure Commute & Transit Path Optimizer
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Dijkstra-powered algorithm identifying subterranean and clean-air corridors to bypass surface smog hotspots.
          </p>
        </div>

        {/* Origin / Destination Waypoint Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="origin-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Commute Origin Waypoint:
            </label>
            <div className="relative">
              <select
                id="origin-select"
                value={originId}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer shadow-inner"
              >
                {nodes.map((node) => (
                  <option key={node.id} value={node.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {node.name} {node.isCleanCorridor ? '(Clean Corridor)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="destination-select" className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Destination Waypoint:
            </label>
            <div className="relative">
              <select
                id="destination-select"
                value={destinationId}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer shadow-inner"
              >
                {nodes.map((node) => (
                  <option key={node.id} value={node.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {node.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lowest Exposure Path Breadcrumbs */}
        {lowestExposureResult && (
          <div className="bg-slate-50/80 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Optimal Clean-Air Trajectory (Dijkstra Min-Exposure Cost: {lowestExposureResult.totalExposure})
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Distance: <strong className="text-slate-900 dark:text-white font-mono">{routeDistanceKm} km</strong>
              </span>
            </div>

            <nav aria-label="Lowest pollution route steps">
              <ol className="flex flex-wrap items-center gap-2.5 text-xs">
                {pathNodes.map((n, idx) => (
                  <li key={n.id} className="flex items-center gap-2.5">
                    <span
                      className={`px-3.5 py-2 rounded-xl font-bold border flex items-center gap-2 shadow-sm ${
                        n.isMetro
                          ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-200 border-sky-300 dark:border-sky-500/50'
                          : n.isCleanCorridor
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-500/50'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      <span className="text-sm">{n.isMetro ? '🚇' : n.isCleanCorridor ? '🌲' : '📍'}</span>
                      <span>{n.name}</span>
                    </span>
                    {idx < pathNodes.length - 1 && (
                      <span className="text-slate-400 dark:text-slate-600 font-extrabold text-sm" aria-hidden="true">
                        ➔
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        )}
      </div>

      {/* Multi-Modal Comparison Table */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <TransitIcon size={20} className="text-sky-600 dark:text-cyan-400" />
              Multi-Modal Exposure & Carbon Comparison
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Evaluated against current ambient air quality in {selectedZone.zoneName} (AQI {selectedZone.aqi})
            </p>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-300 font-mono bg-slate-100 dark:bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            Trip Length: <strong className="text-slate-900 dark:text-white">{routeDistanceKm} km</strong>
          </span>
        </div>

        <TransitComparisonTable modalComparisons={modalComparisons} />
      </div>
    </section>
  );
});
