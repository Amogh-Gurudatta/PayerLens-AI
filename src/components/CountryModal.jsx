import React, { useEffect } from 'react';
import { X, ShieldCheck, Scale, ExternalLink, AlertTriangle, CheckCircle2, Copy, Check, FileText } from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';
import { PAYER_ECOSYSTEMS } from '../data/payerData';

export default function CountryModal({
  countryKey,
  simulatedScore,
  baseScore,
  modifier,
  budgetImpactM,
  isBudgetBreach,
  onClose
}) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    if (countryKey) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [countryKey, onClose]);

  if (!countryKey) return null;
  const ecosystem = PAYER_ECOSYSTEMS[countryKey];
  if (!ecosystem) return null;

  const isHigh = simulatedScore >= 75;
  const isMedium = simulatedScore >= 60 && simulatedScore < 75;
  const currencySymbol = countryKey === 'UK' ? '£' : '€';

  const handleCopyCitation = () => {
    const text = `[Regulatory Audit] ${ecosystem.body} - ${ecosystem.documentId}: "${ecosystem.sourceCitation}"`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl text-slate-900 z-10 overflow-hidden space-y-0">
        
        {/* Deep Navy Corporate Header */}
        <div className="bg-[#00205b] text-white p-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="text-3xl" role="img" aria-label={ecosystem.country}>
              {ecosystem.flag}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight text-white m-0">
                  {ecosystem.agency}
                </h2>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white/20 text-white">
                  Regulatory HTA Dossier
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-0.5 font-normal">
                {ecosystem.body} &bull; {ecosystem.country}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Access Probability Hero Row */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Simulated Market Access Probability
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold font-mono text-[#00205b]">
                  {simulatedScore}%
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  (Calibrated Baseline: {baseScore}%)
                </span>
                {modifier !== 0 && (
                  <span
                    className={`text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                      modifier > 0
                        ? 'text-emerald-800 bg-emerald-100'
                        : 'text-rose-800 bg-rose-100'
                    }`}
                  >
                    {modifier > 0 ? `+${modifier}%` : `${modifier}%`} price delta
                  </span>
                )}
              </div>
            </div>

            <ProvenanceBadge type={ecosystem.provenanceType} size="sm" />
          </div>

          {/* Statutory Framework Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Primary Decision Currency</span>
              <div className="font-bold text-slate-900 text-sm">{ecosystem.decisionCurrency}</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400">Statutory Ceiling</span>
              <div className="font-mono text-[#004b87] font-bold text-sm">{ecosystem.thresholdText}</div>
            </div>

            <div className={`p-3.5 rounded-xl border space-y-1 ${
              isBudgetBreach ? 'bg-rose-50 border-rose-200' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-400">Forecast Net Budget Spend</span>
                {isBudgetBreach && (
                  <span className="text-[10px] text-rose-700 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Exceeds Cap
                  </span>
                )}
              </div>
              <div className="font-mono font-extrabold text-sm text-slate-900">
                {currencySymbol}{budgetImpactM}M / year
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5">{ecosystem.budgetTrigger}</div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-slate-400">Historical Benchmark Precedent</span>
                {ecosystem.benchmarkUrl && (
                  <a
                    href={ecosystem.benchmarkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#004b87] hover:underline"
                  >
                    <span>View Ruling ({ecosystem.benchmarkDocId})</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="text-slate-800 text-xs font-medium italic">{ecosystem.benchmarkPrecedent}</div>
            </div>
          </div>

          {/* Key Payer Assessment Factors */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Key Assessment & Scrutiny Points
            </span>
            <div className="space-y-1.5 text-xs text-slate-700">
              {ecosystem.keyFactors.map((factor, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[#004b87] font-bold">•</span>
                  <span>{factor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Methodological Note */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
            <span className="text-[10px] font-bold uppercase text-slate-500 block">Methodological Note</span>
            <p className="text-slate-700 leading-relaxed text-[11px]">{ecosystem.methodologyNote}</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1.5">
            <span>Document Docket:</span>
            {ecosystem.citationUrl ? (
              <a
                href={ecosystem.citationUrl}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#004b87] hover:underline inline-flex items-center gap-1"
              >
                <span>{ecosystem.documentId}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <strong className="text-slate-800">{ecosystem.documentId}</strong>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopyCitation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Citation String</span>
                </>
              )}
            </button>

            {ecosystem.citationUrl && (
              <a
                href={ecosystem.citationUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#00205b] hover:bg-[#003380] text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Agency Guidelines</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
