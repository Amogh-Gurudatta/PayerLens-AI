import React from 'react';
import { Target, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StrategicRecommendationBanner({ currentScenario, onOpenCustomSim }) {
  return (
    <div data-tour="strategic-banner" className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 text-[#00205b]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 m-0">
              Strategic recommendation
            </h3>
            <p className="text-xs text-slate-500 m-0 mt-0.5">
              Optimal subgroup prioritization & launch sequence for the heart failure pipeline molecule
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCustomSim}
          className="text-xs px-3.5 py-2 rounded-lg bg-[#00205b] hover:bg-[#003380] text-white font-medium transition-colors flex items-center gap-1.5 self-start lg:self-auto"
        >
          <Target className="w-3.5 h-3.5" />
          <span>Launch Custom Molecule Simulator</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* 1. Optimal Precedent Archetype */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1">
          <div className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Optimal benchmark precedent</span>
          </div>
          <div className="text-sm font-semibold text-slate-900">Farxiga (Dapagliflozin): Biomarker-Stratified</div>
          <div className="text-[11px] text-slate-500 leading-snug">
            Targeting elevated NT-proBNP patients (DAPA-HF landmark precedent) yields highest probability of full reimbursement (93.0% avg EU access).
          </div>
        </div>

        {/* 2. Launch Sequence */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1">
          <div className="text-[11px] font-medium text-[#00205b] flex items-center gap-1">
            <ArrowRight className="w-3.5 h-3.5" />
            <span>Recommended launch sequence</span>
          </div>
          <div className="text-sm font-semibold text-slate-900">Wave 1: DE &rarr; Wave 2: UK &rarr; Wave 3: FR</div>
          <div className="text-[11px] text-slate-500 leading-snug">
            Launch in Germany month 1-6 (free pricing), follow with UK (PAS discount), and France SMR listing.
          </div>
        </div>

        {/* 3. Evidence Gap Warning */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1">
          <div className="text-[11px] font-medium text-amber-700 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Critical evidence gap</span>
          </div>
          <div className="text-sm font-semibold text-slate-900">German zVT & UK DAP Assay</div>
          <div className="text-[11px] text-slate-500 leading-snug">
            G-BA requires head-to-head trial vs SGLT2i SoC; UK requires NHS primary care companion diagnostic funding.
          </div>
        </div>

      </div>
    </div>
  );
}
