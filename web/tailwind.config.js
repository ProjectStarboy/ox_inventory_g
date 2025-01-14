/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gray-gradient': 'radial-gradient(circle, rgba(0, 0, 0, 0.6138830532212884) 0%, rgba(0, 0, 0, 0) 84%)',
      },
    },
    fontFamily: {
      display: ['Roboto', 'sans-serif'],
      body: ['Roboto', 'sans-serif'],
      jaro: ['Jaro', 'sans-serif'],
    },
    textColor: {
      primary: '#fe4655',
      secondary: '#1d1d1e',
      success: '#10b981',
      warning: '#f5a524',
      danger: '#fe4655',
    },
    backgroundColor: {
      primary: '#fe4655',
      secondary: '#1d1d1e',
      success: '#10b981',
      warning: '#f5a524',
      danger: '#fe4655',
    },
  },
  darkMode: 'class',
  plugins: [nextui({})],
};
