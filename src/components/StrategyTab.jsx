import React from 'react';
import { Compass, CheckCircle2, ShieldCheck, ArrowRight, FileCheck, Building2, Lightbulb, Download } from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';
import { SCENARIOS } from '../data/payerData';

export default function StrategyTab({ selectedScenarioKey, onOpenDrawer }) {
  const currentScenario = SCENARIOS[selectedScenarioKey] || SCENARIOS['D'];

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="glass-card rounded-2xl p-6 border border-cyan-500/30 shadow-glow-cyan bg-gradient-to-br from-slate-900 via-slate-900/95 to-cyan-950/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50">
                MARKET ACCESS PLAYBOOK
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight m-0">
                Novo Nordisk Commercial & Access Roadmap: {currentScenario.name}
              </h2>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Strategic execution roadmap calibrated to navigate national payer friction points and maximize reimbursement velocity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
              Novo Nordisk Hackathon 2026
            </span>
          </div>
        </div>

        {/* Executive Directive Box */}
        <div className="mt-4 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs">
          <div className="flex items-center gap-2 font-bold text-cyan-300 mb-1.5">
            <FileCheck className="w-4 h-4 text-cyan-400" />
            <span>Primary Strategic Directive ({currentScenario.code})</span>
          </div>
          <p className="text-slate-100 text-xs leading-relaxed font-normal">
            {currentScenario.strategicRecommendation}
          </p>
        </div>
      </div>

      {/* 3 Country Action Blueprints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* UK Blueprint */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <span className="text-2xl">🇬🇧</span>
              <div>
                <h3 className="text-sm font-bold text-slate-100 m-0">United Kingdom (NICE / NHS)</h3>
                <p className="text-[11px] text-slate-400">Commercial Medicines Unit (CMU)</p>
              </div>
            </div>

            <div className="mt-3 space-y-2.5 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Recommended Contracting Track</span>
                <span className="font-semibold text-cyan-300 mt-0.5 block">Simple PAS (Patient Access Scheme)</span>
                <span className="text-[11px] text-slate-300 mt-1 block">
                  Offer confidential NHS discount to ensure base ICER remains safely below the £25,000 threshold.
                </span>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Companion Diagnostic Enabler</span>
                <span className="text-[11px] text-slate-300 mt-0.5 block">
                  Partner with UK pathology networks to provide bundled point-of-care NT-proBNP assays to eliminate primary care testing resistance.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Target: Unconditional Fast-Track TA</span>
          </div>
        </div>

        {/* Germany Blueprint */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <span className="text-2xl">🇩🇪</span>
              <div>
                <h3 className="text-sm font-bold text-slate-100 m-0">Germany (G-BA / GKV)</h3>
                <p className="text-[11px] text-slate-400">SGB V § 35a AMNOG Process</p>
              </div>
            </div>

            <div className="mt-3 space-y-2.5 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Dossier Comparator Strategy (zVT)</span>
                <span className="font-semibold text-cyan-300 mt-0.5 block">Pre-specified Subgroup Superiority</span>
                <span className="text-[11px] text-slate-300 mt-1 block">
                  Demonstrate clear mortality reduction (HR {currentScenario.clinicalHR}) against designated comparator to capture Grade 2 ("Considerable Added Benefit").
                </span>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Pricing Window Management</span>
                <span className="text-[11px] text-slate-300 mt-0.5 block">
                  Leverage free pricing window in months 1–6 to establish clinical adoption prior to GKV-Spitzenverband negotiated rebate from month 7.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Target: Erheblicher Zusatznutzen</span>
          </div>
        </div>

        {/* France Blueprint */}
        <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <span className="text-2xl">🇫🇷</span>
              <div>
                <h3 className="text-sm font-bold text-slate-100 m-0">France (HAS / CEPS)</h3>
                <p className="text-[11px] text-slate-400">Commission de la Transparence</p>
              </div>
            </div>

            <div className="mt-3 space-y-2.5 text-xs">
              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Reimbursement Designation</span>
                <span className="font-semibold text-cyan-300 mt-0.5 block">SMR Important & ASMR III (Moderate)</span>
                <span className="text-[11px] text-slate-300 mt-1 block">
                  Enables 100% public reimbursement under ALD 5 (Affection de Longue Durée) and unlocks price premium over SoC.
                </span>
              </div>

              <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Early Access Scheme</span>
                <span className="text-[11px] text-slate-300 mt-0.5 block">
                  Apply for French Accès Précoce to secure fully reimbursed hospital dispensation prior to final CEPS price agreement.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Target: ASMR III + Accès Précoce</span>
          </div>
        </div>
      </div>

      {/* Actionable Market Access Next Steps */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
          <Lightbulb className="w-4 h-4 text-cyan-400" />
          <span>Core Market Access Action Checklist</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-slate-300">
              <strong>Subgroup Slicing:</strong> Voluntarily register submission label around Scenario D or C to insulate price integrity against unselected cohort pushback.
            </span>
          </div>
          <div className="flex items-start gap-2 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="text-slate-300">
              <strong>Real-World Registry Commitment:</strong> Propose prospective 24-month registry post-launch to satisfy HAS CEESP and NICE CDF data durability requirements.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
