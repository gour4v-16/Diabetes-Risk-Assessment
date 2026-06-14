const API_URL = `${import.meta.env.VITE_API_URL}/predict/`;

export const fetchPrediction = async (formData) => {
  // Map form data to backend schema expected by FastAPI
  const ageMap = {
    '18-24': 1, '25-29': 2, '30-34': 3, '35-39': 4,
    '40-44': 5, '45-49': 6, '50-54': 7, '55-59': 8,
    '60-64': 9, '65+': 10
  };

  const sexMap = { 'female': 0, 'male': 1 };
  const healthMap = { 'excellent': 1, 'very_good': 2, 'good': 3, 'fair': 4, 'poor': 5 };
  const smokeMap = { 'never': 0, 'former': 1, 'current': 2 };
  const alcoholMap = { 'none': 0, 'moderate': 1, 'heavy': 2 };
  const exerMap = { 'no': 0, 'yes': 1 };
  const boolMap = { 'no': 0, 'yes': 1 };
  
  const checkupMap = { 
    'within_year': 1, 
    'within_2_years': 2, 
    'within_5_years': 3, 
    'over_5_years': 4, 
    'never': 0 
  };

  const payload = {
    DCTR_STATUS: boolMap[formData.doctorStatus] ?? 0,
    EXER_STATUS: exerMap[formData.exercise] ?? 0,
    HAD_HEARTDISEASE: boolMap[formData.heartDisease] ?? 0,
    ALHL_STATUS: alcoholMap[formData.alcohol] ?? 0,
    SMOK_STATUS: smokeMap[formData.smoking] ?? 0,
    GEN_HLTH: healthMap[formData.generalHealth] ?? 0,
    HAD_STROKE: boolMap[formData.stroke] ?? 0,
    AGE: ageMap[formData.ageGroup] ?? 0,
    SEX: sexMap[formData.gender] ?? 0,
    MENT_HLTH_DAYS: parseInt(formData.mentalDays) || 0,
    PHYS_HLTH_DAYS: parseInt(formData.physicalDays) || 0,
    BMI: parseFloat(formData.bmi) || 0,
    CHKP_STATUS: checkupMap[formData.checkupStatus] ?? 0
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Prediction API Error:", error);
    throw new Error("Failed to connect to the prediction service. Please ensure the backend is running.");
  }
};
