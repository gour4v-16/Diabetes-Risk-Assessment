import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import ScreeningForm from './components/ScreeningForm';
import ResultsPanel from './components/ResultsPanel';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ModelInfo from './components/ModelInfo';
import LoginPage from './components/LoginPage';
import { useUser } from './context/UserContext';
import { ShieldAlert, Heart } from 'lucide-react';

export default function PortalContent() {
  const { user, loading, login, addAssessment } = useUser();
  const [activeTab, setActiveTab] = useState('overview');

  // Persist light/dark mode in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const [screeningCompleted, setScreeningCompleted] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [apiResult, setApiResult] = useState(null);

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = darkMode;

    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      
      root.style.removeProperty('--color-primary-dark');
      root.style.removeProperty('--color-secondary');
      root.style.removeProperty('--color-primary');
      root.style.removeProperty('--color-accent');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
      
      root.style.removeProperty('--color-primary-dark');
      root.style.removeProperty('--color-secondary');
      root.style.removeProperty('--color-primary');
      root.style.removeProperty('--color-accent');
    }
  }, [darkMode]);

  const handleScreeningComplete = (formData, apiResponse) => {
    addAssessment(formData, apiResponse.risk_score, apiResponse);
    setPatientData(formData);
    setApiResult(apiResponse);
    setScreeningCompleted(true);
  };

  const handleResetScreening = () => {
    setPatientData(null);
    setApiResult(null);
    setScreeningCompleted(false);
  };

  const handleBackToForm = () => {
    setScreeningCompleted(false);
  };

  const startScreeningFresh = () => {
    handleResetScreening();
    setActiveTab('screening');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08070A]">
        <div className="w-10 h-10 border-4 border-[#A53860]/30 border-t-[#EF88AD] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={login} />;
  }

  return (
    <div className="relative min-h-screen flex flex-col font-sans transition-colors duration-250 text-gray-800 dark:text-gray-200 overflow-hidden bg-transparent">
      {/* Ambient background glows (Premium Spotlight Glows) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full hidden dark:block dark:bg-[rgba(165,56,96,0.04)] blur-[180px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-0 w-[1000px] h-[1000px] rounded-full hidden dark:block dark:bg-[rgba(239,136,173,0.02)] blur-[220px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full hidden dark:block dark:bg-[rgba(165,56,96,0.03)] blur-[200px] pointer-events-none z-0" />

      {/* Header */}
      <div className="relative z-10">
        <Navbar
          activeTab={activeTab === 'results' ? 'screening' : activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'overview') {
              setScreeningCompleted(false);
            }
          }}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onRunScreening={startScreeningFresh}
        />
      </div>

      {/* Main Container */}
      <main className="relative z-10 flex-grow mx-auto max-w-[1600px] w-full px-8 md:px-12 py-14 md:py-20">
        {activeTab === 'overview' && (
          <DashboardOverview onStartScreening={startScreeningFresh} darkMode={darkMode} />
        )}

        {activeTab === 'screening' && (
          <div className="w-full">
            {screeningCompleted && patientData ? (
              <ResultsPanel
                data={patientData}
                apiResult={apiResult}
                onBackToForm={handleBackToForm}
                onReset={handleResetScreening}
                darkMode={darkMode}
              />
            ) : (
              <ScreeningForm
                onComplete={handleScreeningComplete}
                initialData={patientData}
                darkMode={darkMode}
              />
            )}
          </div>
        )}

        {activeTab === 'cohort' && (
          <AnalyticsDashboard darkMode={darkMode} />
        )}

        {activeTab === 'models' && (
          <ModelInfo darkMode={darkMode} />
        )}
      </main>

      {/* Clinician Disclaimer Footer */}
      <footer className="relative z-10 w-full border-t transition-colors duration-255 border-gray-200/50 bg-white/40 dark:border-gray-855 dark:bg-[#0B0A0E] py-10">
        <div className="mx-auto max-w-[1600px] px-8 md:px-12 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-4.5 w-4.5 text-secondary" />
              <span className="font-bold text-xs text-primary-dark dark:text-white uppercase tracking-wider">
                DiaRisk Portal <span className="font-normal text-gray-400">Clinical Support System</span>
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-gray-250 bg-gray-55 dark:border-gray-800/80 dark:bg-gray-900/10 p-4 flex gap-3 text-xs leading-relaxed text-gray-550 dark:text-gray-400">
            <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>Clinical Reference Disclaimer:</strong> DiaRisk Portal is a screening assistant for reference and educational clinical evaluations. Computed risk parameters are based on mathematical cohort indices and neural networks. They do not constitute formal medical diagnoses, lab essays, or a substitute for expert medical advice. Always refer to a licensed medical practitioner for complete diagnostic evaluations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
