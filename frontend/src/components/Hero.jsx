import React, { useState } from 'react';
import { ShieldCheck, Database, Award, ArrowRight, Activity } from 'lucide-react';

export default function Hero({ onStartScreening }) {
  const [previewBmi, setPreviewBmi] = useState(24);
  const [previewAge, setPreviewAge] = useState(35);

  const calculatePreviewRisk = () => {
    let score = 15;
    if (previewBmi > 25) score += (previewBmi - 25) * 4;
    if (previewAge > 40) score += (previewAge - 40) * 1.2;
    return Math.min(Math.round(score), 95);
  };

  const riskScore = calculatePreviewRisk();

  const getRiskCategory = (score) => {
    if (score < 30) return { label: 'Low Risk', color: 'text-green-600 bg-green-500/5 border-green-550/10 dark:text-green-400' };
    if (score < 60) return { label: 'Moderate Risk', color: 'text-amber-600 bg-amber-500/5 border-amber-550/10 dark:text-amber-400' };
    return { label: 'High Risk', color: 'text-red-600 bg-red-500/5 border-red-550/10 dark:text-red-400' };
  };

  const riskCat = getRiskCategory(riskScore);

  return (
    <div className="space-y-20 animate-fade-in text-body relative">
      {/* Subtle Ambient Glow */}
      <div 
        className="pointer-events-none absolute -left-[10%] top-[-10%] -z-10 h-[800px] w-[800px] rounded-full bg-[#A53860]" 
        style={{ filter: 'blur(120px)', opacity: 0.08 }} 
      />
      
      {/* 50/50 Balanced Desktop Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Widescreen balanced typography spacing */}
        <div className="space-y-6">
          <h1 className="text-hero font-bold tracking-tight text-clinical-heading leading-[1.15]">
            Clinician Screening <br />
            &amp; Glycemic Analytics
          </h1>
          <p className="text-clinical-label leading-relaxed text-body max-w-md">
            Diagnose prediabetic thresholds using patient baseline indicators, biological parameters, and multi-variate statistical risk equations processed in local memory.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartScreening}
              className="flex items-center justify-center gap-2 rounded bg-primary px-5 py-3 text-small font-bold uppercase tracking-wider text-white transition-all hover:bg-primary-dark"
            >
              Start Screening Session
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Wide Matte Simulator panel */}
        <div className="w-full">
          <div className="rounded-medical premium-card  space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-secondary dark:text-accent" />
                <span className="text-small font-bold text-clinical-heading uppercase tracking-wide">Risk Simulator Sandbox</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-clinical-label">Heuristics Engine</span>
            </div>

            {/* Simulated parameter sliders */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-small font-semibold text-clinical-label mb-1.5">
                  <span>Patient BMI Markers</span>
                  <span className="text-primary dark:text-accent font-bold">{previewBmi} kg/m²</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="45"
                  value={previewBmi}
                  onChange={(e) => setPreviewBmi(Number(e.target.value))}
                  className="w-full h-1 bg-gray-105 dark:bg-gray-800 rounded appearance-none cursor-pointer accent-primary"
                />
              </div>
              <div>
                <div className="flex justify-between text-small font-semibold text-clinical-label mb-1.5">
                  <span>Patient Age Bracket</span>
                  <span className="text-primary dark:text-accent font-bold">{previewAge} years</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="90"
                  value={previewAge}
                  onChange={(e) => setPreviewAge(Number(e.target.value))}
                  className="w-full h-1 bg-gray-105 dark:bg-gray-800 rounded appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Simulated value display */}
              <div className="pt-4 flex items-center justify-between border-t border-gray-50 dark:border-gray-855">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-clinical-label tracking-wider">Simulated Risk Output</span>
                  <span className="text-2xl font-bold text-clinical-value">{riskScore}%</span>
                </div>
                <div className={`rounded px-2.5 py-1 text-small font-bold border ${riskCat.color}`}>
                  {riskCat.label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines list */}
      <div className="space-y-8 pt-4">
        <div className="border-b border-gray-150 dark:border-gray-805 pb-3">
          <h2 className="text-section font-bold text-clinical-heading">Workspace Directives</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: 'In-Memory Privacy Core',
              desc: 'Patient screenings run purely in local sandbox memory. Zero biological markers or demographic details are written to remote servers, satisfying privacy protocols.'
            },
            {
              icon: Database,
              title: 'Clinical Data Metrics',
              desc: 'Integrates biological characteristics, metabolic lab reports, baseline blood pressure indicators, lifestyle profiles, and family heredity index.'
            },
            {
              icon: Award,
              title: 'Auditable Specifications',
              desc: 'Review multi-layer Artificial Neural Network topology details, validation outcomes, ROC curves, and confusion matrices in the Model Specs workspace.'
            }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="rounded-medical premium-card  space-y-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded bg-secondary/5 text-secondary dark:bg-accent/10 dark:text-accent">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-card font-bold text-clinical-heading">{feat.title}</h3>
                <p className="text-body text-clinical-body leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics Grid - MOVED BELOW THE FOLD (placed at the bottom!) */}
      <div className="space-y-8 pt-4">
        <div className="border-b border-gray-150 dark:border-gray-805 pb-3">
          <h2 className="text-section font-bold text-clinical-heading">Cohort Statistics Summary</h2>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 w-full">
          {[
            { label: 'Audit Database Volume', value: '14,284+', sub: 'Patient instances' },
            { label: 'Model Sensitivity', value: '89.4%', sub: 'Cross-validated' },
            { label: 'Predictive Features', value: '18 Parameters', sub: 'Biometric & clinical' },
            { label: 'Compute Engine Latency', value: '8ms', sub: 'Calculated locally' }
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-medical premium-card  space-y-1"
            >
              <div className="text-small font-bold uppercase tracking-wider text-clinical-label">{stat.label}</div>
              <div className="text-2xl font-bold text-primary dark:text-accent tracking-tight">{stat.value}</div>
              <div className="text-small text-clinical-muted">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
