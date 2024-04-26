/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      
      },
    },
    extend: {
      colors: {
        'primary-500': '#877EFF',
        'primary-600': '#5D5FEF',
        'secondary-500': '#FFB620',
        'off-white': '#D0DFFF',
        'red': '#FF5A5A',
        'red-1': '#C03C15',
        'dark-1': '#000000',
        'dark-2': '#09090A',
        'dark-3': '#101012',
        'dark-4': '#1F1F22',
        'dark-5': '#151E2B',
        'dark-6': '#09090B',
        'gray-1': '#23282D',
        'gray-2': '#CED2CC',
        'gray-3': '#484848',
        'gray-4': '#27272A',
        'gray-5': '#BED4D9',
        'gray-6': '#504450',
        'gray-7': '#7E909A',
        'bg-left': '#0F1722',
        'bg-right': '#1D293A',
        'light-1': '#FFFFFF',
        'light-2': '#EFEFEF',
        'light-3': '#79988D',
        'light-4': '#5C5C7B',
        'light-5': '#364357',
        'blue-1': '#6C63FF',
        'blue-2': '#17CF97',
        'blue-3': '#784AFE',
      },
      screens: {
        'xs': '480px',
      
      },
      width: {
        '420': '420px',
        '465': '465px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],

      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};