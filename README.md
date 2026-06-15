# 🩺 DiaRisk - Diabetes Risk Assessment System

An intelligent Machine Learning powered healthcare screening platform designed to estimate an individual's diabetes risk using clinical, lifestyle, and health-related indicators. DiaRisk leverages an ensemble of Machine Learning and Deep Learning models to provide accurate risk assessment, personalized recommendations, and interactive health analytics.

---

## 📌 Project Overview

Diabetes is one of the fastest-growing chronic diseases worldwide. Early identification of high-risk individuals can significantly improve preventive care and health outcomes.

DiaRisk is a web-based clinical decision support system that analyzes user health information and predicts diabetes risk using an ensemble of:

* Random Forest
* XGBoost
* Artificial Neural Network (ANN)

The platform combines modern web technologies with advanced machine learning techniques to provide real-time risk predictions and actionable health recommendations.

---

## 🎯 Objectives

* Predict diabetes risk using patient health indicators.
* Assist users in identifying potential risk factors.
* Provide personalized health recommendations.
* Visualize model outputs and analytics in an intuitive dashboard.
* Demonstrate practical application of Machine Learning in healthcare.

---

## 🚀 Key Features

### Health Screening Portal

* Multi-step health assessment form
* User-friendly data collection workflow
* Real-time health profile evaluation

### Ensemble Machine Learning Prediction

* Random Forest Classifier
* XGBoost Classifier
* Artificial Neural Network (ANN)
* Combined ensemble-based risk scoring

### Risk Analysis Dashboard

* Diabetes risk score visualization
* Risk categorization (Low / Moderate / High)
* Model contribution breakdown
* Key risk factor identification

### Personalized Recommendations

* Lifestyle improvement suggestions
* Preventive healthcare guidance
* Risk reduction recommendations

### Modern User Experience

* Responsive design
* Dark Mode support
* Interactive visualizations
* Professional healthcare dashboard

---

## 🏗️ System Architecture

```text
User Input
     │
     ▼
React Frontend
     │
     ▼
FastAPI Backend
     │
     ▼
Data Preprocessing
     │
     ▼
Ensemble Prediction Engine
 ┌─────────────┬─────────────┬─────────────┐
 │ Random      │  XGBoost    │    ANN      │
 │ Forest      │  Model      │  Model      │
 └─────────────┴─────────────┴─────────────┘
     │
     ▼
Risk Aggregation
     │
     ▼
Risk Score + Recommendations
     │
     ▼
Results Dashboard
```

---

## 🧠 Machine Learning Pipeline

### Dataset

**Behavioral Risk Factor Surveillance System (BRFSS)**

* Source: CDC BRFSS Survey
* Years: 2023 & 2024
* Records Used: ~80,000 after preprocessing
* Domain: Healthcare & Disease Risk Prediction

### Features Used

* Age Group
* Gender
* BMI
* General Health Status
* Physical Health Days
* Mental Health Days
* Smoking Status
* Alcohol Consumption
* Exercise Status
* Heart Disease History
* Stroke History
* Personal Doctor Availability
* Medical Checkup Status

### Data Preprocessing

* Missing value handling
* Feature encoding
* Data normalization/scaling
* Feature selection
* Dataset balancing and cleaning

---

## 🤖 Models Used

### Random Forest

A tree-based ensemble learning algorithm that combines multiple decision trees to improve prediction stability and reduce overfitting.

### XGBoost

A gradient boosting framework optimized for performance, speed, and predictive accuracy on structured healthcare data.

### Artificial Neural Network (ANN)

A deep learning model capable of capturing complex nonlinear relationships between health indicators and diabetes risk.

### Ensemble Prediction

Predictions from all three models are combined to generate a robust final risk score.

---

## 💻 Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Recharts
* Lucide React

### Backend

* FastAPI
* Python
* Pydantic
* Uvicorn

### Machine Learning

* Scikit-Learn
* XGBoost
* TensorFlow / Keras
* NumPy
* Pandas

### Development Tools

* Git
* GitHub
* VS Code

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure

```text
DiaRisk/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── services/
│   └── package.json
│
├── backend/
│   ├── app/
│   ├── tests/
│   ├── requirements.txt
│   └── saved_models/
│
├── README.md
└── DEPLOYMENT.md
```

---

## ⚙️ Installation Guide

### Clone Repository

```bash
git clone <repository-url>
cd DiaRisk
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend will run on:

```text
http://127.0.0.1:8000
```

API Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 📊 Expected Output

The system generates:

* Diabetes Risk Score
* Risk Category
* Model-wise Prediction Scores
* Personalized Recommendations
* Key Risk Contributors

---

## 🔒 Disclaimer

This project is intended for educational and research purposes only.

The predictions generated by DiaRisk do not constitute a medical diagnosis and should not replace professional medical advice. Users are encouraged to consult qualified healthcare professionals for clinical decisions.

---

## 👨‍💻 Team Members

### Project Team

* Gourav Mahajan
* Kunal Sonare
* Atharav Rathore
* Adarsh Patel

### Institution

Acropolis Institute of Technology & Research

---

## 🔮 Future Enhancements

* Explainable AI (SHAP/LIME Integration)
* PDF Report Generation
* User Authentication & History Tracking
* Cloud Model Monitoring
* Mobile Application Support
* Real-Time Health Data Integration
* Advanced Risk Explainability Dashboard

---

## ⭐ Acknowledgements

* CDC BRFSS Dataset
* Scikit-Learn Community
* XGBoost Developers
* TensorFlow Team
* FastAPI Framework
* React Ecosystem

---

**DiaRisk — Empowering Preventive Healthcare Through Artificial Intelligence**
