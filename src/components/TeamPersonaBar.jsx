import React from 'react';
import { Users, DollarSign, Activity, FileText, Award, ShieldCheck } from 'lucide-react';

export const TEAMS = [
  {
    id: 'ALL',
    label: 'All Teams (Executive Summary)',
    icon: Users,
    color: 'bg-slate-800 text-white',
    focus: 'Cross-functional synthesis for Novo Nordisk executive alignment across Market Access, HEOR, Commercial, Pricing, Regulatory, and Medical Affairs.'
  },
  {
    id: 'MARKET_ACCESS',
    label: 'Market Access & HEOR',
    icon: Award,
    color: 'bg-blue-800 text-white',
    focus: 'Focus on ICER £20k-£30k QALY ceilings (NICE), QALY gain thresholds, and CEESP medico-economic evaluation models for France.'
  },
  {
    id: 'PRICING',
    label: 'Commercial & Pricing',
    icon: DollarSign,
    color: 'bg-emerald-800 text-white',
    focus: 'Focus on £20m UK Budget Impact Test triggers, €30m German GKV mandatory price negotiation limits, and Patient Access Scheme (PAS) discounts.'
  },
  {
    id: 'REGULATORY',
    label: 'Regulatory & Medical Affairs',
    icon: ShieldCheck,
    color: 'bg-indigo-800 text-white',
    focus: 'Focus on G-BA zVT head-to-head comparator trials, NT-proBNP biomarker companion diagnostic validation, and mortality endpoints.'
  }
];

export default function TeamPersonaBar({ activeTeamId, onSelectTeam }) {
  const currentTeam = TEAMS.find(t => t.id === activeTeamId) || TEAMS[0];

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#00205b]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 m-0">
            Novo Nordisk Silo Breaker &bull; Multi-Team Persona View
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#00205b] font-mono font-bold">
            6 Teams Unified
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {TEAMS.map((team) => {
            const Icon = team.icon;
            const isSelected = activeTeamId === team.id;
            return (
              <button
                key={team.id}
                type="button"
                onClick={() => onSelectTeam(team.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? `${team.color} font-bold shadow-xs`
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{team.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
        <span className="font-bold text-[#00205b] whitespace-nowrap">Team Lens:</span>
        <p className="m-0 leading-relaxed text-slate-600">{currentTeam.focus}</p>
      </div>
    </div>
  );
}
