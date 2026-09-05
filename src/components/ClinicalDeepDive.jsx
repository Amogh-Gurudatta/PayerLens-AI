import React from 'react';
import { Award, Users, ExternalLink, ShieldCheck, ChevronRight, Activity, FileText } from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';
import ProvenanceTooltip from './ProvenanceTooltip';
import { SCENARIOS } from '../data/payerData';

export default function ClinicalDeepDive({ selectedScenarioKey, onSelectScenario }) {
  const currentScenario = SCENARIOS[selectedScenarioKey] || SCENARIOS['D'];

  return (
    <div className="space-y-6">
      {/* Overview Banner - Pharma Deep Navy */}
      <div className="rounded-2xl p-6 border border-slate-200 shadow-xs bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#00205b] border border-blue-200">
                {currentScenario.code}
              </span>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight m-0">
                {currentScenario.name}
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {currentScenario.definition}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ProvenanceBadge type="CLINICAL" size="sm" />
            <ProvenanceBadge type="EPIDEMIOLOGY" size="sm" />
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400">Pivotal Hazard Ratio</div>
            <div className="text-xl font-mono font-extrabold text-emerald-800 mt-0.5">
              HR {currentScenario.clinicalHR}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Statistical significance p &lt; 0.001</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400">Total EU-3 Eligible Cohort</div>
            <div className="text-xl font-mono font-extrabold text-[#00205b] mt-0.5">
              {(currentScenario.eligiblePopulation.total / 1000).toLocaleString()}k
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Derived epidemiology registry pool</div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div className="text-[10px] uppercase font-bold text-slate-400">Relative Risk Reduction</div>
            <div className="text-sm font-semibold text-slate-800 mt-1 truncate">
              {currentScenario.mortalityReduction.split('(')[0]}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Composite CV Death / HF Hospitalisation</div>
          </div>
        </div>
      </div>

      {/* Grid: Left Column = Pivotal Trial Protocol, Right Column = Epidemiology Registries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pivotal Trial Clinical Protocol */}
        <div className="rounded-2xl p-5 border border-slate-200 shadow-xs bg-white space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider m-0">
                Pivotal Clinical Trial Evidence
              </h3>
            </div>
            {currentScenario.clinicalUrl && (
              <a
                href={currentScenario.clinicalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#004b87] hover:underline"
              >
                <span>Read Published Paper</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400">Pivotal Trial Reference</span>
              <span className="text-[10px] font-mono text-slate-500">Peer-Reviewed Trial</span>
            </div>
            <div className="text-xs font-semibold text-slate-900">
              {currentScenario.clinicalCitation}
            </div>
            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200">
              <span className="font-mono text-[#004b87]">
                Docket ID: {currentScenario.clinicalDocId}
              </span>
              {currentScenario.clinicalUrl && (
                <a
                  href={currentScenario.clinicalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#004b87] hover:underline font-mono inline-flex items-center gap-0.5"
                >
                  <span>DOI Access</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-700">Biological & Pharmacological Rationale:</div>
            <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
              {currentScenario.clinicalRationale}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-[#00205b] leading-relaxed">
            <strong>HTA Assessment Scrutiny:</strong> Under German IQWiG and French HAS doctrines, demonstrated superiority on hard endpoints (cardiovascular mortality, urgent HF re-admissions) is mandatory for achieving added benefit ratings (Grade 2 Zusatznutzen / ASMR III).
          </div>
        </div>

        {/* Detailed Epidemiology & Patient Registries */}
        <div className="rounded-2xl p-5 border border-slate-200 shadow-xs bg-white space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-700" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider m-0">
                EU-3 Registry Epidemiology
              </h3>
            </div>
            <ProvenanceBadge type="EPIDEMIOLOGY" size="xs" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-xl">🇬🇧</span>
              <div className="text-[11px] font-semibold text-slate-700 mt-1">UK (NHS)</div>
              <div className="text-base font-mono font-bold text-slate-900 mt-0.5">
                {(currentScenario.eligiblePopulation.UK / 1000).toLocaleString()}k
              </div>
              <div className="text-[10px] text-slate-500">BHF Registry</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-xl">🇩🇪</span>
              <div className="text-[11px] font-semibold text-slate-700 mt-1">Germany</div>
              <div className="text-base font-mono font-bold text-slate-900 mt-0.5">
                {(currentScenario.eligiblePopulation.DE / 1000).toLocaleString()}k
              </div>
              <div className="text-[10px] text-slate-500">InEK DRG Data</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
              <span className="text-xl">🇫🇷</span>
              <div className="text-[11px] font-semibold text-slate-700 mt-1">France</div>
              <div className="text-base font-mono font-bold text-slate-900 mt-0.5">
                {(currentScenario.eligiblePopulation.FR / 1000).toLocaleString()}k
              </div>
              <div className="text-[10px] text-slate-500">HAS ALD 5</div>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5 text-xs">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-between">
              <span>Epidemiology Source String</span>
              {currentScenario.eligiblePopulation.sourceUrl ? (
                <a
                  href={currentScenario.eligiblePopulation.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[#004b87] hover:underline text-[10px] inline-flex items-center gap-0.5 font-bold"
                >
                  <span>{currentScenario.eligiblePopulation.documentId}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              ) : (
                <span className="font-mono text-[#004b87] text-[10px]">
                  {currentScenario.eligiblePopulation.documentId}
                </span>
              )}
            </div>
            <p className="text-slate-700 italic text-[11px]">
              "{currentScenario.eligiblePopulation.sourceCitation}"
            </p>
            <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200">
              <strong>Methodology:</strong> {currentScenario.eligiblePopulation.methodologyNote}
            </div>
          </div>
        </div>
      </div>

      {/* Cohort Comparison Matrix Table (Scenarios A through E) */}
      <div className="rounded-2xl p-5 border border-slate-200 shadow-xs bg-white space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#00205b]" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider m-0">
              Comparative Precedent Drug Matrix (Historical Benchmark Drugs)
            </h3>
          </div>
          <span className="text-xs text-slate-500">Click any row to switch active drug precedent</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase font-semibold bg-slate-50">
                <th className="py-2.5 px-3">Benchmark Drug</th>
                <th className="py-2.5 px-3">Clinical Definition</th>
                <th className="py-2.5 px-3">Pivotal HR</th>
                <th className="py-2.5 px-3">EU-3 Population</th>
                <th className="py-2.5 px-3">Base Probability (UK/DE/FR)</th>
                <th className="py-2.5 px-3">Primary Source Link</th>
                <th className="py-2.5 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.keys(SCENARIOS).map((key) => {
                const sc = SCENARIOS[key];
                const isSelected = selectedScenarioKey === key;
                return (
                  <tr
                    key={key}
                    onClick={() => onSelectScenario(key)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50/70 text-slate-900 font-medium'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#00205b]' : 'bg-transparent'}`} />
                          <span className="font-bold text-[#00205b]">{sc.code}</span>
                        </div>
                        <span className="text-slate-500 text-[10px] pl-3">{sc.archetypeRole}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 max-w-xs truncate text-[11px]" title={sc.definition}>
                      {sc.definition}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-800">
                      HR {sc.clinicalHR}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-800 font-semibold">
                      {(sc.eligiblePopulation.total / 1000).toLocaleString()}k
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-700">
                      {sc.baseProbabilities.UK}% / {sc.baseProbabilities.DE}% / {sc.baseProbabilities.FR}%
                    </td>
                    <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                      {sc.clinicalUrl ? (
                        <a
                          href={sc.clinicalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#004b87] hover:underline font-mono text-[11px] inline-flex items-center gap-1"
                        >
                          <span>{sc.clinicalDocId}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-400 font-mono text-[11px]">{sc.clinicalDocId}</span>
                      )}
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
                            ? 'bg-[#00205b] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
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
