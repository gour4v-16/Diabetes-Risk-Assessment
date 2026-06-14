from pydantic import BaseModel

class PredictionRequest(BaseModel):
    DCTR_STATUS: int
    EXER_STATUS: int
    HAD_HEARTDISEASE: int
    ALHL_STATUS: int
    SMOK_STATUS: int
    GEN_HLTH: int
    HAD_STROKE: int
    AGE: int
    SEX: int
    MENT_HLTH_DAYS: int
    PHYS_HLTH_DAYS: int
    BMI: float
    CHKP_STATUS: int

    class Config:
        schema_extra = {
            "example": {
                "DCTR_STATUS": 1,
                "EXER_STATUS": 1,
                "HAD_HEARTDISEASE": 0,
                "ALHL_STATUS": 2,
                "SMOK_STATUS": 0,
                "GEN_HLTH": 3,
                "HAD_STROKE": 0,
                "AGE": 4,
                "SEX": 1,
                "MENT_HLTH_DAYS": 2,
                "PHYS_HLTH_DAYS": 1,
                "BMI": 28.5,
                "CHKP_STATUS": 1
            }
        }
