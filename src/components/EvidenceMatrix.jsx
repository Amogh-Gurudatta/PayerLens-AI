import React from 'react';
import { CheckCircle2, ShieldAlert, ArrowRight, ChevronRight } from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';
import { SCENARIOS } from '../data/payerData';

export default function EvidenceMatrix({ activeScenarioKey, onOpenModal }) {
  const scenario = SCENARIOS[activeScenarioKey];
  if (!scenario) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* 1. Clinical Drivers Card (Positive Precedent) */}
      <div
        onClick={() => onOpenModal('clinical')}
        className="pharma-card pharma-card-hover rounded-xl p-5 cursor-pointer flex flex-col justify-between group transition-colors"
      >
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-semibold text-slate-800 m-0">
                1. Clinical drivers
              </h3>
            </div>
            <ProvenanceBadge type="CLINICAL" size="xs" />
          </div>

          <div className="space-y-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-semibold font-mono text-[#00205b]">
                HR {scenario.clinicalHR}
              </span>
              <span className="text-xs text-slate-500 font-medium">p &lt; 0.001</span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {scenario.mortalityReduction}
            </p>
            <div className="text-[11px] text-slate-400 font-mono truncate">
              {scenario.clinicalDocId}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#004b87] group-hover:text-[#00205b] font-medium">
          <span>Read clinical protocol</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* 2. Payer Objections Card (Risk Flag) */}
      <div
        onClick={() => onOpenModal('objections')}
        className="pharma-card pharma-card-hover rounded-xl p-5 cursor-pointer flex flex-col justify-between group transition-colors"
      >
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-semibold text-slate-800 m-0">
                2. Payer objections
              </h3>
            </div>
            <ProvenanceBadge type="STATUTORY" size="xs" />
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-amber-900 truncate">
              {scenario.evidenceGapAgency}
            </div>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {scenario.evidenceGap}
            </p>
            <div className="text-[11px] text-slate-400 font-mono truncate">
              Ref: {scenario.evidenceGapDocId}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#004b87] group-hover:text-[#00205b] font-medium">
          <span>Inspect agency friction</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* 3. Strategic Playbook Card (Recommended Action) */}
      <div
        onClick={() => onOpenModal('strategy')}
        className="pharma-card pharma-card-hover rounded-xl p-5 cursor-pointer flex flex-col justify-between group transition-colors"
      >
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-[#00205b] m-0">
                3. Strategic playbook
              </h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200 font-medium">
              Novo Nordisk
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-slate-900 truncate">
              Executive access directive
            </div>
            <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
              {scenario.strategicRecommendation}
            </p>
            <div className="text-[11px] text-slate-400 font-mono">
              UK PAS &bull; G-BA zVT &bull; Accès Précoce
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#004b87] group-hover:text-[#00205b] font-medium">
          <span>Open strategy blueprints</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
