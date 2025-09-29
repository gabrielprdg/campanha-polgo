/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        polgo: {
          purple: '#7B3CF0',
          'purple-dark': '#6B2CE5',
          'purple-light': '#8F5AF5',
          blue: '#1FB6FF',
          'blue-dark': '#0FA6EF',
          'blue-light': '#4FC4FF',
          black: '#1A1A1A',
          'gray-light': '#F8F9FA',
          'gray-medium': '#6C757D',
          white: '#FFFFFF',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}