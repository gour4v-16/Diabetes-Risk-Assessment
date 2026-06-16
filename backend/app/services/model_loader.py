import joblib


class ModelLoader:
    def __init__(self):
        self.xgb_model = None
        self.scaler = None

    def load_models(self):
        """
        Loads the XGBoost model and scaler from the saved_models directory.
        RF and ANN removed to reduce memory for Render free tier deployment.
        """
        try:
            # XGBoost from xgb_model.pkl
            self.xgb_model = joblib.load("saved_models/xgb_model.pkl")

            # StandardScaler from scaler.pkl
            self.scaler = joblib.load("saved_models/scaler.pkl")
            print("Successfully loaded XGBoost model and scaler.")
        except Exception as e:
            print(f"Warning: Failed to load models. Ensure they exist in saved_models. Error: {e}")


model_loader = ModelLoader()
