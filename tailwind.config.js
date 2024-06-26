export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray100: '#F7F8FA',
        gray200: '#F5F7F9',
        gray300: '#D0D1D2',
        gray400: '#C8CED5',
        gray500: '#B0B8C1',
        gray600: '#8F8E9C',
        gray700: '#686D75',
        gray800: '#404349',
        gray900: '#30343E',
        gray1000: '#191F28',
        indigo: '#7990F6',
      },
      animation: {
        fadeInOut: 'fade-in-out 3s ease-out forwards',
      },

      keyframes: {
        'fade-in-out': {
          '0%': { opacity: 0 },
          '25%': { opacity: 1 },
          '85%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      backgroundImage: {
        gradient: 'url("/assets/bg_result.webp")',
      },
    },
  },
};