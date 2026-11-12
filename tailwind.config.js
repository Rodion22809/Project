/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070B',
          900: '#080A0F',
          850: '#0A0D13',
          800: '#0D1118',
          750: '#11161F',
          700: '#161C27',
          600: '#1E2634',
        },
        neon: {
          50: '#E8FFF3',
          100: '#C7FFE1',
          200: '#8CFFC0',
          300: '#5CFFA4',
          400: '#39FF88',
          500: '#16E874',
          600: '#0BC25E',
          700: '#0B9A4B',
        },
        violet: {
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'neon-sm': '0 0 18px rgba(57, 255, 136, 0.18)',
        neon: '0 0 35px rgba(57, 255, 136, 0.22)',
        'violet-glow': '0 0 40px rgba(139, 92, 246, 0.22)',
        panel: '0 20px 60px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(rgba(57,255,136,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,136,0.055) 1px, transparent 1px)',
        'radial-neon':
          'radial-gradient(ellipse at center, rgba(57,255,136,0.14) 0%, transparent 65%)',
      },
      backgroundSize: {
        grid: '52px 52px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(600%)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        scan: 'scan 7s linear infinite',
        blink: 'blink 1.1s step-end infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};
