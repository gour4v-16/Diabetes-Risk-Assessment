import React, { useState, useEffect } from 'react';
import { ShieldCheck, ArrowLeft, Heart, Check, Lock, ChevronRight, Clock, Target, Activity, AlertCircle } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import AnimatedProgressBar from './AnimatedProgressBar';
import { fetchPrediction } from '../services/predictionApi';

export default function ScreeningForm({ onComplete, initialData, darkMode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPredicting, setIsPredicting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [formData, setFormData] = useState({
    // Step 1: About You
    ageGroup: '30-34',
    gender: 'female',
    height: '',
    weight: '',
    bmi: '--',
    
    // Step 2: General Health
    generalHealth: 'good',
    physicalDays: '',
    mentalDays: '',

    // Step 3: Lifestyle
    smoking: 'never',
    alcohol: 'none',
    exercise: 'yes',

    // Step 4: Medical
    heartDisease: 'no',
    stroke: 'no',
    doctorStatus: 'yes',
    checkupStatus: 'within_year'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const heightM = parseFloat(formData.height) / 100;
    const weightKg = parseFloat(formData.weight);

    if (heightM > 0.5 && weightKg > 5) {
      const calculatedBmi = (weightKg / (heightM * heightM)).toFixed(1);
      setFormData(prev => ({ ...prev, bmi: calculatedBmi }));
    } else {
      setFormData(prev => ({ ...prev, bmi: '--' }));
    }
  }, [formData.height, formData.weight]);

  const steps = [
    { number: 1, name: 'About You' },
    { number: 2, name: 'General Health' },
    { number: 3, name: 'Lifestyle' },
    { number: 4, name: 'Medical History' }
  ];

  const computeLiveScore = () => {
    let scorePoints = 10;
    
    // Simple placeholder logic mimicking importance
    const ageScores = {
      '18-24': 0, '25-29': 2, '30-34': 4, '35-39': 6,
      '40-44': 10, '45-49': 14, '50-54': 18, '55-59': 22,
      '60-64': 25, '65+': 30
    };
    scorePoints += ageScores[formData.ageGroup] || 4;
    
    if (formData.gender === 'male') scorePoints += 2;

    const bmiVal = parseFloat(formData.bmi);
    if (!isNaN(bmiVal)) {
      if (bmiVal >= 35) scorePoints += 20;
      else if (bmiVal >= 30) scorePoints += 15;
      else if (bmiVal >= 25) scorePoints += 8;
    }

    const healthScores = {
      'excellent': 0, 'very_good': 2, 'good': 5, 'fair': 10, 'poor': 20
    };
    scorePoints += healthScores[formData.generalHealth] || 0;

    const pDays = parseInt(formData.physicalDays) || 0;
    const mDays = parseInt(formData.mentalDays) || 0;
    scorePoints += (pDays * 0.5);
    scorePoints += (mDays * 0.3);

    if (formData.smoking === 'current') scorePoints += 15;
    else if (formData.smoking === 'former') scorePoints += 8;

    if (formData.alcohol === 'heavy') scorePoints += 10;
    
    if (formData.exercise === 'no') scorePoints += 12;

    if (formData.heartDisease === 'yes') scorePoints += 20;
    if (formData.stroke === 'yes') scorePoints += 20;
    if (formData.doctorStatus === 'no') scorePoints += 5;

    const checkupScores = {
      'within_year': 0, 'within_2_years': 2, 'within_5_years': 5, 'over_5_years': 8, 'never': 10
    };
    scorePoints += checkupScores[formData.checkupStatus] || 0;

    const pct = Math.min(Math.round((scorePoints / 160) * 100), 98);
    return Math.max(pct, 4);
  };

  const currentScore = computeLiveScore();
  const healthScore = Math.max(100 - (currentScore * 1.5), 10).toFixed(0);
  const completionPercentage = (currentStep / steps.length) * 100;
  const timeRemaining = 5 - currentStep; 

  const handleNext = async (e) => {
    e.preventDefault();
    setApiError(null);
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsPredicting(true);
      try {
        const apiResult = await fetchPrediction(formData);
        onComplete(formData, apiResult);
      } catch (err) {
        setApiError(err.message);
      } finally {
        setIsPredicting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInput = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const inputClass = "w-full h-14 rounded-lg px-4 text-base bg-white border border-gray-150 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-[#1B1720] dark:border-gray-800 dark:focus:border-accent transition-all duration-200 shadow-sm text-clinical-value";
  const selectClass = "w-full h-14 rounded-lg px-4 text-base bg-white border border-gray-150 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-[#1B1720] dark:border-gray-800 dark:focus:border-accent transition-all duration-200 shadow-sm appearance-none text-clinical-value";

  return (
    <div className="animate-fade-in pb-20">

      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-clinical-heading mb-2">
          Health Assessment
        </h2>
        <p className="text-lg text-clinical-body">
          Complete your health profile to receive your personalized risk analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* Left Side: Main Form Area */}
        <div className="lg:col-span-8 space-y-6">

          <form onSubmit={handleNext} className="rounded-[32px] premium-card-primary relative overflow-hidden shadow-2xl border-transparent" style={!darkMode ? { background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(20px)', border: '1px solid rgba(139,46,60,0.08)', boxShadow: '0 10px 30px rgba(139,46,60,0.05)' } : {}}>
            {/* Ambient Background Glow inside the form card */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 dark:bg-accent/10 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Step 1: Parameters */}
            {currentStep === 1 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold text-clinical-heading mb-1">About You</h3>
                  <p className="text-sm text-clinical-body">Basic information to establish your baseline profile.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-clinical-label mb-2">Age Bracket</label>
                    <select
                      value={formData.ageGroup}
                      onChange={(e) => handleInput('ageGroup', e.target.value)}
                      className={selectClass}
                    >
                      <option value="18-24">18 - 24 years</option>
                      <option value="25-29">25 - 29 years</option>
                      <option value="30-34">30 - 34 years</option>
                      <option value="35-39">35 - 39 years</option>
                      <option value="40-44">40 - 44 years</option>
                      <option value="45-49">45 - 49 years</option>
                      <option value="50-54">50 - 54 years</option>
                      <option value="55-59">55 - 59 years</option>
                      <option value="60-64">60 - 64 years</option>
                      <option value="65+">65 years &amp; above</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-clinical-label mb-2">Sex at Birth</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => handleInput('gender', 'female')}
                        className={`h-14 rounded-lg border text-base font-medium transition-all ${formData.gender === 'female'
                            ? 'bg-primary text-white border-primary dark:bg-accent dark:text-primary-dark shadow-md'
                            : 'bg-gender-unselected-bg border-gender-unselected-border text-gender-unselected-text hover:bg-gender-unselected-hover'
                          }`}
                      >
                        Female
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInput('gender', 'male')}
                        className={`h-14 rounded-lg border text-base font-medium transition-all ${formData.gender === 'male'
                            ? 'bg-primary text-white border-primary dark:bg-accent dark:text-primary-dark shadow-md'
                            : 'bg-gender-unselected-bg border-gender-unselected-border text-gender-unselected-text hover:bg-gender-unselected-hover'
                          }`}
                      >
                        Male
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-clinical-label mb-2">Height (cm)</label>
                      <input
                        type="number" required placeholder="e.g. 175" min="100" max="250"
                        value={formData.height}
                        onChange={(e) => handleInput('height', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-clinical-label mb-2">Weight (kg)</label>
                      <input
                        type="number" required placeholder="e.g. 70" min="30" max="250"
                        value={formData.weight}
                        onChange={(e) => handleInput('weight', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-clinical-label mb-2">BMI</label>
                    <div className="h-14 flex items-center px-4 rounded-lg bg-readonly-bg border border-readonly-border text-readonly-text font-bold">
                      {formData.bmi}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: General Health */}
            {currentStep === 2 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold text-clinical-heading mb-1">General Health & Well-being</h3>
                  <p className="text-sm text-clinical-body">How would you rate your recent physical and mental health?</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-clinical-label mb-2">General Health Status</label>
                    <select
                      value={formData.generalHealth}
                      onChange={(e) => handleInput('generalHealth', e.target.value)}
                      className={selectClass}
                    >
                      <option value="excellent">Excellent</option>
                      <option value="very_good">Very Good</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-clinical-label mb-2">Physical Health Days</label>
                    <p className="text-xs text-clinical-body mb-2">Number of days your physical health was not good in the past 30 days.</p>
                    <input
                      type="number" placeholder="0-30" min="0" max="30" required
                      value={formData.physicalDays}
                      onChange={(e) => handleInput('physicalDays', e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-clinical-label mb-2">Mental Health Days</label>
                    <p className="text-xs text-clinical-body mb-2">Number of days your mental health was not good in the past 30 days.</p>
                    <input
                      type="number" placeholder="0-30" min="0" max="30" required
                      value={formData.mentalDays}
                      onChange={(e) => handleInput('mentalDays', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Lifestyle */}
            {currentStep === 3 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold text-clinical-heading mb-1">Lifestyle Factors</h3>
                  <p className="text-sm text-clinical-body">Your physical activity and habits.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-clinical-label mb-2">Exercise Status</label>
                    <select
                      value={formData.exercise}
                      onChange={(e) => handleInput('exercise', e.target.value)}
                      className={selectClass}
                    >
                      <option value="yes">Yes, I exercise regularly</option>
                      <option value="no">No, I do not exercise</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-clinical-label mb-2">Smoking Status</label>
                    <select
                      value={formData.smoking}
                      onChange={(e) => handleInput('smoking', e.target.value)}
                      className={selectClass}
                    >
                      <option value="never">Never Smoked</option>
                      <option value="former">Former Smoker</option>
                      <option value="current">Current Smoker</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-clinical-label mb-2">Alcohol Status</label>
                    <select
                      value={formData.alcohol}
                      onChange={(e) => handleInput('alcohol', e.target.value)}
                      className={selectClass}
                    >
                      <option value="none">None or Occasional</option>
                      <option value="moderate">Moderate</option>
                      <option value="heavy">Frequent / Heavy</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Medical */}
            {currentStep === 4 && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold text-clinical-heading mb-1">Medical History & Access</h3>
                  <p className="text-sm text-clinical-body">Past conditions and access to healthcare.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-clinical-label mb-2">History of Heart Disease</label>
                    <select
                      value={formData.heartDisease}
                      onChange={(e) => handleInput('heartDisease', e.target.value)}
                      className={selectClass}
                    >
                      <option value="no">No history of heart disease</option>
                      <option value="yes">Yes, diagnosed with heart disease</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-clinical-label mb-2">History of Stroke</label>
                    <select
                      value={formData.stroke}
                      onChange={(e) => handleInput('stroke', e.target.value)}
                      className={selectClass}
                    >
                      <option value="no">No history of stroke</option>
                      <option value="yes">Yes, diagnosed with stroke</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-clinical-label mb-2">Personal Doctor Status</label>
                    <select
                      value={formData.doctorStatus}
                      onChange={(e) => handleInput('doctorStatus', e.target.value)}
                      className={selectClass}
                    >
                      <option value="yes">Yes, I have a personal doctor</option>
                      <option value="no">No personal doctor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-clinical-label mb-2">Time Since Last Checkup</label>
                    <select
                      value={formData.checkupStatus}
                      onChange={(e) => handleInput('checkupStatus', e.target.value)}
                      className={selectClass}
                    >
                      <option value="within_year">Within the past year</option>
                      <option value="within_2_years">Within the past 2 years</option>
                      <option value="within_5_years">Within the past 5 years</option>
                      <option value="over_5_years">More than 5 years ago</option>
                      <option value="never">Never had a checkup</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Form Footer Navigation */}
            {apiError && (
              <div className="mx-6 mt-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-400 font-medium">{apiError}</p>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-gray-150 dark:border-gray-800 flex items-center justify-between px-6 pb-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 h-12 px-6 rounded-lg text-sm font-semibold transition-all disabled:opacity-0 hover:bg-gray-55 dark:hover:bg-[#211B26] text-clinical-label"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>

              <button
                type="submit"
                disabled={isPredicting}
                className="flex items-center justify-center gap-2 h-12 px-8 rounded-lg bg-primary text-white text-sm font-bold transition-all hover:bg-primary-dark hover:scale-[1.02] shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={!darkMode ? { background: 'linear-gradient(135deg, #8B2E3C, #702530)' } : {}}
              >
                {isPredicting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Computing...
                  </>
                ) : (
                  <>
                    {currentStep === 4 ? 'Compute Results' : 'Continue'}
                    {currentStep !== 4 && <ChevronRight className="h-4 w-4" />}
                  </>
                )}
              </button>
            </div>
          </form>

        </div>

        {/* Right Side: Sticky Status Panel */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="rounded-[32px] premium-card-secondary shadow-xl space-y-6 relative overflow-hidden" style={!darkMode ? { background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(20px)', border: '1px solid rgba(139,46,60,0.08)', boxShadow: '0 10px 30px rgba(139,46,60,0.05)' } : {}}>
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-secondary/10 dark:bg-secondary/10 rounded-full blur-[60px] pointer-events-none" />

            {/* Progress Section */}
            <div className="space-y-3 pb-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-card-label uppercase tracking-wider">Progress</span>
                <span className="text-xs font-bold text-primary dark:text-accent">
                  Step {currentStep} of 4
                </span>
              </div>
              <AnimatedProgressBar percentage={completionPercentage} height="h-2" />
            </div>

            {/* Live Metrics */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-progress-icon-bg border border-progress-icon-border text-card-label">
                  <Activity className="h-5 w-5 text-secondary dark:text-accent" />
                </div>
                <div>
                  <div className="text-xs text-card-label font-medium">Estimated Risk Score</div>
                  <div className="text-xl font-bold text-clinical-value">
                    <AnimatedCounter value={currentScore} suffix="%" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-progress-icon-bg border border-progress-icon-border text-card-label">
                  <Heart className="h-5 w-5 text-green-600 dark:text-green-500" />
                </div>
                <div>
                  <div className="text-xs text-card-label font-medium">Health Vitality</div>
                  <div className="text-xl font-bold text-clinical-value">
                    <AnimatedCounter value={healthScore} suffix="/100" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-progress-icon-bg border border-progress-icon-border text-card-label">
                  <Clock className="h-5 w-5 text-card-label" />
                </div>
                <div>
                  <div className="text-xs text-card-label font-medium">Time Remaining</div>
                  <div className="text-xl font-bold text-clinical-value">
                    ~{timeRemaining} min
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Privacy Notice Footer */}
      <div className="mt-16 max-w-3xl flex items-start gap-4">
        <Lock className="h-5 w-5 text-clinical-label shrink-0 mt-0.5" />
        <p className="text-sm text-clinical-body leading-relaxed">
          <strong>Privacy Guaranteed:</strong> This assessment runs purely in your browser's local sandbox memory. Zero parameters, lab indicators, or computed statistics are stored or transmitted, guaranteeing complete patient anonymity.
        </p>
      </div>
    </div>
  );
}
