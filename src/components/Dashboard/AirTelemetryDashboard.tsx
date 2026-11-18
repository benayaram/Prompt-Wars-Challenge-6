// ============================================================
// src/components/Dashboard/AirTelemetryDashboard.tsx
// Modernized Hyperlocal AQI Telemetry, Heatmap & Sparklines (Dual Theme)
// Per ACCESSIBILITY.md §3, EFFICIENCY.md §3 & UX DASHBOARD §8
// ============================================================

import { memo } from 'react';
import { useAirAnalytics } from '@/hooks/useAirAnalytics';
import { Sparkline } from '@/components/shared/Sparkline';
import { ZoneCard } from '@/components/shared/ZoneCard';
import { SmogHeatmap } from './SmogHeatmap';
import {
  ThermometerIcon,
  WindIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  RefreshIcon,
  SparklesIcon,
} from '@/components/ui/Icons';

export const AirTelemetryDashboard = memo(function AirTelemetryDashboard() {
  const {
    zones,
    currentZone,
    selectedZoneId,
    setSelectedZoneId,
    aqiCategory,
    aqiColor,
    inversionStatus,
    pollutantBreakdown,
    simulateSmogSpike,
    simulateCleanDispersion,
  } = useAirAnalytics();

  return (
    <section aria-label="Hyperlocal AQI Telemetry Dashboard" className="flex flex-col gap-8 fade-in">
      {/* Top Hero KPI Banner with Atmospheric Ambient Glow */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Dynamic Atmospheric Glow Backdrop */}
        <div
          className="absolute -right-24 -top-24 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: aqiColor }}
        />
        <div
          className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none bg-emerald-500"
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Left: Zone & Primary AQI Metric */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
                Selected Hyperlocal Sector
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{currentZone.zoneName}</span>
            </div>

            <div className="flex items-baseline gap-4 mt-3">
              <h1
                className="text-6xl sm:text-7xl font-black tracking-tight font-mono-numbers transition-colors duration-300"
                style={{ color: aqiColor }}
              >
                {currentZone.aqi}
              </h1>
              <div>
                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white block leading-snug tracking-tight">
                  {aqiCategory}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 block">
                  Dominant Pollutant:{' '}
                  <strong className="text-slate-800 dark:text-slate-100 font-bold">{currentZone.dominantPollutant}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Meteorological & Inversion Boundary Risk Widgets */}
          <div className="flex flex-col sm:flex-row gap-3.5">
            {/* Meteorological Sensor Card */}
            <div className="glass-panel rounded-2xl p-4 min-w-[210px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  Boundary Layer
                </span>
                <span className="text-slate-400">
                  <ThermometerIcon size={16} />
                </span>
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-1 font-mono-numbers">
                {currentZone.temperatureC}°C{' '}
                <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/ {currentZone.humidityPercent}% RH</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <WindIcon size={14} className="text-sky-500 dark:text-cyan-400 shrink-0" />
                <span>
                  Wind: <strong className="text-slate-800 dark:text-slate-200">{currentZone.windSpeedKmh} km/h</strong>
                </span>
              </div>
            </div>

            {/* Inversion Risk Card */}
            <div
              className={`rounded-2xl p-4 min-w-[240px] border transition-all flex flex-col justify-between ${
                inversionStatus.isInversion
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-500/50 text-amber-800 dark:text-amber-200 shadow-sm'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/50 text-emerald-800 dark:text-emerald-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider">Inversion Risk</span>
                {inversionStatus.isInversion ? (
                  <AlertTriangleIcon size={16} className="text-amber-600 dark:text-amber-400" />
                ) : (
                  <CheckCircleIcon size={16} className="text-emerald-600 dark:text-emerald-400" />
                )}
              </div>
              <div className="text-base font-black mt-1 capitalize tracking-tight">
                {inversionStatus.severity} Risk
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-snug line-clamp-2">
                {inversionStatus.rationale}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Telemetry Simulation Controls */}
        <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-bold flex items-center gap-1.5">
              <RefreshIcon size={13} className="text-slate-500" />
              Telemetry Simulation Engine:
            </span>
            <button
              type="button"
              onClick={simulateSmogSpike}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-50 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-500/50 text-rose-700 dark:text-rose-200 hover:bg-rose-100 dark:hover:bg-rose-900/80 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              ⚡ Simulate Winter Smog Spike (+45 AQI)
            </button>
            <button
              type="button"
              onClick={simulateCleanDispersion}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-500/50 text-emerald-700 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              🍃 Simulate Solar Wind Cleansing (-50 AQI)
            </button>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            Updated: {new Date(currentZone.lastUpdated).toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Primary Data Grid: Spatial Smog Heatmap (Left) & Pollutant Sparklines (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <SmogHeatmap
          zones={zones}
          selectedZoneId={selectedZoneId}
          onSelectZone={setSelectedZoneId}
        />

        {/* Pollutant Sparklines Panel */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 dark:bg-cyan-400" aria-hidden="true" />
              Pollutant Trend Sparklines
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Multi-parameter gas and particle telemetry ({currentZone.zoneName})
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {pollutantBreakdown.map((pollutant) => (
              <div
                key={pollutant.type}
                className="bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="min-w-[90px]">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">
                      {pollutant.type}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">({pollutant.unit})</span>
                  </div>
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5 font-mono">
                    {pollutant.current}{' '}
                    <span className="text-[10px] text-slate-400 font-normal">/ {pollutant.threshold}</span>
                  </div>
                </div>

                <div className="flex-1 flex justify-center">
                  <Sparkline
                    values={pollutant.history}
                    color={pollutant.current > pollutant.threshold ? '#ef4444' : '#10b981'}
                    width={130}
                    height={32}
                    label={`${pollutant.type} 7-hour trend`}
                  />
                </div>

                <div className="text-right min-w-[70px]">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      pollutant.status === 'Hazardous' || pollutant.status === 'Critical'
                        ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/40'
                        : pollutant.status === 'Unhealthy' || pollutant.status === 'Moderate'
                        ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/40'
                        : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/40'
                    }`}
                  >
                    {pollutant.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50/80 dark:bg-slate-900/80 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5">
            <SparklesIcon size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white">Winter Smog Insight:</strong> Secondary PM2.5 formation surges when ambient humidity exceeds 75% in the presence of vehicle-emitted NO2 and sulfur precursors.
            </div>
          </div>
        </div>
      </div>

      {/* Monitored Urban Sectors Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Monitored Urban Sectors ({zones.length})
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">Click any sector to focus telemetry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {zones.map((zone) => (
            <ZoneCard
              key={zone.zoneId}
              zone={zone}
              isSelected={zone.zoneId === selectedZoneId}
              onSelect={setSelectedZoneId}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
