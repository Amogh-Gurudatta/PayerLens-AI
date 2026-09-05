# PayerLens AI: Predicting Patient Access Through Payer & Healthcare Ecosystem Intelligence
### Novo Nordisk Hackathon 2026 &bull; Global Health Economics & Outcomes Research (HEOR) & Market Access Intelligence

[![Novo Nordisk](https://img.shields.io/badge/Novo%20Nordisk-Hackathon%202026-00205b?style=for-the-badge)](https://www.novonordisk.com/)
[![Compliance](https://img.shields.io/badge/Audit--Ready-100%25%20Provenance-059669?style=for-the-badge)](#strict-provenance--citation-audit-system)
[![Frontend](https://img.shields.io/badge/React%2019-Vite%208-0284c7?style=for-the-badge)](https://vitejs.dev/)
[![ML Backend](https://img.shields.io/badge/FastAPI-Ensemble%20ML%20v3.0-4f46e5?style=for-the-badge)](#dual-prediction-engine-mcdm-simulation--calibrated-ensemble-ml)
[![Accuracy](https://img.shields.io/badge/5--Fold%20CV-85.6%25-10b981?style=for-the-badge)](MODEL_CARD.md)

An audit-ready, enterprise-grade healthcare access intelligence platform designed to predict, simulate, and optimize reimbursement outcomes across the three major European Health Technology Assessment (HTA) bodies:
- 🇬🇧 **United Kingdom (NICE)**: Cost-utility thresholds (£20,000–£30,000/QALY gained) & NHS £20M Budget Impact Test.
- 🇩🇪 **Germany (G-BA / IQWiG)**: AMNOG Early Benefit Assessment (SGB V § 35a), Added Clinical Benefit (*Zusatznutzen*) vs designated standard comparator (*zVT*), and statutory pricing windows.
- 🇫🇷 **France (HAS Transparence)**: Medical Benefit (*SMR*) & Added Clinical Value (*ASMR Level I to V*), 100% ALD public coverage, and CEESP budget caps (>€20M).

---

## Strict Provenance & Citation Audit System

Built in direct compliance with the hackathon mentor audit mandate:
> **Strict Mandate**: Every single metric, threshold, score, hazard ratio, and population count must explicitly cite its issuing body, official document docket, year, and empirical or derived data classification.

### Provenance Classification Taxonomy
Every metric in PayerLens is tagged with an immutable provenance type:

- 🟦 **Statutory HTA Guideline**: Legally binding national health technology assessment statutes, regulations, or agency manuals (e.g., NICE PMG36 Section 6.2, German SGB V § 35a, French Code de la santé publique Art. R163-18).
- 🟩 **Peer-Reviewed Clinical Evidence**: Empirical data from randomized controlled trials, published protocols, and journal publications (e.g., DAPA-HF in NEJM 2019, VICTORIA in NEJM 2020, PARADIGM-HF in NEJM 2014, EMPEROR-Reduced in NEJM 2020).
- 🟧 **Derived Epidemiology Estimate**: Synthesized cohort sizing derived from national registries, hospital statistics, and OECD health databases (e.g., British Heart Foundation Statistics 2024, NHS Hospital Episode Statistics, German InEK DRG F62B, HAS ALD 5).
- 🟪 **Calibrated Simulation Output**: Multi-attribute decision scores and calibrated machine learning probabilities aligned with historical regulatory appraisal precedents.

### 100% Direct Interactive Links
All citations, legal statutes, clinical trials, and epidemiological registries feature direct, secure external links (`target="_blank" rel="noreferrer"`) with external link indicators (`↗`) across all modals, tables, and audit drawers.

---

## Historical Benchmark Drug Precedents

Fictional scenario placeholders have been replaced with **historical precedents of actual landmark cardiovascular and metabolic drugs** that established European HTA appraisal jurisprudence:

| Benchmark Drug Precedent | Real-World Role & Archetype | Landmark Pivotal Trial | Statutory HTA Appraisal Rulings | Empirical Endpoint | Official Regulatory Docket |
|---|---|---|---|---|---|
| **[Farxiga / Forxiga](https://www.nice.org.uk/guidance/ta679)**<br>*(dapagliflozin, AstraZeneca)* | **Biomarker-Defined High Risk**<br>NT-proBNP Stratified Cohort | **[DAPA-HF](https://doi.org/10.1056/NEJMoa1911303)**<br>*(NEJM 2019; 381:1995)* | **NICE TA679** (2021)<br>**G-BA Resolution 2021** (*Erheblicher Zusatznutzen*)<br>**HAS CT-19142** (*ASMR III*) | **HR 0.68**<br>(32% mortality / HF event reduction in biomarker tier) | [NICE-TA679-2021](https://www.nice.org.uk/guidance/ta679)<br>[G-BA BAnz AT 29.06.2021 B4](https://www.g-ba.de/beschluesse/4925/) |
| **[Verquvo](https://www.nice.org.uk/guidance/ta793)**<br>*(vericiguat, Bayer / MSD)* | **Post-Worsening Event**<br>Recent Hospitalisation History | **[VICTORIA](https://doi.org/10.1056/NEJMoa2001765)**<br>*(NEJM 2020; 382:1883)* | **NICE TA793** (2022, post-worsening)<br>**G-BA Resolution 2022**<br>**HAS CT-19942** (*ASMR IV*) | **HR 0.71**<br>(29% reduction in recurrent readmissions; HR 0.90 primary) | [NICE-TA793-2022](https://www.nice.org.uk/guidance/ta793)<br>[G-BA Resolution 2022](https://www.g-ba.de/beschluesse/5472/) |
| **[Entresto](https://www.nice.org.uk/guidance/ta388)**<br>*(sacubitril/valsartan, Novartis)* | **Persistent SoC Failure Add-On**<br>2nd-Line post ACEi/ARB/BB | **[PARADIGM-HF](https://doi.org/10.1056/NEJMoa1409077)**<br>*(NEJM 2014; 371:993)* | **NICE TA388** (LVEF &le; 35% restriction)<br>**G-BA Resolution 2016** (*Erheblicher Zusatznutzen*)<br>**HAS CT-15180** (*ASMR IV*) | **HR 0.74**<br>(26% composite CV death / worsening HF reduction) | [NICE-TA388-2016](https://www.nice.org.uk/guidance/ta388)<br>[HAS-CT-15180](https://www.has-sante.fr/jcms/c_2626573/en/entresto-sacubitril-valsartan) |
| **[Jardiance](https://www.nice.org.uk/guidance/ta773)**<br>*(empagliflozin, BI / Lilly)* | **Severe High Unmet Need**<br>Advanced NYHA III-IV & eGFR &ge; 20 | **[EMPEROR-Reduced](https://doi.org/10.1056/NEJMoa2022190)**<br>*(NEJM 2020; 383:1413)* | **NICE TA773** (2022 fast-track)<br>**G-BA Resolution 2021**<br>**HAS CT-19412** (*ASMR III/IV*) | **HR 0.79**<br>(21% end-stage mortality reduction; preserved in renal failure) | [NICE-TA773-2022](https://www.nice.org.uk/guidance/ta773)<br>[G-BA BAnz AT 05.08.2021 B4](https://www.g-ba.de/beschluesse/) |
| **Broad Class Precedent**<br>*(Unrestricted Submission)* | **Broad Unselected Precedent**<br>Unstratified Class Expansion | **[DIG Trial](https://doi.org/10.1093/eurheartj/ehab368)** *(NEJM 1997)* &<br>Novartis TA388 Initial Dossier | **NICE TA388 Initial Consultation** (rejected broad label)<br>**G-BA VerfO § 7** (subgroup carve-out) | **HR 0.88**<br>(12% diluted relative risk reduction; triggers budget cap) | [NICE-TA388-BROAD](https://www.nice.org.uk/guidance/ta388)<br>[G-BA VerfO § 7](https://www.g-ba.de/bewertungsverfahren/) |

---

## 3-Layer Data Architecture

PayerLens organizes its intelligence into three interconnected layers, inspectable at any time via the **Slide-Over Audit Drawer**:

```
┌────────────────────────────────────────────────────────────────────────┐
│               LAYER 1: PATIENT SEGMENTS & EPIDEMIOLOGY                │
│  ESC 2021 Guidelines • NICE NG106 • NHS HES Admissions • BHF Registry  │
│  InEK DRG F62B • HAS ALD 5 Registry • Eurostat Healthcare Database    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│         LAYER 2: COMPARATORS & CLINICAL TRIAL EVIDENCE (RCTs)          │
│   DAPA-HF (NEJM 2019) • VICTORIA (NEJM 2020) • PARADIGM-HF (NEJM 2014) │
│   EMPEROR-Reduced (NEJM 2020) • EMA CHMP European Assessment Reports    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│      LAYER 3: PAYER ECOSYSTEM RULES & STATUTORY HTA PRECEDENTS         │
│   NICE PMG36 (ICER £20k-£30k / £20M BIT) • German SGB V § 35a (AMNOG)  │
│   French Code de la santé publique (SMR/ASMR) • TA679 • TA793 • TA388   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Dual Prediction Engine: MCDM Simulation + Calibrated Ensemble ML

PayerLens features a complementary dual prediction architecture:

### 1. Multi-Attribute Decision Model (MCDM) Simulation Engine
- **Annual Price Elasticity Slider**: Dynamically adjusts price between €1,500 and €8,500/patient/year (calibrated against standard oral specialty baseline of €4,200/year).
- **Companion Diagnostic Toggle**: Models the impact of mandatory NT-proBNP assays on NHS pathology tariffs (NICE DAP), German Labor-Richtlinie accreditation, and French RIHN reimbursement.
- **Statutory Budget Impact Warning System**: Real-time detection of triggers:
  - 🇬🇧 UK: Net spend > £20M triggers mandatory NHS Commercial Medicines Unit (CMU) negotiations.
  - 🇩🇪 Germany: Annual turnover > €30M triggers mandatory statutory price renegotiation.
  - 🇫🇷 France: Annual sales > €20M triggers mandatory CEESP medico-economic evaluation.

### 2. Calibrated Machine Learning Ensemble Microservice (v3.0)
- **Architecture**: Soft Voting Ensemble combining **Random Forest** and **HistGradientBoosting** calibrated via **Sigmoid Probability Calibration (`CalibratedClassifierCV`)**.
- **Performance**: **85.56% 5-Fold Stratified Cross-Validation Accuracy** across 360 jurisdiction-specific records (F1-score: 0.8537, Log Loss: 0.4365).
- **16-Feature Pipeline**: Integrates clinical hazard ratios, hospitalisation reductions, direct head-to-head comparator vs `zVT`, companion diagnostics, ICER band, quality of life (PRO/KCCQ), study design grade, and budget impact.
- **Explainable AI (XAI)**: Returns top **decision catalysts** and **regulatory frictions** for each prediction.
- For complete training data and technical specifications, see [MODEL_CARD.md](MODEL_CARD.md).

---

## Key Platform Features

- 🏛️ **Novo Nordisk Silo Breaker (Team Persona Bar)**: Cross-functional perspectives tailored for **Commercial / Market Access**, **HEOR**, **Regulatory Affairs**, and **Clinical Development**.
- 💡 **Strategic Recommendation Engine (PS 20 Optimization Banner)**: Executive guidance on optimal patient subgroups, launch sequencing (Wave 1: DE ➔ Wave 2: UK ➔ Wave 3: FR), and critical evidence gaps.
- 🧪 **Interactive Custom Molecule & Trial Endpoint Simulator**: Interactive modal allowing users to enter custom trial endpoints (HR mortality, readmission reduction, active comparator vs `zVT`, companion diagnostic, price) and run live ML inference.
- 📐 **"How Numbers are Derived" Methodology Audit Modal**: 4 transparent tabs detailing:
  1. *Population Derivations*: How the 3.37M EU-3 adult HF prevalent pool is partitioned.
  2. *Access Probability Model*: Mathematical calibration of baseline HTA approval scores.
  3. *Clinical Trial Hazard Ratios*: Phase 3 RCT hazard ratios and relative risk reductions.
  4. *Budget Impact Formulas*: Exact formulas for net budget spend and price elasticity decay curves.
- 📊 **Comparative Recharts Visualizations**: Toggle between Active Scenario bar chart, Cross-Precedent benchmark, and Price Sensitivity curves with the **70% HTA Viability Benchmark** dashed reference line.
- 📁 **Slide-Over Audit Dossier Drawer**: Comprehensive 14-source bibliography with direct links to primary publications and statutory dockets.
- 🎨 **Institutional Biopharma Aesthetic**: Tailored corporate palette (Novo Nordisk navy `#00205b`, clean cards, calm typography, and zero clutter).

---

## Directory Structure

```
payerlens/
├── backend/
│   ├── server.py              # FastAPI ML Backend Service (v3.0, port 8000)
│   └── README.md              # Backend API documentation & schemas
├── src/
│   ├── components/
│   │   ├── Header.jsx         # Corporate header, citation taxonomy, audit triggers
│   │   ├── TeamPersonaBar.jsx # Silo-breaker cross-functional persona filter
│   │   ├── StrategicRecommendationBanner.jsx # PS 20 executive directive banner
│   │   ├── ControlsPanel.jsx  # Interactive scenario & parameter controls
│   │   ├── MetricCard.jsx     # National HTA appraisal cards (UK, DE, FR)
│   │   ├── ComparisonChart.jsx# Recharts bar, cross-scenario, & price curve visualizations
│   │   ├── EvidenceMatrix.jsx # 3-card bottom section: Clinical, Objections, Strategy
│   │   ├── CountryModal.jsx   # Deep-dive national HTA appraisal modal
│   │   ├── EvidenceModal.jsx  # Clinical protocol, objections, and playbook modal
│   │   ├── MethodologyModal.jsx # 4-tab mathematical derivations audit modal
│   │   ├── CustomSimulatorModal.jsx # Custom drug molecule ML simulation modal
│   │   ├── ProvenanceDrawer.jsx # Slide-over 3-layer data architecture dossier
│   │   ├── ProvenanceBadge.jsx # Audit classification badges
│   │   └── ProvenanceTooltip.jsx # Popover citation audit tooltips
│   ├── data/
│   │   └── payerData.js       # Master dataset with 100% provenance audit trail
│   ├── services/
│   │   └── mlService.js       # Frontend client for FastAPI ML service
│   ├── App.jsx                # Main application component & state management
│   └── main.jsx               # React DOM entry point
├── hta_training_dataset.csv   # 360-record HTA training corpus
├── train_model.py             # ML model training pipeline with 5-fold CV
├── payerlens_rf_model.pkl     # Trained & calibrated ensemble model artifact
├── MODEL_CARD.md              # Comprehensive model card documentation
├── package.json               # Node.js dependencies & scripts
└── README.md                  # Project documentation (this file)
```

---

## Getting Started

### Prerequisites
- **Node.js** (v18 or higher) & **npm**
- **Python** (3.10 or higher) with `pip`

### 1. Frontend Setup
```bash
# Navigate to project directory
cd payerlens

# Install dependencies
npm install

# Start Vite development server (runs on http://localhost:5173/)
npm run dev
```

### 2. Machine Learning Backend Setup (Optional but Recommended)
The frontend automatically connects to the FastAPI ML service for live inference, with a calibrated fallback if offline:
```bash
# In a new terminal, activate your Python virtual environment
source venv/bin/activate  # or: python3 -m venv venv && source venv/bin/activate

# Install backend dependencies
pip install fastapi uvicorn scikit-learn pandas numpy pydantic

# Start the FastAPI ML server (runs on http://localhost:8000/)
python backend/server.py
```

Verify backend health:
```bash
curl http://localhost:8000/health
# Response: {"status":"healthy","model_version":"v3.0.0"}
```

### 3. Build for Production
```bash
npm run build
```

---

## Citation & Academic Provenance

If citing this software or methodology for health economics and market access evaluations:

```bibtex
@software{payerlens_ai_2026,
  author = {PayerLens AI Team},
  title = {PayerLens AI: Predicting Patient Access Through Payer & Healthcare Ecosystem Intelligence},
  year = {2026},
  organization = {Novo Nordisk Hackathon 2026},
  url = {https://github.com/Amogh-Gurudatta/PayerLens-AI}
}
```

---

*Built for the **Novo Nordisk Hackathon 2026** &bull; Global Health Economics & Outcomes Research (HEOR) Track.*
