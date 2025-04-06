module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.html'],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00f3ff',
        'cyber-purple': '#9d00ff',
        'dark-bg': '#0a0b0f',
        'dark-card': '#0d0e14',
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      boxShadow: {
        neon: '0 0 20px rgba(0, 243, 255, 0.5), 0 0 40px rgba(0, 243, 255, 0.3)',
        'neon-strong': '0 0 30px rgba(0, 243, 255, 0.7), 0 0 60px rgba(0, 243, 255, 0.4)',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover'],
      color: ['hover'],
      backgroundColor: ['hover'],
      gradientColorStops: ['hover'],
    },
  },
  plugins: [],
};
