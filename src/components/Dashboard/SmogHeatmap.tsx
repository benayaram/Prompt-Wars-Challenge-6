// ============================================================
// src/components/Dashboard/SmogHeatmap.tsx
// High-Fidelity Spatial Smog Dispersion Heatmap (Dual Theme)
// WCAG SC 1.1.1 Twin Representation & Native SVG
// ============================================================

import { memo } from 'react';
import type { UrbanZone } from '@/types';
import { getAQIColor } from '@/lib/aqiCompute';
import { useAppContext } from '@/context/AppContext';

interface SmogHeatmapProps {
  zones: UrbanZone[];
  selectedZoneId: string;
  onSelectZone: (zoneId: string) => void;
}

const NODE_COORDINATES = [
  { cx: 300, cy: 160 }, // Central Sector
  { cx: 160, cy: 75 },  // North Industrial
  { cx: 450, cy: 90 },  // Residential Sector
  { cx: 460, cy: 235 }, // Riverside Sector
  { cx: 170, cy: 230 }, // Transit Hub
];

export const SmogHeatmap = memo(function SmogHeatmap({
  zones,
  selectedZoneId,
  onSelectZone,
}: SmogHeatmapProps) {
  const { theme } = useAppContext();
  const isDark = theme === 'dark';

  return (
    <div className="lg:col-span-7 glass-panel rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            Urban Smog Heatmap & Dispersion Grid
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time spatial visualization across municipal telemetry monitoring nodes
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-slate-400 font-semibold bg-slate-100 dark:bg-slate-900/80 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            &lt;50
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            51-150
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            151-200
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            &gt;200
          </span>
        </div>
      </div>

      {/* WCAG SC 1.1.1 Twin Representation Rule: Textual equivalent */}
      <ul className="sr-only" aria-label="Urban air quality heatmap description">
        {zones.map((zone) => (
          <li key={zone.zoneId}>
            Sector {zone.zoneName}: AQI is {zone.aqi}, Category {zone.category},
            PM2.5 is {zone.pm25} micrograms per cubic meter,
            dominant pollutant is {zone.dominantPollutant},
            inversion risk is {zone.inversionRisk ? 'Active hazard' : 'Normal atmospheric mixing'}.
          </li>
        ))}
      </ul>

      {/* Native High-Performance SVG Heatmap Canvas */}
      <div className="w-full bg-slate-100 dark:bg-[#040812] rounded-2xl border border-slate-200 dark:border-slate-800/80 p-3 overflow-hidden relative shadow-inner transition-colors duration-200">
        <svg
          viewBox="0 0 600 320"
          aria-hidden="true"
          role="presentation"
          className="w-full h-auto max-h-[340px] select-none"
        >
          <defs>
            <linearGradient id="smogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isDark ? '#0b162c' : '#e2e8f0'} stopOpacity={isDark ? '0.7' : '0.6'} />
              <stop offset="100%" stopColor={isDark ? '#040812' : '#f8fafc'} stopOpacity={isDark ? '0.95' : '0.9'} />
            </linearGradient>

            <pattern id="inversionPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 0,20 l 20,-20 M -5,5 l 10,-10 M 15,25 l 10,-10"
                stroke={isDark ? '#f59e0b' : '#d97706'}
                strokeWidth="0.5"
                strokeOpacity={isDark ? '0.08' : '0.1'}
              />
            </pattern>
          </defs>

          {/* Background Canvas */}
          <rect x="0" y="0" width="600" height="320" fill="url(#smogGrad)" rx="14" />
          <rect x="0" y="0" width="600" height="320" fill="url(#inversionPattern)" rx="14" />

          {/* Radar Elevation Rings */}
          <circle cx="300" cy="160" r="80" fill="none" stroke={isDark ? '#1e293b' : '#cbd5e1'} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="300" cy="160" r="140" fill="none" stroke={isDark ? '#1e293b' : '#cbd5e1'} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <circle cx="300" cy="160" r="200" fill="none" stroke={isDark ? '#1e293b' : '#cbd5e1'} strokeWidth="0.7" strokeDasharray="5 5" opacity="0.25" />

          {/* Grid lines */}
          {[60, 120, 180, 240].map((y) => (
            <line
              key={`grid-h-${y}`}
              x1="20"
              y1={y}
              x2="580"
              y2={y}
              stroke={isDark ? '#1e293b' : '#cbd5e1'}
              strokeWidth="0.5"
              strokeDasharray="4 4"
              opacity="0.5"
            />
          ))}
          {[120, 240, 360, 480].map((x) => (
            <line
              key={`grid-v-${x}`}
              x1={x}
              y1="20"
              x2={x}
              y2="300"
              stroke={isDark ? '#1e293b' : '#cbd5e1'}
              strokeWidth="0.5"
              strokeDasharray="4 4"
              opacity="0.5"
            />
          ))}

          {/* Inter-Sector Atmospheric Dispersion Corridors */}
          <g stroke={isDark ? '#334155' : '#94a3b8'} strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4">
            <line x1="160" y1="75" x2="300" y2="160" />
            <line x1="300" y1="160" x2="450" y2="90" />
            <line x1="300" y1="160" x2="460" y2="235" />
            <line x1="170" y1="230" x2="300" y2="160" />
            <line x1="170" y1="230" x2="160" y2="75" />
          </g>

          {/* Wind Streamlines */}
          <g stroke={isDark ? '#38bdf8' : '#0284c7'} strokeWidth="1" opacity="0.3">
            <path d="M 50 40 Q 150 20 250 50 T 450 40" fill="none" strokeDasharray="5 5" />
            <path d="M 100 160 Q 250 140 380 170 T 550 150" fill="none" strokeDasharray="5 5" />
            <path d="M 80 270 Q 220 250 360 280 T 520 260" fill="none" strokeDasharray="5 5" />
          </g>

          {/* Telemetry Sensor Nodes */}
          {zones.map((zone, idx) => {
            const pos = NODE_COORDINATES[idx] || { cx: 200 + idx * 60, cy: 150 };
            const color = getAQIColor(zone.aqi);
            const isSelected = zone.zoneId === selectedZoneId;

            return (
              <g
                key={zone.zoneId}
                className="cursor-pointer transition-transform duration-200"
                onClick={() => onSelectZone(zone.zoneId)}
              >
                {/* Smog Inversion Spike Hazard Warning Glow */}
                {zone.aqi > 200 && (
                  <circle
                    cx={pos.cx}
                    cy={pos.cy}
                    r="34"
                    fill="none"
                    stroke={color}
                    strokeWidth="1.5"
                    opacity="0.35"
                    className="animate-ping"
                  />
                )}

                {/* Selected Sector Target Ring */}
                {isSelected && (
                  <>
                    <circle
                      cx={pos.cx}
                      cy={pos.cy}
                      r="32"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      opacity="0.8"
                    />
                    <circle
                      cx={pos.cx}
                      cy={pos.cy}
                      r="36"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="0.8"
                      opacity="0.4"
                    />
                  </>
                )}

                {/* Ambient Soft Glow Behind Node */}
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r="24"
                  fill={color}
                  opacity="0.18"
                />

                {/* Node Housing Disc */}
                <circle
                  cx={pos.cx}
                  cy={pos.cy}
                  r="22"
                  fill={isDark ? '#0b1324' : '#ffffff'}
                  stroke={color}
                  strokeWidth="2.5"
                  className="shadow-md"
                />

                {/* AQI Numeric Readout */}
                <text
                  x={pos.cx}
                  y={pos.cy + 4}
                  textAnchor="middle"
                  fill={isDark ? '#ffffff' : '#0f172a'}
                  fontSize="12"
                  fontWeight="800"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {zone.aqi}
                </text>

                {/* Sector Label Badge */}
                <rect
                  x={pos.cx - 50}
                  y={pos.cy + 25}
                  width="100"
                  height="16"
                  rx="4"
                  fill={isDark ? '#060b14' : '#ffffff'}
                  stroke={isSelected ? '#10b981' : isDark ? '#1e293b' : '#cbd5e1'}
                  strokeWidth="0.75"
                  opacity="0.95"
                />
                <text
                  x={pos.cx}
                  y={pos.cy + 37}
                  textAnchor="middle"
                  fill={isSelected ? '#059669' : isDark ? '#cbd5e1' : '#334155'}
                  fontSize="9.5"
                  fontWeight="700"
                  letterSpacing="0.2px"
                >
                  {zone.zoneName}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
        <span>Click any telemetry sensor node to switch hyperlocal sector.</span>
        <span className="font-mono text-emerald-600 dark:text-emerald-400">Boundary Cap: ~420m AGL</span>
      </div>
    </div>
  );
});
