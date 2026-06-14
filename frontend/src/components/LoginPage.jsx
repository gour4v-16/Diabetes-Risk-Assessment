import React, { useState } from 'react';
import { Activity, Mail, Lock, ArrowRight, ShieldAlert, Eye, EyeOff } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Extract name from email (e.g. john.smith@gmail.com -> John)
      const namePart = trimmedEmail.split('@')[0];
      const firstName = namePart.split('.')[0];
      const displayName = capitalizeFirstLetter(firstName);

      const user = {
        name: displayName,
        email: trimmedEmail,
        role: 'user',
        rememberMe: rememberMe
      };

      onLogin(user);
    }, 600); // Simulate network delay
  };

  return (
    <div className="min-h-screen w-full flex bg-[#08070A] font-sans text-gray-200 overflow-hidden">

      {/* LEFT SIDE (60%) */}
      <div className="hidden lg:flex w-[60%] relative flex-col justify-between p-12 lg:p-24 border-r border-gray-800/40">

        {/* Subtle Maroon Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#A53860]/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#A53860]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Branding Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-10 w-10 bg-[#A53860]/20 rounded-[10px] border border-[#A53860]/30 flex items-center justify-center shadow-lg">
            <Activity className="h-6 w-6 text-[#EF88AD]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#2A2A2A] dark:text-[#F5F5F5]">
            DiaRisk<span className="text-[#EF88AD] font-medium ml-0.5">Portal</span>
          </span>
        </div>

        {/* Large Text Content */}
        <div className="relative z-10 max-w-2xl mb-12">
          <h1 className="text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight text-[#1A1A1A] dark:text-white mb-6">
            Predictive Diabetes <br /> Risk Analytics
          </h1>
          <p className="text-xl text-[#6B7280] dark:text-[#A1A1AA] leading-relaxed font-light">
            Monitor health indicators, assess risk trajectories, and gain actionable insights through personalized clinical analytics.
          </p>
        </div>

        {/* Abstract Medical Graphic (Geometric Nodes) */}
        <div className="relative z-10 w-full max-w-md h-32 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M 10 60 Q 50 10 100 60 T 200 60 T 300 60 T 390 60" fill="transparent" stroke="#EF88AD" strokeWidth="2" strokeDasharray="5,5" />
            <circle cx="10" cy="60" r="4" fill="#A53860" />
            <circle cx="100" cy="60" r="6" fill="#EF88AD" />
            <circle cx="200" cy="60" r="8" fill="#EF88AD" stroke="#A53860" strokeWidth="2" />
            <circle cx="300" cy="60" r="6" fill="#A53860" />
            <circle cx="390" cy="60" r="4" fill="#EF88AD" />
            <path d="M 100 60 L 150 20 L 200 60" fill="transparent" stroke="#A53860" strokeWidth="1" />
            <circle cx="150" cy="20" r="3" fill="#A53860" />
          </svg>
        </div>
      </div>

      {/* RIGHT SIDE (40%) */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-6 sm:p-12 bg-[#111016] relative">
        <div className="w-full max-w-[420px]">

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white mb-2">Secure Clinical Access</h2>
            <p className="text-[#6B7280] dark:text-[#A1A1AA] text-sm">Please sign in to continue to the portal.</p>
          </div>

          <div className="bg-[#17151D] p-8 rounded-[16px] border border-gray-800/60 shadow-2xl relative overflow-hidden">
            <form onSubmit={handleLogin} className="space-y-6 relative z-10">

              {error && (
                <div className="p-3.5 rounded-[12px] bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-300 font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-[#6B7280] dark:text-[#A1A1AA] group-focus-within:text-[#EF88AD] transition-colors" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@hospital.org"
                      className="custom-input w-full h-12 pl-11 pr-4 rounded-[12px] text-sm bg-white dark:bg-[#111016] border border-gray-200 dark:border-gray-800 dark:text-white focus:border-[#A53860] focus:ring-1 focus:ring-[#A53860] outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-[#6B7280] dark:text-[#A1A1AA] group-focus-within:text-[#EF88AD] transition-colors" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="custom-input w-full h-12 pl-11 pr-12 rounded-[12px] text-sm bg-[#111016] border border-gray-800 text-[#1A1A1A] dark:text-white focus:border-[#A53860] focus:ring-1 focus:ring-[#A53860] outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#6B7280] dark:text-[#A1A1AA] hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-4 h-4">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="peer appearance-none w-4 h-4 border border-gray-600 rounded bg-[#111016] checked:bg-[#A53860] checked:border-[#A53860] transition-colors cursor-pointer"
                    />
                    <svg className="absolute w-3 h-3 pointer-events-none text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-[#6B7280] dark:text-[#A1A1AA] group-hover:text-gray-200 transition-colors">Remember Me</span>
                </label>

                <a href="#" className="text-xs font-semibold text-[#EF88AD] hover:text-white transition-colors">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 mt-2 flex items-center justify-center gap-2 rounded-[12px] bg-[#A53860] hover:bg-[#8F3053] text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}
