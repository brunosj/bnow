/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'selector',
  plugins: [require('tailwind-scrollbar')],
  theme: {
    extend: {
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
          DEFAULT: '#232128',
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
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
};
