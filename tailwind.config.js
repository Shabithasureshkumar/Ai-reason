/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        slate: {
          850: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      /**
       * Half-step and custom sizes the components already reference.
       * Without these entries `w-4.5`, `h-5.5`, `w-13`, `h-18` and `gap-4.5`
       * compile to nothing, so elements silently collapse to their content
       * size (e.g. the Aura icon rendered 28px instead of 52px on mobile).
       */
      spacing: {
        '4.5': '1.125rem', // 18px
        '5.5': '1.375rem', // 22px
        '13': '3.25rem',   // 52px
        '18': '4.5rem',    // 72px
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'purple-glow': '0 0 25px -5px rgba(124, 58, 237, 0.25)',
        'purple-subtle': '0 4px 20px -2px rgba(139, 92, 246, 0.08)',
        'card-hover': '0 12px 30px -10px rgba(124, 58, 237, 0.15)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        fadeIn: 'fadeIn 160ms ease-out',
      }
    },
  },
  plugins: [],
}
