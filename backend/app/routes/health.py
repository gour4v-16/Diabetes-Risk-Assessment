from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["health"])

@router.get("/")
def check_health():
    """
    Health check endpoint to ensure the API is running.
    """
    return {"status": "healthy"}
