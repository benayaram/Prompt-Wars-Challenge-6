// ============================================================
// src/components/Navigation/Header.tsx
// Modern Enterprise Header: BreatheWay with Dual Theme & Auth Portal
// High-craft Linear/Vercel/Stripe style navigation shell
// Per DESIGN_SYSTEM.md §4, ACCESSIBILITY §2, & REBRANDING §11
// ============================================================

import { memo, useState, useEffect, type SVGProps } from 'react';
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
  CloseIcon,
} from '@/components/ui/Icons';

function MenuIcon({ size = 16, className = '', ...props }: SVGProps<SVGSVGElement> & { size?: number | string }) {
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
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const aqiColor = getAQIColor(selectedZone.aqi);

  const tabs = [
    {
      id: TabId.Dashboard,
      label: t.tabDashboard || 'Air Telemetry',
      icon: <TelemetryIcon size={15} />,
    },
    {
      id: TabId.Routine,
      label: t.tabRoutine || 'Routine Optimizer',
      icon: <RoutineIcon size={15} />,
    },
    {
      id: TabId.Transit,
      label: t.tabTransit || 'Low-Emission Transit',
      icon: <TransitIcon size={15} />,
    },
    {
      id: TabId.IAQ,
      label: t.tabIAQ || 'Indoor Air & Hacks',
      icon: <IAQIcon size={15} />,
    },
    {
      id: TabId.Community,
      label: t.tabCommunity || 'Community Action',
      icon: <CommunityIcon size={15} />,
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

  // Keyboard navigation for tablist (ArrowLeft / ArrowRight / Home / End)
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
      document.getElementById(`tab-${tabs[nextIndex].id}`)?.focus();
    } else if (e.key === 'ArrowLeft') {
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

  return (
    <>
      <header
        role="banner"
        aria-label="BreatheWay application header"
        className="sticky top-0 z-40 bg-white/80 dark:bg-[#060b14]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200"
      >
        {/* Top Utility & Brand Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          {/* Brand Logo, Titles & Live Status */}
          <div className="flex items-center gap-3">
            <div className="group flex items-center gap-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white dark:bg-emerald-500/15 dark:text-emerald-400 dark:border dark:border-emerald-500/30 flex items-center justify-center shadow-xs shrink-0 transition-transform duration-150 group-hover:scale-105">
                <ShieldLogo size={18} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white tracking-tight">
                  {t.appTitle || BRANDING.productName}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
                  <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  LIVE
                </span>
              </div>
            </div>

            <span className="hidden lg:inline text-xs text-slate-500 dark:text-slate-400 font-normal pl-3 border-l border-slate-200 dark:border-slate-800">
              {t.appSubtitle || BRANDING.tagline}
            </span>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2">
            {/* Sector Quick Telemetry Pill */}
            <div
              className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium border bg-slate-50/80 dark:bg-slate-900/60 transition-colors"
              style={{ borderColor: `${aqiColor}40` }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: aqiColor }} aria-hidden="true" />
              <span className="text-slate-600 dark:text-slate-400">{selectedZone.zoneName}:</span>
              <span className="font-semibold font-mono" style={{ color: aqiColor }}>
                AQI {selectedZone.aqi}
              </span>
            </div>

            {/* Language Selector (Desktop) */}
            <div className="hidden sm:flex items-center bg-white/60 dark:bg-slate-900/40 rounded-lg px-2 py-1 border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <label htmlFor="language-select" className="sr-only">
                Select Language
              </label>
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value={Language.English} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">EN</option>
                <option value={Language.Hindi} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">हिन्दी (HI)</option>
                <option value={Language.Arabic} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">العربية (AR)</option>
                <option value={Language.Spanish} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">ES</option>
              </select>
            </div>

            {/* Accessibility Mode Selector (Desktop) */}
            <div className="hidden sm:flex items-center bg-white/60 dark:bg-slate-900/40 rounded-lg px-2 py-1 border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <label htmlFor="a11y-select" className="sr-only">
                Accessibility Mode
              </label>
              <select
                id="a11y-select"
                value={accessibilityMode}
                onChange={(e) => setAccessibilityMode(e.target.value as AccessibilityMode)}
                className="bg-transparent text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value={AccessibilityMode.Standard} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Default A11y</option>
                <option value={AccessibilityMode.HighContrast} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">High Contrast</option>
                <option value={AccessibilityMode.ReducedMotion} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Reduced Motion</option>
                <option value={AccessibilityMode.ScreenReader} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Screen Reader</option>
              </select>
            </div>

            {/* Theme Toggle Button (Light / Dark) */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            >
              {theme === 'light' ? <MoonIcon size={15} /> : <SunIcon size={15} />}
            </button>

            {/* Operator / Citizen Portal Trigger */}
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              aria-label={currentUser ? `Signed in as ${currentUser.name}` : 'Open Citizen & Operator Portal'}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 transition-colors shadow-2xs focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            >
              <UserIcon size={13} />
              <span>
                {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>

            {/* Mobile Hamburger / Close Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="sm:hidden w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
            >
              {isMobileMenuOpen ? <CloseIcon size={15} /> : <MenuIcon size={15} />}
            </button>
          </div>
        </div>

        {/* Accessible Main Tab Navigation */}
        <nav aria-label="Main application tabs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            role="tablist"
            aria-label="Main navigation panels"
            className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1.5 border-t border-slate-200/80 dark:border-slate-800/80"
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
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className={`relative flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${
                    isActive
                      ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800/80 shadow-2xs font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
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
                      className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#060b14]/95 backdrop-blur-xl px-4 py-3.5 space-y-3 transition-all animate-fadeIn">
            {/* Quick telemetry in mobile */}
            <div
              className="flex items-center justify-between p-2.5 rounded-lg border bg-slate-50/80 dark:bg-slate-900/60 text-xs"
              style={{ borderColor: `${aqiColor}40` }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: aqiColor }} aria-hidden="true" />
                <span className="font-medium text-slate-700 dark:text-slate-300">{selectedZone.zoneName}</span>
              </div>
              <span className="font-bold font-mono text-xs" style={{ color: aqiColor }}>
                AQI {selectedZone.aqi}
              </span>
            </div>

            {/* Language and Accessibility in Mobile */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <label htmlFor="mobile-language-select" className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Language
                </label>
                <select
                  id="mobile-language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full bg-slate-50 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 font-medium rounded-lg px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value={Language.English}>English (EN)</option>
                  <option value={Language.Hindi}>हिन्दी (HI)</option>
                  <option value={Language.Arabic}>العربية (AR)</option>
                  <option value={Language.Spanish}>Español (ES)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="mobile-a11y-select" className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Accessibility
                </label>
                <select
                  id="mobile-a11y-select"
                  value={accessibilityMode}
                  onChange={(e) => setAccessibilityMode(e.target.value as AccessibilityMode)}
                  className="w-full bg-slate-50 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300 font-medium rounded-lg px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value={AccessibilityMode.Standard}>Default A11y</option>
                  <option value={AccessibilityMode.HighContrast}>High Contrast</option>
                  <option value={AccessibilityMode.ReducedMotion}>Reduced Motion</option>
                  <option value={AccessibilityMode.ScreenReader}>Screen Reader</option>
                </select>
              </div>
            </div>
          </div>
        )}
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
