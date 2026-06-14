import pandas as pd
from app.schemas.request_schema import PredictionRequest

# The exact feature order required by the models
FEATURE_ORDER = [
    "DCTR_STATUS",
    "EXER_STATUS",
    "HAD_HEARTDISEASE",
    "ALHL_STATUS",
    "SMOK_STATUS",
    "GEN_HLTH",
    "HAD_STROKE",
    "AGE",
    "SEX",
    "MENT_HLTH_DAYS",
    "PHYS_HLTH_DAYS",
    "BMI",
    "CHKP_STATUS"
]

def map_request_to_features(request: PredictionRequest) -> pd.DataFrame:
    """
    Maps the PredictionRequest payload to a Pandas DataFrame 
    with the exact required column order.
    """
    data = {
        "DCTR_STATUS": [request.DCTR_STATUS],
        "EXER_STATUS": [request.EXER_STATUS],
        "HAD_HEARTDISEASE": [request.HAD_HEARTDISEASE],
        "ALHL_STATUS": [request.ALHL_STATUS],
        "SMOK_STATUS": [request.SMOK_STATUS],
        "GEN_HLTH": [request.GEN_HLTH],
        "HAD_STROKE": [request.HAD_STROKE],
        "AGE": [request.AGE],
        "SEX": [request.SEX],
        "MENT_HLTH_DAYS": [request.MENT_HLTH_DAYS],
        "PHYS_HLTH_DAYS": [request.PHYS_HLTH_DAYS],
        "BMI": [request.BMI],
        "CHKP_STATUS": [request.CHKP_STATUS]
    }
    df = pd.DataFrame(data)
    # Ensure exact column order
    return df[FEATURE_ORDER]
