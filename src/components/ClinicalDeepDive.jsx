import React from 'react';
import { Activity, Award, Users, BookOpen, ExternalLink, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';
import ProvenanceTooltip from './ProvenanceTooltip';
import { SCENARIOS } from '../data/payerData';

export default function ClinicalDeepDive({ selectedScenarioKey, onSelectScenario }) {
  const currentScenario = SCENARIOS[selectedScenarioKey] || SCENARIOS['D'];

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 shadow-xl bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-emerald-950/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                {currentScenario.code}
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight m-0">
                {currentScenario.name}
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {currentScenario.definition}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ProvenanceBadge type="CLINICAL" size="sm" />
            <ProvenanceBadge type="EPIDEMIOLOGY" size="sm" />
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Pivotal Hazard Ratio</div>
            <div className="text-xl font-mono font-extrabold text-emerald-400 mt-0.5">
              HR {currentScenario.clinicalHR}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Statistical significance p &lt; 0.001</div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Total EU-3 Eligible Cohort</div>
            <div className="text-xl font-mono font-extrabold text-amber-300 mt-0.5">
              {(currentScenario.eligiblePopulation.total / 1000).toLocaleString()}k
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Derived epidemiology registry pool</div>
          </div>

          <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400">Relative Risk Reduction</div>
            <div className="text-sm font-semibold text-slate-100 mt-1 truncate">
              {currentScenario.mortalityReduction.split('(')[0]}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Composite CV Death / HF Hospitalisation</div>
          </div>
        </div>
      </div>

      {/* Grid: Left Column = Pivotal Trial Protocol, Right Column = Epidemiology Registries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pivotal Trial Clinical Protocol */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider m-0">
                Pivotal Clinical Trial Evidence
              </h3>
            </div>
            <ProvenanceTooltip
              title="Clinical Trial Protocol Verification"
              issuingBody="Peer-Reviewed Clinical Trial Publication"
              documentId={currentScenario.clinicalDocId}
              citation={currentScenario.clinicalCitation}
              methodologyNote="Survival analysis of time-to-first event endpoint with Cox proportional hazards regression model."
              provenanceType="CLINICAL"
              iconOnly
            />
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-[10px] uppercase font-bold text-slate-400">Pivotal Trial Reference</div>
            <div className="text-xs font-semibold text-slate-100">
              {currentScenario.clinicalCitation}
            </div>
            <div className="text-[11px] font-mono text-cyan-400">
              Docket ID: {currentScenario.clinicalDocId}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300">Biological & Pharmacological Rationale:</div>
            <p className="text-xs text-slate-300 bg-slate-900/50 p-3 rounded-xl border border-slate-800/80 leading-relaxed">
              {currentScenario.clinicalRationale}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-200 leading-relaxed">
            <strong>HTA Assessment Relevance:</strong> Under both German IQWiG and French HAS doctrines, demonstrated superiority on hard endpoints (mortality, hospitalisation) is mandatory for achieving added benefit ratings (Zusatznutzen / ASMR).
          </div>
        </div>

        {/* Detailed Epidemiology & Patient Registries */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider m-0">
                EU-3 Registry Epidemiology
              </h3>
            </div>
            <ProvenanceBadge type="EPIDEMIOLOGY" size="xs" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-xl">🇬🇧</span>
              <div className="text-[11px] font-semibold text-slate-300 mt-1">UK (NHS)</div>
              <div className="text-base font-mono font-bold text-slate-100 mt-0.5">
                {(currentScenario.eligiblePopulation.UK / 1000).toLocaleString()}k
              </div>
              <div className="text-[10px] text-slate-400">BHF Registry</div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-xl">🇩🇪</span>
              <div className="text-[11px] font-semibold text-slate-300 mt-1">Germany</div>
              <div className="text-base font-mono font-bold text-slate-100 mt-0.5">
                {(currentScenario.eligiblePopulation.DE / 1000).toLocaleString()}k
              </div>
              <div className="text-[10px] text-slate-400">InEK DRG Data</div>
            </div>

            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-xl">🇫🇷</span>
              <div className="text-[11px] font-semibold text-slate-300 mt-1">France</div>
              <div className="text-base font-mono font-bold text-slate-100 mt-0.5">
                {(currentScenario.eligiblePopulation.FR / 1000).toLocaleString()}k
              </div>
              <div className="text-[10px] text-slate-400">HAS ALD 5</div>
            </div>
          </div>

          <div className="bg-slate-900/70 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>Epidemiology Source String</span>
              <span className="font-mono text-cyan-400 text-[10px]">
                {currentScenario.eligiblePopulation.documentId}
              </span>
            </div>
            <p className="text-slate-300 italic text-[11px]">
              "{currentScenario.eligiblePopulation.sourceCitation}"
            </p>
            <div className="text-[11px] text-amber-300/90 pt-1 border-t border-slate-800">
              <strong>Methodology:</strong> {currentScenario.eligiblePopulation.methodologyNote}
            </div>
          </div>
        </div>
      </div>

      {/* Cohort Comparison Matrix Table (Scenarios A through E) */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider m-0">
              Comparative Cohort Phenotype Matrix (Scenarios A to E)
            </h3>
          </div>
          <span className="text-xs text-slate-400">Click any row to switch active scenario</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px] uppercase font-semibold">
                <th className="py-2.5 px-3">Scenario</th>
                <th className="py-2.5 px-3">Clinical Definition</th>
                <th className="py-2.5 px-3">Pivotal HR</th>
                <th className="py-2.5 px-3">EU-3 Population</th>
                <th className="py-2.5 px-3">Base Probability (UK/DE/FR)</th>
                <th className="py-2.5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {Object.keys(SCENARIOS).map((key) => {
                const sc = SCENARIOS[key];
                const isSelected = selectedScenarioKey === key;
                return (
                  <tr
                    key={key}
                    onClick={() => onSelectScenario(key)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-cyan-950/40 text-cyan-100 font-medium'
                        : 'hover:bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-cyan-400' : 'bg-transparent'}`} />
                        <span className="font-mono font-bold text-cyan-300">{sc.code}</span>
                        <span className="text-slate-400 hidden sm:inline">({sc.shortTag})</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 max-w-xs truncate text-[11px]" title={sc.definition}>
                      {sc.definition}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-400">
                      HR {sc.clinicalHR}
                    </td>
                    <td className="py-3 px-3 font-mono text-amber-300">
                      {(sc.eligiblePopulation.total / 1000).toLocaleString()}k
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-200">
                      {sc.baseProbabilities.UK}% / {sc.baseProbabilities.DE}% / {sc.baseProbabilities.FR}%
                    </td>
                    <td className="py-3 px-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectScenario(key);
                        }}
                        className={`text-[10px] px-2.5 py-1 rounded-md font-semibold transition-all ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 shadow-sm'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {isSelected ? 'Active' : 'Select'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
