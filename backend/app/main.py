from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import health, predict, model_info
from app.config.settings import settings
from app.services.model_loader import model_loader

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Backend API for the Diabetes Risk Prediction System"
)

# Load all ML models upon startup
@app.on_event("startup")
def startup_event():
    model_loader.load_models()

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health.router)
app.include_router(predict.router)
app.include_router(model_info.router)
