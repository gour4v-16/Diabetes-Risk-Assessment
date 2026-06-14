import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { Activity, ShieldCheck, Heart, Calendar } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import { useUser } from '../context/UserContext';

export default function DashboardOverview({ onStartScreening, darkMode }) {
  const { user, assessments, getTrendData, loading } = useUser();

  if (loading) {
    return null;
  }

  const trendData = getTrendData() || [];
  const riskTrendData = trendData.map(d => ({ date: d.date, risk: d.risk }));
  const bmiTrendData = trendData.map(d => ({ date: d.date, bmi: d.bmi }));

  const recentAssessments = assessments.slice(0, 4).map(a => {
    let category = 'Moderate Risk';
    let color = 'text-amber-500';
    if (a.risk < 25) { category = 'Low Risk'; color = 'text-green-500'; }
    else if (a.risk >= 55) { category = 'High Risk'; color = 'text-red-500'; }
    return { date: a.date, risk: a.risk, category, color };
  });

  const latest = assessments[0] || null;
  const currentRisk = latest ? latest.risk : '--';
  const currentHealth = latest ? latest.health : '--';
  const lastAssessmentDate = latest ? latest.date : 'No screenings taken yet';
  const statusLabel = latest ? 'Up to date' : 'Awaiting first screening';

  const riskCategory = latest 
    ? (latest.risk < 25 ? 'Low Risk Category' : latest.risk < 55 ? 'Moderate Risk Category' : 'High Risk Category')
    : 'Awaiting Screening';
  const riskCategoryColor = latest
    ? (latest.risk < 25
      ? 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-500/20'
      : latest.risk < 55
      ? 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-500/20'
      : 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-500/20')
    : 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-500/20';

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-medicalCard-dark/90 backdrop-blur-md border border-gray-800 p-3 rounded-lg shadow-xl text-xs">
          <p className="text-[#6B7280] dark:text-[#A1A1AA] font-bold mb-1">{label}</p>
          <p className="text-primary dark:text-accent font-bold text-sm">
            {payload[0].value} {payload[0].name === 'risk' ? '%' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  const currentHour = new Date().getHours();
  let greeting = 'Good Evening';
  if (currentHour < 12) greeting = 'Good Morning';
  else if (currentHour < 18) greeting = 'Good Afternoon';

  return (
    <div className="space-y-12 animate-fade-in text-body relative">
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-gray-150 dark:border-gray-800/60">
        <div className="space-y-2">
          <h1 className="text-hero font-bold tracking-tight text-clinical-heading leading-[1.1]">
            {greeting}, <br className="hidden md:block" />
            <span className="text-primary dark:text-accent">{user?.name || 'User'}</span>
          </h1>
          <p className="text-clinical-body text-body max-w-xl">
            Your personal health workspace. Monitor your longitudinal risk trajectories, biometric trends, and recent clinical assessments.
          </p>
        </div>
        <button
          onClick={onStartScreening}
          className="flex items-center justify-center gap-2 rounded bg-primary px-5 py-3 text-small font-bold uppercase tracking-wider text-white transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
          style={!darkMode ? { background: 'linear-gradient(135deg, #8B2E3C, #702530)' } : {}}
        >
          New Assessment
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        <div
          className="flex-1 rounded-[32px] premium-card-primary p-8 md:p-10 relative overflow-hidden shadow-2xl border-transparent"
          style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 dark:bg-accent/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="flex flex-col justify-between h-full relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-accent/10 text-primary-dark dark:text-accent text-xs font-bold uppercase tracking-wider w-fit">
              <Activity className="h-4 w-4" />
              Current Risk Score
            </div>
            <div className="space-y-4">
              <div className="text-7xl md:text-8xl font-semibold tracking-tighter text-clinical-value">
                <AnimatedCounter value={currentRisk} suffix="%" />
              </div>
              <div className={`inline-flex text-xs font-bold ${riskCategoryColor} px-3 py-1.5 rounded-md shadow-sm`}>
                {riskCategory}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col justify-center gap-5 lg:pl-6">
          <div
            className="floating-capsule flex items-center justify-between lg:-translate-x-8"
            style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-secondary/10 dark:bg-accent/20 flex items-center justify-center text-secondary dark:text-accent">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold tracking-widest text-card-label">Overall Health</p>
                <p className="text-xl font-semibold text-clinical-value">
                  <AnimatedCounter value={currentHealth} />
                  <span className="text-sm text-card-label font-medium">/100</span>
                </p>
              </div>
            </div>
          </div>

          <div
            className="floating-capsule flex items-center justify-between z-10 lg:-translate-x-16"
            style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-[#141118] flex items-center justify-center text-[#6B7280] dark:text-[#A1A1AA]">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold tracking-widest text-card-label">Last Assessment</p>
                <p className="text-xl font-semibold text-clinical-value">{lastAssessmentDate}</p>
              </div>
            </div>
          </div>

          <div
            className="floating-capsule flex items-center justify-between lg:-translate-x-4"
            style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 dark:bg-accent/10 flex items-center justify-center text-primary dark:text-accent">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold tracking-widest text-card-label">Status</p>
                <p className="text-xl font-semibold text-clinical-value">{statusLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-section font-bold text-clinical-heading pb-2 border-b border-gray-150 dark:border-gray-800/60">Health Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="relative rounded-[24px] premium-card-secondary space-y-6 overflow-hidden"
              style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-secondary/[0.01] dark:bg-[rgba(239,136,173,0.02)] blur-[60px] pointer-events-none z-0" />
              <div className="relative z-10">
                <h3 className="font-bold text-clinical-heading text-card">Risk Trend Over Time</h3>
                <p className="text-[11px] text-card-label font-medium">Trajectory of your computed risk score (%)</p>
              </div>
              <div className="relative z-10 h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={riskTrendData}>
                    <defs>
                      <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF88AD" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#EF88AD" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={!darkMode ? "#E5E7EB" : "#333"} opacity={0.2} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: !darkMode ? '#6B7280' : '#A1A1AA' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: !darkMode ? '#6B7280' : '#A1A1AA' }} dx={-10} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="risk" stroke="#EF88AD" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" animationDuration={1500} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div
              className="relative rounded-[24px] premium-card-secondary space-y-6 overflow-hidden"
              style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-secondary/[0.01] dark:bg-[rgba(239,136,173,0.02)] blur-[60px] pointer-events-none z-0" />
              <div className="relative z-10">
                <h3 className="font-bold text-clinical-heading text-card">BMI Fluctuation</h3>
                <p className="text-[11px] text-card-label font-medium">Body Mass Index tracking (kg/m²)</p>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bmiTrendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={!darkMode ? "#E5E7EB" : "#333"} opacity={0.2} />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: !darkMode ? '#6B7280' : '#A1A1AA' }} dy={10} />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: !darkMode ? '#6B7280' : '#A1A1AA' }} dx={-10} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="bmi" stroke="#A53860" strokeWidth={3} dot={{ fill: '#A53860', r: 4 }} activeDot={{ r: 6 }} animationDuration={1500} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-section font-bold text-clinical-heading pb-2 border-b border-gray-150 dark:border-gray-800/60">Recent Assessments</h2>
          <div
            className="relative rounded-[24px] premium-card-primary overflow-hidden space-y-6"
            style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
          >
            {recentAssessments.length > 0 ? (
              recentAssessments.map((log, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-150 dark:border-gray-800/50 last:border-0 hover:-translate-y-0.5 transition-transform cursor-default">
                  <div>
                    <div className="text-sm font-bold text-clinical-value">{log.date}</div>
                    <div className={`text-[11px] font-bold uppercase tracking-wider ${log.color}`}>{log.category}</div>
                  </div>
                  <div className="text-xl font-bold text-clinical-value">{log.risk}%</div>
                </div>
              ))
            ) : (
              <div className="py-4 text-center text-clinical-muted text-xs">
                No recent screenings. Complete a screening to see logs.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
