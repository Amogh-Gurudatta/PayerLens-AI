"""
PayerLens AI - FastAPI ML Backend Service
Novo Nordisk GBS Hackathon 2026

Exposes ML prediction endpoints for drug reimbursement probabilities across UK (NICE),
Germany (G-BA), and France (HAS).
"""

import os
import pickle
import numpy as np
import pandas as pd
from typing import Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="PayerLens AI ML Service",
    description="Calibrated Random Forest HTA Reimbursement Prediction Service",
    version="1.0.0"
)

# Enable CORS for frontend integration (Vite dev server & local apps)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained Random Forest model
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "payerlens_rf_model.pkl")
if not os.path.exists(MODEL_PATH):
    MODEL_PATH = "payerlens_rf_model.pkl"

model_artifact = None
rf_model = None
feature_cols = []

def load_model():
    global model_artifact, rf_model, feature_cols
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, "rb") as f:
            model_artifact = pickle.load(f)
            rf_model = model_artifact["model"]
            feature_cols = model_artifact["feature_cols"]
        print(f"Successfully loaded model from {MODEL_PATH}")
    else:
        print(f"Warning: Model file not found at {MODEL_PATH}")

@app.on_event("startup")
def startup_event():
    load_model()

class PredictRequest(BaseModel):
    country: Optional[str] = Field(None, description="Country code: UK, DE, FR (optional, if omitted calculates all 3)")
    icer_band: int = Field(0, ge=0, le=3, description="0: <£20k, 1: £20-30k, 2: £30-50k, 3: >£50k")
    direct_comparator: int = Field(1, ge=0, le=1, description="1 if head-to-head trial vs standard of care, 0 otherwise")
    hr_mortality: float = Field(0.70, ge=0.0, le=2.0, description="Hazard ratio for mortality/morbidity benefit")
    hosp_reduction: float = Field(25.0, ge=0.0, le=100.0, description="Percentage reduction in hospitalisations")
    biomarker_defined: int = Field(0, ge=0, le=1, description="1 if biomarker-restricted population, 0 otherwise")
    budget_impact_m: float = Field(20.0, ge=0.0, description="Estimated national annual budget impact in €M/£M")
    unmet_need: int = Field(4, ge=1, le=5, description="Unmet medical need severity scale (1-5)")
    orphan_status: int = Field(0, ge=0, le=1, description="1 if orphan drug designation, 0 otherwise")

class PredictResponse(BaseModel):
    UK: float = Field(..., description="Access probability percentage for UK (NICE)")
    Germany: float = Field(..., description="Access probability percentage for Germany (G-BA)")
    France: float = Field(..., description="Access probability percentage for France (HAS)")
    details: Optional[Dict[str, Any]] = Field(None, description="Detailed per-class probabilities")

@app.get("/health")
def health_check():
    return {
        "status": "online",
        "model_loaded": rf_model is not None,
        "feature_count": len(feature_cols),
        "service": "PayerLens AI ML Engine"
    }

def calculate_country_prob(country_code: str, req: PredictRequest) -> tuple[float, list]:
    """Helper to evaluate single country access probability."""
    vec = {
        "country_DE": 1.0 if country_code == "DE" else 0.0,
        "country_FR": 1.0 if country_code == "FR" else 0.0,
        "country_UK": 1.0 if country_code == "UK" else 0.0,
        "icer_band": float(req.icer_band),
        "direct_comparator": float(req.direct_comparator),
        "hr_mortality": float(req.hr_mortality),
        "hosp_reduction": float(req.hosp_reduction),
        "biomarker_defined": float(req.biomarker_defined),
        "budget_impact_m": float(req.budget_impact_m),
        "unmet_need": float(req.unmet_need),
        "orphan_status": float(req.orphan_status)
    }
    
    X_single = pd.DataFrame([vec])[feature_cols]
    probs = rf_model.predict_proba(X_single)[0]
    
    if len(probs) == 3:
        p_reject, p_restrict, p_positive = probs[0], probs[1], probs[2]
        # Access probability: P(Restricted)*0.70 + P(Full Positive)*1.00
        access_prob = round((p_restrict * 0.70 + p_positive * 1.00) * 100, 1)
    else:
        access_prob = round(probs[-1] * 100, 1)
        
    return access_prob, [round(p * 100, 1) for p in probs]

@app.post("/predict", response_model=PredictResponse)
def predict_reimbursement(req: PredictRequest):
    if rf_model is None:
        load_model()
        if rf_model is None:
            raise HTTPException(status_code=500, detail="ML model artifact not loaded.")
            
    uk_prob, uk_probs = calculate_country_prob("UK", req)
    de_prob, de_probs = calculate_country_prob("DE", req)
    fr_prob, fr_probs = calculate_country_prob("FR", req)
    
    return PredictResponse(
        UK=uk_prob,
        Germany=de_prob,
        France=fr_prob,
        details={
            "UK_class_probs": {"Rejected": uk_probs[0], "Restricted": uk_probs[1], "Full_Positive": uk_probs[2]},
            "Germany_class_probs": {"Rejected": de_probs[0], "Restricted": de_probs[1], "Full_Positive": de_probs[2]},
            "France_class_probs": {"Rejected": fr_probs[0], "Restricted": fr_probs[1], "Full_Positive": fr_probs[2]}
        }
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
