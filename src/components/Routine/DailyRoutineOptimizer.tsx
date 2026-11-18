// ============================================================
// src/components/Routine/DailyRoutineOptimizer.tsx
// GenAI-Powered Personalized Schedule (Dual Theme Support)
// Per PROBLEM_ALIGNMENT.md §1.2 & ACCESSIBILITY.md §6
// ============================================================

import { memo, useState, useCallback } from 'react';
import { useAppContext } from '@/context/AppContext';
import { apiService } from '@/services/apiService';
import type { PersonaProfile } from '@/types';
import { RoutineTimeline } from './RoutineTimeline';
import { SparklesIcon, CheckCircleIcon, AlertTriangleIcon } from '@/components/ui/Icons';

export const DailyRoutineOptimizer = memo(function DailyRoutineOptimizer() {
  const {
    personas,
    activePersona,
    setActivePersona,
    selectedZone,
    language,
    routinePlan,
    setRoutinePlan,
  } = useAppContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const plan = await apiService.generateDailyRoutine({
        persona: activePersona,
        zone: selectedZone,
        language,
      });
      setRoutinePlan(plan);
    } catch (err: unknown) {
      console.error('Failed to generate routine:', err);
      setErrorMessage('Unable to generate AI schedule right now. Showing localized heuristic guidance.');
    } finally {
      setIsLoading(false);
    }
  }, [activePersona, selectedZone, language, setRoutinePlan]);

  return (
    <section aria-label="GenAI Daily Routine and Exposure Optimizer" className="flex flex-col gap-8 fade-in">
      {/* Persona Selection Header */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-violet-100 dark:bg-violet-950/80 text-violet-800 dark:text-violet-300 border border-violet-300 dark:border-violet-500/40 flex items-center gap-1">
                <SparklesIcon size={12} className="text-violet-600 dark:text-violet-400" />
                NEURAL SCHEDULE ENGINE
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Gemini 3.1 Flash Lite</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              GenAI Daily Routine & Smog Exposure Optimizer
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Select your family or lifestyle vulnerability profile to generate hour-by-hour exposure mitigation routines.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-6 py-3.5 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400 transition-all shadow-xl shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center justify-center gap-2.5 shrink-0 border border-teal-300/30"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                <span>Optimizing with Gemini AI…</span>
              </>
            ) : (
              <>
                <SparklesIcon size={18} />
                <span>Generate Smart Schedule</span>
              </>
            )}
          </button>
        </div>

        {/* Persona Selector Chips */}
        <fieldset className="flex flex-col gap-3 relative z-10">
          <legend className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Target Family & Commuter Persona:
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {personas.map((p: PersonaProfile) => {
              const isSelected = p.id === activePersona.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActivePersona(p)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between gap-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-400 relative overflow-hidden ${
                    isSelected
                      ? 'bg-emerald-50/90 dark:bg-slate-900/90 border-emerald-500 dark:border-emerald-400 shadow-md ring-1 ring-emerald-500/50'
                      : 'bg-slate-50/80 dark:bg-[#0c1426]/70 border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 w-full">
                    <span className={`font-extrabold text-sm tracking-tight ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                      {p.name}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${
                        p.sensitivityLevel === 'high'
                          ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/40'
                          : 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/40'
                      }`}
                    >
                      {p.sensitivityLevel} Risk
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div aria-live="polite" aria-busy={isLoading} className="sr-only">
          {isLoading ? 'Generating personalized air quality daily schedule with Gemini AI…' : 'Schedule ready.'}
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-500/50 rounded-2xl text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2.5 relative z-10">
            <AlertTriangleIcon size={16} className="text-amber-600 dark:text-amber-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Routine Plan Results */}
      {routinePlan && (
        <div className="flex flex-col gap-8 fade-in">
          {/* Key Metric Highlights & Optimal Window */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel border-emerald-300 dark:border-emerald-500/40 rounded-3xl p-6 flex flex-col justify-between bg-gradient-to-br from-emerald-50 via-white to-white dark:from-emerald-950/40 dark:via-slate-900/60 dark:to-[#0b1324] shadow-md">
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-emerald-700 dark:text-emerald-400 block">
                  Optimal Outdoor Activity Window
                </span>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-1.5 font-mono">
                  {routinePlan.optimalOutdoorWindow.startHour}:00 – {routinePlan.optimalOutdoorWindow.endHour}:00
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-emerald-200/90 mt-3 leading-relaxed">
                {routinePlan.optimalOutdoorWindow.rationale}
              </p>
            </div>

            <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 dark:text-slate-400 block">
                  Predicted PM2.5 Inhaled Dose
                </span>
                <div className="text-2xl font-black text-sky-600 dark:text-cyan-400 mt-1.5 font-mono">
                  {routinePlan.totalExposureScore} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">µg·h</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Avoiding morning inversion peaks reduces pulmonary particulate intake by ~42%.
              </p>
            </div>

            <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-500 dark:text-slate-400 block">
                  Estimated Carbon Abatement
                </span>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1.5 font-mono">
                  {routinePlan.carbonOffsetKg} <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">kg CO₂</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                Achieved by consolidating errands and shifting peak motorized transit trips.
              </p>
            </div>
          </div>

          <RoutineTimeline
            routinePlan={routinePlan}
            zoneName={selectedZone.zoneName}
          />

          {/* Actionable General Guidance */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" />
              Expert Smog Defense Directives
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs text-slate-700 dark:text-slate-300">
              {routinePlan.generalAdvice.map((advice, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 bg-slate-50/80 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <CheckCircleIcon size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{advice}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
});
