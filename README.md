# PayerLens AI: Predicting Patient Access Through Payer & Healthcare Ecosystem Intelligence
### Novo Nordisk Hackathon 2026

An audit-ready, production-grade healthcare access intelligence dashboard built to predict and simulate market access viability across major European health technology assessment (HTA) bodies: **UK NICE**, **Germany G-BA / IQWiG**, and **France HAS (Commission de la Transparence)**.

---

## Strict Provenance & Citation Audit System

Built in direct compliance with the mentor audit mandate: **Every single metric, threshold, score, and population count is linked to an empirical peer-reviewed trial, statutory HTA legal code, or derived epidemiology registry model.**

### Provenance Classification Taxonomy
- 🟦 **Statutory HTA Guideline**: NICE Health Technology Evaluations Manual (PMG36), German Social Code Book V (SGB V § 35a), French Code de la santé publique (Art. R163-18).
- 🟩 **Peer-Reviewed Clinical Evidence**: Pivotal trials including DAPA-HF (NEJM 2019), PARADIGM-HF (NEJM 2014), and EMPEROR-Preserved (NEJM 2021).
- 🟧 **Derived Epidemiology Estimate**: British Heart Foundation Registry, NHS Hospital Episode Statistics (HES), German InEK DRG F62B, and OECD Health Statistics.
- 🟪 **Calibrated Simulation Output**: Multi-attribute decision model calibrated against historical regulatory appraisal precedents (NICE TA388, G-BA 2021 Dapagliflozin, HAS CT-15180 Entresto).

---

## 3-Layer Data Architecture

1. **Layer 1: Patient Segments & Epidemiology**: ESC 2021 HF Guidelines, NICE NG106, NHS HES admissions, BHF registry.
2. **Layer 2: Comparators & Clinical Evidence**: DAPA-HF, PARADIGM-HF, EMPEROR-Preserved, EMA CHMP assessment reports.
3. **Layer 3: Payer Ecosystem Rules & Statutes**: NICE PMG36 £20k–£30k ICER threshold and £20m budget impact test; G-BA § 35a Zusatznutzen and zVT comparator rules; HAS SMR/ASMR scoring and CEESP medico-economic criteria.

---

## Features

- **Interactive Scenario Selector**: Five clinically defined patient phenotypes (Scenarios A through E).
- **Price Elasticity Slider**: €1,500 – €8,500/year testing statutory willingness-to-pay elasticity.
- **Companion Diagnostic Friction Modeling**: Evaluates NHS pathology testing hurdles under NICE Diagnostic Assessment Programme (DAP).
- **Budget Impact Warning System**: Real-time detection of £20m NHS, €30m German, and €20m French budget test triggers.
- **Comparative Recharts Visualizations**: Comparative Bar Chart, Multi-Scenario Benchmark, and Sensitivity Decay Curves with the **70% HTA Viability Benchmark** dashed reference line.
- **Slide-Over Audit Drawer**: Searchable 3-layer architecture database with full DOIs, document references, and exportable JSON audit dossier.
- **Strategic Recommendation Matrix**: Actionable market access directives for Novo Nordisk commercial teams.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run Vite dev server
npm run dev

# Build for production
npm run build
```
