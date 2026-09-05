import React, { useState } from 'react';
import { ShieldCheck, Activity, ChevronDown, BookOpen, Calculator, Compass } from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';

export default function Header({ onOpenDrawer, onOpenMethodology, onStartTour, activeScenario }) {
  const [showLegendPopover, setShowLegendPopover] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200">
      <div className="w-full px-6 lg:px-10 py-3.5">
        <div className="flex items-center justify-between gap-4">

          {/* Brand */}
          <div data-tour="brand" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#00205b] flex-shrink-0">
              <Activity className="w-4.5 h-4.5 text-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold tracking-tight text-slate-900 m-0">
                  PayerLens
                </h1>
                <span className="text-[10px] px-1.5 py-0.5 rounded text-slate-400 font-mono">
                  v2.6
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Predicting patient access through payer & healthcare ecosystem intelligence
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onStartTour}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-xs text-slate-600 hover:text-slate-900 transition-colors font-medium"
              title="Take a guided tour of the dashboard"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Take a tour</span>
            </button>

            <button
              type="button"
              onClick={onOpenMethodology}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-xs text-slate-600 hover:text-slate-900 transition-colors font-medium"
              title="How are these numbers calculated & derived?"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Methodology</span>
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLegendPopover(!showLegendPopover)}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-xs text-slate-600 hover:text-slate-900 transition-colors font-medium"
                title="View Provenance Taxonomy"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Citations</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {showLegendPopover && (
                <div
                  className="absolute right-0 top-full mt-2 w-80 rounded-xl p-4 shadow-lg border bg-white border-slate-200 text-slate-800 z-50 text-xs space-y-2.5"
                  onClick={() => setShowLegendPopover(false)}
                >
                  <div className="font-semibold text-slate-900 text-xs pb-2 border-b border-slate-100">
                    Source Taxonomy
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <ProvenanceBadge type="STATUTORY" size="xs" />
                      <span className="text-[11px] text-slate-500">NICE PMG36 / SGB V § 35a</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <ProvenanceBadge type="CLINICAL" size="xs" />
                      <span className="text-[11px] text-slate-500">DAPA-HF / PARADIGM-HF</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <ProvenanceBadge type="EPIDEMIOLOGY" size="xs" />
                      <span className="text-[11px] text-slate-500">BHF / HES / InEK Registries</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <ProvenanceBadge type="SIMULATION" size="xs" />
                      <span className="text-[11px] text-slate-500">Calibrated Decision Model</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              id="open-provenance-drawer-btn"
              data-tour="audit-trail-btn"
              type="button"
              onClick={onOpenDrawer}
              className="inline-flex items-center gap-2 ml-1.5 px-3.5 py-1.5 rounded-lg bg-[#00205b] text-white hover:bg-[#003380] text-xs font-medium transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Audit Trail</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
