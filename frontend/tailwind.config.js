/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#3A0519',
          DEFAULT: '#670D2F',
        },
        secondary: '#A53860',
        accent: '#EF88AD',
        medicalBg: {
          light: '#FAF7F8',
          dark: '#121014',
        },
        medicalCard: {
          light: '#FFFFFF',
          dark: '#1D1820',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'medical': '18px',
      },
      boxShadow: {
        'medical': '0 4px 20px -2px rgba(103, 13, 47, 0.05), 0 2px 8px -1px rgba(103, 13, 47, 0.02)',
        'medical-hover': '0 12px 30px -4px rgba(103, 13, 47, 0.12), 0 4px 16px -2px rgba(103, 13, 47, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
