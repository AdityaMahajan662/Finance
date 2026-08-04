/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#04091A',
          900: '#0A1628',
          800: '#0D1F3C',
          700: '#112850',
          600: '#163364',
        },
        brand: {
          blue: '#1E6FFF',
          'blue-light': '#4D8FFF',
          'blue-dark': '#0A52CC',
          gold: '#F5A623',
          'gold-light': '#F8BC55',
          'gold-dark': '#D4891A',
        },
        glass: {
          white: 'rgba(255,255,255,0.05)',
          border: 'rgba(255,255,255,0.10)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 20% 50%, #163364 0%, #0A1628 50%, #04091A 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(30,111,255,0.15) 0%, rgba(245,166,35,0.05) 100%)',
        'cta-gradient': 'linear-gradient(135deg, #1E6FFF 0%, #0A52CC 100%)',
        'gold-gradient': 'linear-gradient(135deg, #F5A623 0%, #D4891A 100%)',
        'mesh': 'radial-gradient(at 40% 20%, hsla(220,100%,50%,0.15) 0px, transparent 50%), radial-gradient(at 80% 80%, hsla(38,90%,55%,0.10) 0px, transparent 50%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.4)',
        'blue-glow': '0 0 30px rgba(30,111,255,0.3)',
        'gold-glow': '0 0 20px rgba(245,166,35,0.3)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.5)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-blue': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(30,111,255,0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(30,111,255,0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-up-delay-1': 'fade-up 0.6s ease-out 0.1s forwards',
        'fade-up-delay-2': 'fade-up 0.6s ease-out 0.2s forwards',
        'fade-up-delay-3': 'fade-up 0.6s ease-out 0.3s forwards',
        'fade-up-delay-4': 'fade-up 0.6s ease-out 0.4s forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-blue': 'pulse-blue 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
