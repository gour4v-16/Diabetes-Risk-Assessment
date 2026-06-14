import React, { useState } from 'react';
import { Activity, Sun, Moon, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';

export default function Navbar({ activeTab, setActiveTab, darkMode, setDarkMode, onRunScreening }) {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTab, setHoveredTab] = useState(null);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'screening', label: 'Screening' },
    { id: 'cohort', label: 'Cohort Data' },
    { id: 'models', label: 'Model Specs' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b transition-colors duration-250 dark:border-gray-800/40 dark:bg-medicalCard-dark/95" style={!darkMode ? { background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(139,46,60,0.05)' } : {}}>
      <div className="mx-auto max-w-[1600px] px-8 md:px-12">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Branding */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-clinical-value">
              <Activity className="h-4 w-4 stroke-[2]" />
            </div>
            <span className="font-sans text-xs font-bold tracking-tight text-clinical-value uppercase">
              DiaRisk<span className="text-secondary dark:text-accent font-medium">Portal</span>
            </span>
          </div>

          {/* Desktop Navigation with Smooth Sliding Highlight Animation */}
          <div
            className="hidden md:flex items-center gap-1 h-full"
            onMouseLeave={() => setHoveredTab(null)}
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const isHovered = hoveredTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  className={`relative px-4 py-2 text-small font-semibold tracking-wide uppercase transition-all duration-300 rounded-full ${isActive
                    ? 'text-primary-dark dark:text-white'
                    : isHovered
                      ? 'text-nav-hover dark:text-white -translate-y-[2px]'
                      : 'text-nav-inactive'
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Active Tab Pill & Underline */}
                  {isActive && (
                    <>
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 bg-primary/10 dark:bg-accent/15 rounded-full shadow-[0_0_12px_rgba(239,136,173,0.15)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute -bottom-[14px] left-3 right-3 h-[3px] bg-secondary dark:bg-accent rounded-t-md shadow-[0_0_8px_rgba(239,136,173,0.4)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    </>
                  )}

                  {/* Hover Slide Effect */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="hoverPill"
                      className="absolute inset-0 bg-secondary/5 dark:bg-[#A53860]/30 rounded-full shadow-md"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-4">
            {/* User Profile Info */}
            <div className="flex flex-col items-end pr-2 border-r border-gray-200 dark:border-gray-800/80">
              <span className="text-xs font-bold text-clinical-heading">
                {user?.name}
              </span>
              <span className="text-[10px] text-clinical-label font-medium">
                {user?.email}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="text-[11px] font-bold uppercase tracking-wider text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            >
              Sign Out
            </button>

            {/* Light/Dark Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 bg-gray-50 text-nav-inactive transition-all hover:bg-gray-100 dark:border-gray-800 dark:bg-medicalBg-dark dark:text-gray-400 dark:hover:bg-gray-800 hover:scale-105 active:scale-95"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>

            {/* Run Screening Button */}
            <button
              onClick={onRunScreening}
              className="flex items-center gap-2 rounded bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
              style={!darkMode ? { background: 'linear-gradient(135deg, #8B2E3C, #702530)' } : {}}
            >
              Run Screening
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 dark:border-gray-800 text-nav-inactive"
            >
              {darkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 dark:border-gray-800 text-nav-inactive"
            >
              {isOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-medicalBg-dark px-8 py-3 space-y-2 animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-left py-2 text-small font-semibold tracking-wide uppercase rounded ${activeTab === item.id
                ? 'text-primary bg-primary/5 dark:text-accent dark:bg-accent/5'
                : 'text-nav-inactive'
                }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3">
            <div className="flex items-center justify-between px-2.5 py-2 bg-gray-50 dark:bg-[#141118]/40 rounded-lg">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-clinical-heading">{user?.name}</span>
                <span className="text-[10px] text-clinical-label">{user?.email}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-700"
              >
                Sign Out
              </button>
            </div>
            <button
              onClick={() => {
                onRunScreening();
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-center gap-1.5 rounded bg-primary py-2 text-small font-semibold text-white transition-all hover:bg-primary-dark"
            >
              Run Screening
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
