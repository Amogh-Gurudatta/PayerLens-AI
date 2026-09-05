import React from 'react';
import { AlertOctagon, Scale, ShieldAlert, CheckCircle2, ExternalLink, FileText, ChevronRight } from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';
import ProvenanceTooltip from './ProvenanceTooltip';
import { PAYER_ECOSYSTEMS, SCENARIOS } from '../data/payerData';

export default function PayerGapsTab({ selectedScenarioKey, onOpenDrawer }) {
  const currentScenario = SCENARIOS[selectedScenarioKey] || SCENARIOS['D'];

  const ecosystems = [
    { key: 'UK', data: PAYER_ECOSYSTEMS.UK },
    { key: 'DE', data: PAYER_ECOSYSTEMS.DE },
    { key: 'FR', data: PAYER_ECOSYSTEMS.FR },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 shadow-xl bg-gradient-to-r from-slate-900/90 via-slate-900/95 to-amber-950/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/50">
                HTA BARRIERS
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight m-0">
                Payer Objections & Evidence Gaps: {currentScenario.name}
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Detailed statutory friction points and agency appraisal criteria across the UK, Germany, and France.
            </p>
          </div>

          <ProvenanceBadge type="STATUTORY" size="sm" />
        </div>

        {/* Current Scenario Critical Barrier Callout */}
        <div className="mt-4 p-4 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs">
          <div className="flex items-center justify-between font-bold text-amber-300 mb-1">
            <span className="flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-amber-400" />
              <span>Primary Regulatory Objection for {currentScenario.code}</span>
            </span>
            <span className="font-mono text-[11px] text-amber-400/90">
              Agency: {currentScenario.evidenceGapAgency}
            </span>
          </div>
          <p className="text-slate-200 text-xs leading-relaxed mt-1">
            {currentScenario.evidenceGap}
          </p>
          <div className="mt-2 pt-2 border-t border-amber-900/40 flex items-center justify-between text-[11px] text-slate-400">
            <span>Framework Reference: <strong className="font-mono text-slate-300">{currentScenario.evidenceGapDocId}</strong></span>
            <ProvenanceTooltip
              title="Statutory HTA Barrier Protocol"
              issuingBody={currentScenario.evidenceGapAgency}
              documentId={currentScenario.evidenceGapDocId}
              citation={currentScenario.evidenceGap}
              methodologyNote="Statutory requirements mandate prospective evidence submission matching national comparator and testing guidelines."
              provenanceType="STATUTORY"
              iconOnly
            />
          </div>
        </div>
      </div>

      {/* 3 Country Statutory Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ecosystems.map(({ key, data }) => (
          <div
            key={key}
            className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{data.flag}</span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-100 m-0">{data.agency}</h3>
                    <p className="text-[11px] text-slate-400">{data.country}</p>
                  </div>
                </div>
                <ProvenanceBadge type={data.provenanceType} size="xs" />
              </div>

              {/* Core Rules */}
              <div className="mt-3 space-y-3 text-xs">
                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Decision Currency</div>
                  <div className="text-slate-200 font-semibold mt-0.5 text-xs">{data.decisionCurrency}</div>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Statutory Ceiling</div>
                  <div className="text-cyan-300 font-mono font-semibold mt-0.5 text-xs">{data.thresholdText}</div>
                </div>

                <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Budget Trigger Test</div>
                  <div className="text-slate-300 text-[11px] mt-0.5">{data.budgetTrigger}</div>
                </div>

                {/* Key Agency Friction Factors */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Key Scrutiny Points:</div>
                  {data.keyFactors.map((factor, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Precedent */}
            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
              <span className="block font-semibold text-slate-300 text-[10px] uppercase">
                Historical Precedent Appraisal:
              </span>
              <span className="italic mt-0.5 block">{data.benchmarkPrecedent}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Audit Drawer CTA Banner */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Scale className="w-6 h-6 text-cyan-400" />
          <div>
            <div className="text-sm font-bold text-white">Need Complete Statutory Bibliography?</div>
            <div className="text-xs text-slate-400">
              Access the complete 3-Layer Data Architecture covering NICE PMG36, SGB V § 35a, and HAS doctrines.
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenDrawer}
          className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
        >
          <span>Open Full Audit Drawer</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
