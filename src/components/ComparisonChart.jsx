import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, LineChart, Line, Cell
} from 'recharts';
import { BarChart3, LineChart as LineChartIcon, Info, Layers, CheckCircle2, ShieldAlert } from 'lucide-react';
import ProvenanceBadge from './ProvenanceBadge';
import ProvenanceTooltip from './ProvenanceTooltip';
import { SCENARIOS, calculateSimulatedAccess } from '../data/payerData';

export default function ComparisonChart({
  activeScenarioKey,
  simulatedScores,
  priceEuros,
  companionDiagnosticRequired
}) {
  const [viewMode, setViewMode] = useState('country-bar'); // 'country-bar' | 'cross-scenario' | 'price-curve'

  const currentScenario = SCENARIOS[activeScenarioKey];

  // 1. Data for Country Bar Chart (Active Scenario)
  const countryBarData = [
    {
      country: 'UK (NICE)',
      shortCode: 'UK',
      score: simulatedScores.scores.UK,
      baseScore: simulatedScores.baseScores.UK,
      threshold: 70,
      currency: 'ICER / QALY'
    },
    {
      country: 'Germany (G-BA)',
      shortCode: 'DE',
      score: simulatedScores.scores.DE,
      baseScore: simulatedScores.baseScores.DE,
      threshold: 70,
      currency: 'Zusatznutzen'
    },
    {
      country: 'France (HAS)',
      shortCode: 'FR',
      score: simulatedScores.scores.FR,
      baseScore: simulatedScores.baseScores.FR,
      threshold: 70,
      currency: 'SMR / ASMR'
    },
    {
      country: 'EU-3 Composite',
      shortCode: 'EU3',
      score: simulatedScores.scores.composite,
      baseScore: Math.round(
        (simulatedScores.baseScores.UK + simulatedScores.baseScores.DE + simulatedScores.baseScores.FR) / 3
      ),
      threshold: 70,
      currency: 'Harmonized'
    }
  ];

  // 2. Data for Cross-Scenario Comparison (A through E at current price)
  const crossScenarioData = Object.keys(SCENARIOS).map((key) => {
    const sc = SCENARIOS[key];
    const sim = calculateSimulatedAccess({
      scenarioKey: key,
      priceEuros,
      companionDiagnosticRequired
    });
    return {
      scenarioKey: key,
      name: `${sc.code}: ${sc.shortTag}`,
      UK: sim.scores.UK,
      DE: sim.scores.DE,
      FR: sim.scores.FR,
      Average: sim.scores.composite,
      threshold: 70
    };
  });

  // 3. Data for Price Sensitivity Curve (€1,500 to €8,500 in €500 steps)
  const priceCurveData = [];
  for (let p = 1500; p <= 8500; p += 500) {
    const sim = calculateSimulatedAccess({
      scenarioKey: activeScenarioKey,
      priceEuros: p,
      companionDiagnosticRequired
    });
    priceCurveData.push({
      price: `€${(p / 1000).toFixed(1)}k`,
      rawPrice: p,
      UK: sim.scores.UK,
      DE: sim.scores.DE,
      FR: sim.scores.FR,
      threshold: 70
    });
  }

  // Clinical white tooltip
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isAbove = data.score >= 70;
      return (
        <div className="bg-white border border-slate-300 p-3 rounded-xl shadow-lg text-xs space-y-1 text-slate-900">
          <div className="font-bold text-slate-900 flex items-center justify-between gap-4">
            <span>{data.country}</span>
            <span className="font-mono text-[#00205b] font-extrabold text-sm">{data.score}%</span>
          </div>
          <div className="text-[11px] text-slate-600">
            Calibrated Baseline: <span className="font-semibold text-slate-800">{data.baseScore}%</span>
          </div>
          <div className="text-[11px] text-slate-600">
            Primary Decision Gate: <span className="font-semibold text-slate-800">{data.currency}</span>
          </div>
          <div className="pt-1 border-t border-slate-100 flex items-center gap-1 text-[10px]">
            {isAbove ? (
              <span className="text-emerald-700 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Clears 70% Viability Benchmark
              </span>
            ) : (
              <span className="text-amber-800 flex items-center gap-1 font-bold">
                <ShieldAlert className="w-3 h-3 text-amber-600" /> Below 70% Benchmark (Restricted)
              </span>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="pharma-card rounded-xl p-6 shadow-sm flex flex-col justify-between">
      {/* Chart Top Header & View Modes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#00205b]">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider m-0">
                Payer Viability & Access Simulation
              </h3>
              <ProvenanceTooltip
                title="70% HTA Viability Benchmark Reference"
                issuingBody="Historical European HTA Approval Consensus"
                documentId="HTA-CONSENSUS-BENCHMARK-70"
                citation="Empirical consensus threshold: HTA appraisals scoring above 70% probability historically secure unconditional or minor-managed commercial access without rejection."
                methodologyNote="Scores below 70% trigger severe indication restriction (e.g. Sacubitril TA388 restricted to LVEF <=35%) or statutory arbitration price cuts."
                provenanceType="STATUTORY"
                iconOnly
              />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Calibrated multi-attribute decision model with statutory willingness-to-pay benchmark
            </p>
          </div>
        </div>

        {/* View Mode Toggle Buttons */}
        <div className="flex items-center p-1 rounded-lg bg-slate-100 border border-slate-200 self-start sm:self-auto text-xs">
          <button
            type="button"
            onClick={() => setViewMode('country-bar')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              viewMode === 'country-bar'
                ? 'bg-white text-[#00205b] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active Scenario
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cross-scenario')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              viewMode === 'cross-scenario'
                ? 'bg-white text-[#00205b] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Scenarios (A–E)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('price-curve')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
              viewMode === 'price-curve'
                ? 'bg-white text-[#00205b] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Price Sensitivity
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="w-full h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'country-bar' ? (
            <BarChart data={countryBarData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="country"
                stroke="#64748b"
                tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#64748b"
                tick={{ fill: '#475569', fontSize: 11 }}
                axisLine={{ stroke: '#cbd5e1' }}
                unit="%"
              />
              <Tooltip content={<CustomBarTooltip />} />

              {/* 70% Benchmark Reference Line */}
              <ReferenceLine
                y={70}
                stroke="#b45309"
                strokeDasharray="5 5"
                strokeWidth={2}
                label={{
                  value: '70% HTA Viability Benchmark [Consensus Precedent]',
                  position: 'insideTopRight',
                  fill: '#b45309',
                  fontSize: 11,
                  fontWeight: 700
                }}
              />

              <Bar dataKey="score" radius={[6, 6, 0, 0]} maxBarSize={56}>
                {countryBarData.map((entry, index) => {
                  let fillColor = '#004b87'; // Clinical Blue
                  if (entry.shortCode === 'UK') fillColor = '#00205b'; // Novo Navy
                  else if (entry.shortCode === 'DE') fillColor = '#059669'; // Emerald
                  else if (entry.shortCode === 'FR') fillColor = '#0284c7'; // Sky
                  else if (entry.shortCode === 'EU3') fillColor = '#475569'; // Slate
                  return <Cell key={`cell-${index}`} fill={fillColor} />;
                })}
              </Bar>
            </BarChart>
          ) : viewMode === 'cross-scenario' ? (
            <BarChart data={crossScenarioData} margin={{ top: 20, right: 20, left: -10, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="scenarioKey"
                stroke="#64748b"
                tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
                axisLine={{ stroke: '#cbd5e1' }}
                label={{ value: 'Cohort Scenarios (A: Broad to E: Refractory)', position: 'insideBottom', offset: -15, fill: '#64748b', fontSize: 11 }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="#64748b"
                tick={{ fill: '#475569', fontSize: 11 }}
                axisLine={{ stroke: '#cbd5e1' }}
                unit="%"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#cbd5e1',
                  borderRadius: '0.5rem',
                  color: '#0f172a',
                  fontSize: '11px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                }}
              />
              <ReferenceLine
                y={70}
                stroke="#b45309"
                strokeDasharray="4 4"
                label={{ value: '70% Benchmark', position: 'top', fill: '#b45309', fontSize: 11, fontWeight: 700 }}
              />
              <Bar dataKey="UK" fill="#00205b" name="UK (NICE)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="DE" fill="#059669" name="Germany (G-BA)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="FR" fill="#0284c7" name="France (HAS)" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={priceCurveData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="price"
                stroke="#64748b"
                tick={{ fill: '#475569', fontSize: 11 }}
              />
              <YAxis
                domain={[20, 100]}
                stroke="#64748b"
                tick={{ fill: '#475569', fontSize: 11 }}
                unit="%"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#cbd5e1',
                  borderRadius: '0.5rem',
                  color: '#0f172a',
                  fontSize: '11px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                }}
              />
              <ReferenceLine
                y={70}
                stroke="#b45309"
                strokeDasharray="4 4"
                label={{ value: '70% HTA Benchmark', position: 'top', fill: '#b45309', fontSize: 11, fontWeight: 700 }}
              />
              <Line
                type="monotone"
                dataKey="UK"
                stroke="#00205b"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#00205b' }}
                name="UK NICE"
              />
              <Line
                type="monotone"
                dataKey="DE"
                stroke="#059669"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#059669' }}
                name="Germany G-BA"
              />
              <Line
                type="monotone"
                dataKey="FR"
                stroke="#0284c7"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#0284c7' }}
                name="France HAS"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 bg-amber-600 inline-block border-t border-dashed" />
          <span>
            Regulatory Threshold: <strong className="text-amber-900 font-bold">70% Probability</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span>Source: Historical HTA Approval Consensus Precedents (TA388, G-BA 2021)</span>
        </div>

        <ProvenanceBadge type="SIMULATION" size="xs" />
      </div>
    </div>
  );
}
