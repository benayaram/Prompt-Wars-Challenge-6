// ============================================================
// src/App.tsx
// Modernized AppShell Layout: BreatheWay with Light & Dark Theme Support
// Warm & community-friendly safe passage through polluted cities
// ============================================================

import { memo } from 'react';
import { AppContextProvider, useAppContext } from '@/context/AppContext';
import { TabId } from '@/types';
import { Header } from '@/components/Navigation/Header';
import { AlertBanner } from '@/components/shared/AlertBanner';
import { AirTelemetryDashboard } from '@/components/Dashboard/AirTelemetryDashboard';
import { DailyRoutineOptimizer } from '@/components/Routine/DailyRoutineOptimizer';
import { TransitPlanner } from '@/components/Transit/TransitPlanner';
import { IAQCenter } from '@/components/IAQ/IAQCenter';
import { CommunityHub } from '@/components/Community/CommunityHub';
import { BRANDING } from '@/config/branding';
import { ShieldLogo } from '@/components/ui/Icons';

const AppShell = memo(function AppShell() {
  const { activeTab, alerts, dismissAlert, accessibilityMode } = useAppContext();

  return (
    <div
      className={`min-h-screen bg-[#f8fafc] dark:bg-[#060b14] text-slate-900 dark:text-slate-100 flex flex-col justify-between relative selection:bg-emerald-500 selection:text-white transition-colors duration-200 ${
        accessibilityMode === 'high-contrast' ? 'contrast-125' : ''
      }`}
    >
      {/* 1. Header with Tab Navigation & Theme Toggle */}
      <Header />

      {/* 2. Global Alert Banner Overlay */}
      <AlertBanner alerts={alerts} onDismiss={dismissAlert} />

      {/* 3. Primary Semantic Landmark Viewport */}
      <main
        id="main-content"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={-1}
        className="max-w-7xl w-full mx-auto px-4 py-8 flex-1 focus:outline-none relative z-10"
      >
        {activeTab === TabId.Dashboard && <AirTelemetryDashboard />}
        {activeTab === TabId.Routine && <DailyRoutineOptimizer />}
        {activeTab === TabId.Transit && <TransitPlanner />}
        {activeTab === TabId.IAQ && <IAQCenter />}
        {activeTab === TabId.Community && <CommunityHub />}
      </main>

      {/* 4. Modern Enterprise Footer Landmark */}
      <footer
        aria-label="Application footer"
        className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#060b14]/90 backdrop-blur-xl py-8 text-xs text-slate-500 dark:text-slate-400 mt-12 transition-colors relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <ShieldLogo size={14} />
              </div>
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight">
                {BRANDING.productName}
              </span>
              <span className="text-slate-500 dark:text-slate-600 font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                {BRANDING.version}
              </span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span>Powered by <span className="font-medium text-slate-700 dark:text-slate-300">AeroGuard AI</span> Engine</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span>WCAG 2.2 Level AA Compliant</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span>EPA Breakpoints Standardized</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Server-side Gemini 3.1 Flash Lite
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Zero-Trust Architecture</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>Firebase 11 Connected</span>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default function App() {
  return (
    <AppContextProvider>
      <AppShell />
    </AppContextProvider>
  );
}
