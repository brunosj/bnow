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
          DEFAULT: '#242129',
        },
        white: {
          DEFAULT: '#FFFFFF',
        },
        lightGray: {
          DEFAULT: '#262626',
        },
        lighterGray: {
          DEFAULT: '#A4A4A4',
        },
        bnowRed: {
          DEFAULT: '#DC3036',
        },
        bnowGreen: {
          DEFAULT: '#30C156',
        },
        bnowYellow: {
          DEFAULT: '#E79601',
        },
        bnowBlue: {
          DEFAULT: '#098E91',
        },
        bnowPurple: {
          DEFAULT: '#4B4653',
        },
        bnowGray: {
          DEFAULT: '#A4A4A4',
        },
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
};
