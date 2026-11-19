/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080808',
        surface: {
          DEFAULT: '#111111',
          light: '#181818',
          border: '#222222',
          hover: '#282828'
        },
        charcoal: {
          900: '#0c0c0c',
          800: '#141414',
          700: '#1e1e1e',
          600: '#2a2a2a',
          500: '#3d3d3d',
        },
        accent: {
          DEFAULT: '#FF6B35',
          hover: '#ff814f',
          light: '#ffa07a',
          dark: '#e0531e',
          glow: 'rgba(255, 107, 53, 0.25)',
        },
        cinema: {
          red: '#E50914',
          gold: '#D4AF37',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syne', 'Cabinet Grotesk', 'Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      aspectRatio: {
        'cinema': '2.39 / 1',
        'reel': '9 / 16',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
