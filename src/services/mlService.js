/**
 * PayerLens AI - ML Backend Service Integration Client
 * Novo Nordisk GBS Hackathon 2026
 * 
 * Interacts with FastAPI backend (POST /predict) and handles fallback/offline mode.
 */

const API_BASE_URL = 'http://localhost:8000';

export async function getMLPrediction(scenarioParams) {
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      details: data.details,
      isLive: true
    };
  } catch (error) {
    console.warn('FastAPI ML backend offline or unreachable. Falling back to calibrated local predictions:', error.message);
    return null;
  }
}
