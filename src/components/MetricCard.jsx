import React from 'react';
import { ChevronRight, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';
import { PAYER_ECOSYSTEMS } from '../data/payerData';

// Consistent jurisdiction color tokens matching ComparisonChart.jsx
// UK: Novo Navy (#00205b), DE: Emerald (#059669), FR: Sky Blue (#0284c7), EU-3: Slate (#475569)
const COUNTRY_THEMES = {
  UK: {
    accentHex: '#00205b',
    borderClass: 'border-t-[#00205b]',
    textClass: 'text-[#00205b]',
    badgeClass: 'bg-blue-50 text-[#00205b] border-blue-200',
    linkHoverClass: 'group-hover:text-[#00205b]'
  },
  DE: {
    accentHex: '#059669',
    borderClass: 'border-t-emerald-600',
    textClass: 'text-emerald-700',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    linkHoverClass: 'group-hover:text-emerald-700'
  },
  FR: {
    accentHex: '#0284c7',
    borderClass: 'border-t-sky-600',
    textClass: 'text-sky-700',
    badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
    linkHoverClass: 'group-hover:text-sky-700'
  },
  EU3: {
    accentHex: '#475569',
    borderClass: 'border-t-slate-600',
    textClass: 'text-slate-700',
    badgeClass: 'bg-slate-50 text-slate-800 border-slate-200',
    linkHoverClass: 'group-hover:text-slate-700'
  }
};

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

  const theme = COUNTRY_THEMES[countryKey] || COUNTRY_THEMES.UK;

  // Badge state differentiation (Item 8)
  const isHigh = simulatedScore >= 75;
  const isMedium = simulatedScore >= 60 && simulatedScore < 75;

  const viabilityBadge = isHigh
    ? { text: 'High Viability', style: 'bg-emerald-50 text-emerald-800 border-emerald-300' }
    : isMedium
    ? { text: 'Moderate Access', style: 'bg-amber-50 text-amber-800 border-amber-300' }
    : { text: 'Restricted Access', style: 'bg-rose-50 text-rose-800 border-rose-300' };

  return (
    <div
      onClick={onInspect}
      className="pharma-card pharma-card-hover rounded-xl p-5 cursor-pointer flex flex-col justify-between group transition-colors relative overflow-hidden"
    >
      <div>
        {/* Card Top: Flag, Agency Name, Viability Badge */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl" role="img" aria-label={ecosystem.country}>
              {ecosystem.flag}
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight m-0">
                {ecosystem.agency}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {ecosystem.country}
              </p>
            </div>
          </div>

          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${viabilityBadge.style}`}>
            {viabilityBadge.text}
          </span>
        </div>

        {/* Hero Metric: Simulated Access Probability (Country-Coded) */}
        <div className="py-4">
          <div className="text-[11px] font-medium text-slate-500">
            Simulated access probability
          </div>
          <div className="flex items-baseline gap-2.5 mt-1">
            <span className={`text-4xl font-semibold font-mono tracking-tight ${theme.textClass}`}>
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
          <div className="text-[10px] font-medium text-slate-500 flex items-center justify-between">
            <span>Primary decision currency</span>
            {/* Dynamic Alert state: Only show alert badge when there is an actual breach */}
            {isBudgetBreach ? (
              <span className="text-[10px] text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Budget alert
              </span>
            ) : (
              <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Within cap
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
        <span className="text-[11px] font-mono text-slate-400 truncate">
          Ref: {ecosystem.documentId}
        </span>

        <span className={`text-xs font-medium text-[#004b87] ${theme.linkHoverClass} inline-flex items-center gap-1 transition-colors`}>
          <span>Inspect HTA dossier</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
}
