from fastapi import APIRouter
from app.schemas.request_schema import PredictionRequest
from app.schemas.response_schema import PredictionResponse
from app.utils.feature_mapper import map_request_to_features
from app.services.predictor import predictor
from app.services.recommendation_engine import recommendation_engine

router = APIRouter(prefix="/predict", tags=["prediction"])

@router.post("/", response_model=PredictionResponse)
def predict_risk(request: PredictionRequest):
    """
    Endpoint to receive patient data and return the diabetes risk prediction.
    """
    # Step 1: Create DataFrame from request with exact column order
    df = map_request_to_features(request)
    
    # Step 2-6: Run prediction
    result = predictor.predict_risk(df)

    # Step 7: Generate recommendations
    recommendations = recommendation_engine.generate_recommendations(request)

    # Add recommendations to result
    result["recommendations"] = recommendations

    # Step 8: Return final response
    return result
