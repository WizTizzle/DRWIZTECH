/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem'
      },
      height: {
        'screen-dvh': '100dvh',
        'hero-section': 'calc(100dvh - 15.25rem)' // Adjusted to be slightly shorter
      },
      backgroundImage: {
        'gradient-spotlight': "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(142, 216, 248, 0.15) 0%, transparent 50%)",
        'gradient-shine': "linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.15) 50%, transparent 100%)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      animation: {
        'slide-up': 'slide-up 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slide-down 1s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        'shine': 'shine 1.5s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite'
      },
      keyframes: {
        'shine': {
          '0%': { 'background-position': '200% center' },
          '100%': { 'background-position': '-200% center' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9dffd',
          300: '#8ED8F8', // Light blue line (matches wiztech.zip)
          400: '#36a1f8',
          500: '#0c84eb',
          600: '#4B9CD3', // Dark blue line (matches wiztech.zip)
          700: '#0050a2',
          800: '#004385',
          900: '#003870'
        }
      }
    },
  },
  plugins: [],
};