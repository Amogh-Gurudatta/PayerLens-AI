# PayerLens AI: FastAPI ML Backend Service (v3.0)

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-1.6+-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Model Version](https://img.shields.io/badge/Model-v3.0.0-4f46e5?style=for-the-badge)](#model-architecture)
[![Port](https://img.shields.io/badge/Port-8000-blue?style=for-the-badge)](#running-the-server)

The **PayerLens AI ML Backend** is a high-performance Python microservice serving real-time Health Technology Assessment (HTA) reimbursement access predictions across the UK (NICE), Germany (G-BA / IQWiG), and France (HAS Transparence).

---

## Architecture & Model Details

- **Framework**: FastAPI with asynchronous endpoints, CORS middleware, and Pydantic v2 data validation.
- **Ensemble Model**: Soft Voting Ensemble combining **Random Forest** and **HistGradientBoosting** with **Sigmoid Probability Calibration (`CalibratedClassifierCV`)**.
- **Model Formats Supported**:
  - **v3 (Country-Specific Models)**: Discrete calibrated models trained specifically for UK, Germany, and France jurisdiction policy dynamics (13 core features).
  - **v2.0.0 (Unified Fallback Model)**: Single 16-feature model with one-hot encoded country indicators for universal compatibility.
- **Model Artifact**: Serialized pickle file located at `payerlens_rf_model.pkl`.

---

## API Endpoints

### 1. Health Check
`GET /health`

Checks if the service is running and reports the loaded model version.

**Response:**
```json
{
  "status": "healthy",
  "model_version": "v3.0.0",
  "features": 13
}
```

---

### 2. Predict Access Probabilities
`POST /predict`

Computes calibrated HTA reimbursement probabilities for the UK, Germany, and France given trial endpoints and commercial parameters.

#### Request Body Schema (`PredictRequest`)
| Field | Type | Range / Description | Default |
|---|---|---|---|
| `icer_band` | `int` | `0: <£20k`, `1: £20k-£30k`, `2: £30k-£50k`, `3: >£50k` | `1` |
| `direct_comparator` | `int` | `1` = Head-to-head trial vs statutory comparator (`zVT`), `0` = Indirect comparison | `1` |
| `hr_mortality` | `float` | Hazard ratio for cardiovascular death / all-cause mortality (`0.10` to `2.00`) | `0.75` |
| `hosp_reduction` | `float` | Percentage reduction in heart failure hospitalisations (`0.0` to `100.0%`) | `25.0` |
| `biomarker_defined` | `int` | `1` = Biomarker-restricted (e.g. NT-proBNP), `0` = Broad unselected | `0` |
| `budget_impact_m` | `float` | Annual national net budget expenditure (£M/€M) | `20.0` |
| `unmet_need` | `int` | Clinical unmet need rating (`1` to `5`, where 5 is severe/refractory) | `4` |
| `orphan_status` | `int` | `1` = EMA Orphan Drug Designation, `0` = Non-orphan | `0` |
| `qol_improvement` | `float` | Utility gain / PRO improvement (KCCQ / EQ-5D, `0.0` to `1.0`) | `0.10` |
| `evidence_grade` | `int` | `1: Case series`, `2: Phase 2/ITC`, `3: Double-blind Phase 3 RCT`, `4: RCT Meta-analysis` | `3` |
| `prespecified_subgroup` | `int` | `1` = Pre-specified in SAP, `0` = Post-hoc analysis | `0` |
| `safety_tolerability` | `int` | `1: Poor`, `2: Moderate`, `3: Favorable`, `4: Excellent` | `3` |
| `cost_ratio_soc` | `float` | Acquisition price as a ratio against existing standard of care | `1.0` |

**Example Request:**
```json
{
  "icer_band": 0,
  "direct_comparator": 1,
  "hr_mortality": 0.68,
  "hosp_reduction": 32.0,
  "biomarker_defined": 1,
  "budget_impact_m": 15.0,
  "unmet_need": 4,
  "orphan_status": 0,
  "qol_improvement": 0.15,
  "evidence_grade": 3,
  "prespecified_subgroup": 1,
  "safety_tolerability": 3,
  "cost_ratio_soc": 1.6
}
```

**Example Response:**
```json
{
  "UK": 95.5,
  "Germany": 93.5,
  "France": 95.7,
  "model_version": "v3.0.0",
  "details": {
    "UK_class_probs": {
      "Rejected": 2.1,
      "Restricted": 7.8,
      "Full_Positive": 90.1
    },
    "Germany_class_probs": {
      "Rejected": 3.4,
      "Restricted": 10.5,
      "Full_Positive": 86.1
    },
    "France_class_probs": {
      "Rejected": 1.9,
      "Restricted": 8.0,
      "Full_Positive": 90.1
    },
    "feature_count": 13,
    "model_version": "v3.0.0"
  }
}
```

---

## Running the Server

### 1. Install Dependencies
```bash
pip install fastapi uvicorn scikit-learn pandas numpy pydantic
```

### 2. Start Uvicorn Server
```bash
# Direct execution:
python backend/server.py

# Or via Uvicorn CLI:
uvicorn backend.server:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Interactive Documentation
When running, FastAPI provides interactive Swagger documentation at:
- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
