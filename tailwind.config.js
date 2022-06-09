const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Donoun-Medium', ...defaultTheme.fontFamily.sans],
      header: ['GmarketSansBold', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
