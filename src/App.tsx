// ============================================================
// src/App.tsx
// Modern Enterprise AppShell: BreatheWay with Dual Theme Support
// Premier SaaS platform architecture (Linear/Vercel/Stripe style)
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
      className={`min-h-screen bg-slate-50/60 dark:bg-[#070b12] text-slate-900 dark:text-slate-100 flex flex-col justify-between relative selection:bg-emerald-500 selection:text-white transition-colors duration-200 ${
        accessibilityMode === 'high-contrast' ? 'contrast-125' : ''
      }`}
    >
      {/* Skip to Content Landmark for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-50 px-3 py-1.5 bg-emerald-600 text-white font-medium text-xs rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-transform"
      >
        Skip to main content
      </a>

      {/* 1. Global Navigation Header with Tab Navigation & Theme Toggle */}
      <Header />

      {/* 2. Global Alert Banner Overlay */}
      <AlertBanner alerts={alerts} onDismiss={dismissAlert} />

      {/* 3. Primary Semantic Landmark Viewport */}
      <main
        id="main-content"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        tabIndex={-1}
        className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1 focus:outline-none relative z-10"
      >
        {activeTab === TabId.Dashboard && <AirTelemetryDashboard />}
        {activeTab === TabId.Routine && <DailyRoutineOptimizer />}
        {activeTab === TabId.Transit && <TransitPlanner />}
        {activeTab === TabId.IAQ && <IAQCenter />}
        {activeTab === TabId.Community && <CommunityHub />}
      </main>

      {/* 4. Modern Enterprise Footer Landmark */}
      <footer
        role="contentinfo"
        aria-label="Application footer"
        className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-[#070b12]/90 backdrop-blur-md py-8 text-xs text-slate-500 dark:text-slate-400 mt-12 transition-colors relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-600 text-white dark:bg-emerald-500/15 dark:text-emerald-400 dark:border dark:border-emerald-500/30 flex items-center justify-center shadow-2xs shrink-0">
                <ShieldLogo size={14} />
              </div>
              <span className="font-semibold text-slate-900 dark:text-white tracking-tight">
                {BRANDING.productName}
              </span>
              <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
                {BRANDING.version}
              </span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
            <span>
              Powered by{' '}
              <span className="font-medium text-slate-700 dark:text-slate-300">
                BreatheWay
              </span>{' '}
              Community Engine
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
            <span>WCAG 2.2 Level AA Compliant</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
            <span>EPA Breakpoints Standardized</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Server-side Gemini 3.1 Flash Lite
            </span>
            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
            <span>Zero-Trust Architecture</span>
            <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">•</span>
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
