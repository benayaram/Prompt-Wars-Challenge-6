// ============================================================
// src/components/shared/ZoneCard.tsx
// High-tech Urban Zone Status Card (Light & Dark Theme)
// Per CODING_CONVENTIONS.md §4 & ACCESSIBILITY.md §7
// ============================================================

import { memo } from 'react';
import type { UrbanZone } from '@/types';
import { getAQIColor } from '@/lib/aqiCompute';
import { AlertTriangleIcon, CheckCircleIcon } from '@/components/ui/Icons';

interface ZoneCardProps {
  zone: UrbanZone;
  isSelected: boolean;
  onSelect: (zoneId: string) => void;
}

export const ZoneCard = memo(function ZoneCard({
  zone,
  isSelected,
  onSelect,
}: ZoneCardProps) {
  const aqiColor = getAQIColor(zone.aqi);

  return (
    <div
      role="article"
      aria-label={`${zone.zoneName} air quality status`}
      className={`rounded-3xl border p-4 flex flex-col justify-between gap-3.5 transition-all duration-200 relative overflow-hidden ${
        isSelected
          ? 'bg-emerald-50/90 dark:bg-slate-900/90 border-emerald-500 dark:border-emerald-400 shadow-xl shadow-emerald-500/10 dark:shadow-emerald-950/40 ring-1 ring-emerald-500/40'
          : 'bg-white dark:bg-[#0d1629]/70 border-slate-200/80 dark:border-slate-700/40 hover:border-slate-300 dark:hover:border-slate-600/80 hover:bg-slate-50/90 dark:hover:bg-[#0f1a30]/80 shadow-sm'
      }`}
    >
      {/* Ambient background glow corresponding to sector AQI */}
      <div
        className="absolute -right-12 -top-12 w-28 h-28 rounded-full blur-2xl opacity-15 pointer-events-none"
        style={{ backgroundColor: aqiColor }}
      />

      <div className="flex items-start justify-between gap-2 relative z-10">
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-sm tracking-tight leading-snug">
            {zone.zoneName}
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Primary: <span className="text-slate-800 dark:text-slate-200 font-semibold">{zone.dominantPollutant}</span>
          </p>
        </div>
        <div
          className="px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm font-mono"
          style={{
            backgroundColor: `${aqiColor}15`,
            borderColor: `${aqiColor}50`,
            borderWidth: '1px',
            color: aqiColor,
          }}
        >
          <span
            className="w-2 h-2 rounded-full shadow-sm"
            style={{ backgroundColor: aqiColor }}
            aria-hidden="true"
          />
          <span>AQI {zone.aqi}</span>
        </div>
      </div>

      {/* 3-Cell Metric Grid */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs py-2 px-2.5 bg-slate-50 dark:bg-slate-900/70 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 relative z-10">
        <div>
          <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">PM2.5</div>
          <div className="font-extrabold text-slate-900 dark:text-slate-100 font-mono mt-0.5">{zone.pm25} µg</div>
        </div>
        <div className="border-x border-slate-200 dark:border-slate-800">
          <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">Wind</div>
          <div className="font-extrabold text-slate-900 dark:text-slate-100 font-mono mt-0.5">{zone.windSpeedKmh} km/h</div>
        </div>
        <div>
          <div className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold tracking-wider">Temp</div>
          <div className="font-extrabold text-slate-900 dark:text-slate-100 font-mono mt-0.5">{zone.temperatureC}°C</div>
        </div>
      </div>

      {/* Atmospheric Inversion Trap Badge */}
      {zone.inversionRisk && (
        <div className="flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 rounded-xl border border-amber-300 dark:border-amber-500/40 relative z-10">
          <AlertTriangleIcon size={14} className="shrink-0 text-amber-600 dark:text-amber-400" />
          <span className="font-semibold text-[11px]">Atmospheric Inversion Trap</span>
        </div>
      )}

      {/* Telemetry Switch Button */}
      <button
        type="button"
        onClick={() => onSelect(zone.zoneId)}
        aria-pressed={isSelected}
        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 relative z-10 ${
          isSelected
            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20 border border-emerald-500/40'
            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-700/60'
        }`}
      >
        {isSelected ? (
          <>
            <CheckCircleIcon size={14} />
            <span>Active Telemetry</span>
          </>
        ) : (
          <span>Switch Telemetry</span>
        )}
      </button>
    </div>
  );
});
