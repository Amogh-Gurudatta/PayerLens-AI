"""
PayerLens AI — FastAPI ML Backend Service v3
Novo Nordisk GBS Hackathon 2026

Supports model artifact v3 (country-specific VotingClassifier, 13 features)
and gracefully falls back to artifact v2.0.0 (single combined model, 16 features)
when running on the pulled GitHub version.
"""

import os, pickle, warnings
import numpy as np
import pandas as pd
from typing import Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

warnings.filterwarnings("ignore")

app = FastAPI(
    title="PayerLens AI ML Service",
    description="Calibrated Ensemble HTA Reimbursement Prediction — v3 (Best-of-Both)",
    version="3.0.0"
)

app.add_middleware(
    CORSMiddleware,
    # No cookies/auth are used by this API, so a wildcard origin is safe here —
    # but browsers reject "*" paired with allow_credentials=True, so keep that off.
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Model loading ────────────────────────────────────────────────────────────
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "payerlens_rf_model.pkl")
if not os.path.exists(MODEL_PATH):
    MODEL_PATH = "payerlens_rf_model.pkl"

model_artifact = None
COUNTRY_MODELS = {}          # {country_code: sklearn model}
COMBINED_MODEL = None        # fallback combined model
FEATURE_COLS   = []
MODEL_VERSION  = "unknown"

def load_model():
    global model_artifact, COUNTRY_MODELS, COMBINED_MODEL, FEATURE_COLS, MODEL_VERSION
    if not os.path.exists(MODEL_PATH):
        print(f"WARNING: Model file not found at {MODEL_PATH}")
        return
    with open(MODEL_PATH, "rb") as f:
        model_artifact = pickle.load(f)

    MODEL_VERSION = model_artifact.get("version", "v1")
    FEATURE_COLS  = model_artifact.get("feature_cols", [])

    # v3 format: country-specific models dict
    if "models" in model_artifact:
        COUNTRY_MODELS = model_artifact["models"]
        COMBINED_MODEL = COUNTRY_MODELS.get("COMBINED")
        print(f"Loaded v3 country-specific models: {list(COUNTRY_MODELS.keys())}")
    # v2.0.0 format: single combined model
    elif "model" in model_artifact:
        COMBINED_MODEL = model_artifact["model"]
        COUNTRY_MODELS = {}
        print(f"Loaded v2 single combined model (fallback mode)")

    print(f"Model version: {MODEL_VERSION} | Features: {FEATURE_COLS}")

@app.on_event("startup")
def startup_event():
    load_model()

# ─── Request / Response schemas ───────────────────────────────────────────────
class PredictRequest(BaseModel):
    country: Optional[str] = Field(None, description="UK, DE, or FR (optional)")
    # Core HTA features (v2 + v3)
    icer_band:            int   = Field(0,    ge=0, le=3,   description="0:<£20k 1:£20-30k 2:£30-50k 3:>£50k")
    direct_comparator:    int   = Field(1,    ge=0, le=1,   description="1=head-to-head vs SoC")
    hr_mortality:         float = Field(0.70, ge=0, le=2.0, description="Hazard ratio for mortality/morbidity")
    hosp_reduction:       float = Field(25.0, ge=0, le=100, description="% reduction in hospitalisations")
    biomarker_defined:    int   = Field(0,    ge=0, le=1,   description="1=biomarker-restricted population")
    budget_impact_m:      float = Field(20.0, ge=0,         description="Annual national budget impact £M/€M")
    unmet_need:           int   = Field(4,    ge=1, le=5,   description="Unmet medical need 1-5")
    orphan_status:        int   = Field(0,    ge=0, le=1,   description="1=orphan designation")
    # New v3 features (with sensible defaults so v2 frontend still works)
    qol_improvement:      float = Field(0.10, ge=0, le=1.0, description="QALY/utility improvement vs SoC")
    evidence_grade:       int   = Field(3,    ge=1, le=4,   description="1=case series → 4=RCT meta-analysis")
    prespecified_subgroup:int   = Field(0,    ge=0, le=1,   description="1=pre-specified subgroup analysis")
    safety_tolerability:  int   = Field(3,    ge=1, le=4,   description="Safety profile 1=poor → 4=excellent")
    cost_ratio_soc:       float = Field(1.0,  ge=0,         description="Drug cost as ratio vs standard of care")

class PredictResponse(BaseModel):
    UK:      Optional[float] = Field(None, description="NICE access probability % (null if `country` restricted the request to another market)")
    Germany: Optional[float] = Field(None, description="G-BA access probability % (null if `country` restricted the request to another market)")
    France:  Optional[float] = Field(None, description="HAS access probability % (null if `country` restricted the request to another market)")
    composite: Optional[float] = Field(None, description="Mean access probability % across the markets actually predicted")
    decision_drivers: Optional[Dict[str, Any]] = Field(None, description="Rule-based catalysts/frictions per market, for the explainability panel")
    details: Optional[Dict[str, Any]] = None
    model_version: str = "unknown"

# ─── Core prediction logic ────────────────────────────────────────────────────
# Feature sets for each model format
V3_FEATURES = [
    "icer_band", "direct_comparator", "hr_mortality", "hosp_reduction",
    "biomarker_defined", "budget_impact_m", "unmet_need", "orphan_status",
    "qol_improvement", "evidence_grade", "prespecified_subgroup",
    "safety_tolerability", "cost_ratio_soc"
]
V2_FEATURES = [
    "country_DE", "country_FR", "country_UK",
    "icer_band", "direct_comparator", "hr_mortality", "hosp_reduction",
    "biomarker_defined", "budget_impact_m", "unmet_need", "orphan_status",
    "qol_improvement", "evidence_grade", "prespecified_subgroup",
    "safety_tolerability", "cost_ratio_soc"
]

def build_feature_row(req: PredictRequest, country_code: str) -> pd.DataFrame:
    """Build a single-row feature DataFrame for the right model version."""
    base = {
        "icer_band":             float(req.icer_band),
        "direct_comparator":     float(req.direct_comparator),
        "hr_mortality":          float(req.hr_mortality),
        "hosp_reduction":        float(req.hosp_reduction),
        "biomarker_defined":     float(req.biomarker_defined),
        "budget_impact_m":       float(req.budget_impact_m),
        "unmet_need":            float(req.unmet_need),
        "orphan_status":         float(req.orphan_status),
        "qol_improvement":       float(req.qol_improvement),
        "evidence_grade":        float(req.evidence_grade),
        "prespecified_subgroup": float(req.prespecified_subgroup),
        "safety_tolerability":   float(req.safety_tolerability),
        "cost_ratio_soc":        float(req.cost_ratio_soc),
        # one-hot country flags for v2 fallback
        "country_DE":            1.0 if country_code == "DE" else 0.0,
        "country_FR":            1.0 if country_code == "FR" else 0.0,
        "country_UK":            1.0 if country_code == "UK" else 0.0,
    }
    cols = FEATURE_COLS if FEATURE_COLS else V3_FEATURES
    return pd.DataFrame([base])[cols]

def access_prob_from_proba(probs, classes):
    """Access % = P(Restricted)*0.70 + P(Full Positive)*1.00"""
    p = {int(c): float(p) for c, p in zip(classes, probs)}
    return round((p.get(1, 0) * 0.70 + p.get(2, 0) * 1.00) * 100, 1)

def predict_for_country(country_code: str, req: PredictRequest):
    X = build_feature_row(req, country_code)

    # Use country-specific model if available (v3)
    if country_code in COUNTRY_MODELS:
        model = COUNTRY_MODELS[country_code]
    elif COMBINED_MODEL is not None:
        model = COMBINED_MODEL
    else:
        raise HTTPException(status_code=500, detail="No model loaded")

    probs   = model.predict_proba(X)[0]
    classes = model.classes_
    access  = access_prob_from_proba(probs, classes)
    probs_pct = [round(float(p) * 100, 1) for p in probs]
    return access, probs_pct, classes

def build_decision_drivers(req: PredictRequest, country_codes) -> Dict[str, Any]:
    """Rule-based explainability: same qualitative logic the frontend uses in its
    offline fallback, applied to whichever markets were actually predicted."""
    country_names = {"UK": "UK", "DE": "Germany", "FR": "France"}
    drivers: Dict[str, Any] = {}

    for code in country_codes:
        catalysts, frictions = [], []

        if req.direct_comparator:
            if code == "DE":
                catalysts.append("Direct comparator vs guideline zVT")
            elif code == "UK":
                catalysts.append("Head-to-head trial vs standard of care")
            else:
                catalysts.append("Head-to-head comparator supports ASMR premium")
        else:
            if code == "DE":
                frictions.append("Lack of direct head-to-head comparator vs zVT")
            else:
                frictions.append("No active comparator; indirect comparison required")

        if req.qol_improvement and req.qol_improvement >= 0.10:
            catalysts.append("Demonstrated PRO / quality-of-life improvement")

        if code == "UK" and req.icer_band >= 2:
            frictions.append("ICER threshold exceedance requires commercial discount")

        if req.evidence_grade <= 2:
            frictions.append("Evidence grade below RCT standard weakens dossier")

        if code in ("UK", "DE") and not req.prespecified_subgroup:
            frictions.append("Post-hoc (non pre-specified) subgroup analysis")

        if req.biomarker_defined:
            catalysts.append("Biomarker-stratified population narrows uncertainty")

        drivers[country_names[code]] = {"catalysts": catalysts, "frictions": frictions}

    return drivers

# ─── Endpoints ────────────────────────────────────────────────────────────────
@app.get("/health")
def health_check():
    return {
        "status": "online",
        "model_version": MODEL_VERSION,
        "country_models": list(COUNTRY_MODELS.keys()),
        "feature_count": len(FEATURE_COLS),
        "service": "PayerLens AI ML Engine v3"
    }

@app.get("/model-info")
def model_info():
    if model_artifact is None:
        load_model()
        if model_artifact is None:
            raise HTTPException(status_code=500, detail="ML model artifact not loaded.")
    return {
        "model_version": MODEL_VERSION,
        "country_models": list(COUNTRY_MODELS.keys()),
        "feature_cols": FEATURE_COLS,
        "accuracies": model_artifact.get("accuracies"),
        "feature_importances": model_artifact.get("feature_importances"),
        "dataset_size": model_artifact.get("dataset_size"),
        "cv_accuracy": model_artifact.get("cv_accuracy"),
    }

@app.post("/predict", response_model=PredictResponse)
def predict_reimbursement(req: PredictRequest):
    if not COUNTRY_MODELS and COMBINED_MODEL is None:
        load_model()
        if not COUNTRY_MODELS and COMBINED_MODEL is None:
            raise HTTPException(status_code=500, detail="ML model artifact not loaded.")

    requested = req.country.strip().upper() if req.country else None
    country_codes = [requested] if requested in ("UK", "DE", "FR") else ["UK", "DE", "FR"]

    def class_dict(probs_pct, classes):
        labels = {0: "Rejected", 1: "Restricted", 2: "Full_Positive"}
        return {labels.get(int(c), str(c)): p for c, p in zip(classes, probs_pct)}

    results = {code: predict_for_country(code, req) for code in country_codes}
    access_by_code = {code: r[0] for code, r in results.items()}
    composite = round(sum(access_by_code.values()) / len(access_by_code), 1) if access_by_code else None

    details_key = {"UK": "UK_class_probs", "DE": "Germany_class_probs", "FR": "France_class_probs"}
    details = {
        details_key[code]: class_dict(probs_pct, classes)
        for code, (_, probs_pct, classes) in results.items()
    }
    details["feature_count"] = len(FEATURE_COLS)
    details["model_version"] = MODEL_VERSION

    return PredictResponse(
        UK=access_by_code.get("UK"),
        Germany=access_by_code.get("DE"),
        France=access_by_code.get("FR"),
        composite=composite,
        decision_drivers=build_decision_drivers(req, country_codes),
        model_version=MODEL_VERSION,
        details=details,
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
