// ============================================================
// src/components/Dashboard/AirTelemetryDashboard.tsx
// Modernized Hyperlocal AQI Telemetry, Heatmap & Sparklines (Dual Theme)
// Elite UI/UX Hierarchy, Asymmetric High-Density Layout & WCAG AA
// ============================================================

import { memo, useMemo } from 'react';
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
  TelemetryIcon,
} from '@/components/ui/Icons';

// AQI Spectrum segments for the 0-500 scale
const AQI_SPECTRUM_SEGMENTS = [
  { label: 'Good', range: '0-50', width: '10%', color: '#10b981' },
  { label: 'Mod', range: '51-100', width: '10%', color: '#f59e0b' },
  { label: 'USG', range: '101-150', width: '10%', color: '#f97316' },
  { label: 'Unhealthy', range: '151-200', width: '10%', color: '#ef4444' },
  { label: 'V.Unhealthy', range: '201-300', width: '20%', color: '#8b5cf6' },
  { label: 'Hazard', range: '301-500', width: '40%', color: '#991b1b' },
];

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

  // Calculate spectrum cursor percentage (0-100%)
  const spectrumPosition = Math.min(100, Math.max(0, (currentZone.aqi / 500) * 100));

  // Mesh overview calculations
  const { averageAqi, peakZone, cleanestZone } = useMemo(() => {
    if (!zones.length) return { averageAqi: 0, peakZone: currentZone, cleanestZone: currentZone };
    const avg = Math.round(zones.reduce((sum, z) => sum + z.aqi, 0) / zones.length);
    const sorted = [...zones].sort((a, b) => b.aqi - a.aqi);
    return {
      averageAqi: avg,
      peakZone: sorted[0],
      cleanestZone: sorted[sorted.length - 1],
    };
  }, [zones, currentZone]);

  return (
    <section aria-label="Hyperlocal AQI Telemetry Dashboard" className="flex flex-col gap-8 fade-in">
      {/* ============================================================
          TOP HERO KPI BANNER (Elite Typography & Asymmetric Layout)
          Clean architectural surface without artificial glowing blur orbs
          ============================================================ */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 relative border border-slate-200/90 dark:border-slate-800 shadow-sm transition-all duration-200">
        {/* Top Meta Bar: Sensor Station Identity & Telemetry Simulation Engine */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* Station Status & Location */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono font-bold tracking-wider text-[11px] uppercase">
                Station [STN-{currentZone.zoneId.replace('Z-', '')}]
              </span>
            </div>

            <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">•</span>

            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              <TelemetryIcon size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>{currentZone.zoneName}</span>
            </div>

            <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">•</span>

            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              Synced: {new Date(currentZone.lastUpdated).toLocaleTimeString()}
            </span>
          </div>

          {/* Telemetry Simulation Engine Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5 mr-1">
              <RefreshIcon size={13} className="text-slate-400" />
              Simulation Engine:
            </span>
            <button
              type="button"
              onClick={simulateSmogSpike}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-200 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500 active:scale-95 shadow-sm"
            >
              ⚡ Simulate Winter Smog Spike (+45 AQI)
            </button>
            <button
              type="button"
              onClick={simulateCleanDispersion}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-200 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-95 shadow-sm"
            >
              🍃 Simulate Solar Wind Cleansing (-50 AQI)
            </button>
          </div>
        </div>

        {/* Hero Asymmetric Data Visualization Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
          {/* Left Column (lg:col-span-5): Primary AQI Numeric Metric & Spectrum Scale */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <div>
              <span className="text-[11px] uppercase font-black tracking-widest text-slate-500 dark:text-slate-400 font-mono">
                Real-Time Air Quality Index
              </span>

              <div className="flex items-baseline gap-4 mt-2">
                <h1
                  className="text-6xl sm:text-7xl font-black tracking-tight font-mono-numbers transition-colors duration-300"
                  style={{ color: aqiColor }}
                >
                  {currentZone.aqi}
                </h1>

                <div className="flex flex-col">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm w-fit"
                    style={{
                      backgroundColor: `${aqiColor}15`,
                      borderColor: `${aqiColor}40`,
                      color: aqiColor,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: aqiColor }} />
                    {aqiCategory}
                  </div>

                  <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block font-medium">
                    Dominant Pollutant:{' '}
                    <strong className="text-slate-900 dark:text-slate-100 font-bold">
                      {currentZone.dominantPollutant}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            {/* EPA/NAAQ Multi-Segment AQI Spectrum Scale (0-500) */}
            <div className="flex flex-col gap-1.5 pt-2">
              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                <span>0 (Clean)</span>
                <span>500 (Hazardous)</span>
              </div>

              {/* Spectrum Track with Needle Marker */}
              <div className="relative w-full h-3 rounded-full overflow-visible bg-slate-200 dark:bg-slate-800 p-0.5">
                {/* 6 Segment Bands */}
                <div className="w-full h-full rounded-full flex overflow-hidden">
                  {AQI_SPECTRUM_SEGMENTS.map((seg) => (
                    <div
                      key={seg.label}
                      className="h-full"
                      style={{ width: seg.width, backgroundColor: seg.color }}
                      title={`${seg.label} (${seg.range})`}
                    />
                  ))}
                </div>

                {/* Needle Cursor */}
                <div
                  className="absolute -top-1.5 bottom-0 transition-all duration-300 pointer-events-none"
                  style={{ left: `${spectrumPosition}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="w-3.5 h-6 bg-slate-900 dark:bg-white border-2 border-white dark:border-slate-900 rounded-full shadow-md flex items-center justify-center">
                    <div className="w-1 h-2 rounded-full" style={{ backgroundColor: aqiColor }} />
                  </div>
                </div>
              </div>

              {/* Spectrum Legend Labels */}
              <div className="grid grid-cols-6 text-[9px] text-slate-500 dark:text-slate-400 font-mono text-center pt-1">
                {AQI_SPECTRUM_SEGMENTS.map((seg) => (
                  <span key={seg.label}>{seg.label}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (lg:col-span-7): High-Density Environmental Telemetry Matrix */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Meteorological Boundary Microclimate Card */}
            <div className="bg-slate-50/90 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                  Boundary Microclimate
                </span>
                <span className="text-slate-400">
                  <ThermometerIcon size={16} />
                </span>
              </div>

              <div>
                <div className="text-xl font-black text-slate-900 dark:text-white font-mono-numbers">
                  {currentZone.temperatureC}°C{' '}
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                    / {currentZone.humidityPercent}% RH
                  </span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex items-center gap-1.5 font-medium">
                  <WindIcon size={13} className="text-sky-500 dark:text-cyan-400 shrink-0" />
                  <span>
                    Surface Wind: <strong className="text-slate-900 dark:text-slate-100">{currentZone.windSpeedKmh} km/h</strong>
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800/60 font-mono">
                Dispersion:{' '}
                <span className={currentZone.windSpeedKmh < 5 ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-emerald-600 dark:text-emerald-400 font-bold'}>
                  {currentZone.windSpeedKmh < 5 ? 'Stagnant Airflow' : 'Active Ventilation'}
                </span>
              </div>
            </div>

            {/* Inversion Boundary Trap Dynamics Card */}
            <div
              className={`rounded-2xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                inversionStatus.isInversion
                  ? 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-500/40 text-amber-900 dark:text-amber-100 shadow-sm'
                  : 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-100 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider font-mono">
                  Inversion Dynamics
                </span>
                {inversionStatus.isInversion ? (
                  <AlertTriangleIcon size={16} className="text-amber-600 dark:text-amber-400" />
                ) : (
                  <CheckCircleIcon size={16} className="text-emerald-600 dark:text-emerald-400" />
                )}
              </div>

              <div>
                <div className="text-base font-black capitalize tracking-tight">
                  {inversionStatus.severity} Risk
                </div>
                <p className="text-[11px] text-slate-700 dark:text-slate-300 mt-1 leading-snug line-clamp-2">
                  {inversionStatus.rationale}
                </p>
              </div>

              <div className="text-[11px] font-mono opacity-80 pt-1 border-t border-current/20 flex items-center justify-between">
                <span>Thermal Cap:</span>
                <span className="font-bold">~420m AGL</span>
              </div>
            </div>

            {/* PM2.5 Exposure Load Comparison Card */}
            <div className="sm:col-span-2 bg-slate-50/90 dark:bg-slate-900/60 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-slate-600 dark:text-slate-400">
                  PM2.5 Mass Concentration:{' '}
                  <strong className="text-slate-900 dark:text-white font-mono">{currentZone.pm25} µg/m³</strong>
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                {Math.round((currentZone.pm25 / 15) * 10) / 10}x WHO 24h Guideline (15 µg/m³)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          PRIMARY VISUALIZATION GRID:
          Spatial Smog Heatmap (Left, 7-col) & Pollutant Sparklines (Right, 5-col)
          ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <SmogHeatmap
          zones={zones}
          selectedZoneId={selectedZoneId}
          onSelectZone={setSelectedZoneId}
        />

        {/* Pollutant Sparklines Panel */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-sky-500 dark:bg-cyan-400" aria-hidden="true" />
              <span className="text-[10px] font-black tracking-widest uppercase text-sky-600 dark:text-cyan-400 font-mono">
                GAS &amp; PARTICLE TELEMETRY
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Pollutant Trend Sparklines
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Multi-parameter gas and particle telemetry ({currentZone.zoneName})
            </p>
          </div>

          {/* High-Density Pollutant Telemetry List */}
          <div className="flex flex-col gap-2.5">
            {pollutantBreakdown.map((pollutant) => {
              const isExceeded = pollutant.current > pollutant.threshold;
              const ratio = Math.min(100, Math.round((pollutant.current / (pollutant.threshold * 1.5)) * 100));

              return (
                <div
                  key={pollutant.type}
                  className="bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-3 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  {/* Pollutant Name & Numeric Reading */}
                  <div className="min-w-[85px]">
                    <div className="flex items-baseline gap-1">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">
                        {pollutant.type}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                        ({pollutant.unit})
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono mt-0.5">
                      {pollutant.current}{' '}
                      <span className="text-[10px] text-slate-400 font-normal">/ {pollutant.threshold}</span>
                    </div>

                    {/* Micro Threshold Meter */}
                    <div className="w-16 h-1 rounded-full bg-slate-200 dark:bg-slate-800 mt-1 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isExceeded ? 'bg-rose-500' : 'bg-emerald-500'}`}
                        style={{ width: `${ratio}%` }}
                      />
                    </div>
                  </div>

                  {/* Sparkline Graphic */}
                  <div className="flex-1 flex justify-center px-1">
                    <Sparkline
                      values={pollutant.history}
                      color={isExceeded ? '#ef4444' : '#10b981'}
                      width={120}
                      height={30}
                      label={`${pollutant.type} 7-hour trend`}
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="text-right min-w-[75px]">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        pollutant.status === 'Hazardous' || pollutant.status === 'Critical'
                          ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/50'
                          : pollutant.status === 'Unhealthy' || pollutant.status === 'Moderate' || pollutant.status === 'High'
                          ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50'
                          : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50'
                      }`}
                    >
                      {pollutant.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chemical Kinetics & Smog Insight Briefing */}
          <div className="text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/80 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2.5">
            <SparklesIcon size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white font-bold">Atmospheric Aerosol Kinetics:</strong>{' '}
              Secondary PM2.5 surges when ambient humidity exceeds 75% in the presence of vehicle-emitted NO2 and sulfur precursors. Low boundary mixing traps pollutants within breathing elevation.
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          MONITORED URBAN SECTORS GRID
          Mesh summary telemetry and interactive focus cards
          ============================================================ */}
      <div className="flex flex-col gap-4">
        {/* Section Header with Mesh Aggregate Readouts */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Monitored Urban Sectors ({zones.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Click any sector to focus telemetry across the spatial monitoring mesh
            </p>
          </div>

          {/* Aggregate Telemetry Strip */}
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span>
              Mesh Avg:{' '}
              <strong className="text-slate-900 dark:text-white">{averageAqi} AQI</strong>
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>
              Peak:{' '}
              <strong className="text-rose-600 dark:text-rose-400">{peakZone.zoneName} ({peakZone.aqi})</strong>
            </span>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              Cleanest:{' '}
              <strong className="text-emerald-600 dark:text-emerald-400">{cleanestZone.zoneName} ({cleanestZone.aqi})</strong>
            </span>
          </div>
        </div>

        {/* 5-Column Responsive Sector Grid */}
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
