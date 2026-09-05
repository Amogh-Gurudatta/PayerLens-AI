import React from 'react';
import { ChevronRight, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';
import { PAYER_ECOSYSTEMS } from '../data/payerData';

export default function MetricCard({
  countryKey,
  simulatedScore,
  baseScore,
  modifier,
  budgetImpactM,
  isBudgetBreach,
  onInspect
}) {
  const ecosystem = PAYER_ECOSYSTEMS[countryKey];
  if (!ecosystem) return null;

  const isHigh = simulatedScore >= 75;
  const isMedium = simulatedScore >= 60 && simulatedScore < 75;

  const badgeBg = isHigh
    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
    : isMedium
    ? 'bg-amber-50 text-amber-800 border-amber-200'
    : 'bg-rose-50 text-rose-800 border-rose-200';

  return (
    <div
      onClick={onInspect}
      className="pharma-card pharma-card-hover rounded-xl p-5 cursor-pointer flex flex-col justify-between group shadow-sm transition-all"
    >
      <div>
        {/* Card Top: Flag, Agency Name, Country, Viability Badge */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl" role="img" aria-label={ecosystem.country}>
              {ecosystem.flag}
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight m-0">
                {ecosystem.agency}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {ecosystem.country}
              </p>
            </div>
          </div>

          <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border ${badgeBg}`}>
            {isHigh ? 'High Viability' : isMedium ? 'Moderate Access' : 'Restricted'}
          </span>
        </div>

        {/* Hero Metric: Simulated Access Probability */}
        <div className="py-4">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Simulated Access Probability
          </div>
          <div className="flex items-baseline gap-2.5 mt-1">
            <span className="text-4xl font-extrabold font-mono tracking-tight text-[#00205b]">
              {simulatedScore}%
            </span>

            {modifier !== 0 && (
              <span
                className={`inline-flex items-center text-xs font-mono font-semibold px-2 py-0.5 rounded ${
                  modifier > 0
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                    : 'text-rose-700 bg-rose-50 border border-rose-200'
                }`}
              >
                {modifier > 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {modifier > 0 ? `+${modifier}%` : `${modifier}%`}
              </span>
            )}
            <span className="text-xs text-slate-400 font-mono">
              (Base: {baseScore}%)
            </span>
          </div>
        </div>

        {/* Primary Decision Gate Card */}
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
          <div className="text-[10px] font-bold uppercase text-slate-500 flex items-center justify-between">
            <span>Primary Decision Currency</span>
            {isBudgetBreach && (
              <span className="text-[10px] text-rose-700 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Budget Alert
              </span>
            )}
          </div>
          <div className="text-xs font-semibold text-slate-800 truncate">
            {ecosystem.decisionCurrency}
          </div>
          <div className="text-[11px] font-mono text-[#004b87] font-semibold truncate pt-0.5">
            {ecosystem.thresholdText}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-[11px] font-mono text-slate-500 truncate">
          Ref: {ecosystem.documentId}
        </span>

        <span className="text-xs font-bold text-[#004b87] group-hover:text-[#00205b] inline-flex items-center gap-1 transition-colors">
          <span>Inspect HTA Dossier</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
}
