import os
import joblib
import tensorflow as tf

class ModelLoader:
    def __init__(self):
        self.rf_model = None
        self.xgb_model = None
        self.ann_model = None
        self.scaler = None
        
    def load_models(self):
        """
        Loads the trained models from the saved_models directory.
        """
        try:
            # Random Forest from rf_model.pkl
            self.rf_model = joblib.load("saved_models/rf_model.pkl")
            
            # XGBoost from xgb_model.pkl
            self.xgb_model = joblib.load("saved_models/xgb_model.pkl")
            
            # ANN from ann_model.h5
            self.ann_model = tf.keras.models.load_model("saved_models/ann_model.h5")
            
            # StandardScaler from scaler.pkl
            self.scaler = joblib.load("saved_models/scaler.pkl")
            print("Successfully loaded all ML models and scaler.")
        except Exception as e:
            print(f"Warning: Failed to load models. Ensure they exist in saved_models. Error: {e}")

model_loader = ModelLoader()
