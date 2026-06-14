# Diabetes Risk Prediction Backend

A FastAPI based backend for the Machine Learning Diabetes Risk Prediction System.

## Structure
- `app/`: Main application logic
  - `routes/`: API endpoints
  - `schemas/`: Pydantic models for request/response
  - `services/`: Business logic, model loading, predictions
  - `utils/`: Helper functions
- `saved_models/`: Directory to place trained ML models (.pkl, .h5, .json)
- `tests/`: Unit and integration tests

## Setup
1. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the development server:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Documentation
Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
