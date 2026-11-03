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
        brand: {
          navy: '#101D35',
          navyLight: '#182B4D',
          navyDark: '#0A1222',
          blue: '#2563EB',
          blueHover: '#1D4ED8',
          blueLight: '#EFF6FF',
          cyan: '#06B6D4',
          cyanHover: '#0891B2',
          cyanLight: '#ECFEFF',
          bg: '#F6F8FC',
          surface: '#FFFFFF',
          text: '#172033',
          muted: '#64748B',
          border: '#E2E8F0',
          darkBg: '#0B1120',
          darkSurface: '#131D33',
          darkCard: '#1E293B',
          darkBorder: '#334155',
          darkText: '#F1F5F9',
          darkMuted: '#94A3B8'
        },
      },
      fontFamily: {
        sans: ['"Noto Sans Arabic"', '"Google Sans Flex"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(16, 29, 53, 0.08), 0 8px 10px -6px rgba(16, 29, 53, 0.04)',
        'glow': '0 0 20px -5px rgba(37, 99, 235, 0.35)',
        'cyan-glow': '0 0 20px -5px rgba(6, 182, 212, 0.35)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
