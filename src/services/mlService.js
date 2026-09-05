/**
 * PayerLens AI - ML Backend Service Integration Client (v2.0)
 * Novo Nordisk GBS Hackathon 2026
 *
 * Interacts with FastAPI backend (POST /predict, GET /model-info) and provides
 * explainability decision drivers alongside calibrated access scores.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export async function getMLPrediction(scenarioParams) {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        icer_band: scenarioParams.icer_band ?? 0,
        direct_comparator: scenarioParams.direct_comparator ?? 1,
        hr_mortality: scenarioParams.hr_mortality ?? 0.74,
        hosp_reduction: scenarioParams.hosp_reduction ?? 25.0,
        biomarker_defined: scenarioParams.biomarker_defined ?? 0,
        budget_impact_m: scenarioParams.budget_impact_m ?? 20.0,
        unmet_need: scenarioParams.unmet_need ?? 4,
        orphan_status: scenarioParams.orphan_status ?? 0,
        qol_improvement: scenarioParams.qol_improvement ?? 1,
        evidence_grade: scenarioParams.evidence_grade ?? 3,
        prespecified_subgroup: scenarioParams.prespecified_subgroup ?? 1,
        safety_tolerability: scenarioParams.safety_tolerability ?? 3,
        cost_ratio_soc: scenarioParams.cost_ratio_soc ?? 1.6,
      }),
    });

    if (!response.ok) {
      throw new Error(`ML API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      UK: data.UK,
      Germany: data.Germany,
      France: data.France,
      composite: data.composite,
      details: data.details,
      decision_drivers: data.decision_drivers,
      isLive: true,
    };
  } catch (error) {
    console.warn(
      "FastAPI ML backend offline or unreachable. Falling back to calibrated local predictions:",
      error.message,
    );
    return null;
  }
}

export async function getMLModelInfo() {
  try {
    const response = await fetch(`${API_BASE_URL}/model-info`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
