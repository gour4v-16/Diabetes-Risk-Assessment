import React, { useState, useEffect } from 'react';
import { Cpu, Database, Network } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import AnimatedProgressBar from './AnimatedProgressBar';

// Centralized configuration object for model parameters and metrics
const MODEL_CONFIG = {
  referenceCohort: 'BRFSS 2023 + BRFSS 2024',
  originalDatasetSize: '~700,000 records',
  trainingDatasetSize: '80,000 processed samples',
  featureCount: 13,
  targetVariable: 'Diabetes Risk Prediction',
  validationSplit: '80% Training / 20% Testing',
  models: [
    'Random Forest',
    'XGBoost',
    'Artificial Neural Network (ANN)'
  ],
  ensembleMethod: 'Weighted Voting Ensemble',
  modelWeights: {
    'Random Forest': '30%',
    'XGBoost': '40%',
    'ANN': '30%'
  },
  metrics: [
    { label: 'Evaluation Accuracy', value: 71.4, detail: 'Overall predictive validity' },
    { label: 'ROC-AUC Index', value: 78.2, detail: 'Discriminant performance score (x100)' },
    { label: 'Precision', value: 70.0, detail: 'Positive predictive value' },
    { label: 'Sensitivity / Recall', value: 75.0, detail: 'True positive detection rate' },
    { label: 'F1 Score', value: 72.0, detail: 'Harmonic mean of precision and recall' }
  ],
  confusionMatrix: {
    tn: 6265,
    fp: 2938,
    fn: 2328,
    tp: 6872,
    tn_pct: 34.0,
    fp_pct: 16.0,
    fn_pct: 12.6,
    tp_pct: 37.3
  },
  rocAuc: 0.782
};

export default function ModelInfo({ darkMode = false }) {
  const [modelData, setModelData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/model-info/`)
      .then(res => {
        if (!res.ok) throw new Error("Backend offline");
        return res.json();
      })
      .then(data => setModelData(data))
      .catch(err => console.error("Error fetching model info:", err));
  }, []);

  const referenceCohort = modelData?.reference_cohort || MODEL_CONFIG.referenceCohort;
  const originalSize = modelData?.original_dataset_size || MODEL_CONFIG.originalDatasetSize;
  const trainingSize = modelData?.training_dataset_size || MODEL_CONFIG.trainingDatasetSize;
  const featureCount = modelData?.feature_count || MODEL_CONFIG.featureCount;
  const targetVariable = modelData?.target_variable || MODEL_CONFIG.targetVariable;
  const validationSplit = modelData?.validation_split || MODEL_CONFIG.validationSplit;
  const models = modelData?.models || MODEL_CONFIG.models;
  const ensembleMethod = modelData?.ensemble_method || MODEL_CONFIG.ensembleMethod;
  const modelWeights = modelData?.model_weights || MODEL_CONFIG.modelWeights;

  const metrics = modelData?.metrics || MODEL_CONFIG.metrics;
  const cm = modelData?.confusion_matrix || MODEL_CONFIG.confusionMatrix;
  const rocAuc = modelData?.roc_auc || MODEL_CONFIG.rocAuc;

  const totalScreenings = cm.tn + cm.fp + cm.fn + cm.tp;

  return (
    <div className="space-y-16 animate-fade-in text-body">
      {/* Page Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h2 className="text-section font-bold tracking-tight text-clinical-heading">
          Algorithm Specs
        </h2>
        <p className="text-body text-clinical-body font-medium">
          Auditable specifications for the predictive ensemble and artificial neural network (ANN) used in the DiaRisk platform.
        </p>
      </div>

      {/* Grid: ANN Architecture Schema & Dataset Info - Balanced 50/50 layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: ANN Network Layers SVG Graph - p-8 padding */}
        <div className="rounded-medical premium-card-reference space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary/5 text-secondary dark:bg-accent/10 dark:text-accent">
              <Cpu className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="font-bold text-clinical-heading text-card">Neural Network Topology</h3>
              <p className="text-small text-card-label">Layer node configurations and activation functions</p>
            </div>
          </div>

          <div className="p-6 bg-gray-55/60 dark:bg-gray-900/15 rounded border border-gray-150 dark:border-gray-800 flex flex-col items-center justify-center">
            <svg viewBox="0 0 500 220" className="w-full max-w-sm h-auto">
              <text x="30" y="20" fill="currentColor" className="text-clinical-label font-bold text-[9px]" textAnchor="middle">INPUT ({featureCount} Features)</text>
              <text x="170" y="20" fill="currentColor" className="text-clinical-label font-bold text-[9px]" textAnchor="middle">HIDDEN A (x32)</text>
              <text x="310" y="20" fill="currentColor" className="text-clinical-label font-bold text-[9px]" textAnchor="middle">HIDDEN B (x16)</text>
              <text x="450" y="20" fill="currentColor" className="text-clinical-label font-bold text-[9px]" textAnchor="middle">Diabetes Risk Probability</text>

              {/* Connections */}
              {[40, 80, 120, 160, 200].map(y1 => 
                [50, 90, 130, 170].map(y2 => (
                  <line key={`c1-${y1}-${y2}`} x1="30" y1={y1} x2="170" y2={y2} stroke="currentColor" className="stroke-gray-200 dark:stroke-gray-800/40" strokeWidth="0.5" />
                ))
              )}
              {[50, 90, 130, 170].map(y1 => 
                [60, 110, 160].map(y2 => (
                  <line key={`c2-${y1}-${y2}`} x1="170" y1={y1} x2="310" y2={y2} stroke="currentColor" className="stroke-gray-200 dark:stroke-gray-800/40" strokeWidth="0.5" />
                ))
              )}
              {[60, 110, 160].map(y1 => (
                <line key={`c3-${y1}`} x1="310" y1={y1} x2="450" y2="110" stroke="currentColor" className="stroke-secondary/30 dark:stroke-accent/30" strokeWidth="1" />
              ))}

              {/* Nodes */}
              {[40, 80, 120, 160, 200].map((y, i) => (
                <circle key={`in-${i}`} cx="30" cy={y} r="7" className="fill-gray-650 dark:fill-gray-500" />
              ))}
              {[50, 90, 130, 170].map((y, i) => (
                <circle key={`ha-${i}`} cx="170" cy={y} r="7" className="fill-secondary dark:fill-secondary" />
              ))}
              {[60, 110, 160].map((y, i) => (
                <circle key={`hb-${i}`} cx="310" cy={y} r="7" className="fill-secondary dark:fill-secondary" />
              ))}
              <circle cx="450" cy="110" r="8" className="fill-accent stroke-primary dark:fill-accent dark:stroke-gray-900" strokeWidth="1.5" />
            </svg>

            {/* Legend Info */}
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-[9px] font-bold text-clinical-label w-full pt-3 border-t border-gray-150 dark:border-gray-800">
              <div>
                <span className="block text-clinical-label">ACTIVATION</span>
                <span className="text-secondary dark:text-accent font-bold">ReLU (Hidden)</span>
              </div>
              <div>
                <span className="block text-clinical-label">DECISION LAYER</span>
                <span className="text-secondary dark:text-accent font-bold">Sigmoid (Output)</span>
              </div>
              <div>
                <span className="block text-clinical-label">LOSS ADAPTER</span>
                <span className="text-secondary dark:text-accent font-bold">Adam Optimizer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Training Cohort Datasets - p-8 padding */}
        <div className="rounded-medical premium-card-reference space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary/5 text-secondary dark:bg-accent/10 dark:text-accent">
              <Database className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="font-bold text-clinical-heading text-card">Training Cohort Specs</h3>
              <p className="text-small text-card-label">Source dataset profile and demographics metrics</p>
            </div>
          </div>

          <div className="space-y-4 text-xs pt-2">
            <div className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-gray-800">
              <span className="text-clinical-label font-medium">Reference Cohort</span>
              <span className="font-bold text-clinical-value">{referenceCohort}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-gray-800">
              <span className="text-clinical-label font-medium">Original Dataset Size</span>
              <span className="font-bold text-clinical-value">{originalSize}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-gray-800">
              <span className="text-clinical-label font-medium">Training Samples</span>
              <span className="font-bold text-clinical-value">{trainingSize}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-gray-800">
              <span className="text-clinical-label font-medium">Target Variable</span>
              <span className="font-bold text-clinical-value">{targetVariable}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-gray-800">
              <span className="text-clinical-label font-medium">Val/Train Split Ratio</span>
              <span className="font-bold text-clinical-value">{validationSplit}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-gray-800">
              <span className="text-clinical-label font-medium">Feature Set Length</span>
              <span className="font-bold text-clinical-value">{featureCount} Clinical Features</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-gray-800">
              <span className="text-clinical-label font-medium">Predictive Model Type</span>
              <span className="font-bold text-clinical-value">{models.join(' / ')}</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-gray-100 dark:border-gray-800">
              <span className="text-clinical-label font-medium">Ensemble Method</span>
              <span className="font-bold text-clinical-value">{ensembleMethod}</span>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <span className="text-clinical-label font-medium">Model Weight Balance</span>
              <span className="font-bold text-clinical-value">
                RF ({modelWeights['Random Forest'] || '30%'}) / XGB ({modelWeights['XGBoost'] || '40%'}) / ANN ({modelWeights['ANN'] || modelWeights['Artificial Neural Network (ANN)'] || '30%'})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ensemble Architecture Pipeline Workflow Card */}
      <div
        className="rounded-medical premium-card-reference space-y-6"
        style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary/5 text-secondary dark:bg-accent/10 dark:text-accent">
            <Network className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="font-bold text-clinical-heading text-card">Weighted Voting Ensemble Pipeline</h3>
            <p className="text-small text-card-label">Ensemble framework mapping and prediction probability weights</p>
          </div>
        </div>

        <div className="p-6 bg-gray-55/60 dark:bg-gray-900/15 rounded border border-gray-150 dark:border-gray-800 flex flex-col items-center justify-center space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10 w-full max-w-5xl py-4">
            
            {/* Input Data Node */}
            <div className="flex flex-col items-center p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/40 dark:bg-[#1B1720] min-w-[140px] text-center shadow-sm">
              <span className="text-[10px] font-bold text-card-label uppercase tracking-wider">Patient Profile</span>
              <span className="text-xs font-bold text-clinical-value mt-1.5">{featureCount} Input Features</span>
            </div>

            {/* Line connector */}
            <div className="hidden lg:block h-0.5 w-6 bg-gray-300 dark:bg-gray-700" />

            {/* Sub-models list */}
            <div className="flex flex-col gap-3 w-full lg:w-auto">
              <div className="flex items-center justify-between gap-6 p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-[#141118] min-w-[240px] shadow-sm">
                <span className="text-xs font-bold text-clinical-heading">Random Forest</span>
                <span className="text-[10px] font-bold text-secondary dark:text-accent bg-secondary/10 px-2.5 py-0.5 rounded-full">Weight: {modelWeights['Random Forest'] || '30%'}</span>
              </div>
              <div className="flex items-center justify-between gap-6 p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-[#141118] min-w-[240px] shadow-sm">
                <span className="text-xs font-bold text-clinical-heading">XGBoost</span>
                <span className="text-[10px] font-bold text-secondary dark:text-accent bg-secondary/10 px-2.5 py-0.5 rounded-full">Weight: {modelWeights['XGBoost'] || '40%'}</span>
              </div>
              <div className="flex items-center justify-between gap-6 p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-[#141118] min-w-[240px] shadow-sm">
                <span className="text-xs font-bold text-clinical-heading">Neural Network (ANN)</span>
                <span className="text-[10px] font-bold text-secondary dark:text-accent bg-secondary/10 px-2.5 py-0.5 rounded-full">Weight: {modelWeights['ANN'] || modelWeights['Artificial Neural Network (ANN)'] || '30%'}</span>
              </div>
            </div>

            {/* Line connector */}
            <div className="hidden lg:block h-0.5 w-6 bg-gray-300 dark:bg-gray-700" />

            {/* Voting Aggregation Block */}
            <div className="flex flex-col items-center p-4 rounded-xl border border-primary/20 dark:border-accent/20 bg-primary/5 dark:bg-accent/5 min-w-[210px] text-center shadow-md">
              <span className="text-[10px] font-bold text-primary dark:text-accent uppercase tracking-wider">Aggregation / Voting</span>
              <span className="text-xs font-semibold text-clinical-body mt-2 leading-relaxed font-mono">
                Final Prediction =<br />
                0.3×RF + 0.4×XGB + 0.3×ANN
              </span>
            </div>

            {/* Line connector */}
            <div className="hidden lg:block h-0.5 w-6 bg-gray-300 dark:bg-gray-700" />

            {/* Prediction Output Node */}
            <div className="flex flex-col items-center p-4 rounded-xl bg-primary text-white shadow-lg min-w-[150px] text-center" style={!darkMode ? { background: 'linear-gradient(135deg, #8B2E3C, #702530)' } : {}}>
              <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">Calculated Output</span>
              <span className="text-xs font-bold mt-1.5">Diabetes Risk Probability</span>
            </div>

          </div>
        </div>
      </div>

      {/* Model Performance Evaluation Metrics - with Animated Progress Bars (5 Columns Grid) */}
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-5 w-full">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="rounded premium-card-reference space-y-3"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-card-label">{m.label}</div>
            
            <div>
              <div className="text-2xl font-bold text-secondary dark:text-accent tracking-tight pb-2">
                <AnimatedCounter value={m.value} decimals={1} suffix={m.label === 'ROC-AUC Index' ? '' : '%'} />
              </div>
              <AnimatedProgressBar percentage={m.value} height="h-1.5" colorClass="bg-secondary dark:bg-accent" />
            </div>

            <div className="text-xs text-clinical-muted">{m.detail}</div>
          </div>
        ))}
      </div>

      {/* Grid: Confusion Matrix & ROC Curve - gap-12 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Confusion Matrix */}
        <div className="rounded-medical premium-card-reference space-y-6">
          <div>
            <h3 className="font-bold text-clinical-heading text-card">Confusion Matrix (Testing Set)</h3>
            <p className="text-small text-card-label">N={totalScreenings.toLocaleString()} Validation screenings. True vs predicted outcome distribution.</p>
          </div>

          <div className="grid grid-cols-3 gap-2.5 max-w-sm mx-auto pt-2 text-center text-xs">
            <div />
            <div className="text-[10px] font-bold text-clinical-label uppercase tracking-wider">Pred Neg</div>
            <div className="text-[10px] font-bold text-clinical-label uppercase tracking-wider">Pred Pos</div>

            <div className="text-[9px] font-bold text-clinical-label uppercase tracking-wider flex items-center justify-end pr-2">Actual Neg</div>
            {/* TN */}
            <div className="bg-green-50/5 border border-green-500/10 text-green-600 dark:text-green-400 p-4 rounded-lg">
              <span className="block text-lg font-bold">{cm.tn.toLocaleString()}</span>
              <span className="text-[9px] uppercase font-bold text-clinical-muted">True Neg ({cm.tn_pct}%)</span>
            </div>
            {/* FP */}
            <div className="bg-gray-55 dark:bg-gray-900/20 border border-gray-150 dark:border-gray-800 text-clinical-label p-4 rounded-lg">
              <span className="block text-lg font-bold">{cm.fp.toLocaleString()}</span>
              <span className="text-[9px] uppercase font-bold text-red-500/80">False Pos ({cm.fp_pct}%)</span>
            </div>

            <div className="text-[9px] font-bold text-clinical-label uppercase tracking-wider flex items-center justify-end pr-2">Actual Pos</div>
            {/* FN */}
            <div className="bg-gray-55 dark:bg-gray-900/20 border border-gray-155 dark:border-gray-800 text-clinical-label p-4 rounded-lg">
              <span className="block text-lg font-bold text-red-550">{cm.fn.toLocaleString()}</span>
              <span className="text-[9px] uppercase font-bold text-clinical-muted">False Neg ({cm.fn_pct}%)</span>
            </div>
            {/* TP */}
            <div className="bg-green-50/5 border border-green-500/10 text-green-600 dark:text-green-400 p-4 rounded-lg">
              <span className="block text-lg font-bold">{cm.tp.toLocaleString()}</span>
              <span className="text-[9px] uppercase font-bold text-clinical-muted">True Pos ({cm.tp_pct}%)</span>
            </div>
          </div>
        </div>

        {/* ROC Curve Chart */}
        <div className="rounded-medical premium-card-reference space-y-6">
          <div>
            <h3 className="font-bold text-clinical-heading text-card">ROC Performance Curve</h3>
            <p className="text-small text-card-label">Receiver Operating Characteristic. True positive vs False positive rate</p>
          </div>

          <div className="flex items-center justify-center py-4">
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              <line x1="20" y1="180" x2="190" y2="180" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="1" />
              <line x1="20" y1="180" x2="20" y2="10" stroke="currentColor" className="text-gray-200 dark:text-gray-800" strokeWidth="1" />

              <line x1="20" y1="180" x2="180" y2="20" stroke="currentColor" className="text-gray-100 dark:text-gray-850" strokeWidth="1" strokeDasharray="3" />

              {/* ROC Curve (Flat Stroke) mapped for AUC = 0.782 */}
              <path
                d="M 20 180 Q 40 90 100 60 T 180 20"
                fill="none"
                stroke="#A53860"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              <text x="100" y="195" fill="currentColor" className="text-clinical-label font-bold text-[8px] tracking-wider" textAnchor="middle">False Positive Rate</text>
              <text x="10" y="100" fill="currentColor" className="text-clinical-label font-bold text-[8px] tracking-wider" textAnchor="middle" transform="rotate(-90 10 100)">True Positive Rate</text>

              <circle cx="100" cy="60" r="3.5" className="fill-secondary stroke-white dark:fill-accent dark:stroke-gray-900" strokeWidth="1" />
              <text x="110" y="64" fill="currentColor" className="text-primary dark:text-accent font-bold text-[8.5px]">AUC = {rocAuc}</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
