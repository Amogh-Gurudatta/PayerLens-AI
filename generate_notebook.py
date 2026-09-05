import json

notebook = {
    'cells': [
        {
            'cell_type': 'markdown',
            'metadata': {},
            'source': [
                '# PayerLens AI - Machine Learning Model Training & HTA Scenario Scoring\n',
                '**Novo Nordisk GBS Hackathon 2026**\n\n',
                'This notebook trains the **Random Forest Reimbursement Classifier** for PayerLens AI across three HTA bodies:\n',
                '1. **NICE (UK)** - Cost-effectiveness threshold (£20k-£30k/QALY)\n',
                '2. **G-BA (Germany)** - Added benefit rating vs designated comparator (zVT)\n',
                '3. **HAS (France)** - SMR (medical benefit) and ASMR (added value I-V)\n\n',
                '### Provenance & Citation Audit\n',
                'Every row in the training set contains explicit `source_url` and `citation_id` provenance tags.'
            ]
        },
        {
            'cell_type': 'code',
            'execution_count': None,
            'metadata': {},
            'outputs': [],
            'source': [
                '# 1. Imports and Environment Setup\n',
                'import os\n',
                'import json\n',
                'import pickle\n',
                'import numpy as np\n',
                'import pandas as pd\n',
                'import requests\n',
                'from sklearn.model_selection import train_test_split\n',
                'from sklearn.ensemble import RandomForestClassifier\n',
                'from sklearn.metrics import classification_report, confusion_matrix, accuracy_score\n',
                '\n',
                'SEED = 42\n',
                'np.random.seed(SEED)\n',
                'print("Libraries imported successfully.")'
            ]
        },
        {
            'cell_type': 'markdown',
            'metadata': {},
            'source': [
                '## 2. Data Sourcing & Assembly\n',
                'Pulling real HTA precedent records from NICE, HAS (data.gouv.fr), G-BA, and ClinicalTrials.gov REST API.'
            ]
        },
        {
            'cell_type': 'code',
            'execution_count': None,
            'metadata': {},
            'outputs': [],
            'source': [
                '# Fetch trial metadata from ClinicalTrials.gov\n',
                'url = "https://clinicaltrials.gov/api/v2/studies?query.cond=Heart%20Failure&pageSize=10"\n',
                'r = requests.get(url)\n',
                'print("ClinicalTrials.gov API Status:", r.status_code)\n',
                'studies = r.json().get("studies", [])\n',
                'print(f"Fetched {len(studies)} active heart failure trial records.")'
            ]
        },
        {
            'cell_type': 'code',
            'execution_count': None,
            'metadata': {},
            'outputs': [],
            'source': [
                '# Load HTA Training Dataset\n',
                'df = pd.read_csv("hta_training_dataset.csv")\n',
                'print(f"Dataset shape: {df.shape}")\n',
                'df.head(10)'
            ]
        },
        {
            'cell_type': 'markdown',
            'metadata': {},
            'source': [
                '## 3. Feature Engineering & One-Hot Encoding\n',
                'Mapping feature vectors (`country`, `icer_band`, `direct_comparator`, `hr_mortality`, `hosp_reduction`, `biomarker_defined`, `budget_impact_m`, `unmet_need`, `orphan_status`).'
            ]
        },
        {
            'cell_type': 'code',
            'execution_count': None,
            'metadata': {},
            'outputs': [],
            'source': [
                'feature_cols = [\n',
                '    "country_DE", "country_FR", "country_UK",\n',
                '    "icer_band", "direct_comparator", "hr_mortality",\n',
                '    "hosp_reduction", "biomarker_defined", "budget_impact_m",\n',
                '    "unmet_need", "orphan_status"\n',
                ']\n',
                'df_encoded = pd.get_dummies(df, columns=["country"], prefix="country")\n',
                'for c in ["country_DE", "country_FR", "country_UK"]:\n',
                '    if c not in df_encoded.columns:\n',
                '        df_encoded[c] = 0\n',
                '\n',
                'X = df_encoded[feature_cols].astype(float)\n',
                'y = df_encoded["outcome_label"].astype(int)\n',
                'print("Feature matrix shape:", X.shape)\n',
                'print("Target distribution:", y.value_counts().to_dict())'
            ]
        },
        {
            'cell_type': 'markdown',
            'metadata': {},
            'source': [
                '## 4. Random Forest Model Training & Evaluation'
            ]
        },
        {
            'cell_type': 'code',
            'execution_count': None,
            'metadata': {},
            'outputs': [],
            'source': [
                'X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=SEED, stratify=y)\n',
                'rf = RandomForestClassifier(n_estimators=100, max_depth=5, class_weight="balanced", random_state=SEED)\n',
                'rf.fit(X_train, y_train)\n',
                'y_pred = rf.predict(X_test)\n',
                'acc = accuracy_score(y_test, y_pred)\n',
                'print(f"Model Accuracy: {acc * 100:.2f}%\")\n',
                'print("\\nClassification Report:")\n',
                'print(classification_report(y_test, y_pred, target_names=["Rejected", "Restricted", "Full Positive"]))\n',
                'print("\\nConfusion Matrix:")\n',
                'print(confusion_matrix(y_test, y_pred))\n',
                '# Save pickle artifact\n',
                'with open("payerlens_rf_model.pkl", "wb") as f:\n',
                '    pickle.dump({"model": rf, "feature_cols": feature_cols, "accuracy": acc}, f)'
            ]
        },
        {
            'cell_type': 'markdown',
            'metadata': {},
            'source': [
                '## 5. Scoring 5 Heart Failure Hackathon Scenarios (D, C, B, E, A)'
            ]
        },
        {
            'cell_type': 'code',
            'execution_count': None,
            'metadata': {},
            'outputs': [],
            'source': [
                'scenarios = {\n',
                '    "D": {"name": "Biomarker-Defined High Risk", "icer_band": 0, "direct_comparator": 1, "hr_mortality": 0.68, "hosp_reduction": 32.0, "biomarker_defined": 1, "budget_impact_m": 15.0, "unmet_need": 4, "orphan_status": 0},\n',
                '    "C": {"name": "Frequent Hospitalisations", "icer_band": 0, "direct_comparator": 1, "hr_mortality": 0.71, "hosp_reduction": 29.0, "biomarker_defined": 0, "budget_impact_m": 22.0, "unmet_need": 4, "orphan_status": 0},\n',
                '    "B": {"name": "High Risk Despite SoC", "icer_band": 1, "direct_comparator": 1, "hr_mortality": 0.74, "hosp_reduction": 26.0, "biomarker_defined": 0, "budget_impact_m": 35.0, "unmet_need": 3, "orphan_status": 0},\n',
                '    "E": {"name": "Later-Line Refractory", "icer_band": 2, "direct_comparator": 0, "hr_mortality": 0.79, "hosp_reduction": 21.0, "biomarker_defined": 0, "budget_impact_m": 10.0, "unmet_need": 5, "orphan_status": 0},\n',
                '    "A": {"name": "Broad Unselected HF", "icer_band": 2, "direct_comparator": 0, "hr_mortality": 0.88, "hosp_reduction": 12.0, "biomarker_defined": 0, "budget_impact_m": 85.0, "unmet_need": 2, "orphan_status": 0}\n',
                '}\n',
                'results = []\n',
                'for code, params in scenarios.items():\n',
                '    row = {"Scenario": f"{code}: {params[\'name\']}"}\n',
                '    for cntry in ["UK", "DE", "FR"]:\n',
                '        vec = {\n',
                '            "country_DE": 1.0 if cntry == "DE" else 0.0,\n',
                '            "country_FR": 1.0 if cntry == "FR" else 0.0,\n',
                '            "country_UK": 1.0 if cntry == "UK" else 0.0,\n',
                '            **{k: float(v) for k, v in params.items() if k != "name"}\n',
                '        }\n',
                '        probs = rf.predict_proba(pd.DataFrame([vec])[feature_cols])[0]\n',
                '        access_prob = (probs[1] * 0.70 + probs[2] * 1.00) * 100\n',
                '        row[cntry] = f"{access_prob:.1f}%"\n',
                '    results.append(row)\n',
                'df_scenarios = pd.DataFrame(results)\n',
                'print(df_scenarios.to_string(index=False))'
            ]
        }
    ],
    'metadata': {
        'language_info': {'name': 'python'}
    },
    'nbformat': 4,
    'nbformat_minor': 2
}

with open('payerlens_ml_training.ipynb', 'w') as f:
    json.dump(notebook, f, indent=2)

print("Notebook payerlens_ml_training.ipynb created successfully!")
