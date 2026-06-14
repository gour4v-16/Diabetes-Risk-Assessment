import React from 'react';
import { Activity, Heart, ArrowUp, ArrowDown, Calendar, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, ChevronRight, ActivitySquare } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnimatedCounter from './AnimatedCounter';
import { useUser } from '../context/UserContext';

export default function AnalyticsDashboard({ darkMode }) {
  const { assessments, getTrendData } = useUser();

  const trendData = getTrendData() || [];

  const latest = assessments[0];
  const prev = assessments[1];
  const riskDiff = prev ? prev.risk - latest.risk : 0;

  const currentMetrics = {
    riskScore: latest ? latest.risk : 0,
    healthScore: latest ? latest.health : 0,
    bmi: latest ? latest.bmi : 0.0,
    lastAssessment: latest ? latest.date : 'No assessments taken yet'
  };

  const latestFactors = latest ? latest.factors : [];
  const latestRecommendations = latest ? latest.recommendations : [];

  const statusAccents = {
    'Optimal': '#10B981',
    'Normal': '#3B82F6',
    'Needs Improvement': '#F59E0B',
    'Moderate Risk': '#F97316'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-[#1B1720] border border-gray-150 dark:border-gray-800 p-3 rounded-lg shadow-xl">
          <p className="text-xs font-bold text-[#77707A] dark:text-[#A1A1AA] mb-1">{label}</p>
          <p className="text-sm font-bold text-[#4A434B] dark:text-[#F5F5F5]">
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-12 animate-fade-in text-body font-sans pb-16">

      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-150 dark:border-gray-855 pb-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-clinical-heading">
            Health Progress
          </h2>
          <p className="text-lg text-clinical-body font-normal">
            Track your personal health metrics and risk reduction over time.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[rgba(139,46,60,0.08)] dark:bg-[#141118] rounded-lg border border-[rgba(139,46,60,0.15)] dark:border-gray-800">
          <Calendar className="h-4 w-4 text-[#7A2B38] dark:text-accent" />
          <span className="text-sm font-semibold text-[#7A2B38] dark:text-clinical-label">Last updated: {currentMetrics.lastAssessment}</span>
        </div>
      </div>

      {/* Layered Top Metrics Section */}
      <div className="relative mb-16 lg:mb-24 mt-4">

        {/* Main Hero Card (Risk Score) */}
        <div
          className="relative z-10 w-full lg:w-[65%] rounded-[32px] premium-card-primary p-8 md:p-12 overflow-hidden shadow-2xl border-transparent"
          style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
        >
          {/* Subtle animated background glow inside the card */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 dark:bg-accent/15 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-accent/10 text-primary-dark dark:text-accent text-xs font-bold uppercase tracking-wider">
                <Activity className="h-4 w-4" />
                Current Risk Score
              </div>
              <div className="text-6xl md:text-8xl font-extrabold tracking-tighter text-clinical-value">
                <AnimatedCounter value={currentMetrics.riskScore} suffix="%" />
              </div>
              <p className="text-clinical-body font-medium max-w-sm text-sm">
                {latest ? (
                  currentMetrics.riskScore >= 55 
                    ? "Your clinical risk is currently high. We recommend reviewing risk factors and consulting your clinician."
                    : currentMetrics.riskScore >= 25
                    ? "Your clinical risk is moderate. Consider lifestyle adjustments to reduce your risk factors."
                    : "Your clinical risk is low. Maintain your current activity levels and healthy habits."
                ) : (
                  "Complete your first screening to see your personalized clinical risk score description."
                )}
              </p>
            </div>

            <div className="flex flex-col gap-2 shrink-0">
              {assessments.length >= 2 ? (
                riskDiff > 0 ? (
                  <div className="flex items-center gap-2 text-sm font-bold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-500/20 px-4 py-2.5 rounded-full shadow-sm">
                    <TrendingDown className="h-4 w-4" />
                    {Math.abs(riskDiff)}% risk reduction
                  </div>
                ) : riskDiff < 0 ? (
                  <div className="flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-500/20 px-4 py-2.5 rounded-full shadow-sm">
                    <TrendingUp className="h-4 w-4" />
                    {Math.abs(riskDiff)}% risk increase
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-500/20 px-4 py-2.5 rounded-full shadow-sm">
                    <Activity className="h-4 w-4" />
                    Stable risk trajectory
                  </div>
                )
              ) : assessments.length === 1 ? (
                <div className="flex items-center gap-2 text-sm font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-500/20 px-4 py-2.5 rounded-full shadow-sm">
                  <Activity className="h-4 w-4" />
                  Baseline established
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-500/20 px-4 py-2.5 rounded-full shadow-sm">
                  <Activity className="h-4 w-4" />
                  Awaiting screening
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Capsules */}
        <div className="relative lg:absolute lg:right-0 lg:top-8 z-20 w-full lg:w-[45%] flex flex-col gap-5 mt-8 lg:mt-0 px-4 lg:px-0">

          {/* Health Score Capsule */}
          <div
            className="floating-capsule flex items-center justify-between lg:ml-12 lg:-translate-y-4"
            style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-600 dark:text-green-400">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-card-label uppercase tracking-widest">Health Vitality</p>
                <p className="text-2xl font-semibold text-clinical-value">
                  <AnimatedCounter value={currentMetrics.healthScore} suffix="/100" />
                </p>
              </div>
            </div>
            {assessments.length >= 2 && riskDiff >= 0 && <TrendingUp className="h-5 w-5 text-green-500" />}
            {assessments.length >= 2 && riskDiff < 0 && <TrendingDown className="h-5 w-5 text-red-500" />}
          </div>

          {/* BMI Capsule */}
          <div
            className="floating-capsule flex items-center justify-between lg:-ml-6 lg:z-30"
            style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center text-secondary">
                <ActivitySquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-card-label uppercase tracking-widest">Body Mass Index</p>
                <p className="text-2xl font-semibold text-clinical-value">
                  <AnimatedCounter value={currentMetrics.bmi} decimals={1} />
                </p>
              </div>
            </div>
            {assessments.length >= 2 && (assessments[1].bmi > latest.bmi ? <TrendingDown className="h-5 w-5 text-green-500" /> : assessments[1].bmi < latest.bmi ? <TrendingUp className="h-5 w-5 text-red-500" /> : null)}
          </div>

          {/* Assessments Capsule */}
          <div
            className="floating-capsule flex items-center justify-between lg:ml-8 lg:translate-y-2"
            style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-[#141118] flex items-center justify-center text-[#6B7280] dark:text-[#A1A1AA]">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold text-card-label uppercase tracking-widest">Assessments Taken</p>
                <p className="text-2xl font-semibold text-clinical-value">
                  <AnimatedCounter value={assessments.length} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Risk Score Trend */}
        <div
          className="relative rounded-[24px] premium-card-primary space-y-6 overflow-hidden"
          style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
        >
          {/* Chart Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-secondary/[0.01] dark:bg-[rgba(239,136,173,0.02)] blur-[70px] pointer-events-none z-0" />
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-clinical-heading">Risk Score Trend</h3>
            <p className="text-sm text-clinical-body">Your clinical risk trajectory over the past 6 months.</p>
          </div>
          <div className="relative z-10 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF88AD" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EF88AD" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={!darkMode ? "#E5E7EB" : "#333"} opacity={0.2} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: !darkMode ? '#77707A' : '#A1A1AA' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: !darkMode ? '#77707A' : '#A1A1AA' }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="riskScore" name="Risk Score" stroke="#A53860" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Health Vitality Trend */}
        <div
          className="relative rounded-[24px] premium-card-primary space-y-6 overflow-hidden"
          style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
        >
          {/* Chart Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-secondary/[0.01] dark:bg-[rgba(239,136,173,0.02)] blur-[70px] pointer-events-none z-0" />
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-clinical-heading">Health Vitality Trend</h3>
            <p className="text-sm text-clinical-body">Overall health index improvement.</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={!darkMode ? "#E5E7EB" : "#333"} opacity={0.2} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: !darkMode ? '#77707A' : '#A1A1AA' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: !darkMode ? '#77707A' : '#A1A1AA' }} domain={['dataMin - 10', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="healthScore" name="Health Score" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Bottom Section: Risk Factors & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Risk Factors Breakdown */}
        <div
          className="lg:col-span-7 rounded-[24px] premium-card-primary space-y-6"
          style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
        >
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-clinical-heading">Personalized Risk Factors</h3>
              <p className="text-sm text-clinical-body">Detailed breakdown of your current biometrics.</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary/10 dark:bg-accent/10 flex items-center justify-center text-primary dark:text-accent">
              <Activity className="h-5 w-5" />
            </div>
          </div>

          <div className="space-y-4">
            {latestFactors.length > 0 ? (
              latestFactors.map((factor, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-lg transition-all hover:opacity-95 ${
                    !darkMode ? 'bg-white' : 'bg-[#141118] border border-gray-800/60'
                  }`}
                  style={!darkMode ? {
                    border: '1px solid rgba(140,120,130,0.12)',
                    borderLeft: `4px solid ${statusAccents[factor.status] || '#8C7882'}`,
                    boxShadow: '0 4px 18px rgba(0,0,0,0.05)'
                  } : {}}
                >
                  <div>
                    <h4 className="text-sm font-bold text-[#6F6670] dark:text-clinical-body">{factor.name}</h4>
                    <span className="text-lg font-bold text-[#433C44] dark:text-clinical-value">{factor.value}</span>
                  </div>
                  <div className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                    factor.status === 'Optimal'
                      ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-green-200 dark:border-green-500/20'
                      : factor.status === 'Normal'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20'
                      : factor.status === 'Needs Improvement'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20'
                      : 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20'
                  }`}>
                    {factor.status}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-[#77707A] dark:text-[#A1A1AA] text-sm border border-dashed border-gray-250 dark:border-gray-850 rounded-xl">
                Complete a screening to view your personalized risk factors.
              </div>
            )}
          </div>
        </div>

        {/* Timeline & Recommendations */}
        <div className="lg:col-span-5 space-y-8">

          {/* Actionable Recommendations */}
          <div
            className="rounded-[24px] premium-card-secondary space-y-5"
            style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
          >
            <h3 className="text-sm font-bold text-clinical-label uppercase tracking-wider">Top Recommendations</h3>
            <div className="space-y-3">
              {latestRecommendations.length > 0 ? (
                latestRecommendations.map((rec, idx) => {
                  const isPositive = rec.toLowerCase().includes("optimal") || rec.toLowerCase().includes("maintain");
                  return (
                    <div key={idx} className={`flex items-start gap-3 ${idx > 0 ? 'pt-3 border-t border-gray-100 dark:border-gray-800' : ''}`}>
                      {isPositive ? (
                        <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-clinical-heading">{rec}</h4>
                        <p className="text-xs text-clinical-body mt-1">Personalized action plan generated by our clinical recommendation engine.</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-[#77707A] dark:text-[#A1A1AA] text-xs border border-dashed border-gray-200 dark:border-gray-800 rounded">
                  No specific recommendations. Complete a screening to see advice.
                </div>
              )}
            </div>
          </div>

          {/* Assessment Timeline */}
          <div
            className="rounded-[24px] premium-card-secondary space-y-5"
            style={!darkMode ? { background: '#FFFFFF', border: '1px solid rgba(140,120,130,0.12)', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' } : {}}
          >
            <h3 className="text-sm font-bold text-clinical-label uppercase tracking-wider">Assessment History</h3>
            {assessments.length > 0 ? (
              <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-150 dark:before:via-gray-800 before:to-transparent">
                {assessments.map((assessment, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active py-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-[#1B1720] bg-gray-55 dark:bg-gray-800 text-[#7A7077] dark:text-[#A1A1AA] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div
                      className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-lg shadow-sm transition-all ${
                        !darkMode ? 'bg-white' : 'bg-[#141118] border border-gray-800'
                      }`}
                      style={!darkMode ? {
                        border: '1px solid rgba(140,120,130,0.12)',
                        boxShadow: '0 4px 18px rgba(0,0,0,0.05)'
                      } : {}}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#6F6670] dark:text-clinical-label">{assessment.date}</span>
                        <span className="text-[10px] uppercase font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-full">{assessment.status}</span>
                      </div>
                      <div className="text-sm font-bold text-[#433C44] dark:text-clinical-value">
                        Risk: {assessment.risk}% • Health: {assessment.health}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-[#77707A] dark:text-[#A1A1AA] text-sm border border-dashed border-gray-250 dark:border-gray-850 rounded-xl">
                No assessments taken yet.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
