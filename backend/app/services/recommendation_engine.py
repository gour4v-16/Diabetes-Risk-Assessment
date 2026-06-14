from app.schemas.request_schema import PredictionRequest

class RecommendationEngine:
    def __init__(self):
        pass
        
    def generate_recommendations(self, request: PredictionRequest) -> list:
        """
        Generates personalized recommendations based on the user's input factors.
        """
        recommendations = []
        
        # BMI > 30 -> Recommend weight reduction.
        if request.BMI > 30:
            recommendations.append("Weight reduction recommended")
            
        # EXER_STATUS indicates no exercise -> Recommend physical activity.
        # Assuming 0 = no exercise based on standard BRFSS mapping
        if request.EXER_STATUS == 0:
            recommendations.append("Increase physical activity")
            
        # SMOK_STATUS indicates smoker -> Recommend smoking cessation.
        # Assuming >0 means current/former, or specific coding for current smoker
        if request.SMOK_STATUS > 0:
            recommendations.append("Smoking cessation recommended")
            
        # ALHL_STATUS indicates heavy alcohol use -> Recommend reducing alcohol consumption.
        if request.ALHL_STATUS == 2:
            recommendations.append("Reduce alcohol consumption")
            
        # GEN_HLTH poor -> Recommend regular health monitoring.
        # Assuming 4 or 5 is fair/poor in standard coding
        if request.GEN_HLTH >= 4:
            recommendations.append("Regular health monitoring recommended")
            
        # HAD_HEARTDISEASE = 1 -> Recommend cardiovascular consultation.
        if request.HAD_HEARTDISEASE == 1:
            recommendations.append("Cardiovascular consultation recommended")
            
        # HAD_STROKE = 1 -> Recommend neurological follow-up.
        if request.HAD_STROKE == 1:
            recommendations.append("Neurological follow-up recommended")
            
        return recommendations

recommendation_engine = RecommendationEngine()
