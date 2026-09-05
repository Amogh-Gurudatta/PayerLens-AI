import React, { useCallback } from 'react';
import { Joyride, EVENTS, STATUS } from 'react-joyride';

export const TOUR_STORAGE_KEY = 'payerlens_tour_completed_v1';

const TOUR_STEPS = [
  {
    target: 'body',
    placement: 'center',
    title: 'Welcome to PayerLens',
    content:
      "PayerLens simulates how NICE, G-BA, and HAS will respond to a new therapy's clinical evidence, price, and diagnostic requirements — before you commit resources to a real submission. Here's a quick tour of each panel.",
  },
  {
    target: '[data-tour="team-persona"]',
    title: 'View by team',
    content:
      'Switch the lens between Market Access & HEOR, Commercial & Pricing, and Regulatory & Medical Affairs to see which thresholds and rules matter most to that function.',
  },
  {
    target: '[data-tour="strategic-banner"]',
    title: 'Strategic recommendation',
    content:
      "The recommendation engine surfaces the optimal patient subgroup, a country launch sequence, and any critical evidence gaps for the current scenario — the answer to “where do we launch first, and what's missing?”",
  },
  {
    target: '[data-tour="scenario-selector"]',
    title: 'Historical precedent benchmark',
    content:
      'Pick a historical drug precedent — Farxiga, Verquvo, Entresto, Jardiance, or a broad-class comparator — to calibrate the simulation against real HTA outcomes for a similar mechanism of action.',
  },
  {
    target: '[data-tour="scenario-inputs"]',
    title: 'Scenario inputs',
    content:
      'Adjust the annual acquisition price and toggle whether a companion diagnostic (like the NT-proBNP assay) is required. Every card and chart on the page recalculates live as you move these.',
  },
  {
    target: '[data-tour="live-output"]',
    title: 'Live simulation output',
    content:
      "The EU-3 composite access score updates in real time as you change inputs, powered by a calibrated ensemble ML model (falls back to a local approximation if the FastAPI backend isn't running).",
  },
  {
    target: '[data-tour="hta-cards"]',
    title: 'National HTA appraisal cards',
    content:
      'Each card is a country-specific verdict — NICE (UK), G-BA/IQWiG (Germany), HAS (France) — showing the simulated access probability, the decision currency that agency actually uses (ICER, Zusatznutzen, SMR/ASMR), and whether the budget-impact threshold is breached. Click a card for the full dossier.',
  },
  {
    target: '[data-tour="comparison-chart"]',
    title: 'Payer viability & access simulation',
    content:
      'Compare the active scenario across countries, benchmark all five drug precedents side by side, or trace how access probability shifts as price increases — all against the 70% historical viability threshold.',
  },
  {
    target: '[data-tour="evidence-matrix"]',
    title: 'Clinical evidence & commercial playbook',
    content:
      'Three lenses on the same scenario: the clinical trial data behind it, the objections payers are likely to raise, and the strategic playbook for addressing them. Click any card to open the full detail.',
  },
  {
    target: '[data-tour="audit-trail-btn"]',
    placement: 'bottom-end',
    title: 'Audit trail & methodology',
    content:
      'Every number on this page traces back to a source. Open the audit trail here for the full citation dossier, or use Methodology in the header to see exactly how each score is calculated.',
  },
];

export default function OnboardingTour({ run, onFinish }) {
  const handleEvent = useCallback(
    (data, controls) => {
      const { type, status } = data;

      if (type === EVENTS.TARGET_NOT_FOUND) {
        controls.next();
        return;
      }

      if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        onFinish();
      }
    },
    [onFinish]
  );

  return (
    <Joyride
      run={run}
      steps={TOUR_STEPS}
      continuous
      scrollToFirstStep
      onEvent={handleEvent}
      options={{
        primaryColor: '#00205b',
        textColor: '#0f172a',
        backgroundColor: '#ffffff',
        arrowColor: '#ffffff',
        overlayColor: 'rgba(15, 23, 42, 0.55)',
        spotlightRadius: 12,
        spotlightPadding: 6,
        zIndex: 10050,
        width: 360,
        showProgress: true,
        buttons: ['close', 'back', 'skip', 'primary'],
        closeButtonAction: 'skip',
        scrollDuration: 400,
        // Leave room below the sticky header (71px) so the spotlighted
        // target doesn't scroll to a position where the header covers it.
        scrollOffset: 100,
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Done',
        next: 'Next',
        skip: 'Skip tour',
      }}
      styles={{
        tooltip: {
          borderRadius: 14,
          padding: 20,
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.3)',
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipTitle: {
          fontSize: 14,
          fontWeight: 700,
          color: '#0f172a',
          marginBottom: 6,
        },
        tooltipContent: {
          fontSize: 13,
          lineHeight: 1.6,
          color: '#475569',
          paddingTop: 0,
          paddingBottom: 16,
        },
        tooltipFooter: {
          marginTop: 4,
        },
        buttonPrimary: {
          borderRadius: 8,
          padding: '7px 14px',
          fontSize: 12,
          fontWeight: 600,
        },
        buttonBack: {
          fontSize: 12,
          fontWeight: 500,
          marginRight: 8,
        },
        buttonSkip: {
          fontSize: 12,
          color: '#94a3b8',
        },
        buttonClose: {
          color: '#94a3b8',
        },
      }}
    />
  );
}
