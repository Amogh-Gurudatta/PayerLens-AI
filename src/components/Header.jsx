import React, { useState } from 'react';
import { ShieldCheck, Activity, ChevronDown, BookOpen, CheckCircle2 } from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';

export default function Header({ onOpenDrawer, activeScenario }) {
  const [showLegendPopover, setShowLegendPopover] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#00205b] text-white shadow-md border-b border-[#001742]">
      {/* Top micro-bar: Corporate Hackathon metadata */}
      <div className="border-b border-white/10 bg-[#001742]/50 px-6 lg:px-10 py-1.5 text-[11px] text-blue-100/80">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-bold tracking-wider text-white uppercase text-[10px] bg-white/10 px-2 py-0.5 rounded">
              Novo Nordisk Hackathon 2026
            </span>
            <span className="text-blue-300/60 hidden sm:inline">|</span>
            <span className="text-blue-100/90 text-[11px] hidden sm:inline font-medium">
              Global Health Economics & Outcomes Research (HEOR) &bull; Market Access Ecosystem
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-emerald-300 font-medium">Audit-Ready Compliance</span>
            </div>
            <span className="text-blue-300/60">|</span>
            <span className="text-blue-200">EU-3 Harmonized (NICE &bull; G-BA &bull; HAS)</span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="w-full px-6 lg:px-10 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 border border-white/20 shadow-inner flex-shrink-0">
              <Activity className="w-5 h-5 text-blue-200" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white m-0">
                  PayerLens
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 border border-blue-300/30 text-blue-100 font-mono font-medium">
                  HEOR Intelligence v2.6
                </span>
              </div>
              <p className="text-xs text-blue-100/80 font-normal mt-0.5">
                Predicting Patient Access Through Payer & Healthcare Ecosystem Intelligence
              </p>
            </div>
          </div>

          {/* Action Header Items */}
          <div className="flex items-center gap-3">
            {/* Provenance Taxonomy Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLegendPopover(!showLegendPopover)}
                className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-xs text-blue-100 transition-colors"
                title="View Provenance Taxonomy"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-200" />
                <span className="text-xs font-medium">Citation Taxonomy</span>
                <ChevronDown className="w-3 h-3 text-blue-200" />
              </button>

              {/* Taxonomy Popover */}
              {showLegendPopover && (
                <div
                  className="absolute right-0 top-full mt-2 w-80 rounded-xl p-4 shadow-xl border bg-white border-slate-200 text-slate-800 z-50 text-xs space-y-2.5 animate-fade-in"
                  onClick={() => setShowLegendPopover(false)}
                >
                  <div className="font-bold text-slate-900 text-xs pb-2 border-b border-slate-100">
                    Scientific & Regulatory Provenance Taxonomy
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

            {/* Audit Trail Drawer CTA Button */}
            <button
              id="open-provenance-drawer-btn"
              type="button"
              onClick={onOpenDrawer}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-[#00205b] hover:bg-blue-50 text-xs font-bold shadow-sm transition-all border border-white"
            >
              <ShieldCheck className="w-4 h-4 text-[#00205b]" />
              <span>Audit Trail Dossier</span>
              <span className="px-1.5 py-0.2 rounded-full bg-blue-100 text-[#00205b] text-[10px] font-mono font-bold">
                12 Sources
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
