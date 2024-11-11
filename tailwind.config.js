/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'selector',
  theme: {
    colors: {
      pri: {
        DEFAULT: '#ff4d01',
      },
      sec: {
        DEFAULT: '#FEFAAB',
      },
      ter: {
        DEFAULT: '#D4ECC7',
      },
      black: {
        DEFAULT: '#1B1B1B',
      },
      white: {
        DEFAULT: '#FFFFFF',
      },
      lightGray: {
        DEFAULT: '#262626',
      },
      lighterGray: {
        DEFAULT: '#424242',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
};
