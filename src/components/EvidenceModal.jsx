import React, { useEffect } from 'react';
import { X, Award, AlertOctagon, Compass, CheckCircle2, Copy, Check, FileText, ExternalLink } from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';
import { SCENARIOS } from '../data/payerData';

export default function EvidenceModal({
  modalType, // 'clinical' | 'objections' | 'strategy'
  selectedScenarioKey,
  onClose,
  onOpenDrawer
}) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (modalType) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalType, onClose]);

  if (!modalType) return null;
  const scenario = SCENARIOS[selectedScenarioKey] || SCENARIOS['D'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl text-slate-900 z-10 overflow-hidden space-y-0">
        
        {/* Clinical Drivers Modal */}
        {modalType === 'clinical' && (
          <>
            <div className="bg-[#00205b] text-white p-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-emerald-300">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight text-white m-0">
                      Clinical Trial Protocol & Efficacy
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 font-semibold uppercase">
                      Pivotal Evidence
                    </span>
                  </div>
                  <p className="text-xs text-blue-100 mt-0.5 font-normal">
                    {scenario.name} ({scenario.code}) &bull; Randomized Controlled Trial Data
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Pivotal Hazard Ratio (HR)</span>
                  <div className="text-3xl font-mono font-extrabold text-[#00205b] mt-1">HR {scenario.clinicalHR}</div>
                  <div className="text-xs text-slate-700 mt-1 font-medium">{scenario.mortalityReduction}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500">EU-3 Diagnosed Cohort</span>
                  <div className="text-2xl font-mono font-bold text-[#004b87] mt-1">
                    {(scenario.eligiblePopulation.total / 1000).toLocaleString()}k
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Epidemiology Pool</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Pivotal Trial Citation</span>
                  {scenario.clinicalUrl && (
                    <a
                      href={scenario.clinicalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#004b87] hover:underline"
                    >
                      <span>Read Published Paper</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div className="text-xs font-semibold text-slate-900">{scenario.clinicalCitation}</div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-[#004b87]">Docket Ref: {scenario.clinicalDocId}</span>
                  {scenario.eligiblePopulation.sourceUrl && (
                    <a
                      href={scenario.eligiblePopulation.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800"
                    >
                      <span>Registry Data</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-500">Biological & Clinical Target Rationale</span>
                <p className="text-xs text-slate-700 leading-relaxed mt-1">{scenario.clinicalRationale}</p>
              </div>
            </div>
          </>
        )}

        {/* Payer Objections Modal */}
        {modalType === 'objections' && (
          <>
            <div className="bg-[#00205b] text-white p-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-amber-300">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight text-white m-0">
                      Payer Objections & Statutory Gaps
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 font-semibold uppercase">
                      Regulatory Scrutiny
                    </span>
                  </div>
                  <p className="text-xs text-blue-100 mt-0.5 font-normal">
                    {scenario.name} ({scenario.code}) &bull; Agency Appraisal Barriers
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs">
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900">Regulatory Agency Friction Point</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200/60 text-amber-900 font-bold">
                    High Scrutiny
                  </span>
                </div>
                <p className="text-amber-900 text-xs leading-relaxed mt-1 font-medium">{scenario.evidenceGap}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Challenging HTA Body</span>
                  {scenario.evidenceGapUrl && (
                    <a
                      href={scenario.evidenceGapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#004b87] hover:underline"
                    >
                      <span>View Statutory Guidance</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div className="text-xs font-bold text-slate-900">{scenario.evidenceGapAgency}</div>
                <div className="font-mono text-[#004b87] text-[11px]">Statutory Framework: {scenario.evidenceGapDocId}</div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Audit Vulnerability Assessment</span>
                <p className="text-xs text-slate-700 leading-relaxed mt-1">
                  Payers will mandate restricted subgroup criteria unless real-world evidence (RWE) or companion assay accessibility is pre-agreed with national authorities.
                </p>
              </div>
            </div>
          </>
        )}

        {/* Strategic Roadmap Modal */}
        {modalType === 'strategy' && (
          <>
            <div className="bg-[#00205b] text-white p-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-blue-200">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight text-white m-0">
                      Novo Nordisk Market Access Playbook
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 text-white font-semibold uppercase">
                      Commercial Directive
                    </span>
                  </div>
                  <p className="text-xs text-blue-100 mt-0.5 font-normal">
                    {scenario.name} ({scenario.code}) &bull; Strategic Reimbursement Pathways
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-xs">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 space-y-1.5">
                <span className="font-bold text-[#00205b] text-xs uppercase tracking-wider block">
                  Executive Access Directive
                </span>
                <p className="text-blue-950 text-xs leading-relaxed font-normal">{scenario.strategicRecommendation}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 block text-xs">UK Commercial Medicines Unit</span>
                    <a
                      href="https://www.nice.org.uk/process/pmg36"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-[#004b87] hover:underline font-semibold inline-flex items-center gap-0.5"
                    >
                      <span>NICE PMG36</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Prepare upfront Patient Access Scheme (PAS) discount to ensure base ICER remains safely below the £25k threshold.
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 block text-xs">German GKV-Spitzenverband</span>
                    <a
                      href="https://www.gesetze-im-internet.de/sgb_5/__35a.html"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-[#004b87] hover:underline font-semibold inline-flex items-center gap-0.5"
                    >
                      <span>SGB V § 35a</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Anchor submission on SGLT2i background superiority to secure Grade 2 Erheblicher Zusatznutzen.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={onOpenDrawer}
            className="text-[#004b87] hover:underline font-semibold inline-flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open Complete 3-Layer Audit Dossier</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#00205b] hover:bg-[#003380] text-white font-semibold transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
