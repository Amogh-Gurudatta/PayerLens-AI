import React from 'react';
import { Target, ArrowRight, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StrategicRecommendationBanner({ currentScenario, onOpenCustomSim }) {
  return (
    <div className="bg-gradient-to-r from-[#00205b] via-indigo-950 to-slate-900 rounded-xl p-5 text-white shadow-md space-y-4">
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-indigo-900/60 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-white tracking-wide uppercase m-0">
                PayerLens AI Strategic Recommendation Engine
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 font-mono font-bold border border-emerald-400/30">
                PS 20 Optimization
              </span>
            </div>
            <p className="text-xs text-slate-300 m-0">
              Optimal subgroup prioritization & launch sequence for Heart Failure pipeline molecule
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCustomSim}
          className="text-xs px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition-all flex items-center gap-1.5 shadow-sm self-start lg:self-auto"
        >
          <Target className="w-3.5 h-3.5" />
          <span>Launch Custom Molecule Simulator</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. Optimal Subgroup */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Optimal Patient Subgroup</span>
          </div>
          <div className="text-sm font-bold text-white">Scenario D: Biomarker Stratified</div>
          <div className="text-[11px] text-slate-300 leading-snug">
            Targeting elevated NT-proBNP patients yields highest probability of full reimbursement (**93.4% Avg EU Access**).
          </div>
        </div>

        {/* 2. Launch Sequence */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1">
            <ArrowRight className="w-3.5 h-3.5" />
            <span>Recommended Launch Sequence</span>
          </div>
          <div className="text-sm font-bold text-white">Wave 1: DE ➔ Wave 2: UK ➔ Wave 3: FR</div>
          <div className="text-[11px] text-slate-300 leading-snug">
            Launch in Germany month 1-6 (free pricing), follow with UK (PAS discount), and France SMR listing.
          </div>
        </div>

        {/* 3. Evidence Gap Warning */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Critical Evidence Gap Flag</span>
          </div>
          <div className="text-sm font-bold text-white">German zVT & UK DAP Assay</div>
          <div className="text-[11px] text-slate-300 leading-snug">
            G-BA requires head-to-head trial vs SGLT2i SoC; UK requires NHS primary care companion diagnostic funding.
          </div>
        </div>

      </div>

    </div>
  );
}
