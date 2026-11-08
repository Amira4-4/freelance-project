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
          // Pure White & Light Tint
          white: '#FFFFFF',
          bg: '#F8FAFC',
          bgLight: '#F0F7FF',
          surface: '#FFFFFF',
          
          // Cyan & Sky Blue Shades
          cyan: '#06B6D4',
          cyanHover: '#0891B2',
          cyanLight: '#ECFEFF',
          cyanSoft: '#E0F2FE',
          cyanGlow: '#22D3EE',
          sky: '#0284C7',
          skyLight: '#BAE6FD',

          // Blue in rich harmonious shades
          blue: '#2563EB',
          blueHover: '#1D4ED8',
          blueDark: '#1E40AF',
          blueDeep: '#1E3A8A',
          blueLight: '#EFF6FF',
          blueMuted: '#93C5FD',

          // Dark Shades (Deep Navy & Slate Blue)
          navy: '#0F172A',
          navyLight: '#1E293B',
          navyDark: '#0B132B',
          darkBg: '#090E1A',
          darkSurface: '#0F172A',
          darkCard: '#1E293B',
          darkBorder: '#334155',

          // Neutral Typography & Borders
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
          borderLight: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 1px 4px -1px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 16px 32px -8px rgba(37, 99, 235, 0.12), 0 4px 12px -2px rgba(6, 182, 212, 0.08)',
        'glow-blue': '0 0 25px -4px rgba(37, 99, 235, 0.35)',
        'glow-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      backgroundImage: {
        'gradient-cyan-blue': 'linear-gradient(135deg, #06B6D4 0%, #2563EB 100%)',
        'gradient-blue-cyan': 'linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)',
        'gradient-hero': 'linear-gradient(180deg, #F0F7FF 0%, #FFFFFF 100%)',
        'gradient-hero-dark': 'linear-gradient(180deg, #0B132B 0%, #090E1A 100%)',
      }
    },
  },
  plugins: [],
}
