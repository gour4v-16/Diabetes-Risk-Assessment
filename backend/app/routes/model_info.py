from fastapi import APIRouter

router = APIRouter(prefix="/model-info", tags=["model-info"])

@router.get("/")
def get_model_info():
    """
    Endpoint to retrieve specifications of the trained models.
    """
    return {
        "reference_cohort": "BRFSS 2023 + BRFSS 2024",
        "original_dataset_size": "~700,000 records",
        "training_dataset_size": "80,000 processed samples",
        "feature_count": 13,
        "target_variable": "Diabetes Risk Prediction",
        "validation_split": "80% Training / 20% Testing",
        "models": [
            "Random Forest",
            "XGBoost",
            "Artificial Neural Network (ANN)"
        ],
        "ensemble_method": "Weighted Voting Ensemble",
        "model_weights": {
            "Random Forest": "30%",
            "XGBoost": "40%",
            "ANN": "30%"
        },
        "ann_architecture": {
            "input_layer": "13 features",
            "hidden_layer_1": "32 neurons (ReLU)",
            "hidden_layer_2": "16 neurons (ReLU)",
            "output_layer": "1 neuron (Sigmoid)",
            "optimizer": "Adam"
        },
        "metrics": [
            { "label": "Evaluation Accuracy", "value": 71.4, "detail": "Overall predictive validity" },
            { "label": "ROC-AUC Index", "value": 78.2, "detail": "Discriminant performance score (x100)" },
            { "label": "Precision", "value": 70.0, "detail": "Positive predictive value" },
            { "label": "Sensitivity / Recall", "value": 75.0, "detail": "True positive detection rate" },
            { "label": "F1 Score", "value": 72.0, "detail": "Harmonic mean of precision and recall" }
        ],
        "confusion_matrix": {
            "tn": 6265,
            "fp": 2938,
            "fn": 2328,
            "tp": 6872,
            "tn_pct": 34.0,
            "fp_pct": 16.0,
            "fn_pct": 12.6,
            "tp_pct": 37.3
        },
        "roc_auc": 0.782
    }
