/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070A0F',
          900: '#0B0F17',
          850: '#0F141E',
          800: '#141B27',
          700: '#1E2738',
          600: '#2A364D'
        },
        lime: {
          neon: '#00FF87',
          accent: '#10B981',
          glow: 'rgba(0, 255, 135, 0.15)',
          glowStrong: 'rgba(0, 255, 135, 0.35)'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon': '0 0 25px -5px rgba(0, 255, 135, 0.35)',
        'neon-lg': '0 0 45px -5px rgba(0, 255, 135, 0.45)',
        'card-glow': '0 0 30px -10px rgba(0, 255, 135, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
