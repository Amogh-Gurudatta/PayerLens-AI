import React from 'react';
import { Users, DollarSign, Activity, FileText, Award, ShieldCheck } from 'lucide-react';

export const TEAMS = [
  {
    id: 'ALL',
    label: 'All Teams',
    icon: Users,
    focus: 'Cross-functional synthesis for Novo Nordisk executive alignment across Market Access, HEOR, Commercial, Pricing, Regulatory, and Medical Affairs.'
  },
  {
    id: 'MARKET_ACCESS',
    label: 'Market Access & HEOR',
    icon: Award,
    focus: 'Focus on ICER £20k-£30k QALY ceilings (NICE), QALY gain thresholds, and CEESP medico-economic evaluation models for France.'
  },
  {
    id: 'PRICING',
    label: 'Commercial & Pricing',
    icon: DollarSign,
    focus: 'Focus on £20m UK Budget Impact Test triggers, €30m German GKV mandatory price negotiation limits, and Patient Access Scheme (PAS) discounts.'
  },
  {
    id: 'REGULATORY',
    label: 'Regulatory & Medical Affairs',
    icon: ShieldCheck,
    focus: 'Focus on G-BA zVT head-to-head comparator trials, NT-proBNP biomarker companion diagnostic validation, and mortality endpoints.'
  }
];

export default function TeamPersonaBar({ activeTeamId, onSelectTeam }) {
  const currentTeam = TEAMS.find(t => t.id === activeTeamId) || TEAMS[0];

  return (
    <div data-tour="team-persona" className="bg-white rounded-xl p-4 border border-slate-200 space-y-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-400" />
          <h3 className="text-sm font-medium text-slate-700 m-0">
            View by team
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-50 border border-slate-200">
          {TEAMS.map((team) => {
            const Icon = team.icon;
            const isSelected = activeTeamId === team.id;
            return (
              <button
                key={team.id}
                type="button"
                onClick={() => onSelectTeam(team.id)}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-white text-[#00205b] shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{team.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2.5 border-t border-slate-100 text-xs text-slate-600 flex items-start gap-2">
        <span className="font-medium text-slate-400 whitespace-nowrap">Team lens</span>
        <p className="m-0 leading-relaxed">{currentTeam.focus}</p>
      </div>
    </div>
  );
}
