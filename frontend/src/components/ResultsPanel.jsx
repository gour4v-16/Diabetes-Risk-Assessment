import React from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw, Download, Printer, Heart, Activity } from 'lucide-react';

export default function ResultsPanel({ data, apiResult, onReset, onBackToForm, darkMode }) {
  
  const getStyleVars = (color, category) => {
    let resolvedColor = color?.toLowerCase();
    
    // Fallback logic if gauge_color is missing
    if (!resolvedColor && category) {
      const catLower = category.toLowerCase();
      if (catLower.includes('low')) resolvedColor = 'green';
      else if (catLower.includes('moderate')) resolvedColor = 'yellow';
      else if (catLower.includes('high')) resolvedColor = 'red';
    }

    switch (resolvedColor) {
      case 'green': 
        return { textClass: 'text-green-600 bg-green-500/5 border-green-500/10 dark:text-green-400', stroke: '#10B981' };
      case 'yellow': 
        return { textClass: 'text-amber-600 bg-amber-500/5 border-amber-500/10 dark:text-amber-400', stroke: '#F59E0B' };
      case 'red': 
      default: 
        return { textClass: 'text-red-600 bg-red-500/5 border-red-505/10 dark:text-red-400', stroke: '#EF4444' };
    }
  };

  const styleVars = getStyleVars(apiResult?.gauge_color, apiResult?.risk_category);
  const score = apiResult?.risk_score || 0;

  const triggerMockPrint = () => {
    window.print();
  };

  if (!apiResult) return null;

  return (
    <div className="space-y-12 animate-fade-in text-body">
      {/* Results Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h2 className="text-section font-bold tracking-tight text-clinical-heading">
          Screening Analysis Report
        </h2>
        <p className="text-body text-clinical-body">
          Diagnostic indications calculated using our backend Machine Learning Ensemble.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        {/* Left: Score Gauge Diagnostic */}
        <div className="flex flex-col justify-between rounded-medical premium-card-primary space-y-8" style={!darkMode ? { background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(20px)', border: '1px solid rgba(139,46,60,0.08)', boxShadow: '0 10px 30px rgba(139,46,60,0.05)' } : {}}>
          <div className="space-y-6">
            <h3 className="font-bold text-card-label text-xs uppercase tracking-wider">Ensemble Risk Classification</h3>

            {/* Big Circular Risk Gauge */}
            <div className="flex flex-col items-center py-4">
              <div className="relative flex items-center justify-center">
                <svg className="w-44 h-44 transform -rotate-90">
                  <circle
                    cx="88"
                    cy="88"
                    r="76"
                    className="stroke-gray-100 dark:stroke-gray-800/85"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="88"
                    cy="88"
                    r="76"
                    className="transition-all duration-700 ease-out"
                    strokeWidth="8"
                    fill="transparent"
                    stroke={styleVars.stroke}
                    strokeDasharray={2 * Math.PI * 76}
                    strokeDashoffset={2 * Math.PI * 76 * (1 - score / 100)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-semibold tracking-tight text-clinical-value">
                    {score}%
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-card-label tracking-wider">Risk Score</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`mt-6 rounded px-4 py-1.5 text-xs font-bold border ${styleVars.textClass}`}>
                {apiResult.risk_category}
              </div>
            </div>

            {/* Model Breakdown */}
            <div className="bg-gray-50/50 dark:bg-gray-900/20 rounded border border-gray-150 dark:border-gray-800 p-5">
              <h4 className="text-xs font-bold text-clinical-heading mb-3 uppercase tracking-wider">Model Contributions</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-clinical-label">Random Forest</span>
                  <span className="font-medium text-clinical-value">{apiResult.model_scores?.random_forest}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-clinical-label">XGBoost</span>
                  <span className="font-medium text-clinical-value">{apiResult.model_scores?.xgboost}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-clinical-label">Artificial Neural Network</span>
                  <span className="font-medium text-clinical-value">{apiResult.model_scores?.ann}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4">
             <div className="text-center">
               <span className="block text-[10px] uppercase font-bold text-card-label">Prediction Confidence</span>
               <span className="text-sm font-bold text-clinical-value">{apiResult.confidence || 'Medium'}</span>
             </div>
             <div className="text-center">
               <span className="block text-[10px] uppercase font-bold text-card-label">Flagged Factors</span>
               <span className="text-sm font-bold text-clinical-value">{apiResult.top_risk_factors?.length || 0} Identified</span>
             </div>
          </div>
        </div>

        {/* Right: Recommendations list */}
        <div className="flex flex-col justify-between rounded-medical premium-card-primary space-y-8" style={!darkMode ? { background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(20px)', border: '1px solid rgba(139,46,60,0.08)', boxShadow: '0 10px 30px rgba(139,46,60,0.05)' } : {}}>
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary/5 text-secondary dark:bg-accent/10 dark:text-accent">
                <Activity className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="font-bold text-clinical-heading text-card">Actionable Recommendations</h3>
                <p className="text-small text-clinical-muted">Dynamically generated based on your profile</p>
              </div>
            </div>

            {/* Recommendation items */}
            <div className="space-y-3">
              {Array.isArray(apiResult?.recommendations) && apiResult.recommendations.length > 0 ? (
                apiResult.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="flex gap-3 p-4 rounded border border-gray-250 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/10 hover:border-gray-305 dark:hover:border-gray-700 transition-all items-center"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary dark:bg-accent/15 dark:text-accent">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <p className="text-sm font-medium text-clinical-body leading-relaxed">{rec}</p>
                  </div>
                ))
              ) : (
                 <div className="p-4 text-center text-clinical-muted text-sm border border-dashed border-gray-300 dark:border-gray-700 rounded">
                   No specific actionable recommendations available. Maintain healthy habits!
                 </div>
              )}
            </div>
            
            {/* Top Risk Factors Section */}
            {Array.isArray(apiResult?.top_risk_factors) && apiResult.top_risk_factors.length > 0 && (
              <div className="pt-4 mt-6 border-t border-gray-100 dark:border-gray-800">
                <h4 className="text-xs font-bold text-clinical-heading mb-3 uppercase tracking-wider">Key Risk Contributors</h4>
                <div className="flex flex-wrap gap-2">
                  {apiResult.top_risk_factors.map((factor, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded text-xs font-medium border border-red-200 dark:border-red-800/50">
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2.5">
              <button
                onClick={onBackToForm}
                className="flex items-center gap-1.5 px-4.5 py-2 rounded border text-xs font-bold transition-all hover:bg-gray-55 border-gray-200 text-clinical-body dark:border-gray-800 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Adjust Metrics
              </button>
              <button
                onClick={onReset}
                className="flex items-center gap-1.5 px-4.5 py-2 rounded border text-xs font-bold transition-all hover:bg-gray-55 border-gray-200 text-clinical-body dark:border-gray-800 dark:hover:bg-gray-800"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                New Screening
              </button>
            </div>

            <div className="flex gap-2.5">
              <button
                onClick={triggerMockPrint}
                className="flex items-center gap-1.5 px-4.5 py-2 rounded border text-xs font-bold transition-all hover:bg-gray-55 border-gray-200 text-clinical-body dark:border-gray-800 dark:hover:bg-gray-800"
              >
                Print
              </button>
              <button
                onClick={() => alert('PDF generation initialized.')}
                className="flex items-center gap-1.5 px-5 py-2 rounded bg-primary text-white text-xs font-bold transition-all hover:bg-primary-dark shadow-sm"
                style={!darkMode ? { background: 'linear-gradient(135deg, #8B2E3C, #702530)' } : {}}
              >
                <Download className="h-3.5 w-3.5" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
