// ============================================================
// src/components/Navigation/Header.tsx
// Modern Enterprise Sidebar & Responsive Navigation System
// Linear/Raycast/Stripe craftsmanship with full WCAG 2.2 AA accessibility
// ============================================================

import { memo, useState, useEffect, lazy, Suspense, type SVGProps } from 'react';
import { useAppContext } from '@/context/AppContext';
import { TabId, Language, AccessibilityMode } from '@/types';
import { TRANSLATIONS } from '@/lib/constants';
import { getAQIColor } from '@/lib/aqiCompute';
import { BRANDING } from '@/config/branding';

// Lazy-load AuthModal & Firebase to prevent render-blocking initial load
const AuthModal = lazy(() => import('@/components/Auth/AuthModal').then(m => ({ default: m.AuthModal })));
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
  CloseIcon,
} from '@/components/ui/Icons';

function MenuIcon({ size = 18, className = '', ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function ChevronRightIcon({ size = 14, className = '', ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export const Header = memo(function Header() {
  const {
    activeTab,
    setActiveTab,
    selectedZone,
    setSelectedZoneId,
    zones,
    language,
    setLanguage,
    accessibilityMode,
    setAccessibilityMode,
    theme,
    toggleTheme,
  } = useAppContext();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const aqiColor = getAQIColor(selectedZone.aqi);

  const tabs = [
    {
      id: TabId.Dashboard,
      label: t.tabDashboard || 'Air Telemetry',
      subtitle: 'Real-time mesh sensors',
      icon: <TelemetryIcon size={17} />,
    },
    {
      id: TabId.Routine,
      label: t.tabRoutine || 'Routine Optimizer',
      subtitle: 'AI exposure schedules',
      icon: <RoutineIcon size={17} />,
    },
    {
      id: TabId.Transit,
      label: t.tabTransit || 'Low-Emission Transit',
      subtitle: 'Dijkstra clean corridors',
      icon: <TransitIcon size={17} />,
    },
    {
      id: TabId.IAQ,
      label: t.tabIAQ || 'Indoor Air & Hacks',
      subtitle: 'CADR & DIY filtration',
      icon: <IAQIcon size={17} />,
    },
    {
      id: TabId.Community,
      label: t.tabCommunity || 'Community Action',
      subtitle: 'Collective smog curbs',
      icon: <CommunityIcon size={17} />,
    },
  ];

  // Close mobile drawer on Escape key for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Keyboard navigation for tablist
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
      document.getElementById(`tab-${tabs[nextIndex].id}`)?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prevIndex].id);
      document.getElementById(`tab-${tabs[prevIndex].id}`)?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveTab(tabs[0].id);
      document.getElementById(`tab-${tabs[0].id}`)?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveTab(tabs[tabs.length - 1].id);
      document.getElementById(`tab-${tabs[tabs.length - 1].id}`)?.focus();
    }
  };

  const handleSelectTab = (tabId: TabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        role="banner"
        aria-label="BreatheWay application header"
        className="transition-colors duration-200"
      >
        {/* ============================================================
            1. DESKTOP PERMANENT SIDEBAR (Hidden on mobile/tablet, visible on lg+)
            ============================================================ */}
        <aside
          aria-label="Platform Sidebar Navigation"
          className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-72 z-40 bg-white/90 dark:bg-[#070b16]/95 backdrop-blur-2xl border-r border-slate-200/80 dark:border-slate-800/80 shadow-xs select-none transition-colors duration-200"
        >
          {/* Top Brand Identity Header */}
          <div className="p-5 border-b border-slate-200/70 dark:border-slate-800/70 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 text-white flex items-center justify-center shadow-md shadow-cyan-500/25 ring-1 ring-white/20 shrink-0">
                  <ShieldLogo size={22} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                    {BRANDING.productName}
                  </span>
                  <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold tracking-wide">
                    Clean Air Navigator
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60 shadow-2xs">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                LIVE
              </span>
            </div>

            {/* Micro subtitle description */}
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              {t.appSubtitle || BRANDING.tagline}
            </p>
          </div>

          {/* Quick Focused Sector Telemetry Module */}
          <div className="p-4 mx-3 my-3 rounded-2xl bg-slate-50/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-2xs flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black tracking-wider uppercase text-slate-600 dark:text-slate-400 font-mono">
                ACTIVE TELEMETRY SECTOR
              </span>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: aqiColor }} />
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                  {selectedZone.zoneName}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  Dominant: <strong className="text-slate-700 dark:text-slate-300">{selectedZone.dominantPollutant}</strong>
                </span>
              </div>

              <div
                className={`px-2.5 py-1 rounded-xl text-xs font-black font-mono shrink-0 border shadow-2xs ${
                  selectedZone.aqi > 300
                    ? 'text-rose-900 dark:text-rose-200'
                    : selectedZone.aqi > 200
                    ? 'text-purple-900 dark:text-purple-200'
                    : selectedZone.aqi > 150
                    ? 'text-red-900 dark:text-red-200'
                    : selectedZone.aqi > 100
                    ? 'text-orange-900 dark:text-orange-200'
                    : selectedZone.aqi > 50
                    ? 'text-amber-900 dark:text-amber-200'
                    : 'text-emerald-900 dark:text-emerald-200'
                }`}
                style={{
                  backgroundColor: `${aqiColor}15`,
                  borderColor: `${aqiColor}40`,
                }}
              >
                AQI {selectedZone.aqi}
              </div>
            </div>

            {/* Quick Sector Select Picker */}
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
              <label htmlFor="sidebar-zone-select" className="sr-only">
                Change Sector Telemetry
              </label>
              <select
                id="sidebar-zone-select"
                value={selectedZone.zoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
                className="w-full bg-white dark:bg-slate-800/80 text-[11px] font-semibold text-slate-700 dark:text-slate-300 py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer"
              >
                {zones.map((z) => (
                  <option
                    key={z.zoneId}
                    value={z.zoneId}
                    className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    {z.zoneName} (AQI {z.aqi})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Primary Sidebar Vertical Tab Navigation */}
          <nav aria-label="Main application tabs" className="flex-1 px-3 py-1 space-y-1 overflow-y-auto">
            <div className="px-3 pb-2 pt-1 text-[10px] font-black tracking-widest text-slate-600 dark:text-slate-400 uppercase font-mono">
              COMMAND VIEWPORTS
            </div>

            <div
              role="tablist"
              aria-label="Main navigation panels"
              className="flex flex-col gap-1.5"
            >
              {tabs.map((tab, idx) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    id={`tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleSelectTab(tab.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    className={`group relative flex items-center justify-between w-full px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-transparent dark:from-cyan-500/20 dark:via-teal-500/10 dark:to-transparent text-cyan-900 dark:text-cyan-100 border border-cyan-500/30 dark:border-cyan-400/30 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/40 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-cyan-600 dark:bg-cyan-500 text-white shadow-xs shadow-cyan-500/30'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 group-hover:text-slate-800 dark:group-hover:text-slate-200'
                        }`}
                        aria-hidden="true"
                      >
                        {tab.icon}
                      </div>

                      <div className="flex flex-col text-left min-w-0">
                        <span className="truncate">{tab.label}</span>
                        <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400 truncate">
                          {tab.subtitle}
                        </span>
                      </div>
                    </div>

                    {isActive && (
                      <span className="text-cyan-600 dark:text-cyan-400 shrink-0">
                        <ChevronRightIcon size={14} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Sidebar Footer & Utility Strip */}
          <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 space-y-3">
            {/* User Account / Sign In Pill */}
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              aria-label={currentUser ? `Signed in as ${currentUser.name}` : 'Citizen Portal — Sign In (Secure Operator Mode)'}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/70 shadow-2xs transition-all active:scale-98 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs">
                  <UserIcon size={14} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-extrabold text-slate-900 dark:text-white">
                    {currentUser ? currentUser.name : 'Citizen Portal'}
                  </span>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-normal">
                    {currentUser ? currentUser.role : 'Secure Operator Mode'}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-cyan-800 dark:text-cyan-300 font-bold">
                {currentUser ? 'Active' : 'Sign In'}
              </span>
            </button>

            {/* Quick Preferences Bar (Language, A11y & Theme) */}
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {/* Language Selector */}
              <div className="relative col-span-1">
                <label htmlFor="sidebar-lang" className="sr-only">
                  Language
                </label>
                <select
                  id="sidebar-lang"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full bg-white dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 py-1.5 px-2 rounded-xl border border-slate-200/80 dark:border-slate-700/80 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer text-center"
                >
                  <option value={Language.English} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">EN</option>
                  <option value={Language.Hindi} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">HI</option>
                  <option value={Language.Arabic} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">AR</option>
                  <option value={Language.Spanish} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">ES</option>
                </select>
              </div>

              {/* Accessibility Mode Selector */}
              <div className="relative col-span-1">
                <label htmlFor="sidebar-a11y" className="sr-only">
                  Accessibility Mode
                </label>
                <select
                  id="sidebar-a11y"
                  value={accessibilityMode}
                  onChange={(e) => setAccessibilityMode(e.target.value as AccessibilityMode)}
                  className="w-full bg-white dark:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 py-1.5 px-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 focus:outline-none focus:ring-1 focus:ring-cyan-500 cursor-pointer text-center truncate"
                >
                  <option value={AccessibilityMode.Standard} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">A11y</option>
                  <option value={AccessibilityMode.HighContrast} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Contrast</option>
                  <option value={AccessibilityMode.ReducedMotion} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Motion</option>
                  <option value={AccessibilityMode.ScreenReader} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Reader</option>
                </select>
              </div>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                className="w-full py-1.5 rounded-xl flex items-center justify-center text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition-colors shadow-2xs cursor-pointer active:scale-95"
              >
                {theme === 'light' ? <MoonIcon size={14} /> : <SunIcon size={14} />}
              </button>
            </div>
          </div>
        </aside>

        {/* ============================================================
            2. RESPONSIVE MOBILE TOP BAR (Visible only on mobile/tablet <lg)
            ============================================================ */}
        <div className="lg:hidden sticky top-0 z-40 bg-white/90 dark:bg-[#070b16]/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-3 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-400 text-white flex items-center justify-center shadow-xs">
                <ShieldLogo size={18} />
              </div>
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight">
                {BRANDING.productName}
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-cyan-50 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800">
                ACTIVE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Sector AQI Pill */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border shadow-2xs font-mono"
              style={{
                backgroundColor: `${aqiColor}15`,
                borderColor: `${aqiColor}40`,
                color: aqiColor,
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: aqiColor }} />
              <span>AQI {selectedZone.aqi}</span>
            </div>

            {/* Mobile Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer"
            >
              {theme === 'light' ? <MoonIcon size={16} /> : <SunIcon size={16} />}
            </button>
          </div>
        </div>

        {/* ============================================================
            3. MOBILE DRAWER SLIDE-IN OVERLAY (When opened on mobile)
            ============================================================ */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop Blur */}
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer Container */}
            <div className="relative w-4/5 max-w-sm bg-white dark:bg-[#070b16] h-full shadow-2xl flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 p-5 z-10 overflow-y-auto animate-fadeIn">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-400 text-white flex items-center justify-center shadow-xs">
                      <ShieldLogo size={18} />
                    </div>
                    <span className="font-extrabold text-base text-slate-900 dark:text-white">
                      {BRANDING.productName}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 cursor-pointer"
                  >
                    <CloseIcon size={18} />
                  </button>
                </div>

                {/* Mobile Active Sector Widget */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400 font-mono">Current Sector</span>
                    <span className="font-mono font-bold" style={{ color: aqiColor }}>
                      AQI {selectedZone.aqi}
                    </span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white">{selectedZone.zoneName}</div>
                </div>

                {/* Mobile Nav Tabs */}
                <div className="flex flex-col gap-1.5">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 font-mono px-1">
                    Navigation
                  </div>
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => handleSelectTab(tab.id)}
                        className={`flex items-center gap-3 w-full px-3.5 py-3 min-h-[48px] rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-900 dark:text-cyan-100 border border-cyan-300 dark:border-cyan-800'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <span className={isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400'}>
                          {tab.icon}
                        </span>
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Drawer Bottom Utilities */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="w-full py-3 min-h-[44px] rounded-xl font-bold text-xs bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
                >
                  <UserIcon size={14} />
                  <span>{currentUser ? currentUser.name : 'Open Citizen Portal'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label htmlFor="mobile-lang" className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Language
                    </label>
                    <select
                      id="mobile-lang"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as Language)}
                      className="w-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold py-2 px-2 min-h-[44px] rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value={Language.English} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">English</option>
                      <option value={Language.Hindi} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">हिन्दी</option>
                      <option value={Language.Arabic} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">العربية</option>
                      <option value={Language.Spanish} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Español</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mobile-a11y" className="block text-[10px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Accessibility
                    </label>
                    <select
                      id="mobile-a11y"
                      value={accessibilityMode}
                      onChange={(e) => setAccessibilityMode(e.target.value as AccessibilityMode)}
                      className="w-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold py-2 px-2 min-h-[44px] rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value={AccessibilityMode.Standard} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Standard</option>
                      <option value={AccessibilityMode.HighContrast} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Contrast</option>
                      <option value={AccessibilityMode.ReducedMotion} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Reduced Motion</option>
                      <option value={AccessibilityMode.ScreenReader} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Screen Reader</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Auth SaaS & Firebase Integration Modal (Lazy-loaded to keep initial bundle ultra-fast) */}
      {isAuthOpen && (
        <Suspense fallback={null}>
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
            onLoginSuccess={(user) => {
              setCurrentUser(user);
            }}
          />
        </Suspense>
      )}
    </>
  );
});