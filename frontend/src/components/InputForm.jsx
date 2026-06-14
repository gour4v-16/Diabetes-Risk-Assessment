// src/components/InputForm.jsx
import React from 'react';

// Simple schema-driven input renderer
export default function InputForm({ schema, formData, handleInput, darkMode }) {
  const inputClass = "w-full h-14 rounded-lg px-4 text-base bg-white border border-gray-150 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-[#1B1720] dark:border-gray-800 dark:focus:border-accent transition-all duration-200 shadow-sm text-clinical-value";
  const selectClass = "w-full h-14 rounded-lg px-4 text-base bg-white border border-gray-150 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-[#1B1720] dark:border-gray-800 dark:focus:border-accent transition-all duration-200 shadow-sm appearance-none text-clinical-value";

  return (
    <div className="space-y-6">
      {schema.map((field) => {
        const { id, label, type, options, placeholder, min, max, step } = field;
        const value = formData[id] ?? '';
        if (type === 'select') {
          return (
            <div key={id}>
              <label className="block text-sm font-semibold text-clinical-label mb-2">{label}</label>
              <select
                value={value}
                onChange={(e) => handleInput(id, e.target.value)}
                className={selectClass}
              >
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          );
        }
        // default to number input
        return (
          <div key={id}>
            <label className="block text-sm font-semibold text-clinical-label mb-2">{label}</label>
            <input
              type="number"
              placeholder={placeholder}
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => handleInput(id, e.target.value)}
              className={inputClass}
            />
          </div>
        );
      })}
    </div>
  );
}
