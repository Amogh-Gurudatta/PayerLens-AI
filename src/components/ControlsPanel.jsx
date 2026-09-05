import React from 'react';
import { Sliders, RefreshCw, CheckSquare, Square, ChevronRight } from 'lucide-react';
import { SCENARIOS } from '../data/payerData';
import ProvenanceTooltip from './ProvenanceTooltip';

export default function ControlsPanel({
  selectedScenarioKey,
  onSelectScenario,
  priceEuros,
  onChangePrice,
  companionDiagnosticRequired,
  onToggleCompanionDiagnostic,
  onResetDefaults,
  onNavigateToTab
}) {
  const currentScenario = SCENARIOS[selectedScenarioKey] || SCENARIOS['D'];

  return (
    <aside className="w-full flex flex-col gap-4">
      {/* Sleek Simulation Parameters Card */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800/90 shadow-xl relative overflow-hidden">
        {/* Header with Title and Reset */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200 m-0">
              Simulation Parameters
            </h2>
          </div>
          <button
            type="button"
            onClick={onResetDefaults}
            className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors px-2 py-1 rounded bg-slate-900/80 hover:bg-slate-800 border border-slate-800"
            title="Reset parameters to calibrated baseline"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* 1. Scenario Selector */}
        <div className="space-y-1.5 mb-5">
          <div className="flex items-center justify-between">
            <label htmlFor="scenario-selector" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <span>Historical Precedent & Cohort</span>
              <ProvenanceTooltip
                title="Heart Failure Precedent & Cohort Stratification"
                issuingBody="European Society of Cardiology (ESC 2021) / NICE / G-BA / HAS"
                documentId={currentScenario.clinicalDocId}
                citation={currentScenario.clinicalCitation}
                methodologyNote="Clinical phenotypes mapped directly from landmark HF drug precedents (Farxiga, Verquvo, Entresto, Jardiance) and official HTA rulings."
                provenanceType={currentScenario.clinicalProvenance}
                iconOnly
              />
            </label>
            <span className="text-[10px] font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
              {currentScenario.code}
            </span>
          </div>

          {/* Responsive chip grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 mb-2">
            {Object.keys(SCENARIOS).map((key) => {
              const sc = SCENARIOS[key];
              const isSelected = selectedScenarioKey === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSelectScenario(key)}
                  className={`text-[11px] px-2 py-1.5 rounded-lg font-medium transition-all text-center ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {sc.code}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <select
              id="scenario-selector"
              value={selectedScenarioKey}
              onChange={(e) => onSelectScenario(e.target.value)}
              className="w-full bg-slate-900 text-slate-100 font-medium text-xs rounded-xl border border-slate-700/80 px-3 py-2.5 pr-8 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-400 transition-all cursor-pointer"
            >
              {Object.keys(SCENARIOS).map((key) => {
                const sc = SCENARIOS[key];
                return (
                  <option key={key} value={key} className="bg-slate-950 text-slate-100 py-1">
                    {sc.code} — {sc.archetypeRole}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            {currentScenario.definition}
          </p>
        </div>

        {/* 2. Annual Acquisition Price Slider */}
        <div className="space-y-2 mb-5 pb-5 border-b border-slate-800/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <label htmlFor="price-slider" className="text-xs font-semibold text-slate-300">
                Annual Acquisition Price
              </label>
              <ProvenanceTooltip
                title="Model Parameter: Annual Acquisition Cost"
                issuingBody="User Defined Parameter (Calibrated to NICE/G-BA/HAS Elasticity Curves)"
                documentId="PARAM-USER-PRICE-2026"
                citation="User simulation variable calibrated against standard oral HF specialty medicine benchmark (€4,200/yr)"
                methodologyNote="Simulates price pushback: NICE £20k-£30k ICER sensitivity, German GKV-Spitzenverband arbitration threshold, and French CEPS parity ceiling."
                provenanceType="SIMULATION"
                iconOnly
              />
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40 text-purple-300 font-mono font-medium">
              [Model Parameter: User Defined]
            </span>
          </div>

          <div className="flex items-center justify-between bg-slate-900/90 px-3.5 py-2 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400">Target Drug Price:</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold font-mono text-cyan-300">
                €{priceEuros.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400">/ patient / yr</span>
            </div>
          </div>

          <div className="pt-1">
            <input
              id="price-slider"
              type="range"
              min="1500"
              max="8500"
              step="250"
              value={priceEuros}
              onChange={(e) => onChangePrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>€1,500</span>
              <span className="text-cyan-400/80 font-semibold">€4,200 (SoC Parity)</span>
              <span>€8,500</span>
            </div>
          </div>
        </div>

        {/* 3. Companion Diagnostic Required Toggle */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-300">
                Companion Diagnostic Required
              </span>
              <ProvenanceTooltip
                title="Diagnostic Assessment Programme (DAP) Compliance"
                issuingBody="National Institute for Health and Care Excellence (NICE) DAP"
                documentId="NICE-DAP-GUIDANCE-2023"
                citation="NICE Diagnostic Assessment Programme Manual & NHS Pathology Assay Reimbursement Tariffs"
                methodologyNote="When activated, models NHS primary care laboratory funding friction (-7% UK probability), German Labor-Richtlinie accreditation (-3%), and French RIHN registration (-5%)."
                provenanceType="STATUTORY"
                iconOnly
              />
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/40 text-blue-300 font-mono font-medium">
              [NICE DAP Guidance]
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleCompanionDiagnostic}
            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
              companionDiagnosticRequired
                ? 'bg-cyan-950/30 border-cyan-500/50 text-cyan-200'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {companionDiagnosticRequired ? (
                <CheckSquare className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
              )}
              <div className="text-xs">
                <span className="font-semibold text-slate-200">Mandatory NT-proBNP Assay</span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {companionDiagnosticRequired ? 'Testing required before initiation' : 'Unrestricted prescribing'}
                </p>
              </div>
            </div>
            <span
              className={`text-[9px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                companionDiagnosticRequired
                  ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {companionDiagnosticRequired ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

      {/* Cohort Quick Reference Card with Direct Tab Link */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800/90 shadow-lg space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
            Active Cohort Efficacy
          </span>
          <span className="font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
            HR {currentScenario.clinicalHR}
          </span>
        </div>

        <div className="text-xs text-slate-300 font-medium">
          {currentScenario.mortalityReduction}
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
          <span className="text-slate-400">
            EU-3 Pool: <strong className="text-slate-200">{(currentScenario.eligiblePopulation.total / 1000).toLocaleString()}k</strong>
          </span>
          {onNavigateToTab && (
            <button
              type="button"
              onClick={() => onNavigateToTab('clinical')}
              className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-0.5 text-xs transition-colors"
            >
              <span>Explore Evidence</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
