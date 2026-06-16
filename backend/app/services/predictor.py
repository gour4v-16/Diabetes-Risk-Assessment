import pandas as pd
from app.services.model_loader import model_loader


class Predictor:
    def __init__(self):
        pass

    def predict_risk(self, df: pd.DataFrame):

        # If models are not loaded (testing mode)
        if not all([
            model_loader.xgb_model,
            model_loader.scaler
        ]):
            return {
                "risk_score": 0.0,
                "risk_category": "Unknown",
                "confidence": "Low",
                "gauge_color": "yellow",
                "model_scores": {
                    "xgboost": 0.0
                },
                "top_risk_factors": []
            }

        # XGBoost prediction
        xgb_prob = model_loader.xgb_model.predict_proba(df)[0][1]

        final_risk_percentage = xgb_prob * 100

        # Risk category
        if final_risk_percentage <= 30:
            risk_category = "Low Risk"
            gauge_color = "green"

        elif final_risk_percentage <= 60:
            risk_category = "Moderate Risk"
            gauge_color = "yellow"

        else:
            risk_category = "High Risk"
            gauge_color = "red"

        # Model scores (XGBoost only)
        model_scores = {
            "xgboost": round(float(xgb_prob * 100), 1)
        }

        # Confidence is always High with a single model
        confidence = "High"

        # Risk factors
        top_risk_factors = []

        row = df.iloc[0]

        if row["BMI"] >= 30:
            top_risk_factors.append("High BMI")

        if row["SMOK_STATUS"] == 1:
            top_risk_factors.append("Smoking")

        if row["HAD_HEARTDISEASE"] == 1:
            top_risk_factors.append("Heart Disease")

        if row["GEN_HLTH"] >= 4:
            top_risk_factors.append("Poor General Health")

        if row["HAD_STROKE"] == 1:
            top_risk_factors.append("History of Stroke")

        if row["PHYS_HLTH_DAYS"] > 10:
            top_risk_factors.append("Poor Physical Health")

        return {
            "risk_score": round(final_risk_percentage, 1),
            "risk_category": risk_category,
            "confidence": confidence,
            "gauge_color": gauge_color,
            "model_scores": model_scores,
            "top_risk_factors": top_risk_factors
        }


predictor = Predictor()