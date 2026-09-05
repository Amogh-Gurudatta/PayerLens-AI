import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import MetricCard from './components/MetricCard';
import ComparisonChart from './components/ComparisonChart';
import EvidenceMatrix from './components/EvidenceMatrix';
import CountryModal from './components/CountryModal';
import EvidenceModal from './components/EvidenceModal';
import MethodologyModal from './components/MethodologyModal';
import ProvenanceDrawer from './components/ProvenanceDrawer';
import TeamPersonaBar from './components/TeamPersonaBar';
import StrategicRecommendationBanner from './components/StrategicRecommendationBanner';
import CustomSimulatorModal from './components/CustomSimulatorModal';
import { SCENARIOS, calculateSimulatedAccess } from './data/payerData';
import { getMLPrediction } from './services/mlService';
import {
  Sliders, Activity, Users, ShieldCheck, CheckSquare, Square, RefreshCw,
  Info, ExternalLink, Calculator, Cpu, Target
} from 'lucide-react';

export default function App() {
  // Application State
  const [selectedScenarioKey, setSelectedScenarioKey] = useState('D'); // Default Scenario D: Biomarker-Defined High Risk
  const [priceEuros, setPriceEuros] = useState(4200); // Baseline specialty benchmark
  const [companionDiagnosticRequired, setCompanionDiagnosticRequired] = useState(true);
  const [activeTeamId, setActiveTeamId] = useState('ALL');
  const [isCustomSimOpen, setIsCustomSimOpen] = useState(false);
  const [mlData, setMlData] = useState(null);
  const [isMlServerLive, setIsMlServerLive] = useState(false);
  
  // Modals State
  const [activeCountryModal, setActiveCountryModal] = useState(null); // 'UK' | 'DE' | 'FR' | null
  const [activeEvidenceModal, setActiveEvidenceModal] = useState(null); // 'clinical' | 'objections' | 'strategy' | null
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Active Scenario Object
  const currentScenario = SCENARIOS[selectedScenarioKey] || SCENARIOS['D'];

  // Fetch ML Prediction from FastAPI backend
  useEffect(() => {
    let isMounted = true;
    const fetchPrediction = async () => {
      const scenario = SCENARIOS[selectedScenarioKey];
      if (!scenario) return;

      const res = await getMLPrediction({
        icer_band: scenario.icer_band ?? (['D', 'C'].includes(scenario.id) ? 0 : scenario.id === 'B' ? 1 : 2),
        direct_comparator: scenario.direct_comparator ?? (['D', 'C', 'B'].includes(scenario.id) ? 1 : 0),
        hr_mortality: scenario.clinicalHR ?? 0.74,
        hosp_reduction: scenario.id === 'D' ? 32.0 : scenario.id === 'C' ? 29.0 : scenario.id === 'B' ? 26.0 : scenario.id === 'E' ? 21.0 : 12.0,
        biomarker_defined: scenario.id === 'D' ? 1 : 0,
        budget_impact_m: scenario.id === 'D' ? 15.0 : scenario.id === 'C' ? 22.0 : scenario.id === 'B' ? 35.0 : scenario.id === 'E' ? 10.0 : 85.0,
        unmet_need: scenario.id === 'E' ? 5 : scenario.id === 'A' ? 2 : 4,
        orphan_status: 0,
        qol_improvement: ['D', 'C', 'B'].includes(scenario.id) ? 1 : 0,
        evidence_grade: ['D', 'C', 'B'].includes(scenario.id) ? 3 : 2,
        prespecified_subgroup: scenario.id === 'A' ? 0 : 1,
        safety_tolerability: ['D', 'C'].includes(scenario.id) ? 3 : 2,
        cost_ratio_soc: scenario.id === 'D' ? 1.6 : scenario.id === 'C' ? 1.8 : scenario.id === 'B' ? 2.2 : scenario.id === 'E' ? 2.8 : 3.5,
      });

      if (isMounted) {
        if (res && res.isLive) {
          setMlData(res);
          setIsMlServerLive(true);
        } else {
          setIsMlServerLive(false);
        }
      }
    };
    fetchPrediction();
    return () => { isMounted = false; };
  }, [selectedScenarioKey]);

  // Real-time Calibrated Access Simulation
  const simulatedOutput = useMemo(() => {
    return calculateSimulatedAccess({
      scenarioKey: selectedScenarioKey,
      priceEuros,
      companionDiagnosticRequired
    });
  }, [selectedScenarioKey, priceEuros, companionDiagnosticRequired]);

  // Reset parameters to baseline
  const handleResetDefaults = () => {
    setSelectedScenarioKey('D');
    setPriceEuros(4200);
    setCompanionDiagnosticRequired(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-blue-600/10 selection:text-[#00205b]">
      {/* Full-width Novo Nordisk Corporate Header */}
      <Header
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        activeScenario={currentScenario}
      />

      {/* Main Full-Width Content Container */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 py-6 space-y-6">
        
        {/* 1. Novo Nordisk Silo Breaker Team Persona Bar */}
        <TeamPersonaBar
          activeTeamId={activeTeamId}
          onSelectTeam={setActiveTeamId}
        />

        {/* 2. PS 20 Strategic Recommendation Engine Banner */}
        <StrategicRecommendationBanner
          currentScenario={currentScenario}
          onOpenCustomSim={() => setIsCustomSimOpen(true)}
        />

        {/* Top Control Bar: Cohort Switcher, Price Slider, Companion Diagnostic */}
        <section
          aria-label="Simulation Controls and Cohort Bar"
          className="pharma-card rounded-xl p-5 shadow-xs space-y-4"
        >
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5">
            
            {/* 1. Cohort Scenario Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#00205b]" />
                  <span>Historical Precedent Drug Benchmark</span>
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {currentScenario.shortTag} &bull; HR {currentScenario.clinicalHR}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {Object.keys(SCENARIOS).map((key) => {
                  const sc = SCENARIOS[key];
                  const isSelected = selectedScenarioKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedScenarioKey(key)}
                      className={`text-xs px-3.5 py-2 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#00205b] text-white font-bold shadow-xs'
                          : 'bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      <span className="font-bold">{sc.code}</span>
                      <span className="hidden md:inline text-[11px] opacity-80">({sc.shortTag})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Interactive Simulation Variables (Price & Companion Diagnostic) */}
            <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200 self-stretch xl:self-auto justify-between xl:justify-start">
              
              {/* Price Slider */}
              <div className="flex items-center gap-3 min-w-[240px] flex-1 sm:flex-initial">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500">Annual Acquisition Price</span>
                    <span className="font-mono font-extrabold text-[#00205b] text-xs">
                      €{priceEuros.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1500"
                    max="8500"
                    step="250"
                    value={priceEuros}
                    onChange={(e) => setPriceEuros(Number(e.target.value))}
                    className="w-36 sm:w-44 h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-[#00205b] focus:outline-none mt-1"
                  />
                </div>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 font-mono font-bold hidden sm:inline">
                  User Defined
                </span>
              </div>

              <div className="h-8 w-px bg-slate-200 hidden sm:block" />

              {/* Companion Diagnostic Toggle */}
              <button
                type="button"
                onClick={() => setCompanionDiagnosticRequired(!companionDiagnosticRequired)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                  companionDiagnosticRequired
                    ? 'bg-blue-50 border-blue-300 text-[#00205b] font-semibold'
                    : 'bg-white border-slate-300 text-slate-600 hover:text-slate-900'
                }`}
              >
                {companionDiagnosticRequired ? (
                  <CheckSquare className="w-4 h-4 text-[#00205b]" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400" />
                )}
                <span>NT-proBNP Assay</span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-900">
                  NICE DAP
                </span>
              </button>

              <div className="h-8 w-px bg-slate-200 hidden sm:block" />

              {/* Reset Button */}
              <button
                type="button"
                onClick={handleResetDefaults}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                title="Reset simulation parameters"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3. Composite Access Score Pill & ML Service Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-200">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">EU-3 Composite Access</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-extrabold font-mono text-[#00205b]">
                      {simulatedOutput.scores.composite}%
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        simulatedOutput.scores.composite >= 70
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {simulatedOutput.scores.composite >= 70 ? 'Viable' : 'High Friction'}
                    </span>
                  </div>
                </div>
              </div>

              {/* ML Backend Indicator Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-2.5 rounded-lg border border-indigo-200 bg-indigo-50/70 text-indigo-900 text-xs">
                <Cpu className={`w-4 h-4 ${isMlServerLive ? 'text-emerald-600 animate-pulse' : 'text-indigo-600'}`} />
                <div className="leading-tight">
                  <div className="font-bold flex items-center gap-1.5 text-[11px]">
                    <span>Calibrated Ensemble ML</span>
                    {isMlServerLive && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title="FastAPI Server Online" />
                    )}
                  </div>
                  <div className="text-[10px] text-indigo-700 font-mono">
                    {isMlServerLive ? `FastAPI Live (85.6% CV)` : `RF + HistGB Calibrated`}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Centerpiece: 3 Country Appraisal Cards */}
        <section aria-label="National HTA Appraisal Cards">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00205b]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 m-0">
                National HTA Appraisal Cards &bull; Click Any Card to Inspect Full Dossier
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              Regulatory appraisal rules calibrated against TA388, G-BA 2021, and CT-15180
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              countryKey="UK"
              simulatedScore={simulatedOutput.scores.UK}
              baseScore={simulatedOutput.baseScores.UK}
              modifier={simulatedOutput.modifiers.UK}
              budgetImpactM={simulatedOutput.budgetImpact.UK}
              isBudgetBreach={simulatedOutput.budgetImpact.breaches.UK}
              onInspect={() => setActiveCountryModal('UK')}
            />

            <MetricCard
              countryKey="DE"
              simulatedScore={simulatedOutput.scores.DE}
              baseScore={simulatedOutput.baseScores.DE}
              modifier={simulatedOutput.modifiers.DE}
              budgetImpactM={simulatedOutput.budgetImpact.DE}
              isBudgetBreach={simulatedOutput.budgetImpact.breaches.DE}
              onInspect={() => setActiveCountryModal('DE')}
            />

            <MetricCard
              countryKey="FR"
              simulatedScore={simulatedOutput.scores.FR}
              baseScore={simulatedOutput.baseScores.FR}
              modifier={simulatedOutput.modifiers.FR}
              budgetImpactM={simulatedOutput.budgetImpact.FR}
              isBudgetBreach={simulatedOutput.budgetImpact.breaches.FR}
              onInspect={() => setActiveCountryModal('FR')}
            />
          </div>
        </section>

        {/* Full-Width Comparative Recharts Visualization */}
        <section aria-label="Comparative Visualizations">
          <ComparisonChart
            activeScenarioKey={selectedScenarioKey}
            simulatedScores={simulatedOutput}
            priceEuros={priceEuros}
            companionDiagnosticRequired={companionDiagnosticRequired}
          />
        </section>

        {/* Bottom Analysis Section: 3 Clean Teaser Cards */}
        <section aria-label="Evidence & Strategic Blueprints">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#00205b]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 m-0">
                Clinical Evidence & Commercial Playbook &bull; Click to Expand
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              ESC Guidelines &bull; IQWiG General Methods &bull; HAS Doctrine
            </span>
          </div>

          <EvidenceMatrix
            activeScenarioKey={selectedScenarioKey}
            onOpenModal={(type) => setActiveEvidenceModal(type)}
          />
        </section>

      </main>

      {/* Country HTA Inspector Modal */}
      <CountryModal
        countryKey={activeCountryModal}
        simulatedScore={activeCountryModal ? simulatedOutput.scores[activeCountryModal] : 0}
        baseScore={activeCountryModal ? simulatedOutput.baseScores[activeCountryModal] : 0}
        modifier={activeCountryModal ? simulatedOutput.modifiers[activeCountryModal] : 0}
        budgetImpactM={activeCountryModal ? simulatedOutput.budgetImpact[activeCountryModal] : 0}
        isBudgetBreach={activeCountryModal ? simulatedOutput.budgetImpact.breaches[activeCountryModal] : false}
        onClose={() => setActiveCountryModal(null)}
      />

      {/* Evidence & Strategy Deep-Dive Modal */}
      <EvidenceModal
        modalType={activeEvidenceModal}
        selectedScenarioKey={selectedScenarioKey}
        onClose={() => setActiveEvidenceModal(null)}
        onOpenDrawer={() => {
          setActiveEvidenceModal(null);
          setIsDrawerOpen(true);
        }}
      />

      {/* Methodology & Numbers Derivation Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      {/* Slide-Over 3-Layer Data Architecture & Full Provenance Drawer */}
      <ProvenanceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Interactive Custom Molecule & Trial Endpoint Simulator Modal */}
      <CustomSimulatorModal
        isOpen={isCustomSimOpen}
        onClose={() => setIsCustomSimOpen(false)}
      />

      {/* Full-Width Clean Corporate Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-6 px-6 lg:px-10 mt-8 text-xs text-slate-500">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#00205b]">
              PayerLens &bull; Novo Nordisk Hackathon 2026
            </span>
            <span className="text-slate-300">|</span>
            <span>Predicting Patient Access Through Payer & Healthcare Ecosystem Intelligence</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="text-[#004b87] hover:underline font-semibold inline-flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Audit Dossier & Citations</span>
            </button>
            <span className="text-slate-300">|</span>
            <span className="font-mono text-slate-500">Statutory Frameworks Calibrated 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
