from pydantic import BaseModel
from typing import List, Dict

class PredictionResponse(BaseModel):
    risk_score: float
    risk_category: str
    model_scores: Dict[str, float]
    recommendations: List[str]
