// ============================================================
// src/components/Navigation/Header.tsx
// Modern Community Header: BreatheWay with Dual Theme & Auth Portal
// Per DESIGN_SYSTEM.md §4, ACCESSIBILITY §2, & REBRANDING §11
// ============================================================

import { memo, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { TabId, Language, AccessibilityMode } from '@/types';
import { TRANSLATIONS } from '@/lib/constants';
import { getAQIColor } from '@/lib/aqiCompute';
import { BRANDING } from '@/config/branding';
import { AuthModal } from '@/components/Auth/AuthModal';
import {
  ShieldLogo,
  TelemetryIcon,
  RoutineIcon,
  TransitIcon,
  IAQIcon,
  CommunityIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
} from '@/components/ui/Icons';

export const Header = memo(function Header() {
  const {
    activeTab,
    setActiveTab,
    selectedZone,
    language,
    setLanguage,
    accessibilityMode,
    setAccessibilityMode,
    theme,
    toggleTheme,
  } = useAppContext();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const aqiColor = getAQIColor(selectedZone.aqi);

  const tabs = [
    {
      id: TabId.Dashboard,
      label: t.tabDashboard || 'Air Telemetry',
      icon: <TelemetryIcon size={16} />,
    },
    {
      id: TabId.Routine,
      label: t.tabRoutine || 'Routine Optimizer',
      icon: <RoutineIcon size={16} />,
    },
    {
      id: TabId.Transit,
      label: t.tabTransit || 'Low-Emission Transit',
      icon: <TransitIcon size={16} />,
    },
    {
      id: TabId.IAQ,
      label: t.tabIAQ || 'Indoor Air & Hacks',
      icon: <IAQIcon size={16} />,
    },
    {
      id: TabId.Community,
      label: t.tabCommunity || 'Community Action',
      icon: <CommunityIcon size={16} />,
    },
  ];

  return (
    <>
      <header
        aria-label="AeroGuard AI application header"
        className="sticky top-0 z-40 bg-white/90 dark:bg-[#060b14]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm dark:shadow-lg dark:shadow-black/40 transition-colors"
      >
        {/* Top Utility & Brand Strip */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Brand Logo, Titles & Live Status */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-slate-900 p-0.5 shadow-md shadow-emerald-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-white dark:bg-[#060b14]/90 rounded-[14px] flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldLogo size={22} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                  {t.appTitle || BRANDING.productName}
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"
                    aria-hidden="true"
                  />
                  LIVE
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block tracking-normal">
                {t.appSubtitle || BRANDING.tagline}
              </p>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Sector Quick Telemetry Pill */}
            <div
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-slate-100 dark:bg-slate-900/80 text-xs shadow-inner"
              style={{ borderColor: `${aqiColor}50` }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: aqiColor }} aria-hidden="true" />
              <span className="text-slate-600 dark:text-slate-400">{selectedZone.zoneName}:</span>
              <span className="font-black font-mono" style={{ color: aqiColor }}>
                AQI {selectedZone.aqi}
              </span>
            </div>

            {/* Theme Toggle Button (Light ☀️ / Dark 🌙) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {theme === 'light' ? <MoonIcon size={16} /> : <SunIcon size={16} />}
            </button>

            {/* Language Selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900/90 rounded-xl px-2 py-1 border border-slate-200 dark:border-slate-700/60 shadow-sm">
              <label htmlFor="language-select" className="sr-only">
                Select Language
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-xs text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value={Language.English} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">EN</option>
                <option value={Language.Hindi} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">हिन्दी (HI)</option>
                <option value={Language.Arabic} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">العربية (AR)</option>
                <option value={Language.Spanish} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">ES</option>
              </select>
            </div>

            {/* Accessibility Mode Selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900/90 rounded-xl px-2 py-1 border border-slate-200 dark:border-slate-700/60 shadow-sm">
              <label htmlFor="a11y-select" className="sr-only">
                Accessibility Mode
              </label>
              <select
                id="a11y-select"
                value={accessibilityMode}
                onChange={(e) => setAccessibilityMode(e.target.value as AccessibilityMode)}
                className="bg-transparent text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                <option value={AccessibilityMode.Standard} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Default A11y</option>
                <option value={AccessibilityMode.HighContrast} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">High Contrast</option>
                <option value={AccessibilityMode.ReducedMotion} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Reduced Motion</option>
                <option value={AccessibilityMode.ScreenReader} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Screen Reader</option>
              </select>
            </div>

            {/* Operator / Citizen Portal Trigger */}
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              aria-label={currentUser ? `Signed in as ${currentUser.name}` : 'Open Citizen & Operator Portal'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/70 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
                <UserIcon size={12} />
              </div>
              <span className="hidden sm:inline">
                {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>
          </div>
        </div>

        {/* Accessible Main Tab Strip */}
        <nav aria-label="Main application tabs" className="max-w-7xl mx-auto px-4">
          <div
            role="tablist"
            aria-label="Main navigation panels"
            className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1.5 pt-0.5 border-t border-slate-200/80 dark:border-slate-800/50"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                    isActive
                      ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/90 shadow-sm border border-slate-200 dark:border-slate-700/80'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <span
                    className={`transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}
                    aria-hidden="true"
                  >
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Auth SaaS & Firebase Integration Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </>
  );
});
