/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#2C2C2C',
        brand: {
          DEFAULT: '#ffffff',
          light: '#e5e5e5',
        },
        accent: {
          DEFAULT: '#aaaaaa',
          light: '#cccccc',
        },
        surface: {
          DEFAULT: '#111111',
          soft: '#0a0a0a',
        },
        ink: {
          DEFAULT: '#ffffff',
          soft: '#aaaaaa',
        },
        muted: '#666666',
        line: 'rgba(255,255,255,0.08)',
        success: '#16A37B',
        warning: '#F2B705',
        danger: '#E5484D',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #2C2C2C 0%, #1a1a1a 100%)',
        'brand-gradient': 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
      },
      animation: {
        'blob': 'blob 20s ease-in-out infinite',
        'blob-delay': 'blob 25s ease-in-out infinite 5s',
        'blob-delay2': 'blob 30s ease-in-out infinite 10s',
        'fade-up': 'fadeUp 0.6s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%', transform: 'translate(0, 0) scale(1)' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%', transform: 'translate(40px, -60px) scale(1.05)' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 40% 70% 50%', transform: 'translate(-30px, 30px) scale(0.95)' },
          '75%': { borderRadius: '40% 30% 60% 50% / 70% 50% 40% 30%', transform: 'translate(20px, 50px) scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
