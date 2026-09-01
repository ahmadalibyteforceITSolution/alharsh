/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#36a8f6',
          500: '#0c8de4',
          600: '#026fc2',
          700: '#03589e',
          800: '#074c82', // Official AL-HARSH Deep Blue
          900: '#0b3f6c',
          950: '#072847',
        },
        navy: {
          800: '#0f1f38',
          900: '#0a1628',
          950: '#050c18',
        },
        accent: {
          cyan: '#06b6d4',
          teal: '#0d9488',
          gold: '#eab308',
          orange: '#f97316',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(7, 76, 130, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 30px -4px rgba(7, 76, 130, 0.15), 0 8px 12px -4px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(12, 141, 228, 0.35)',
      }
    },
  },
  plugins: [],
}
